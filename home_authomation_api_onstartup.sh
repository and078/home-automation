#!/bin/bash

SESSION_NAME="home-automation-api"
PATH_TO_SCRIPT="/home/pi_server/repositories/home-automation/api/"

sudo tmux new-session -d -s "$SESSION_NAME"

sudo tmux send-keys -t "$SESSION_NAME" "cd $PATH_TO_SCRIPT && npm run dev" C-m

sudo tmux detach -s "$SESSION_NAME"

echo "Tmux session '$SESSION_NAME' created and nodejs express script started in detached m:ode."
