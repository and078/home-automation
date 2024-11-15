import asyncio
import websockets
import sys
from io import BytesIO

from PIL import Image, UnidentifiedImageError

PORT = int(sys.argv[1])


def is_valid_image(image_bytes):
    try:
        Image.open(BytesIO(image_bytes))
        return True
    except UnidentifiedImageError:
        print("image invalid")
        return False

async def handle_connection(websocket, path):
    while True:
        try:
            message = await websocket.recv()
            # print(websocket.remote_address)
            print(len(message))
            if len(message) > 5000:
                    if is_valid_image(message):
                        #print(message)
                        with open("image.jpg", "wb") as f:
                            f.write(message)
                    else:
                        await websocket.send("restart")
        except websockets.exceptions.ConnectionClosed:
            break

async def main():
    server = await websockets.serve(handle_connection, '0.0.0.0', PORT)
    await server.wait_closed()

asyncio.run(main())
