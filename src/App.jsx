import { useState } from "react";
import Header from "./components/Header";
import SearchPanel from "./components/SearchPanel";
import HotelGrid from "./components/HotelGrid";
import HotelModal from "./components/HotelModal";
import Pagination from "./components/Pagination";
import LoadingState, { ErrorState } from "./components/LoadingState";
import { useHotels } from "./hooks/useHotels";

export default function App() {
  const {
    hotels,
    totalResults,
    loading,
    error,
    filters,
    setFilters,
    resetFilters,
    page,
    setPage,
    totalPages,
    locations,
    retry,
  } = useHotels();

  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <div className="app">
      <Header />

      <section className="hero">
        <div className="hero__overlay"></div>

        <div className="hero__content">
          <h1>Find Your Perfect Stay</h1>

          <p>
            Discover premium hotels at unbeatable prices across the world.
          </p>

          <SearchPanel
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            locations={locations}
            resultCount={totalResults}
          />
        </div>
      </section>

      <main className="app__main">
        {!loading && !error && (
          <div className="sectionHeading">
            <h2>Popular Hotels</h2>

            <span>{totalResults} Hotels Found</span>
          </div>
        )}

        {loading && <LoadingState />}

        {!loading && error && (
          <ErrorState
            message={error}
            onRetry={retry}
          />
        )}

        {!loading && !error && (
          <>
            <HotelGrid
              hotels={hotels}
              onOpen={setSelectedHotel}
            />

            <Pagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </>
        )}
      </main>

      <footer className="app__footer">
        <div className="footerContent">
          <h3>Hotel Explorer</h3>

          <p>
            Built with React • Powered by Hotel Search API
          </p>
        </div>
      </footer>

      {selectedHotel && (
        <HotelModal
          hotel={selectedHotel}
          onClose={() => setSelectedHotel(null)}
        />
      )}
    </div>
  );
}