import sys
import time
from io import BytesIO
from PIL import Image
from flask import Flask, Response, render_template
# from base64 import b64encode
app = Flask(__name__) #template_folder='templates'

PORT = int(sys.argv[1])

@app.route('/specific-camera-websocket-stream')
def index():
    return Response(get_image(), mimetype='multipart/x-mixed-replace; boundary=frame')\
    #  return render_template('index.html')

    
# @app.route('/video_feed')
# def video_feed():
#     return Response(get_image(), mimetype='multipart/x-mixed-replace; boundary=frame')\


def get_image():
    while True:
        time.sleep(0.05)
        try:
            with open("image.jpg", "rb") as f:
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

            with open("placeholder.jpg", "rb") as f:
                image_bytes = f.read()
            image = Image.open(BytesIO(image_bytes))
            img_io = BytesIO()
            image.save(img_io, 'JPEG')
            img_io.seek(0)
            img_bytes = img_io.read()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + img_bytes + b'\r\n')
            continue

app.run(host='0.0.0.0', debug=False, threaded=True, port=1234) #ssl_context=('./ssl/selfsigned.crt', './ssl/selfsigned.key') for https
