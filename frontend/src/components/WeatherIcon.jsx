import React from 'react';
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  CloudFog,
  Wind
} from 'lucide-react';

/**
 * Maps OpenWeatherMap icon codes & condition names to vibrant Lucide Icons
 */
export const WeatherIcon = ({ condition = '', iconCode = '', isNight = false, size = 32, className = '' }) => {
  const cond = condition.toLowerCase();
  const code = iconCode.toLowerCase();
  const night = isNight || code.endsWith('n');

  // Specific code mappings
  if (code.startsWith('01')) {
    // Clear sky
    return night ? (
      <Moon size={size} className={`icon-weather icon-moon ${className}`} />
    ) : (
      <Sun size={size} className={`icon-weather icon-sun ${className}`} />
    );
  }

  if (code.startsWith('02')) {
    // Few clouds
    return night ? (
      <CloudMoon size={size} className={`icon-weather icon-cloud-moon ${className}`} />
    ) : (
      <CloudSun size={size} className={`icon-weather icon-cloud-sun ${className}`} />
    );
  }

  if (code.startsWith('03') || code.startsWith('04')) {
    // Scattered / Broken clouds
    return <Cloud size={size} className={`icon-weather icon-cloud ${className}`} />;
  }

  if (code.startsWith('09') || cond.includes('drizzle')) {
    // Shower rain
    return <CloudDrizzle size={size} className={`icon-weather icon-drizzle ${className}`} />;
  }

  if (code.startsWith('10') || cond.includes('rain')) {
    // Rain
    return <CloudRain size={size} className={`icon-weather icon-rain ${className}`} />;
  }

  if (code.startsWith('11') || cond.includes('thunderstorm') || cond.includes('storm')) {
    // Thunderstorm
    return <CloudLightning size={size} className={`icon-weather icon-lightning ${className}`} />;
  }

  if (code.startsWith('13') || cond.includes('snow')) {
    // Snow
    return <CloudSnow size={size} className={`icon-weather icon-snow ${className}`} />;
  }

  if (code.startsWith('50') || cond.includes('mist') || cond.includes('fog') || cond.includes('haze')) {
    // Mist / Fog
    return <CloudFog size={size} className={`icon-weather icon-mist ${className}`} />;
  }

  // Fallback by condition text
  if (cond.includes('clear')) {
    return night ? <Moon size={size} className={className} /> : <Sun size={size} className={className} />;
  }
  if (cond.includes('cloud')) {
    return <Cloud size={size} className={className} />;
  }
  if (cond.includes('wind')) {
    return <Wind size={size} className={className} />;
  }

  return <Sun size={size} className={className} />;
};

export default WeatherIcon;
