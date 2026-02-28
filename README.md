# 🚀 AI Resume Analyzer

A full-stack **AI-powered Resume Intelligence Platform** that analyzes resume or LinkedIn text using modern NLP techniques and visualizes results through a professional SaaS-style dashboard.

Built with **FastAPI**, **HuggingFace Transformers**, **React (Vite)**, and **TailwindCSS**.

---

## 🧠 Features

- 📊 Sentiment Analysis (positive / neutral / negative)
- 🎯 Tone Detection (confident / passive / weak / professional)
- 🔑 Top Keyword Extraction
- 🏆 ATS Keyword Strength Score (0–100)
- 💡 Actionable Improvement Suggestions
- ⚡ Model preloading (no cold-start lag)
- 📱 Responsive SaaS-style dashboard UI

---

## 🏗 Architecture

```
React Dashboard (Vite + Tailwind)
            ↓
        Axios API Call
            ↓
        FastAPI Backend
            ↓
   HuggingFace Transformers
            ↓
 Sentiment + Tone + ATS Scoring
```

---

## 📂 Project Structure

```
AI-Resume-Analyzer/
├── App/                     # FastAPI backend
│   ├── main.py
│   ├── models/
│   ├── routers/
│   └── services/
│
├── frontend/                # React dashboard
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── requirements.txt
├── run_server.py
└── README.md
```

---

## ⚙️ Running Locally

### 1️⃣ Backend Setup

```bash
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn App.main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

API documentation:

```
http://127.0.0.1:8000/docs
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔌 API Overview

### POST `/analyze`

**Request**

```json
{
  "text": "Your resume text here..."
}
```

**Response**

```json
{
  "sentiment": {
    "label": "positive | neutral | negative",
    "confidence": 0.95
  },
  "detected_tone": "confident | passive | weak | professional",
  "ats_score": 75,
  "top_keywords": [
    {
      "keyword": "python",
      "frequency": 3,
      "density": 0.12
    }
  ],
  "suggestions": [
    {
      "suggestion": "Use stronger action verbs."
    }
  ]
}
```

---

## 🧪 Tech Stack

### Backend
- FastAPI
- Pydantic
- HuggingFace Transformers
- Zero-shot classification
- Modular service architecture

### Frontend
- React 18 (Vite)
- TailwindCSS
- Axios
- Component-based architecture

---

