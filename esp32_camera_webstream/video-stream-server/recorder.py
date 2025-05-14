import cv2
import threading
import time

class VideoRecorder:
    def __init__(self):
        self.recording = False
        self.stop_event = threading.Event()
        self.thread = None
        self.cap = None
        self.out = None

    def start_recording(self, stream_url, output_filename):
        if self.recording:
            return False
        
        self.stop_event.clear()
        self.thread = threading.Thread(
            target=self._record,
            args=(stream_url, output_filename),
            daemon=True
        )
        self.thread.start()
        return True

    def _record(self, stream_url, output_filename):
        self.recording = True
        self.cap = cv2.VideoCapture(stream_url)
        
        if not self.cap.isOpened():
            self.recording = False
            return

        fps = int(self.cap.get(cv2.CAP_PROP_FPS))
        width = int(self.cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(self.cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        self.out = cv2.VideoWriter(output_filename, fourcc, fps, (width, height))
        
        while not self.stop_event.is_set():
            ret, frame = self.cap.read()
            if not ret:
                break
            
            self.out.write(frame)
            time.sleep(0.01)
        
        self._cleanup()
        self.recording = False

    def stop_recording(self):
        if not self.recording:
            return False
        
        self.stop_event.set()
        self.thread.join()
        return True

    def _cleanup(self):
        if self.out:
            self.out.release()
        if self.cap:
            self.cap.release()
        cv2.destroyAllWindows()

    def is_recording(self):
        return self.recording