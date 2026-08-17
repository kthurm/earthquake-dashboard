import type { Earthquake } from "../types/earthquake";
import { useState } from "react";
import Map, { Source, Layer, Popup } from "react-map-gl/maplibre";
import type { FeatureCollection, Point } from "geojson";

import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

import "maplibre-gl/dist/maplibre-gl.css";

setWorkerUrl(workerUrl);

interface EarthquakeMapProps {
  earthquakes: Earthquake[];
}

function EarthquakeMap(props: EarthquakeMapProps) {
  const [hoverInfo, setHoverInfo] = useState<{
    longitude: number;
    latitude: number;
    mag: number | null;
    place: string;
  } | null>(null);

  const firstEarthquake = props.earthquakes[0];

  if (!firstEarthquake) {
    return <p>Loading...</p>;
  }

  const geojson: FeatureCollection<Point> = {
    type: "FeatureCollection",
    features: props.earthquakes.map((earthquake) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          earthquake.geometry.coordinates[0],
          earthquake.geometry.coordinates[1],
        ],
      },
      properties: {
        mag: earthquake.properties.mag,
        place: earthquake.properties.place,
        time: earthquake.properties.time,
      },
    })),
  };

  return (
    <div className="w-full h-[600px]">
      <Map
        initialViewState={{
          longitude: 0,
          latitude: 20,
          zoom: 1.5,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        interactiveLayerIds={["earthquake-points"]}
        onMouseMove={(event) => {
          const feature = event.features?.[0];

          if (!feature) {
            setHoverInfo(null);
            return;
          }

          setHoverInfo({
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
            mag: feature.properties?.mag ?? null,
            place: feature.properties?.place ?? "Unknown location",
          });
        }}
        onMouseLeave={() => setHoverInfo(null)}
      >
        <Source
          id="earthquakes"
          key="earthquakes"
          type="geojson"
          data={geojson}
        >
          <Layer
            id="earthquake-points"
            type="circle"
            paint={{
              "circle-radius": [
                "interpolate",
                ["linear"],
                ["coalesce", ["get", "mag"], 0],
                0,
                2,
                2,
                5,
                4,
                9,
                6,
                15,
                8,
                22,
              ],
              "circle-color": "#b84c28",
              "circle-opacity": 0.7,
            }}
          />
        </Source>
        {hoverInfo && (
          <Popup
            longitude={hoverInfo.longitude}
            latitude={hoverInfo.latitude}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom"
          >
            <div className="text-sm">
              <p className="font-bold">
                Magnitude{" "}
                {hoverInfo.mag !== null ? hoverInfo.mag.toFixed(1) : "N/A"}
              </p>
              <p>{hoverInfo.place}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default EarthquakeMap;
