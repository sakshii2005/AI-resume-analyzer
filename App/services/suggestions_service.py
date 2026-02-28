"""
Rule-based suggestions derived from sentiment, tone, and word count.

Architecture: Keeps suggestion logic in one place so we can tune rules without
touching routers or NLP. Uses sentiment confidence (data-aware) instead of
label-only rules: low confidence → suggest clearer achievements.
"""

from typing import List

from App.models.schemas import SuggestionItem


def get_suggestions(
    sentiment_label: str,
    sentiment_confidence: float,
    tone: str,
    word_count: int,
) -> List[SuggestionItem]:
    """
    Build a list of suggestions based on sentiment, confidence, tone, and word count.

    Args:
        sentiment_label: From sentiment model (positive, negative, or neutral).
        sentiment_confidence: Model confidence in the sentiment (0–1). Low = unclear tone.
        tone: Detected tone (confident, passive, weak, professional).
        word_count: Total word count of the analyzed text.

    Returns:
        List of SuggestionItem with human-readable suggestion strings.
    """
    suggestions: List[str] = []

    # Word count rules (resume-length heuristics)
    if word_count < 50:
        suggestions.append("Add more content: aim for at least 200–400 words for a resume.")
    elif word_count > 800:
        suggestions.append("Consider shortening to 1–2 pages; recruiters often skim briefly.")

    # Confidence-based: low confidence means the model is unsure — suggest clearer achievements
    if sentiment_confidence < 0.7:
        suggestions.append("Use clearer, achievement-focused language so your strengths come across more clearly.")

    # Sentiment-based: negative tone may put off recruiters
    if sentiment_label.lower() == "negative":
        suggestions.append("Tone may read negatively; use more positive, achievement-focused language.")

    # Tone-based
    if tone == "weak":
        suggestions.append("Use stronger action verbs and quantifiable achievements to sound more confident.")
    if tone == "passive":
        suggestions.append("Prefer active voice (e.g. 'Led a team' instead of 'Was part of a team').")
    if tone == "professional":
        suggestions.append("Tone is professional; keep consistency across all sections.")

    # Default if nothing else suggested
    if not suggestions:
        suggestions.append("Overall structure and tone look good; consider adding metrics or keywords for ATS.")

    return [SuggestionItem(suggestion=s) for s in suggestions]
