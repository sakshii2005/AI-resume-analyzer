/**
 * Dashboard - Main page: text input, analyze action, and result cards.
 * Manages loading state, API errors, and passes data to presentational components.
 */
import { useState } from 'react'
import axios from 'axios'
import TextInputCard from '../components/TextInputCard'
import ResultGrid from '../components/ResultGrid'
import SentimentCard from '../components/SentimentCard'
import ToneCard from '../components/ToneCard'
import ATSCard from '../components/ATSCard'
import KeywordsCard from '../components/KeywordsCard'
import SuggestionsCard from '../components/SuggestionsCard'

const API_BASE = 'http://127.0.0.1:8000'

export default function Dashboard() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalyze = async () => {
    if (!text.trim() || loading) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const { data } = await axios.post(`${API_BASE}/analyze`, { text: text.trim() })
      setResult(data)
    } catch (err) {
      const message = err.response?.data?.detail
        ? (Array.isArray(err.response.data.detail)
          ? err.response.data.detail.map((d) => d.msg || d).join(', ')
          : err.response.data.detail)
        : err.message || 'Analysis failed. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">AI Resume Intelligence</h1>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Get instant insights into sentiment, tone, ATS strength, and keyword density -
            powered by transformer-based NLP models.
          </p>
        </div>

        <section className="mb-10">
          <TextInputCard
            value={text}
            onChange={setText}
            onAnalyze={handleAnalyze}
            isLoading={loading}
          />
        </section>

        {error && (
          <div
            className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-10 h-10 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"
                aria-hidden
              />
              <p className="text-sm text-gray-600">Analyzing your resume...</p>
            </div>
          </div>
        )}

        {!loading && result && (
          <section aria-label="Analysis results">
            <ResultGrid>
              <SentimentCard sentiment={result.sentiment} />
              <ToneCard tone={result.detected_tone} />
              <ATSCard atsScore={result.ats_score} />
              <KeywordsCard topKeywords={result.top_keywords} />
              <SuggestionsCard suggestions={result.suggestions} />
            </ResultGrid>
          </section>
        )}

        {!loading && !result && !error && (
          <div className="text-center py-12 px-4">
            <p className="text-gray-500 text-sm">
              Paste your resume above and click Analyze to generate insights.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
