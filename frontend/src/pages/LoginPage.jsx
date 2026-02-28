import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import InputField from '../components/InputField'
import { useAuth } from '../auth/AuthContext'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const targetPath = location.state?.from?.pathname || '/app'

  const validate = () => {
    const nextErrors = {}

    if (!values.email.trim()) nextErrors.email = 'Email is required.'
    else if (!EMAIL_REGEX.test(values.email)) nextErrors.email = 'Enter a valid email address.'

    if (!values.password.trim()) nextErrors.password = 'Password is required.'

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    login({ email: values.email.trim() })
    navigate(targetPath, { replace: true })
  }

  return (
    <AuthLayout
      title="Sign in to ResumeAI"
      subtitle="Welcome back. Continue improving your resume with AI insights."
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkTo="/signup"
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <InputField
          id="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))}
          error={errors.password}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <div className="flex items-center justify-end">
          <Link to="#" className="text-sm font-medium text-primary-700 hover:text-primary-800">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Sign in
        </button>
      </form>
    </AuthLayout>
  )
}
