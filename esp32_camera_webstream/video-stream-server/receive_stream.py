import asyncio
import websockets
import sys
from io import BytesIO
from PIL import Image, UnidentifiedImageError
from http.server import BaseHTTPRequestHandler, HTTPServer
import threading

WS_PORT = int(sys.argv[1])
HTTP_PORT = WS_PORT + 1

connected_clients = set()
event_loop = None  # To store the WebSocket event loop


def is_valid_image(image_bytes):
    try:
        Image.open(BytesIO(image_bytes))
        return True
    except UnidentifiedImageError:
        print("Image invalid")
        return False


async def handle_connection(websocket, path):
    connected_clients.add(websocket)
    try:
        while True:
            message = await websocket.recv()
            print(len(message))
            if len(message) > 5000:
                if is_valid_image(message):
                    with open("image.jpg", "wb") as f:
                        f.write(message)
                else:
                    await websocket.send("restart")
    except websockets.exceptions.ConnectionClosed:
        pass
    finally:
        connected_clients.remove(websocket)


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        global event_loop  # Access the shared event loop
        query = self.path.split('?')
        if len(query) > 1:
            query_params = query[1]
            params = dict(param.split('=') for param in query_params.split('&'))
            message = params.get("message", None)
            print(message)
            if message:
                # Schedule the coroutine in the WebSocket event loop
                asyncio.run_coroutine_threadsafe(
                    send_to_clients(message), event_loop
                )
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"Message sent to WebSocket clients")


async def send_to_clients(message):
    for websocket in connected_clients:
        await websocket.send(message)


def start_http_server():
    httpd = HTTPServer(("0.0.0.0", HTTP_PORT), SimpleHTTPRequestHandler)
    print(f"HTTP server running on http://0.0.0.0:{HTTP_PORT}")
    httpd.serve_forever()


async def main():
    global event_loop  # Store the event loop for use in the HTTP server
    event_loop = asyncio.get_event_loop()

    # Start HTTP server in a separate thread
    http_thread = threading.Thread(target=start_http_server, daemon=True)
    http_thread.start()

    # Start WebSocket server
    server = await websockets.serve(handle_connection, '0.0.0.0', WS_PORT)
    print(f"WebSocket server running on ws://0.0.0.0:{WS_PORT}")
    await server.wait_closed()


asyncio.run(main())
