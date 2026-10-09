import React from 'react';
import {
  Droplets,
  Wind,
  Gauge,
  Eye,
  Sun,
  Cloud,
  Compass
} from 'lucide-react';
import {
  formatWindSpeed,
  getWindDirection,
  getUvRiskLevel
} from '../utils/weatherUtils';

/**
 * Reusable Meteorological Detail Card Component
 */
const DetailCard = ({ icon: Icon, label, value, unit = '', subText, badgeText, badgeColor }) => (
  <div className="weather-detail-card glass-card">
    <div className="card-top">
      <div className="card-icon-wrap">
        <Icon size={20} className="detail-card-icon" />
      </div>
      <span className="card-label">{label}</span>
      {badgeText && (
        <span
          className="card-badge"
          style={{ backgroundColor: badgeColor ? `${badgeColor}25` : undefined, color: badgeColor }}
        >
          {badgeText}
        </span>
      )}
    </div>

    <div className="card-value-wrap">
      <span className="card-value">{value}</span>
      {unit && <span className="card-unit">{unit}</span>}
    </div>

    {subText && <p className="card-subtext">{subText}</p>}
  </div>
);

export const WeatherDetails = ({ weather, unit }) => {
  if (!weather || !weather.current) return null;

  const { current } = weather;
  const windDir = getWindDirection(current.windDeg);
  const uvInfo = getUvRiskLevel(current.uvIndex || 0);

  // Interpretation helpers
  const humidityNote =
    current.humidity > 70
      ? 'High humidity – feels muggy'
      : current.humidity < 35
      ? 'Low humidity – dry air'
      : 'Normal comfortable level';

  const visibilityNote =
    current.visibility >= 10
      ? 'Perfect crystal clear vision'
      : current.visibility >= 5
      ? 'Good atmospheric visibility'
      : 'Hazy or restricted visibility';

  const pressureNote =
    current.pressure > 1020
      ? 'High pressure (fair weather)'
      : current.pressure < 1005
      ? 'Low pressure (storm tendency)'
      : 'Standard atmospheric pressure';

  return (
    <section className="weather-details-section" aria-label="Detailed Weather Metrics">
      <h3 className="section-title">Atmospheric Metrics</h3>

      <div className="details-grid">
        {/* Humidity Card */}
        <DetailCard
          icon={Droplets}
          label="Humidity"
          value={current.humidity}
          unit="%"
          subText={humidityNote}
          badgeText={current.humidity > 60 ? 'Humid' : 'Comfortable'}
        />

        {/* Wind Speed & Direction Card */}
        <DetailCard
          icon={Wind}
          label="Wind Velocity"
          value={formatWindSpeed(current.windSpeed, unit)}
          subText={`Direction: ${windDir} (${current.windDeg}°)`}
          badgeText={windDir}
        />

        {/* Atmospheric Pressure Card */}
        <DetailCard
          icon={Gauge}
          label="Barometric Pressure"
          value={current.pressure}
          unit="hPa"
          subText={pressureNote}
        />

        {/* Visibility Card */}
        <DetailCard
          icon={Eye}
          label="Visibility"
          value={current.visibility}
          unit="km"
          subText={visibilityNote}
          badgeText={current.visibility >= 9 ? 'Clear' : 'Moderate'}
        />

        {/* UV Index Card */}
        <DetailCard
          icon={Sun}
          label="UV Radiation"
          value={current.uvIndex !== undefined ? current.uvIndex : '--'}
          subText={uvInfo.advice}
          badgeText={uvInfo.level}
          badgeColor={uvInfo.color}
        />

        {/* Cloud Cover Card */}
        <DetailCard
          icon={Cloud}
          label="Cloud Coverage"
          value={current.clouds !== undefined ? current.clouds : 0}
          unit="%"
          subText={
            current.clouds > 80
              ? 'Heavy overcast skies'
              : current.clouds > 40
              ? 'Partly covered skies'
              : 'Clear or sunny sky'
          }
        />
      </div>
    </section>
  );
};

export default WeatherDetails;
