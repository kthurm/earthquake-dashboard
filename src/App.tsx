import Toolbar from "./components/Toolbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { APP_TITLE } from "./constants/app";
import { lazy, Suspense, useEffect, useState } from "react";
import type { Earthquake } from "./types/earthquake";
import type { SortOption } from "./types/sortOption";
import EarthquakeList from "./components/EarthquakeList";

const EarthquakeMap = lazy(() => import("./components/EarthquakeMap"));

function App() {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);

  const [timeRange, setTimeRange] = useState("day");

  const [view, setView] = useState<"table" | "map">(() => {
    const savedView = localStorage.getItem("earthquakeView");

    return savedView === "map" ? "map" : "table";
  });

  useEffect(() => {
    localStorage.setItem("earthquakeView", view);
  }, [view]);

  const [sortBy, setSortBy] = useState<SortOption>("time");

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const timeRangeLabel = timeRange === "day" ? "Last 24 Hours" : "Last 7 Days";
  useEffect(() => {
    const fetchEarthquakes = async () => {
      const response = await fetch(
        `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${timeRange}.geojson`,
      );

      const data = await response.json();

      setEarthquakes(data.features);
    };
    fetchEarthquakes();
  }, [timeRange]);

  return (
    <div className="flex flex-col w-full items-center justify-between min-h-svh bg-[url('/topography.svg')] bg-repeat">
      <Toolbar
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        title={APP_TITLE}
        view={view}
        setView={setView}
      />
      <main className="grow w-full mx-auto">
        <div className="flex flex-col md:mt-20">
          <Header title={timeRangeLabel} count={earthquakes.length} />
        </div>
        {view === "table" ? (
          <EarthquakeList
            earthquakes={earthquakes}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
        ) : (
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-16">
                <div
                  className="h-8 w-8 animate-spin rounded-full border-3 border-gray-300 border-t-primary"
                  aria-hidden="true"
                />
                <span className="sr-only">Loading map...</span>
              </div>
            }
          >
            <EarthquakeMap earthquakes={earthquakes} />
          </Suspense>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
