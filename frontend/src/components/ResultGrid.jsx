/**
 * ResultGrid — Responsive grid wrapper for result cards.
 * 2 columns on desktop, 1 on mobile. Consistent gap and max-width.
 */
export default function ResultGrid({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4 sm:px-6 animate-fade-in">
      {children}
    </div>
  )
}
