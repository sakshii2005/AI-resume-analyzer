"""
Keyword extraction from raw text — reusable logic for top-N keywords with frequency and density.

Architecture: Keeps keyword extraction independent of resume parsing. Uses NLTK
for tokenization and stopwords so we don't depend on full pyresparser for
text-only input. Filters: stopwords, tokens < 3 chars, numeric-only tokens.
"""

import re
from collections import Counter
from typing import List, Tuple

# Lazy init for NLTK to avoid import-time download
_nltk_stop = None

# ATS: resume keywords that recruiters/ATS systems often look for (lowercase for matching)
IMPORTANT_KEYWORDS = frozenset([
    "python", "machine", "data", "analysis", "lead", "developed",
    "experience", "project", "team", "management", "communication",
    "javascript", "sql", "api", "design", "implementation", "testing",
])


def _get_stopwords():
    """Load NLTK stopwords once. Ensures en stopwords are available."""
    global _nltk_stop
    if _nltk_stop is None:
        import nltk
        try:
            nltk.data.find("corpora/stopwords")
        except LookupError:
            nltk.download("stopwords", quiet=True)
        _nltk_stop = set(nltk.corpus.stopwords.words("english"))
    return _nltk_stop


def _tokenize(text: str) -> List[str]:
    """
    Normalize and tokenize: lowercase, alphanumeric + hyphen.
    Does NOT filter stopwords/numeric here; callers apply filters.
    """
    text = text.lower().strip()
    tokens = re.findall(r"[a-z0-9]+(?:-[a-z0-9]+)*", text)
    return tokens


def _is_numeric_token(token: str) -> bool:
    """True if token is purely numeric (digits only)."""
    return token.isdigit()


def _filter_tokens_for_keywords(tokens: List[str]) -> List[str]:
    """Remove stopwords, tokens < 3 characters, and numeric-only tokens."""
    stop = _get_stopwords()
    return [
        t for t in tokens
        if len(t) >= 3 and not _is_numeric_token(t) and t not in stop
    ]


def extract_top_keywords(text: str, top_n: int = 5) -> List[Tuple[str, int, float]]:
    """
    Extract top N keywords by frequency and compute density.

    Filters: stopwords removed, tokens < 3 characters removed, numeric-only tokens removed.
    Density = frequency / total_word_count (using all tokens for denominator).

    Args:
        text: Raw input text (e.g. resume content).
        top_n: Number of top keywords to return (default 5).

    Returns:
        List of (keyword, frequency, density) for the top N keywords.
    """
    if not text or not text.strip():
        return []

    tokens = _tokenize(text)
    total = len(tokens)
    if total == 0:
        return []

    filtered = _filter_tokens_for_keywords(tokens)
    counts: Counter = Counter(filtered)

    top = counts.most_common(top_n)
    return [(word, freq, round(freq / total, 4)) for word, freq in top]


def compute_ats_score(text: str, important_keywords: frozenset = IMPORTANT_KEYWORDS) -> int:
    """
    ATS keyword strength score: how many important resume keywords appear in the text.

    score = count of (token in important_keywords)
    ats_score = min(score * 5, 100)

    Args:
        text: Raw resume/text content.
        important_keywords: Set of lowercase keywords to look for (default: IMPORTANT_KEYWORDS).

    Returns:
        Integer 0–100.
    """
    if not text or not text.strip():
        return 0
    tokens = _tokenize(text)
    words = set(tokens)
    score = sum(1 for w in words if w in important_keywords)
    return min(score * 5, 100)
