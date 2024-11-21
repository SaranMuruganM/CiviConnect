import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { placeHolder } from '../assets/index.js';

import issues from '../utils/iconMarkers.js';

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
