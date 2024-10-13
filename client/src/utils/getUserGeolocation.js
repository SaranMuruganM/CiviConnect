

export const getUserGeolocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              reject("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              reject("The request to get user location timed out.");
              break;
            default:
              reject("An unknown error occurred.");
              break;
          }
        },
        {
          enableHighAccuracy: true,  // Try to provide the most accurate location
          timeout: 6000000,            // Increased timeout to 60 seconds
          maximumAge: 0              // No caching of location data
        }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};



export const watchUserGeolocation = (onLocationUpdate, onError) => {
  if (navigator.geolocation) {
    const options = {
      enableHighAccuracy: true, // Request high accuracy if available
      timeout: 50000, // Set a timeout for how long to wait
      maximumAge: 0, // Do not use cached positions
    };

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationUpdate({ latitude, longitude });
      },
      (error) => {
        onError(`Error watching geolocation: ${error.message}`);
      },
      options
    );

    return watchId;
  } else {
    onError("Geolocation is not supported by this browser.");
  }
};

// Function to clear the watch position
export const clearWatch = (watchId) => {
  if (navigator.geolocation && watchId) {
    navigator.geolocation.clearWatch(watchId);
  }
};
