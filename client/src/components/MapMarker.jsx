import React from "react";
import { Marker, Popup } from "react-leaflet";
import {waterDrop,placeHolder} from '../assets/index.js'
import L from "leaflet";

const waterMarker = new L.Icon({
  iconUrl: waterDrop,
  iconSize: [50, 50],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const MapMarker = ({position,description}) => {
  return (
    <Marker
      position={position}
      icon={waterMarker}
      eventHandlers={{
        click: () => {
          console.log("clicked");
        },
      }}
    >
      <Popup className="w-[400px] grid">
        
          <img src={placeHolder} alt="placeholder" className="w-[300px] h-[200px]"/>
          <h1>{description}</h1>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
