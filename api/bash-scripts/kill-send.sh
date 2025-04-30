#!/bin/bash

SESSION_NAME="python_send_stream_$1"

if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
  tmux kill-session -t "$SESSION_NAME"
  echo "Tmux session '$SESSION_NAME' has been stopped."
else
  echo "Tmux session '$SESSION_NAME' does not exist."
fi