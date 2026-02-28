/**
 * ToneCard — Displays detected tone (confident, passive, weak, professional).
 * Single value with subtle badge styling.
 */
export default function ToneCard({ tone }) {
  if (!tone) return null

  const toneStyles = {
    confident: 'bg-primary-50 text-primary-700 border-primary-100',
    professional: 'bg-slate-50 text-slate-700 border-slate-200',
    passive: 'bg-amber-50 text-amber-700 border-amber-200',
    weak: 'bg-rose-50 text-rose-700 border-rose-200',
  }
  const style = toneStyles[tone.toLowerCase()] || toneStyles.professional

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
        Detected tone
      </h2>
      <span
        className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border ${style}`}
      >
        {tone}
      </span>
    </div>
  )
}
