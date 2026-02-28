# AI Resume Analyzer — FastAPI API

## Folder structure

```
AI-Resume-Analyzer/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app, CORS, router registration
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py       # Pydantic request/response models
│   ├── routers/
│   │   ├── __init__.py
│   │   └── analyze.py      # POST /analyze
│   └── services/
│       ├── __init__.py
│       ├── resume_parser_service.py   # Wraps pyresparser (file-based)
│       ├── keyword_service.py         # Top-N keywords + density (NLTK)
│       ├── nlp_service.py             # Sentiment + tone (HuggingFace)
│       └── suggestions_service.py     # Rule-based suggestions
├── pyresparser/            # Existing resume parser (unchanged)
├── requirements.txt
└── API_README.md
```

## Run the server

**Easiest:** Run the Python launcher from the project root (works from any directory):

```bash
cd /Users/sakshi/Desktop/AI-Resume-Analyzer
source venv/bin/activate   # Windows: venv\Scripts\activate
python run_server.py
```

**Or** use uvicorn with the correct module name. Your FastAPI code lives in the `App` folder (capital A), so use:

```bash
cd /Users/sakshi/Desktop/AI-Resume-Analyzer
source venv/bin/activate
pip install -r requirements.txt
python -c "import nltk; nltk.download('stopwords')"   # first run only

# Use capital A to match the folder name
uvicorn App.main:app --reload
```

**Or** set PYTHONPATH and use lowercase (on case-insensitive macOS this can resolve to `App`):

```bash
cd /Users/sakshi/Desktop/AI-Resume-Analyzer
source venv/bin/activate
PYTHONPATH=. uvicorn App.main:app --reload
```

Server runs at **http://127.0.0.1:8000**. Docs: **http://127.0.0.1:8000/docs**.

### Troubleshooting: `No module named 'app'`

Your API code is in the **`App`** folder (capital A). Use one of these:

**Option 1 — Python launcher (recommended, works from any directory):**
```bash
cd /Users/sakshi/Desktop/AI-Resume-Analyzer
source venv/bin/activate
python run_server.py
```

**Option 2 — Uvicorn with capital `App`:**
```bash
cd /Users/sakshi/Desktop/AI-Resume-Analyzer
source venv/bin/activate
uvicorn App.main:app --reload
```

**Option 3 — Windows:**
```cmd
cd C:\Users\sakshi\Desktop\AI-Resume-Analyzer
venv\Scripts\activate
python run_server.py
```

## POST /analyze

- **Request body:** `{ "text": "Your resume or any text here..." }`
- **Response:**
  - `sentiment`: `{ "label": "positive"|"neutral"|"negative", "confidence": 0.99 }`
  - `detected_tone`: one of `confident`, `passive`, `weak`, `professional`
  - `top_keywords`: top 5 keywords with `keyword`, `frequency`, `density` (stopwords, &lt;3 chars, numeric tokens removed)
  - `ats_score`: 0–100 ATS keyword strength score (`min(matches × 5, 100)`)
  - `suggestions`: list of `{ "suggestion": "..." }`

NLP models are preloaded at server startup so the first request does not lag.

Example:

```bash
curl -X POST http://127.0.0.1:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Experienced software engineer with Python and machine learning. Led teams and delivered projects."}'
```

## GET /health

Returns `{"status": "ok"}` for liveness checks.
