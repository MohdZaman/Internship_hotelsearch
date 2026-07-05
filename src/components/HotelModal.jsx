import { useState, useEffect, useCallback } from "react";

function formatPrice(price) {
  const num = parseFloat(price);

  return `₹${num.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
}

export default function HotelModal({ hotel, onClose }) {
  const [photoIndex, setPhotoIndex] = useState(0);

  const photos =
    hotel.photos && hotel.photos.length
      ? hotel.photos
      : [hotel.thumbnail];

  const next = useCallback(() => {
    setPhotoIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  const prev = useCallback(() => {
    setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal__close"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="modal__carousel">

          <img
            src={photos[photoIndex]}
            alt={hotel.name}
          />

          {photos.length > 1 && (
            <>
              <button
                className="modal__nav modal__nav--prev"
                onClick={prev}
              >
                ❮
              </button>

              <button
                className="modal__nav modal__nav--next"
                onClick={next}
              >
                ❯
              </button>

              <div className="modal__dots">

                {photos.map((_, i) => (
                  <button
                    key={i}
                    className={`modal__dot ${
                      i === photoIndex
                        ? "is-active"
                        : ""
                    }`}
                    onClick={() => setPhotoIndex(i)}
                  />
                ))}

              </div>
            </>
          )}

        </div>

        <div className="modal__body">

          <span className="modal__location">
            📍 {hotel.location}
          </span>

          <h2 className="modal__title">
            {hotel.name}
          </h2>

          <div className="modal__meta">

            <div className="modal__rating">
              ⭐ {hotel.rating.toFixed(1)}
            </div>

            <div className="modal__price">
              {formatPrice(hotel.price)}
              <span> / night</span>
            </div>

          </div>

          <p className="modal__description">
            {hotel.description}
          </p>

          <div className="modal__actions">

            <button className="modal__bookBtn">
              Book Now
            </button>

            <button
              className="modal__secondaryBtn"
              onClick={onClose}
            >
              Close
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}