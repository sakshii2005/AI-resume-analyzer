import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md" role="banner">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Resume<span className="text-primary-600">AI</span>
          </h1>
          <p className="text-xs text-slate-500">AI-powered resume intelligence</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-slate-600 sm:inline">
            {user?.name ? `Hi, ${user.name}` : user?.email}
          </span>
          <Link
            to="/"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Home
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
