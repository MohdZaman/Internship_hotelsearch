export default function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null

  const pages = []
  const windowSize = 1
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= windowSize) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…')
    }
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="pagination__btn"
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        ← Prev
      </button>

      <div className="pagination__pages">
        {pages.map((p, idx) =>
          p === '…' ? (
            <span key={`ellipsis-${idx}`} className="pagination__ellipsis">…</span>
          ) : (
            <button
              type="button"
              key={p}
              className={`pagination__page ${p === page ? 'is-active' : ''}`}
              onClick={() => setPage(p)}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        className="pagination__btn"
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        Next →
      </button>
    </nav>
  )
}
