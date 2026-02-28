/**
 * ATSCard — ATS keyword strength score (0–100) with visual progress bar.
 */
import ProgressBar from './ProgressBar'

export default function ATSCard({ atsScore }) {
  if (atsScore === undefined || atsScore === null) return null

  const score = Number(atsScore)
  const barColor = score >= 70 ? 'bg-emerald-500' : score >= 40 ? 'bg-primary-500' : 'bg-amber-500'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
        ATS keyword strength
      </h2>
      <ProgressBar
        value={score}
        max={100}
        label="Score"
        valueSuffix=""
        barClassName={barColor}
      />
      <p className="text-xs text-gray-500 mt-2">
        Based on how many important resume keywords appear in your text.
      </p>
    </div>
  )
}
