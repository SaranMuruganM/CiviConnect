import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet"; // For custom marker icons
import { getUserGeolocation } from "../utils/getUserGeolocation"; // Assuming this fetches the user location
import { waterProblems } from "../utils/locations";
import MapMarker from "../components/MapMarker";
localStorage.setItem("issues",JSON.stringify(waterProblems));
// Custom icon (you can use any image or SVG for the marker icon)
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

   
const MapViewer = () => {
  const [location, setLocation] = useState(null); // User's current location
  const [centerCoordinates, setCenterCoordinates] = useState(null); // Center coordinates of the map

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const loc = await getUserGeolocation(); // Assuming this returns the user's geolocation
        setLocation(loc);
        setCenterCoordinates([loc.latitude, loc.longitude]); // Set initial center coordinates
      } catch (error) {
        console.error("Geolocation error:", error);
      }
    };

    fetchLocation();
  }, []);

  if (!location) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer
      center={[location.latitude, location.longitude]} // Center the map at the user's location
      zoom={14}
      className="flex h-[80vh] w-[95%] mx-auto mt-[1vh] z-40"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {JSON.parse(localStorage.getItem("issues")).map((problems) => {
        return (
          <MapMarker
            position={problems.coordinates}
            description={problems.description}
          />
        );
      })}
    </MapContainer>
  );
};

export default MapViewer;
