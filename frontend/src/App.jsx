import React, { useState, useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import Dashboard from './pages/Dashboard';
import { getWeatherThemeClass } from './utils/weatherUtils';

const DEFAULT_FAVORITES = ['Coimbatore', 'Bengaluru', 'Mumbai'];

export function App() {
  // Theme state: dark or light (synced with localStorage)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('weatherpulse_theme') || 'dark';
  });

  // Temperature unit state: 'C' or 'F' (synced with localStorage)
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem('weatherpulse_unit') || 'C';
  });

  // Favorites state (synced with localStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('weatherpulse_favorites');
      return saved ? JSON.parse(saved) : DEFAULT_FAVORITES;
    } catch {
      return DEFAULT_FAVORITES;
    }
  });

  // Weather Custom Hook (initial city: Coimbatore, India)
  const {
    weatherData,
    loading,
    refreshing,
    error,
    lastUpdated,
    searchCity,
    searchCoordinates,
    refresh
  } = useWeather('Coimbatore');

  // Sync theme changes with DOM and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('weatherpulse_theme', theme);
  }, [theme]);

  // Sync unit changes with localStorage
  useEffect(() => {
    localStorage.setItem('weatherpulse_unit', unit);
  }, [unit]);

  // Sync favorites changes with localStorage
  useEffect(() => {
    localStorage.setItem('weatherpulse_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Toggle Theme
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toggle Temperature Unit
  const handleToggleUnit = (newUnit) => {
    setUnit(newUnit);
  };

  // Toggle Favorite City (Add or Remove)
  const handleToggleFavorite = (cityName) => {
    if (!cityName) return;
    setFavorites((prev) => {
      const exists = prev.some((item) => item.toLowerCase() === cityName.toLowerCase());
      if (exists) {
        return prev.filter((item) => item.toLowerCase() !== cityName.toLowerCase());
      } else {
        return [...prev, cityName];
      }
    });
  };

  // Remove Favorite City
  const handleRemoveFavorite = (cityName) => {
    setFavorites((prev) =>
      prev.filter((item) => item.toLowerCase() !== cityName.toLowerCase())
    );
  };

  // Calculate dynamic weather background class
  const weatherThemeClass = weatherData?.current
    ? getWeatherThemeClass(weatherData.current.condition, weatherData.current.isNight)
    : 'weather-clear';

  return (
    <div className={`app-wrapper ${weatherThemeClass} theme-${theme}`}>
      {/* Dynamic Animated Atmospheric Canvas */}
      <div className="ambient-background" aria-hidden="true">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
        <div className="atmospheric-shimmer" />
      </div>

      {/* Main Dashboard Application View */}
      <Dashboard
        weatherData={weatherData}
        loading={loading}
        refreshing={refreshing}
        error={error}
        lastUpdated={lastUpdated}
        unit={unit}
        theme={theme}
        favorites={favorites}
        onSearch={searchCity}
        onLocationFound={searchCoordinates}
        onRefresh={refresh}
        onToggleUnit={handleToggleUnit}
        onToggleTheme={handleToggleTheme}
        onToggleFavorite={handleToggleFavorite}
        onSelectFavorite={searchCity}
        onRemoveFavorite={handleRemoveFavorite}
      />
    </div>
  );
}

export default App;
