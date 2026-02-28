/**
 * SentimentCard — Displays sentiment label and confidence progress bar.
 * Supports 3-class: positive, neutral, negative (from twitter-roberta sentiment).
 */
import ProgressBar from './ProgressBar'

export default function SentimentCard({ sentiment }) {
  if (!sentiment) return null

  const label = (sentiment.label || '').toLowerCase()
  const isPositive = label === 'positive'
  const isNegative = label === 'negative'

  const badgeClass = isPositive
    ? 'bg-emerald-50 text-emerald-700'
    : isNegative
      ? 'bg-rose-50 text-rose-700'
      : 'bg-slate-100 text-slate-700'

  const barClass = isPositive
    ? 'bg-emerald-500'
    : isNegative
      ? 'bg-rose-500'
      : 'bg-slate-400'

  const displayLabel = label ? label.charAt(0).toUpperCase() + label.slice(1) : '—'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
        Sentiment
      </h2>
      <div className="flex items-center gap-3 mb-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badgeClass}`}>
          {displayLabel}
        </span>
      </div>
      <ProgressBar
        value={sentiment.confidence}
        max={1}
        label="Confidence"
        valueSuffix="%"
        barClassName={barClass}
      />
    </div>
  )
}
