#!/bin/zsh

cd "$(dirname "$0")" || exit 1

npm run dev &
server_pid=$!

for attempt in {1..40}; do
  if curl -fsS http://localhost:3000/ >/dev/null 2>&1; then
    open http://localhost:3000/
    break
  fi
  sleep 0.5
done

wait "$server_pid"
