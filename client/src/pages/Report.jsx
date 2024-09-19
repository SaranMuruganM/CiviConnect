import {React,useState,useEffect }from 'react'
import {Form} from 'react-router-dom'
import {FormRow} from '../components';
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet"; 
import { getUserGeolocation } from "../utils/getUserGeolocation";
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const CenterMarker = ({ setCenterCoordinates }) => {
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter(); // Get new center coordinates when the map moves
      setCenterCoordinates(center); // Update the center coordinates in the parent state
    },
  });

  return null;
};


const Report = () => { const [location, setLocation] = useState(null); // User's current location
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
    <Form className="w-[80vw] mx-auto grid p-4 mt-10 border">
      <h1 className="mx-auto mb-8">Report Issues</h1>
      <FormRow type={"text"} labelText={"decription"} />
      <MapContainer
        center={[location.latitude, location.longitude]} // Center the map at the user's location
        zoom={16}
        className="flex h-[80vh] w-[95%] mx-auto mt-[1vh] z-40"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* Component to track map center */}
        <CenterMarker setCenterCoordinates={setCenterCoordinates} />
        {centerCoordinates && (
          <Marker
            position={centerCoordinates} // Always place the marker at the map center
            icon={customIcon} // Custom icon for the marker
            draggable={false} // Ensure the marker is not draggable
          >
            <Popup>
              Map Center
              <br />
              Latitude: {centerCoordinates.lat?.toFixed(5)}, Longitude:{" "}
              {centerCoordinates.lng?.toFixed(5)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </Form>
  );
}

export default Report