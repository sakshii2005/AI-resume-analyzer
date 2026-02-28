import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import InputField from '../components/InputField'
import { useAuth } from '../auth/AuthContext'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const nextErrors = {}

    if (!values.name.trim()) nextErrors.name = 'Name is required.'

    if (!values.email.trim()) nextErrors.email = 'Email is required.'
    else if (!EMAIL_REGEX.test(values.email)) nextErrors.email = 'Enter a valid email address.'

    if (!values.password) nextErrors.password = 'Password is required.'
    else if (values.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.'

    if (!values.confirmPassword) nextErrors.confirmPassword = 'Please confirm your password.'
    else if (values.confirmPassword !== values.password) nextErrors.confirmPassword = 'Passwords do not match.'

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    signup({ name: values.name.trim(), email: values.email.trim() })
    navigate('/app', { replace: true })
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start using ResumeAI for smarter, faster resume improvements."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkTo="/login"
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <InputField
          id="name"
          label="Full name"
          value={values.name}
          onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
          error={errors.name}
          placeholder="Your name"
          autoComplete="name"
        />
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
          placeholder="At least 8 characters"
          autoComplete="new-password"
        />
        <InputField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          value={values.confirmPassword}
          onChange={(e) => setValues((prev) => ({ ...prev, confirmPassword: e.target.value }))}
          error={errors.confirmPassword}
          placeholder="Re-enter password"
          autoComplete="new-password"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Create account
        </button>
      </form>
    </AuthLayout>
  )
}
