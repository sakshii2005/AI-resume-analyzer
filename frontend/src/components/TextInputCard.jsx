/**
 * TextInputCard — Main input area for resume/LinkedIn text.
 * Triggers analyze on submit; loading and disabled state from parent.
 */
export default function TextInputCard({
  value,
  onChange,
  onAnalyze,
  isLoading,
  placeholder = 'Paste your resume or LinkedIn summary here...',
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
      <label htmlFor="resume-text" className="block text-sm font-medium text-gray-700 mb-2">
        Resume or profile text
      </label>
      <textarea
        id="resume-text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={8}
        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow resize-y min-h-[160px]"
        disabled={isLoading}
        aria-describedby="analyze-hint"
      />
      <p id="analyze-hint" className="text-xs text-gray-500 mt-2">
        Your text is sent to the analyzer only when you click Analyze. It is not stored.
      </p>
      <button
        type="button"
        onClick={onAnalyze}
        disabled={isLoading || !value.trim()}
        className="mt-4 w-full sm:w-auto px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Analyzing…' : 'Analyze'}
      </button>
    </div>
  )
}
