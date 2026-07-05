import HotelCard from "./HotelCard";

export default function HotelGrid({ hotels, onOpen }) {

  if (hotels.length === 0) {
    return (
      <div className="empty-state">

        <svg
          viewBox="0 0 64 64"
          width="70"
          height="70"
          aria-hidden="true"
        >
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />

          <path
            d="M32 10 L36 30 L32 33 L28 30 Z"
            fill="currentColor"
          />

          <path
            d="M10 32 L30 28 L33 32 L30 36 Z"
            fill="currentColor"
            opacity=".5"
          />

          <path
            d="M32 54 L28 34 L32 31 L36 34 Z"
            fill="currentColor"
            opacity=".5"
          />

          <path
            d="M54 32 L34 36 L31 32 L34 28 Z"
            fill="currentColor"
            opacity=".5"
          />
        </svg>

        <h3>No Hotels Found</h3>

        <p>
          Try changing your filters or searching another destination.
        </p>

      </div>
    );
  }

  return (
    <section className="hotel-section">

      <div className="hotel-section__header">

        <div>

          <h2>Popular Hotels</h2>

          <p>
            Explore the best hotels carefully selected for you.
          </p>

        </div>

      </div>

      <div className="hotel-grid">

        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            onOpen={onOpen}
          />
        ))}

      </div>

    </section>
  );
}