function formatPrice(price) {
  const num = parseFloat(price);

  return `₹${num.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
}

export default function HotelCard({ hotel, onOpen }) {
  return (
    <article
      className="ticket"
      onClick={() => onOpen(hotel)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ")
          onOpen(hotel);
      }}
      aria-label={`View details for ${hotel.name}`}
    >
      <div className="ticket__photo">
        <img
          src={hotel.thumbnail}
          alt={hotel.name}
          loading="lazy"
        />

        <span className="ticket__rating">
          ⭐ {hotel.rating.toFixed(1)}
        </span>

        <div className="ticket__overlay">
          <button className="ticket__viewBtn">
            View Details →
          </button>
        </div>
      </div>

      <div className="ticket__stub">

        <span className="ticket__location">
          📍 {hotel.location}
        </span>

        <h3 className="ticket__name">
          {hotel.name}
        </h3>

        <div className="ticket__footer">

          <div>

            <div className="ticket__price">
              {formatPrice(hotel.price)}
            </div>

            <div className="ticket__night">
              Per Night
            </div>

          </div>

          <div className="ticket__hotelId">
            #{String(hotel.id).padStart(4, "0")}
          </div>

        </div>

      </div>
    </article>
  );
}