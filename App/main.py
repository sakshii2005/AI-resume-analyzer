"""
FastAPI application entrypoint for the AI Resume Analyzer API.

Architecture:
- Routers live under app.routers and are included here.
- CORS is enabled for future React (or any frontend) integration.
- NLP models are preloaded at startup so the first request does not lag.
- Run with: uvicorn app.main:app --reload
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from App.routers import analyze
from App.services.nlp_service import preload_models


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load NLP models at startup so first /analyze request is fast."""
    preload_models()
    yield


app = FastAPI(
    title="AI Resume Analyzer API",
    description="Analyze resume text: sentiment, tone, keywords, ATS score, and suggestions.",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS for React or other frontends calling from a different origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router)


@app.get("/health")
def health():
    """Simple health check for load balancers and monitoring."""
    return {"status": "ok"}
