const SORT_OPTIONS = [
  { value: "-rating", label: "Rating: High to Low" },
  { value: "rating", label: "Rating: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "price", label: "Price: Low to High" },
  { value: "name", label: "Name: A-Z" },
];

export default function SearchPanel({
  filters,
  setFilters,
  resetFilters,
  locations,
  resultCount,
}) {
  return (
    <section className="search-panel">

      <div className="search-header">

        <div>
          <h2>Find Your Perfect Stay</h2>

          <p>
            Search hotels, compare prices and book your dream destination.
          </p>
        </div>

        <div className="result-box">

          <span>{resultCount}</span>

          Hotels Found

        </div>

      </div>

      <div className="search-panel__row">

        <div className="field field--grow">

          <label>Destination / Hotel</label>

          <input
            type="text"
            placeholder="Search hotels or cities..."
            value={filters.search}
            onChange={(e) =>
              setFilters({
                search: e.target.value,
              })
            }
          />

        </div>

        <div className="field">

          <label>City</label>

          <select
            value={filters.location}
            onChange={(e) =>
              setFilters({
                location: e.target.value,
              })
            }
          >
            <option value="">All Cities</option>

            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

        </div>

      </div>

      <div className="search-panel__row">

        <div className="field">

          <label>Min Price</label>

          <input
            type="number"
            min="0"
            placeholder="₹1000"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({
                minPrice: e.target.value,
              })
            }
          />

        </div>

        <div className="field">

          <label>Max Price</label>

          <input
            type="number"
            min="0"
            placeholder="₹10000"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({
                maxPrice: e.target.value,
              })
            }
          />

        </div>

        <div className="field">

          <label>Rating</label>

          <select
            value={filters.minRating}
            onChange={(e) =>
              setFilters({
                minRating: e.target.value,
              })
            }
          >
            <option value="">Any Rating</option>

            {[4.5, 4, 3.5, 3, 2.5, 2].map((r) => (
              <option key={r} value={r}>
                ⭐ {r}+ Stars
              </option>
            ))}
          </select>

        </div>

        <div className="field">

          <label>Sort</label>

          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilters({
                sortBy: e.target.value,
              })
            }
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

        </div>

        <button
          className="btn btn--ghost"
          onClick={resetFilters}
        >
          Reset Filters
        </button>

      </div>

    </section>
  );
}