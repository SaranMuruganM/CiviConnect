import { FiCrosshair } from 'react-icons/fi'; 
import { useMap } from 'react-leaflet';
import { getUserGeolocation } from '../utils/getUserGeolocation';

const RecenterButton = ({ setLocation }) => {
  const map = useMap();
  const recenterMap = async () => {
    try {
      const loc = await getUserGeolocation();
      if (loc) {
        setLocation(loc); 
        map.setView([loc.latitude, loc.longitude], 15); 
      }
    } catch (error) {
      console.error('Failed to fetch geolocation:', error);
    }
  };

  return (
    <button
      onClick={recenterMap}
      className="absolute top-4 right-4 z-[1000] bg-custom-darkBlue text-white p-2 rounded-full flex justify-center items-center"
      style={{ zIndex: 1000 }}
    >
      <FiCrosshair size={24} />
    </button>
  );
};
export default RecenterButton;
