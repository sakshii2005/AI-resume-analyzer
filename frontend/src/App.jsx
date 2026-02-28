/**
 * App — Root layout: Navbar, main content area, Footer.
 * Wraps the dashboard in a consistent SaaS-style layout.
 */
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <p className="text-center text-sm text-gray-500">
          © {year} Resume Analyzer. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  )
}
