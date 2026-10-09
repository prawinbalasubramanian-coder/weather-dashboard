import React, { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

export const LocationButton = ({ onLocationFound, onError }) => {
  const [geoLoading, setGeoLoading] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      if (onError) onError('Geolocation is not supported by your browser. Please search for a city instead.');
      return;
    }

    setGeoLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoLoading(false);
        const { latitude, longitude } = position.coords;
        onLocationFound(latitude, longitude);
      },
      (error) => {
        setGeoLoading(false);
        let msg = 'Unable to access your location. Please search for a city instead.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location access was denied. Please allow location access or search for a city.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information is currently unavailable. Please try searching instead.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location request timed out. Please try again or search manually.';
        }
        if (onError) onError(msg);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  return (
    <button
      type="button"
      className="btn-location"
      onClick={handleGetLocation}
      disabled={geoLoading}
      aria-label="Use current location"
      title="Use my current GPS location"
      id="use-my-location-btn"
    >
      {geoLoading ? (
        <>
          <Loader2 size={16} className="spin-animation" />
          <span className="btn-text">Locating...</span>
        </>
      ) : (
        <>
          <MapPin size={16} />
          <span className="btn-text">Use My Location</span>
        </>
      )}
    </button>
  );
};

export default LocationButton;
