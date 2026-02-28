import Navbar from '../components/Navbar'
import Dashboard from './Dashboard'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white/80" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <p className="text-center text-sm text-slate-500">© {year} ResumeAI. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function AnalyzerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-100 to-indigo-100">
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  )
}
