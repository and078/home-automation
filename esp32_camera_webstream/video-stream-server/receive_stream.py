import asyncio
from io import BytesIO
import websockets
import sys
import os
from PIL import Image, UnidentifiedImageError
from http.server import BaseHTTPRequestHandler, HTTPServer
import threading
import time

image_name = f"{sys.argv[1]}.jpg"
image_path = os.path.join(os.getcwd(), image_name)
placeholder_image_path = os.path.join(os.getcwd(), f"placeholder_{image_name}")

WS_PORT = int(sys.argv[1])
HTTP_PORT = WS_PORT + 1

websocket = None
event_loop = None

def is_valid_image(image_bytes):
     try:
         Image.open(BytesIO(image_bytes))
         return True
     except UnidentifiedImageError:
         print("image invalid")
         return False

if not os.path.exists(image_path):
    image = Image.new(mode="RGB", size=(640, 480), color="black")
    image.save(image_path)

if not os.path.exists(placeholder_image_path):
    image = Image.new(mode="RGB", size=(640, 480), color="black")
    image.save(placeholder_image_path)

async def handle_connection(ws):
    try:
        while True:
            time.sleep(0.02)
            message = await ws.recv()
            print(len(message))
            if len(message) > 5000:
                 if is_valid_image(message):
                    with open(image_path, "wb") as f:
                        f.write(message)
    except websockets.exceptions.ConnectionClosed:
        print('websockets.exceptions.ConnectionClosed')


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        global event_loop
        query = self.path.split('?')
        if len(query) > 1:
            query_params = query[1]
            params = dict(param.split('=') for param in query_params.split('&'))
            message = params.get("message", None)
            print(message)
            if message:
                asyncio.run_coroutine_threadsafe(
                    send_to_clients(message), event_loop
                )
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"Message sent to WebSocket clients")


async def send_to_clients(message):
    await websocket.send(message)


def start_http_server():
    httpd = HTTPServer(("0.0.0.0", HTTP_PORT), SimpleHTTPRequestHandler)
    print(f"HTTP server running on http://0.0.0.0:{HTTP_PORT}")
    httpd.serve_forever()


async def main():
    global event_loop
    event_loop = asyncio.get_event_loop()

    http_thread = threading.Thread(target=start_http_server, daemon=True)
    http_thread.start()

    server = await websockets.serve(handle_connection, '0.0.0.0', WS_PORT)
    print(f"WebSocket server running on ws://0.0.0.0:{WS_PORT}")
    await server.wait_closed()


asyncio.run(main())