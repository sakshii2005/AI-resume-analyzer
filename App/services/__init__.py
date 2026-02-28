"""
Business logic and external integrations.

- resume_parser_service: Wraps pyresparser for file-based resume parsing.
- keyword_service: Keyword extraction from raw text (frequency, density).
- nlp_service: Sentiment and tone detection via HuggingFace.
- suggestions_service: Rule-based suggestions from sentiment, tone, word count.
"""

from App.services.resume_parser_service import parse_resume_file
from App.services.keyword_service import compute_ats_score, extract_top_keywords
from App.services.nlp_service import get_sentiment, get_tone, preload_models
from App.services.suggestions_service import get_suggestions

__all__ = [
    "parse_resume_file",
    "extract_top_keywords",
    "compute_ats_score",
    "get_sentiment",
    "get_tone",
    "preload_models",
    "get_suggestions",
]
