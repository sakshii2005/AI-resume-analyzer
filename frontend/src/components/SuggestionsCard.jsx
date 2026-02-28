/**
 * SuggestionsCard — Bullet list of improvement suggestions from the API.
 */
export default function SuggestionsCard({ suggestions }) {
  if (!suggestions || !suggestions.length) return null

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md md:col-span-2">
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
        Suggestions
      </h2>
      <ul className="space-y-2" role="list">
        {suggestions.map((item, index) => (
          <li
            key={`suggestion-${index}`}
            className="flex gap-3 text-gray-700"
          >
            <span className="text-primary-500 mt-0.5 shrink-0" aria-hidden>•</span>
            <span>{item.suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
