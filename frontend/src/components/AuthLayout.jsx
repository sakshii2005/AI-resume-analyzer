import { Link } from 'react-router-dom'

export default function AuthLayout({ title, subtitle, children, footerText, footerLinkText, footerLinkTo }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#e0e7ff,_#f8fafc_45%)] px-4 py-10 sm:px-6">
      <div className="mx-auto flex w-full max-w-md flex-col justify-center">
        <Link to="/" className="mb-8 text-center text-2xl font-extrabold tracking-tight text-slate-900">
          Resume<span className="text-primary-600">AI</span>
        </Link>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
          <div className="mt-6">{children}</div>
          <p className="mt-6 text-center text-sm text-slate-600">
            {footerText}{' '}
            <Link to={footerLinkTo} className="font-semibold text-primary-700 hover:text-primary-800">
              {footerLinkText}
            </Link>
          </p>
        </section>
      </div>
    </div>
  )
}
