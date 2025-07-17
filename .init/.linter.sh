#!/bin/bash
cd /home/kavia/workspace/code-generation/equity-watchlist-tracker-8a5e2596/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

