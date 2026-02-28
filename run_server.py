#!/usr/bin/env python3
"""
Run the FastAPI server from any directory by adding the project root to sys.path.
Usage: python run_server.py   (or from project root: python run_server.py)
"""
import sys
from pathlib import Path

# Project root = directory containing this script
ROOT = Path(__file__).resolve().parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import uvicorn

if __name__ == "__main__":
    # Use "App" (capital A) to match the folder name on disk
uvicorn.run("App.main:app", host="0.0.0.0", port=8000, reload=True)
