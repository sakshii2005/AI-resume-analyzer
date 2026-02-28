/**
 * ProgressBar — Reusable progress indicator (0–100 or 0–1).
 * Used for confidence and ATS score. Accessible with aria attributes.
 */
export default function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  valueSuffix = '%',
  barClassName = 'bg-primary-500',
}) {
  const normalized = max <= 1 ? Math.round(value * 100) : Math.min(Math.round(Number(value)), max)
  const percent = max <= 1 ? value * 100 : (normalized / max) * 100

  return (
    <div className="w-full" role="progressbar" aria-valuenow={normalized} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        {label && <span>{label}</span>}
        {showValue && (
          <span className="font-medium text-gray-800">
            {normalized}{valueSuffix}
          </span>
        )}
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barClassName}`}
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
    </div>
  )
}
