"""
NLP features via HuggingFace transformers: sentiment and tone detection.

Architecture: Single module for all transformer-based analysis so we can
reuse loaded models and avoid loading twice. Uses pipelines for simplicity.
- Sentiment: cardiffnlp/twitter-roberta-base-sentiment (3-class: negative, neutral, positive).
- Tone: zero-shot classification with labels confident, passive, weak, professional.
"""

from typing import Tuple

# Model names — centralised for easy tuning
SENTIMENT_MODEL = "cardiffnlp/twitter-roberta-base-sentiment"
# Cardiff model outputs LABEL_0, LABEL_1, LABEL_2 → map to readable labels
SENTIMENT_LABEL_MAP = {"LABEL_0": "negative", "LABEL_1": "neutral", "LABEL_2": "positive"}
TONE_LABELS = ["confident", "passive", "weak", "professional"]

_sentiment_pipeline = None
_tone_pipeline = None


def preload_models() -> None:
    """
    Load both NLP models at startup so the first request does not lag.
    Call this from FastAPI lifespan/startup so the server is ready before accepting traffic.
    """
    _get_sentiment_pipeline()
    _get_tone_pipeline()


def _get_sentiment_pipeline():
    """Lazy-load 3-class sentiment pipeline (negative, neutral, positive)."""
    global _sentiment_pipeline
    if _sentiment_pipeline is None:
        from transformers import pipeline
        _sentiment_pipeline = pipeline(
            "sentiment-analysis",
            model=SENTIMENT_MODEL,
        )
    return _sentiment_pipeline


def _get_tone_pipeline():
    """Lazy-load zero-shot pipeline for tone (DistilBERT NLI for smaller footprint)."""
    global _tone_pipeline
    if _tone_pipeline is None:
        from transformers import pipeline
        _tone_pipeline = pipeline(
            "zero-shot-classification",
            model="typeform/distilbert-base-uncased-mnli",
        )
    return _tone_pipeline


def get_sentiment(text: str) -> Tuple[str, float]:
    """
    Run sentiment analysis on the given text (3-class: negative, neutral, positive).

    Args:
        text: Input text (truncated internally if very long to avoid token limit).

    Returns:
        (label, confidence) e.g. ("positive", 0.92). Label is negative, neutral, or positive.
    """
    max_len = 512
    if len(text) > max_len * 4:
        text = text[: max_len * 4]
    pipe = _get_sentiment_pipeline()
    out = pipe(text, truncation=True, max_length=max_len)
    if not out:
        return "neutral", 0.5
    item = out[0]
    raw_label = item["label"]
    score = float(item["score"])
    # Map LABEL_0 → negative, LABEL_1 → neutral, LABEL_2 → positive
    label = SENTIMENT_LABEL_MAP.get(raw_label, "neutral")
    return label, score


def get_tone(text: str) -> str:
    """
    Detect tone of the text using zero-shot classification.

    Args:
        text: Input text (truncated if very long).

    Returns:
        One of: confident, passive, weak, professional (whichever score is highest).
    """
    max_len = 512
    if len(text) > max_len * 4:
        text = text[: max_len * 4]
    pipe = _get_tone_pipeline()
    out = pipe(text, candidate_labels=TONE_LABELS, truncation=True, max_length=max_len)
    if not out or not out.get("labels"):
        return "professional"
    return out["labels"][0]
