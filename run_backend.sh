#!/usr/bin/env bash
# Run FastAPI backend: set PYTHONPATH to project root so 'app' is always found.
ROOT="$(cd "$(dirname "$0")" && pwd)"
export PYTHONPATH="$ROOT${PYTHONPATH:+:$PYTHONPATH}"
cd "$ROOT"
exec uvicorn app.main:app --reload
