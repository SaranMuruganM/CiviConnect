import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { getUserGeolocation } from '../utils/getUserGeolocation';
import { MapMarker, RecenterButton } from '../components';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import Cookies from 'js-cookie';

const customIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

export const loader = async () => {
  const data = Cookies.get('userData');
  const userData = data ? JSON.parse(data) : null;

  if (!userData || !userData.city) {
    console.error('No user data or city found.');
    return null;
  }

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/v1/issues/city/${userData.city}`,
      {
        withCredentials: true,
      }
    );
    return response.data; // Return the actual data
  } catch (error) {
    console.log('Error fetching issues:', error);
    return null;
  }
};

const MapViewer = () => {
  const data = useLoaderData();

  const [location, setLocation] = useState(null); // User's current location
  const [issues, setIssues] = useState([]); // Store issues from loader

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const loc = await getUserGeolocation(); // Fetch user geolocation
        setLocation(loc);
      } catch (error) {
        console.error('Geolocation error:', error);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (data) {
      setIssues(data.data);
    }
  }, [data]);

  if (!location) {
    return <div>Loading map...</div>;
  }
  console.log(issues);

  return (
    <div className="relative">
      <MapContainer
        center={[location.latitude, location.longitude]} // Center the map at the user's location
        zoom={15}
        className="flex h-[80vh] w-[95%] mx-auto mt-[1vh] z-40"
        style={{ position: 'relative' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {issues.length > 0 &&
          issues.map((problems) => (
            <MapMarker
              key={problems._id}
              position={[problems.latitude, problems.longitude]}
              description={problems.description}
              problem={problems.problem}
              status={problems.status}
            />
          ))}

        <RecenterButton setLocation={setLocation} />
      </MapContainer>
    </div>
  );
};

export default MapViewer;
