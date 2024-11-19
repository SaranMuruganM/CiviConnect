import { React, useState, useEffect } from 'react';
import { Form, redirect } from 'react-router-dom';
import { FormRow, CenterMarker } from '../components';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { getUserGeolocation } from '../utils/getUserGeolocation';
import axios from 'axios';

const customIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

export const action = async ({ request }) => {
  try {
    const formData = new FormData(); // Create a new FormData object
    const data = await request.formData(); // Get the form data

    // Append form data to the FormData object
    for (const [key, value] of data.entries()) {
      formData.append(key, value);
    }

    await axios.post('https://civiconnect.onrender.com/v1/issues', formData, {
      withCredentials: true,
    });

    // Redirect to the dashboard after successful submission
    return redirect('/dashboard');
  } catch (error) {
    console.log(error);
    return null; // Handle the error
  }
};

const Report = () => {
  const [location, setLocation] = useState(null); // User's current location
  const [centerCoordinates, setCenterCoordinates] = useState(null); // Center coordinates of the map
  const [markerCoordinates, setMarkerCoordinates] = useState(null); // Store coordinates of the marker

  // Fetch the user's geolocation on component mount
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const loc = await getUserGeolocation(); // Get user's geolocation
        setLocation(loc);
        setCenterCoordinates([loc.latitude, loc.longitude]); // Set initial center coordinates
      } catch (error) {
        console.error('Geolocation error:', error);
      }
    };

    fetchLocation();
  }, []);

  if (!location) {
    return <div>Loading map...</div>; // Display a loading message while fetching location
  }

  return (
    <Form
      className="w-[80vw] mx-auto grid p-4 md:px-10 mt-10 border space-y-6"
      method="post"
    >
      <h1 className="text-2xl text-center tracking-wide">Report Issue</h1>
      <FormRow
        type={'select'}
        name={'problem'}
        labelText={'Select Your Related Problem :'}
        defaultValue={'null'}
        styles={'w-[70%]'}
        options={[
          { value: 'null', label: 'Select an Issue' },
          {
            value: 'road',
            label: 'Roads (Potholes, broken traffic signals, etc...)',
          },
          {
            value: 'electricity',
            label: 'Electricity (Power outages, faulty wiring, etc...)',
          },
          {
            value: 'fire',
            label: 'Fire (Fires, hazardous situations, etc...)',
          },
          { value: 'water', label: 'Water (Leaks, shortages, etc...)' },
        ]}
      />

      <FormRow
        type={'text'}
        name={'description'}
        labelText={'Describe your issue :'}
        styles={'w-[70%]'}
      />
      <FormRow
        type={'text'}
        name={'city'}
        labelText={'Enter your city :'}
        styles={'w-[70%]'}
      />

      <label htmlFor="location">Mark your location :</label>
      <MapContainer
        center={markerCoordinates || [location.latitude, location.longitude]} // Center the map at the marker coordinates if available, otherwise user's location
        zoom={16}
        className="flex h-[50vh] w-[95%] mx-auto mt-[1vh] z-40"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <CenterMarker
          setMarkerCoordinates={setMarkerCoordinates} // Pass setter for marker coordinates
          centerCoordinates={centerCoordinates} // Pass current center to initialize map
          setCenterCoordinates={setCenterCoordinates}
        />

        {/* Display a marker at the map's center */}
        {markerCoordinates && ( // Render marker only if markerCoordinates is set
          <Marker
            position={markerCoordinates} // Marker at the updated coordinates
            icon={customIcon} // Custom icon for the marker
            draggable={false} // Marker is not draggable
          />
        )}
      </MapContainer>
      <input
        type="hidden"
        name="latitude"
        value={markerCoordinates ? markerCoordinates[0] : ''}
      />
      <input
        type="hidden"
        name="longitude"
        value={markerCoordinates ? markerCoordinates[1] : ''}
      />
      <button
        type="submit"
        className="border px-4 py-1 bg-custom-darkBlue text-white mx-auto rounded-md w-[20%]"
      >
        Submit
      </button>
    </Form>
  );
};

export default Report;
