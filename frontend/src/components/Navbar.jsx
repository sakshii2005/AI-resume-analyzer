/**
 * Navbar — Centered app branding for the dashboard.
 * Minimal, accessible header with app name.
 */
export default function Navbar() {
  return (
    <header
      className="bg-white border-b border-gray-200 shadow-sm"
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800 text-center">
          Resume Analyzer
        </h1>
        <p className="text-sm text-gray-500 text-center mt-0.5">
          AI-powered resume insights
        </p>
      </div>
    </header>
  )
}
