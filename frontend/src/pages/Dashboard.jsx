import React, { useState } from 'react';
import { RefreshCw, Clock, MapPin, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import CurrentWeather from '../components/CurrentWeather';
import WeatherDetails from '../components/WeatherDetails';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import FavoriteCities from '../components/FavoriteCities';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Footer from '../components/Footer';
import { formatTime } from '../utils/weatherUtils';

export const Dashboard = ({
  weatherData,
  loading,
  refreshing,
  error,
  lastUpdated,
  unit,
  theme,
  favorites,
  onSearch,
  onLocationFound,
  onRefresh,
  onToggleUnit,
  onToggleTheme,
  onToggleFavorite,
  onSelectFavorite,
  onRemoveFavorite
}) => {
  const [geoNotice, setGeoNotice] = useState(null);

  const handleLocationError = (msg) => {
    setGeoNotice(msg);
    // Dismiss notice after 6 seconds
    setTimeout(() => {
      setGeoNotice(null);
    }, 6000);
  };

  const currentCityName = weatherData?.current?.city || '';
  const isCurrentFavorite = favorites.some(
    (f) => f.toLowerCase() === currentCityName.toLowerCase()
  );

  return (
    <div className="dashboard-layout">
      {/* Top Header */}
      <Header
        onSearch={onSearch}
        loading={loading}
        unit={unit}
        onUnitToggle={onToggleUnit}
        theme={theme}
        onThemeToggle={onToggleTheme}
        onLocationFound={(lat, lon) => {
          setGeoNotice(null);
          onLocationFound(lat, lon);
        }}
        onLocationError={handleLocationError}
      />

      {/* Geolocation Notice Toast */}
      {geoNotice && (
        <div className="geo-notice-banner glass-card" role="status">
          <span>{geoNotice}</span>
          <button
            type="button"
            className="geo-dismiss-btn"
            onClick={() => setGeoNotice(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="dashboard-main-content">
        {/* Sub-header Bar: Location quick indicator & Refresh Controls */}
        <div className="dashboard-subbar glass-card">
          <div className="subbar-left">
            <MapPin size={16} className="subbar-icon" />
            <span className="subbar-location-label">
              Showing weather for:{' '}
              <strong>
                {weatherData?.current ? `${weatherData.current.city}, ${weatherData.current.country}` : 'Loading...'}
              </strong>
            </span>
          </div>

          <div className="subbar-right">
            {lastUpdated && (
              <div className="last-updated-meta">
                <Clock size={14} />
                <span>Updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </div>
            )}

            <button
              type="button"
              className="refresh-btn"
              onClick={onRefresh}
              disabled={loading || refreshing}
              aria-label="Refresh weather data"
              title="Refresh weather data"
              id="refresh-weather-btn"
            >
              <RefreshCw size={15} className={refreshing ? 'spin-animation' : ''} />
              <span>{refreshing ? 'Updating...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Favorite Cities Quick Access Bar */}
        <FavoriteCities
          favorites={favorites}
          currentCity={currentCityName}
          onSelectCity={onSelectFavorite}
          onRemoveFavorite={onRemoveFavorite}
        />

        {/* Error Notification */}
        {error && (
          <ErrorMessage
            message={error}
            onRetry={onRefresh}
          />
        )}

        {/* Loading State Skeleton */}
        {loading && !weatherData && <Loading />}

        {/* Weather Dashboard View */}
        {weatherData && (
          <div className="weather-grid-container">
            {/* Left Primary Column: Current Weather Hero & Hourly Forecast */}
            <div className="weather-primary-col">
              <CurrentWeather
                weather={weatherData}
                unit={unit}
                isFavorite={isCurrentFavorite}
                onToggleFavorite={onToggleFavorite}
              />

              <HourlyForecast
                hourly={weatherData.hourly}
                unit={unit}
              />
            </div>

            {/* Right Secondary Column: Atmospheric Details & 5-Day Outlook */}
            <div className="weather-secondary-col">
              <WeatherDetails
                weather={weatherData}
                unit={unit}
              />

              <DailyForecast
                daily={weatherData.daily}
                unit={unit}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
