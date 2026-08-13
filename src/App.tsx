import Toolbar from "./components/Toolbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { APP_TITLE } from "./constants/app";
import { useEffect, useState } from "react";
import type { Earthquake } from "./types/earthquake";
import type { SortOption } from "./types/sortOption";
import EarthquakeList from "./components/EarthquakeList";

function App() {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);

  const [timeRange, setTimeRange] = useState("day");

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
    <div className="flex flex-col w-full items-center justify-between min-h-svh bg-surface">
      <Toolbar
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        title={APP_TITLE}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <main className="grow w-full mx-auto">
        <div className="flex flex-col">
          <Header title={timeRangeLabel} count={earthquakes.length} />
        </div>
        <EarthquakeList
          earthquakes={earthquakes}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setTimeRange={setTimeRange}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
