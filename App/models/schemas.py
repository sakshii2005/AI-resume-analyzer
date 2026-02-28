"""
API request/response schemas for the Resume Analyzer.

Using Pydantic ensures type safety, validation, and automatic OpenAPI docs.
"""

from typing import List

from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    """Request body for POST /analyze. Accepts raw resume/text content."""

    text: str = Field(..., min_length=1, description="Raw resume or text content to analyze")


class SentimentResult(BaseModel):
    """Sentiment analysis result from DistilBERT SST-2."""

    label: str = Field(..., description="Sentiment label: positive, neutral, or negative")
    confidence: float = Field(..., ge=0, le=1, description="Confidence score between 0 and 1")


class KeywordItem(BaseModel):
    """Single keyword with frequency and density."""

    keyword: str = Field(..., description="Extracted keyword or phrase")
    frequency: int = Field(..., ge=0, description="Number of occurrences in the text")
    density: float = Field(..., ge=0, le=1, description="Frequency / total word count")


class SuggestionItem(BaseModel):
    """A single rule-based suggestion for improving the resume/text."""

    suggestion: str = Field(..., description="Human-readable suggestion text")


class AnalyzeResponse(BaseModel):
    """Full response for POST /analyze."""

    sentiment: SentimentResult = Field(..., description="Sentiment analysis result")
    detected_tone: str = Field(..., description="Detected tone (e.g. confident, professional)")
    top_keywords: List[KeywordItem] = Field(..., description="Top 5 keywords with frequency and density")
    ats_score: int = Field(..., ge=0, le=100, description="ATS keyword strength score (0-100)")
    suggestions: List[SuggestionItem] = Field(default_factory=list, description="Rule-based improvement suggestions")

    class Config:
        json_schema_extra = {
            "example": {
                "sentiment": {"label": "positive", "confidence": 0.95},
                "detected_tone": "professional",
                "top_keywords": [
                    {"keyword": "python", "frequency": 5, "density": 0.02},
                    {"keyword": "machine learning", "frequency": 3, "density": 0.012},
                ],
                "ats_score": 65,
                "suggestions": [{"suggestion": "Consider adding an objective or summary section."}],
            }
        }
