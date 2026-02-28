import { Link } from 'react-router-dom'
import LandingNavbar from '../components/LandingNavbar'
import FeatureCard from '../components/FeatureCard'

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M5 12.5L9.5 17L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ToneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 12C4 7.6 7.6 4 12 4C16.4 4 20 7.6 20 12" stroke="currentColor" strokeWidth="2" />
      <path d="M8 14C8.8 15.2 10.2 16 12 16C13.8 16 15.2 15.2 16 14" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function BarsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M5 18V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 18V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 3L13.8 8.2L19 10L13.8 11.8L12 17L10.2 11.8L5 10L10.2 8.2L12 3Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe,_#f8fafc_40%)] text-slate-900">
      <LandingNavbar />

      <main>
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-700">ResumeAI</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              AI Resume Intelligence
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Analyze sentiment, tone, ATS keyword strength, and keyword density in seconds. Get clear,
              actionable feedback to make every application stronger.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Get started free
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<CheckIcon />}
              title="ATS-friendly insights"
              description="See how well your resume aligns with common ATS expectations before you apply."
            />
            <FeatureCard
              icon={<ToneIcon />}
              title="Tone & clarity feedback"
              description="Detect passive language and improve confidence, precision, and professional tone."
            />
            <FeatureCard
              icon={<BarsIcon />}
              title="Keyword density"
              description="Track top terms and density to improve relevance for target roles and job posts."
            />
            <FeatureCard
              icon={<SparkIcon />}
              title="Actionable suggestions"
              description="Get practical edits you can apply instantly to strengthen your resume quality."
            />
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">How it works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-primary-700">Step 1</p>
              <h3 className="mt-2 text-lg font-semibold">Paste your resume</h3>
              <p className="mt-2 text-sm text-slate-600">Drop your resume text into the analyzer workspace.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-primary-700">Step 2</p>
              <h3 className="mt-2 text-lg font-semibold">Run AI analysis</h3>
              <p className="mt-2 text-sm text-slate-600">We evaluate sentiment, tone, ATS strength, and keyword usage.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-primary-700">Step 3</p>
              <h3 className="mt-2 text-lg font-semibold">Apply suggestions</h3>
              <p className="mt-2 text-sm text-slate-600">Use personalized recommendations to improve your next application.</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold text-primary-700">Pricing</p>
            <h2 className="mt-2 text-2xl font-bold">Start free. Upgrade when you need more.</h2>
            <p className="mt-3 text-sm text-slate-600">Simple plans for students, job seekers, and teams.</p>
            <Link
              to="/signup"
              className="mt-6 inline-block rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
            >
              Get started
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/80">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-sm text-slate-500 sm:px-6">
          <p>© {new Date().getFullYear()} ResumeAI</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-700">Privacy</a>
            <a href="#" className="hover:text-slate-700">Terms</a>
            <a href="#" className="hover:text-slate-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
