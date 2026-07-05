export default function LoadingState() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <svg viewBox="0 0 60 60" width="48" height="48" className="loading-state__compass">
        <circle cx="30" cy="30" r="26" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M30 12 L34 30 L30 33 L26 30 Z" fill="currentColor" />
      </svg>
      <p>Charting your stays…</p>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <p className="error-state__title">We couldn't load hotels.</p>
      <p className="error-state__message">{message}</p>
      <button type="button" className="btn" onClick={onRetry}>
        Try again
      </button>
    </div>
  )
}
