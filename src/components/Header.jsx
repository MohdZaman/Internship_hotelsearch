export default function Header() {
  return (
    <header className="site-header">
      <div className="header__container">

        <div className="site-header__brand">

          <div className="site-header__mark">
            <svg viewBox="0 0 40 40" width="34" height="34">
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />

              <path
                d="M20 6 L23 18 L20 20 L17 18 Z"
                fill="currentColor"
              />

              <path
                d="M20 34 L17 22 L20 20 L23 22 Z"
                fill="currentColor"
                opacity="0.35"
              />

              <circle
                cx="20"
                cy="20"
                r="2.5"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="site-header__text">
            <span className="site-header__eyebrow">
              Luxury Hotel Booking
            </span>

            <h1 className="site-header__title">
              StaySphere
            </h1>
          </div>

        </div>

        <nav className="header__nav">

          <a href="#">Home</a>

          <a href="#">Hotels</a>

          <a href="#">Destinations</a>

          <a href="#">Contact</a>

        </nav>

        <button className="header__button">
          Book Now
        </button>

      </div>
    </header>
  );
}