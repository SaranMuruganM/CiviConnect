import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import {
  waterDrop,
  placeHolder,
  fire,
  electricity,
  road,
} from '../assets/index.js';
import L from 'leaflet';
import { useDashboardContext } from '../pages/DashboardLayout.jsx';

const issues = {
  water: new L.Icon({
    iconUrl: waterDrop,
    iconSize: [50, 50],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  }),
  fire: new L.Icon({
    iconUrl: fire,
    iconSize: [50, 50],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  }),
  electricity: new L.Icon({
    iconUrl: electricity,
    iconSize: [50, 50],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  }),
  road: new L.Icon({
    iconUrl: road,
    iconSize: [50, 50],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  }),
};

const MapMarker = ({ position, description, problem, status }) => {
  return (
    <Marker
      position={position}
      icon={issues[problem]}
      eventHandlers={{
        click: () => {
          console.log('Marker clicked');
        },
      }}
    >
      <Popup className="w-[400px] ">
        <div className="space-y-5 grid ">
          <img
            src={placeHolder}
            alt="placeholder"
            className="w-[250px] h-[180px]"
          />
          <h1 className="font-bold tracking-wide">
            Status: {status.charAt(0).toUpperCase() + status.slice(1)}
          </h1>
          <h1>{description}</h1>
        </div>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
