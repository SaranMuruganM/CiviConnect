import { React, useState, useEffect } from 'react';
import { Form, redirect, useAsyncError } from 'react-router-dom';
import { FormRow, CenterMarker, RecenterButton } from '../components';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { getUserGeolocation } from '../utils/getUserGeolocation';
import axios from 'axios';
import issues from '../utils/iconMarkers';
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

    for (const [key, value] of data.entries()) {
      formData.append(key, value);
    }

    await axios.post(`${import.meta.env.VITE_SERVER_URL}/v1/issues`, formData, {
      withCredentials: true,
    });

    return redirect('/dashboard');
  } catch (error) {
    console.log(error);
    return null; // Handle the error
  }
};

const Report = () => {
  const [location, setLocation] = useState(null);
  const [centerCoordinates, setCenterCoordinates] = useState(null);
  const [markerCoordinates, setMarkerCoordinates] = useState(null);
  const [selectedOption, setSelectedOption] = useState('default'); // Store the selected issue type

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const loc = await getUserGeolocation();
        setLocation(loc);
        setCenterCoordinates([loc.latitude, loc.longitude]);
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
        setSelectedOption={setSelectedOption} // Update selected issue type
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
          {
            value: 'sanitary',
            label:
              'Sanitary (Garbage dumps,Waste management, cleanliness, etc...)',
          },
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
          setMarkerCoordinates={setMarkerCoordinates}
          centerCoordinates={centerCoordinates}
          setCenterCoordinates={setCenterCoordinates}
        />

        {markerCoordinates && (
          <Marker
            position={markerCoordinates}
            icon={issues[selectedOption]} // Set icon based on selected option
            draggable={false}
          />
        )}
        <RecenterButton setLocation={setLocation} />
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
