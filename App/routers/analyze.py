"""
POST /analyze: accept raw text and return sentiment, tone, keywords, and suggestions.

This is the main analysis endpoint. It does not use file upload; it accepts
a JSON body with a single "text" field and returns structured analytics
for use by a frontend (e.g. React) or other clients.
"""

from typing import List

from fastapi import APIRouter, HTTPException

from App.models.schemas import (
    AnalyzeRequest,
    AnalyzeResponse,
    KeywordItem,
    SentimentResult,
    SuggestionItem,
)
from App.services.keyword_service import compute_ats_score, extract_top_keywords
from App.services.nlp_service import get_sentiment, get_tone
from App.services.suggestions_service import get_suggestions

router = APIRouter(tags=["analysis"])


@router.post("/analyze", response_model=AnalyzeResponse)
def analyze_text(request: AnalyzeRequest) -> AnalyzeResponse:
    """
    Analyze raw text (e.g. resume content).

    Returns sentiment (label + confidence), detected tone, top 5 keywords with
    frequency and density, and rule-based suggestions.
    """
    text = request.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text must not be empty.")

    # Sentiment (DistilBERT SST-2)
    sentiment_label, sentiment_confidence = get_sentiment(text)
    sentiment_result = SentimentResult(label=sentiment_label, confidence=round(sentiment_confidence, 4))

    # Tone (zero-shot)
    detected_tone = get_tone(text)

    # Top 5 keywords with frequency and density
    keyword_tuples = extract_top_keywords(text, top_n=5)
    top_keywords = [
        KeywordItem(keyword=k, frequency=freq, density=density)
        for k, freq, density in keyword_tuples
    ]

    # ATS keyword strength score (0–100)
    ats_score = compute_ats_score(text)

    # Rule-based suggestions from sentiment, confidence, tone, word count
    word_count = len(text.split())
    suggestions: List[SuggestionItem] = get_suggestions(
        sentiment_label, sentiment_confidence, detected_tone, word_count
    )

    return AnalyzeResponse(
        sentiment=sentiment_result,
        detected_tone=detected_tone,
        top_keywords=top_keywords,
        ats_score=ats_score,
        suggestions=suggestions,
    )
