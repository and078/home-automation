import sys
import time
import os
from io import BytesIO
from PIL import Image
from flask import Flask, Response, jsonify, request
from recorder import VideoRecorder

app = Flask(__name__)
recorder = VideoRecorder()

image_name = f"{sys.argv[1]}.jpg"
placeholder_image_path = os.path.join(os.getcwd(), f"placeholder_{image_name}")
image_path = os.path.join(os.getcwd(), image_name)

PORT = int(sys.argv[1])

@app.route(f"/specific-camera-websocket-stream-{sys.argv[1]}")
def index():
    return Response(get_image(), mimetype='multipart/x-mixed-replace; boundary=frame')\

@app.route('/start_recording', methods=['POST'])
def start_recording():
    data = request.json
    stream_url = data.get('stream_url')
    output_file = data.get('output_file')
    
    if not stream_url or not output_file:
        return jsonify({'error': 'Missing stream_url or output_file'}), 400
    
    if recorder.is_recording():
        return jsonify({'error': 'Recording already in progress'}), 400
    
    success = recorder.start_recording(stream_url, output_file)
    return jsonify({
        'status': 'started' if success else 'failed',
        'recording': recorder.is_recording()
    })

@app.route('/stop_recording', methods=['POST'])
def stop_recording():
    success = recorder.stop_recording()
    return jsonify({
        'status': 'stopped' if success else 'no recording to stop',
        'recording': recorder.is_recording()
    })

@app.route('/status', methods=['GET'])
def status():
    return jsonify({
        'recording': recorder.is_recording()
    })


def get_image():
    while True:
        time.sleep(0.04)
        try:
            with open(image_path, "rb") as f:
                image_bytes = f.read()
            image = Image.open(BytesIO(image_bytes))
            img_io = BytesIO()
            image.save(img_io, 'JPEG')
            img_io.seek(0)
            img_bytes = img_io.read()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + img_bytes + b'\r\n')

        except Exception as e:
            print("encountered an exception: ")
            print(e)

            with open(placeholder_image_path, "rb") as f:
                image_bytes = f.read()
            image = Image.open(BytesIO(image_bytes))
            img_io = BytesIO()
            image.save(img_io, 'JPEG')
            img_io.seek(0)
            img_bytes = img_io.read()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + img_bytes + b'\r\n')
            continue
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, threaded=True, port=1234)
