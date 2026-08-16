export interface Earthquake {
  id: string;
  title: string;
  properties: {
    mag: number | null;
    place: string;
    time: number;
  };
  geometry: {
    coordinates: [number, number, number]; // [longitude, latitude, depth]
  };
}
