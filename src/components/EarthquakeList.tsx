import { useState } from "react";
import type { Earthquake } from "../types/earthquake";
import type { SortOption } from "../types/sortOption";

interface EarthquakeListProps {
  earthquakes: Earthquake[];
  sortBy: SortOption;
  setSortBy: (sortBy: SortOption) => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (sortDirection: "asc" | "desc") => void;
}

function EarthquakeList(props: EarthquakeListProps) {
  const [visibleCount, setVisibleCount] = useState(30);
  const sortedEarthquakes = [...props.earthquakes];

  // console.log("props.sortDirection", props.sortDirection);

  if (props.sortBy === "magnitude") {
    sortedEarthquakes.sort((a, b) => {
      if (a.properties.mag === null && b.properties.mag === null) {
        return 0;
      }

      if (a.properties.mag === null) {
        return 1;
      }

      if (b.properties.mag === null) {
        return -1;
      }

      if (props.sortDirection === "asc") {
        return a.properties.mag - b.properties.mag;
      }
      return b.properties.mag - a.properties.mag;
    });
  } else {
    sortedEarthquakes.sort((a, b) => {
      if (props.sortDirection === "asc") {
        return a.properties.time - b.properties.time;
      }
      return b.properties.time - a.properties.time;
    });
  }
  return (
    <div className="w-full lg:max-w-4xl mx-auto flex flex-col">
      <table className="w-full text-left border-separate border-spacing-x-3 lg:border-spacing-x-5 border-spacing-y-3">
        <thead className="uppercase text-xs md:text-sm text-secondary-dark font-bold">
          <tr>
            <th className="w-24 lg:w-36">
              <button
                className="flex items-center uppercase hover:text-primary cursor-pointer"
                onClick={() => {
                  if (props.sortBy === "magnitude") {
                    props.setSortDirection(
                      props.sortDirection === "asc" ? "desc" : "asc",
                    );
                  } else {
                    props.setSortBy("magnitude");
                    props.setSortDirection("desc");
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className={`w-4 h-4 mr-1 transition-transform ${
                    props.sortBy === "magnitude" &&
                    props.sortDirection === "asc"
                      ? "rotate-180"
                      : "rotate-0"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                  />
                </svg>
                <span>Magnitude</span>
              </button>
            </th>
            <th>Place</th>
            <th>
              <button
                className="uppercase flex w-full justify-end items-center hover:text-primary cursor-pointer"
                onClick={() => {
                  if (props.sortBy === "time") {
                    props.setSortDirection(
                      props.sortDirection === "asc" ? "desc" : "asc",
                    );
                  } else {
                    props.setSortBy("time");
                    props.setSortDirection("desc");
                  }
                }}
              >
                <span>Time</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className={`w-4 h-4 ml-1 transition-transform ${
                    props.sortBy === "time" && props.sortDirection === "asc"
                      ? "rotate-180"
                      : "rotate-0"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                  />
                </svg>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedEarthquakes.slice(0, visibleCount).map((earthquake) => (
            <tr key={earthquake.id}>
              <td className="w-24 lg:w-36">
                {earthquake.properties.mag !== null
                  ? earthquake.properties.mag.toFixed(1)
                  : "N/A"}
              </td>
              <td>{earthquake.properties.place}.</td>
              <td className="text-right">
                {new Date(earthquake.properties.time).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="w-full my-3 bg-primary-dark hover:bg-primary text-white p-1.5 rounded drop-shadow-xl/10 border text-sm "
        onClick={() => setVisibleCount(visibleCount + 50)}
      >
        Load More
      </button>
    </div>
  );
}

export default EarthquakeList;
