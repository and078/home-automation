#!/bin/bash

SESSION_NAME="python_send_stream_$1"
PATH_TO_VENV="/home/pi_server/repositories/home-automation/esp32_camera_webstream/video-stream-server/local_venv"
PYTHON_SCRIPT="/home/pi_server/repositories/home-automation/esp32_camera_webstream/video-stream-server/send_image_stream.py"

tmux new-session -d -s "$SESSION_NAME"

tmux send-keys -t "$SESSION_NAME" "source $PATH_TO_VENV/bin/activate" C-m
tmux send-keys -t "$SESSION_NAME" "python3 $PYTHON_SCRIPT $1" C-m

tmux detach -s "$SESSION_NAME"

echo "Tmux session '$SESSION_NAME' created and Python script started in detached mode."