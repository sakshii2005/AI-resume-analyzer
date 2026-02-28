"""
Resume parsing service — wraps pyresparser for file-based extraction.

Architecture: We keep the existing pyresparser dependency and do not rewrite
parsing logic. This service is the single place that calls the parser, so
we can swap the implementation later if needed. For raw-text-only analysis
(POST /analyze), we use keyword_service and nlp_service; this service is
used when analyzing uploaded PDF/DOCX files (e.g. a future /parse endpoint).
"""

import io
from pathlib import Path
from typing import Any, Dict, Union


def parse_resume_file(resume: Union[str, Path, io.BytesIO]) -> Dict[str, Any]:
    """
    Parse a resume file and return structured data (name, email, skills, etc.).

    Args:
        resume: File path (str or Path) or BytesIO of the resume (PDF/DOCX).

    Returns:
        Dict with keys: name, email, mobile_number, skills, degree, no_of_pages.
        Values may be None if extraction fails for that field.

    Raises:
        FileNotFoundError: If resume is a path and file does not exist.
        Exception: Any error raised by pyresparser (e.g. unsupported format).
    """
    from pyresparser import ResumeParser

    if isinstance(resume, (str, Path)):
        path = Path(resume)
        if not path.exists():
            raise FileNotFoundError(f"Resume file not found: {resume}")
        resume = str(path)

    parser = ResumeParser(resume)
    return parser.get_extracted_data()
