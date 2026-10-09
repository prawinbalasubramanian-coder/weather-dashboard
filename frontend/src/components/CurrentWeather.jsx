import React from 'react';
import {
  Heart,
  Droplets,
  Wind,
  Gauge,
  Eye,
  Sunrise,
  Sunset,
  Calendar,
  Sparkles
} from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import {
  formatTemp,
  getTempNumber,
  formatWindSpeed,
  formatTime,
  formatDate
} from '../utils/weatherUtils';

export const CurrentWeather = ({
  weather,
  unit,
  isFavorite,
  onToggleFavorite
}) => {
  if (!weather || !weather.current) return null;

  const { current } = weather;
  const tempVal = getTempNumber(current.temp, unit);
  const feelsLikeVal = formatTemp(current.feelsLike, unit);
  const highVal = formatTemp(current.tempMax, unit);
  const lowVal = formatTemp(current.tempMin, unit);

  return (
    <section className="current-weather-hero glass-card" aria-label="Current Weather Conditions">
      {/* Top Location & Favorite Header */}
      <div className="current-top-row">
        <div className="location-info">
          <div className="location-heading">
            <h2 className="city-title">
              {current.city}
              {current.country && <span className="country-badge">{current.country}</span>}
            </h2>
            <button
              type="button"
              className={`favorite-toggle-btn ${isFavorite ? 'favorited' : ''}`}
              onClick={() => onToggleFavorite(current.city)}
              aria-label={isFavorite ? `Remove ${current.city} from favorites` : `Add ${current.city} to favorites`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              id="favorite-toggle-btn"
            >
              <Heart size={20} fill={isFavorite ? '#ef4444' : 'none'} color={isFavorite ? '#ef4444' : 'currentColor'} />
            </button>
          </div>
          <div className="date-meta">
            <Calendar size={15} />
            <span>{formatDate(current.dt)}</span>
            <span className="dot-divider">•</span>
            <span>Observed at {formatTime(current.dt)}</span>
          </div>
        </div>

        {weather.isDemo && (
          <div className="demo-badge" title="Running in simulated preview mode">
            <Sparkles size={14} />
            <span>Simulated Data</span>
          </div>
        )}
      </div>

      {/* Main Temperature & Condition Display */}
      <div className="current-main-row">
        <div className="temp-hero-display">
          <div className="temp-number-wrap">
            <span className="temp-value">{tempVal}</span>
            <span className="temp-unit-hero">°{unit}</span>
          </div>
          <div className="temp-extra-info">
            <span className="feels-like">Feels like <strong>{feelsLikeVal}</strong></span>
            <div className="high-low-chips">
              <span className="hi-chip">H: {highVal}</span>
              <span className="lo-chip">L: {lowVal}</span>
            </div>
          </div>
        </div>

        <div className="condition-hero-display">
          <div className="hero-icon-container">
            <WeatherIcon
              condition={current.condition}
              iconCode={current.icon}
              isNight={current.isNight}
              size={88}
              className="weather-hero-svg"
            />
          </div>
          <div className="condition-meta">
            <h3 className="condition-text">{current.condition}</h3>
            <p className="condition-desc">{current.description}</p>
          </div>
        </div>
      </div>

      {/* Current Highlights Row */}
      <div className="current-highlights-grid">
        <div className="highlight-item">
          <div className="hl-icon"><Droplets size={18} /></div>
          <div className="hl-text">
            <span className="hl-label">Humidity</span>
            <span className="hl-val">{current.humidity}%</span>
          </div>
        </div>

        <div className="highlight-item">
          <div className="hl-icon"><Wind size={18} /></div>
          <div className="hl-text">
            <span className="hl-label">Wind</span>
            <span className="hl-val">{formatWindSpeed(current.windSpeed, unit)}</span>
          </div>
        </div>

        <div className="highlight-item">
          <div className="hl-icon"><Gauge size={18} /></div>
          <div className="hl-text">
            <span className="hl-label">Pressure</span>
            <span className="hl-val">{current.pressure} hPa</span>
          </div>
        </div>

        <div className="highlight-item">
          <div className="hl-icon"><Eye size={18} /></div>
          <div className="hl-text">
            <span className="hl-label">Visibility</span>
            <span className="hl-val">{current.visibility} km</span>
          </div>
        </div>

        <div className="highlight-item sun-item">
          <div className="hl-icon sunrise-icon"><Sunrise size={18} /></div>
          <div className="hl-text">
            <span className="hl-label">Sunrise</span>
            <span className="hl-val">{formatTime(current.sunrise)}</span>
          </div>
        </div>

        <div className="highlight-item sun-item">
          <div className="hl-icon sunset-icon"><Sunset size={18} /></div>
          <div className="hl-text">
            <span className="hl-label">Sunset</span>
            <span className="hl-val">{formatTime(current.sunset)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentWeather;
