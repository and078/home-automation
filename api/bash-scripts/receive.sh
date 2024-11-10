#!/bin/bash

SESSION_NAME="python_receive_stream"
PYTHON_SCRIPT="/home/pi_server/repositories/home-automation/esp32_camera_webstream/video-stream-server/receive_stream.py"

tmux new-session -d -s "$SESSION_NAME"

tmux send-keys -t "$SESSION_NAME" "python3 $PYTHON_SCRIPT" C-m

tmux detach -s "$SESSION_NAME"

echo "Tmux session '$SESSION_NAME' created and Python script started in detached mode."