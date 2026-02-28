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
      <h1 className="text-xl font-semibold tracking-tight">
  Resume<span className="text-indigo-600">AI</span>
</h1>
<p className="text-xs text-slate-500">
  AI-powered resume intelligence
</p>
      </div>
    </header>
  )
}
