import {
  waterDrop,
  fire,
  electricity,
  road,
  sanitary,
} from '../assets/index.js';
import L from 'leaflet';
const issues = {
  water: new L.Icon({
    iconUrl: waterDrop,
    iconSize: [50, 50],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  }),
  fire: new L.Icon({
    iconUrl: fire,
    iconSize: [30, 30],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  }),
  electricity: new L.Icon({
    iconUrl: electricity,
    iconSize: [30, 30],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  }),
  road: new L.Icon({
    iconUrl: road,
    iconSize: [30, 30],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  }),
  sanitary: new L.Icon({
    iconUrl: sanitary,
    iconSize: [30, 30],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  }),
  default: new L.Icon({
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  }),
};

export default issues;
