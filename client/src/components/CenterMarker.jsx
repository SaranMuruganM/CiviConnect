import { useMapEvents } from 'react-leaflet';
import { useEffect } from 'react';

const CenterMarker = ({ setMarkerCoordinates, centerCoordinates,setCenterCoordinates }) => {
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      setCenterCoordinates(center);
    },
    click: (event) => {
      // When the user clicks on the map, set the marker coordinates
      const { lat, lng } = event.latlng;
      setMarkerCoordinates([lat, lng]);
      // map.setView([lat, lng], map.getZoom()); // Center the map on the clicked location
    },
  });

  useEffect(() => {
    if (centerCoordinates) {
      map.setView(centerCoordinates, map.getZoom());
    }
  }, []);

  return null;
};

export default CenterMarker;
