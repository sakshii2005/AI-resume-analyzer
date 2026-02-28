/**
 * KeywordsCard — Top 5 keywords with frequency and density in a clean list.
 */
export default function KeywordsCard({ topKeywords }) {
  if (!topKeywords || !topKeywords.length) return null

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
        Top keywords
      </h2>
      <ul className="space-y-3" role="list">
        {topKeywords.map((item, index) => (
          <li
            key={`${item.keyword}-${index}`}
            className="flex justify-between items-baseline py-2 border-b border-gray-100 last:border-0"
          >
            <span className="font-medium text-gray-800 capitalize">{item.keyword}</span>
            <span className="text-sm text-gray-500">
              {item.frequency} × · {(item.density * 100).toFixed(2)}% density
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
