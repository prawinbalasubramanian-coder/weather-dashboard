/**
 * Meteorological Utilities and Unit Converters for WeatherPulse
 */

/**
 * Converts Celsius to Fahrenheit
 */
export const celsiusToFahrenheit = (celsius) => {
  if (celsius === null || celsius === undefined || isNaN(celsius)) return 0;
  return Math.round((celsius * 9) / 5 + 32);
};

/**
 * Format temperature according to the chosen unit ('C' or 'F')
 */
export const formatTemp = (celsius, unit = 'C') => {
  if (celsius === null || celsius === undefined || isNaN(celsius)) return '--°';
  const val = unit === 'F' ? celsiusToFahrenheit(celsius) : Math.round(celsius);
  return `${val}°${unit}`;
};

/**
 * Format temperature number only
 */
export const getTempNumber = (celsius, unit = 'C') => {
  if (celsius === null || celsius === undefined || isNaN(celsius)) return '--';
  return unit === 'F' ? celsiusToFahrenheit(celsius) : Math.round(celsius);
};

/**
 * Format wind speed based on unit ('C' -> km/h, 'F' -> mph)
 */
export const formatWindSpeed = (kmh, unit = 'C') => {
  if (kmh === null || kmh === undefined) return '--';
  if (unit === 'F') {
    const mph = (kmh * 0.621371).toFixed(1);
    return `${mph} mph`;
  }
  return `${kmh} km/h`;
};

/**
 * Convert wind angle (degrees) to cardinal compass direction
 */
export const getWindDirection = (degrees = 0) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round((degrees % 360) / 22.5) % 16;
  return directions[index];
};

/**
 * Format a Unix timestamp to local time string (e.g. "6:30 AM")
 */
export const formatTime = (unixTimestamp) => {
  if (!unixTimestamp) return '--:--';
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
};

/**
 * Format date to readable string (e.g., "Wednesday, Oct 7, 2026")
 */
export const formatDate = (unixTimestamp) => {
  const date = unixTimestamp ? new Date(unixTimestamp * 1000) : new Date();
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Get dynamic theme class based on weather condition and day/night status
 */
export const getWeatherThemeClass = (condition = '', isNight = false) => {
  const c = condition.toLowerCase();

  if (isNight && (c.includes('clear') || c.includes('few clouds'))) {
    return 'weather-night';
  }

  if (c.includes('thunderstorm') || c.includes('lightning') || c.includes('squall')) {
    return 'weather-thunderstorm';
  }

  if (c.includes('rain') || c.includes('drizzle')) {
    return 'weather-rain';
  }

  if (c.includes('snow') || c.includes('sleet') || c.includes('ice') || c.includes('blizzard')) {
    return 'weather-snow';
  }

  if (c.includes('cloud') || c.includes('overcast')) {
    return 'weather-clouds';
  }

  if (c.includes('mist') || c.includes('fog') || c.includes('haze') || c.includes('smoke') || c.includes('dust')) {
    return 'weather-mist';
  }

  return isNight ? 'weather-night' : 'weather-clear';
};

/**
 * Return UV level metadata
 */
export const getUvRiskLevel = (uv = 0) => {
  if (uv < 3) return { level: 'Low', color: '#10B981', advice: 'No protection required' };
  if (uv < 6) return { level: 'Moderate', color: '#F59E0B', advice: 'Wear sunscreen outdoors' };
  if (uv < 8) return { level: 'High', color: '#F97316', advice: 'Seek shade during midday' };
  if (uv < 11) return { level: 'Very High', color: '#EF4444', advice: 'Extra protection essential' };
  return { level: 'Extreme', color: '#8B5CF6', advice: 'Avoid being outside if possible' };
};
