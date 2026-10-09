import React from 'react';
import { CalendarDays, Umbrella, Droplets, Wind } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { formatTemp } from '../utils/weatherUtils';

export const DailyForecast = ({ daily = [], unit = 'C' }) => {
  if (!daily || daily.length === 0) return null;

  return (
    <section className="daily-forecast-section glass-card" aria-label="5-Day Weather Forecast">
      <div className="section-header-row">
        <div className="section-title-wrap">
          <CalendarDays size={18} className="section-header-icon" />
          <h3 className="section-title">5-Day Forecast</h3>
        </div>
        <span className="forecast-range-badge">Daily Outlook</span>
      </div>

      <div className="daily-forecast-list">
        {daily.map((item, index) => {
          return (
            <div key={item.date || index} className="daily-row-card">
              {/* Day & Date */}
              <div className="daily-date-col">
                <span className="daily-day-name">{index === 0 ? 'Tomorrow' : item.day}</span>
                <span className="daily-date-sub">{item.date}</span>
              </div>

              {/* Weather Condition Icon & Text */}
              <div className="daily-condition-col">
                <WeatherIcon
                  condition={item.condition}
                  iconCode={item.icon}
                  size={32}
                  className="daily-weather-icon"
                />
                <span className="daily-condition-name">{item.condition}</span>
              </div>

              {/* Rain / Humidity stats */}
              <div className="daily-metrics-col">
                {item.rainChance > 0 ? (
                  <span className="daily-pop-pill" title="Precipitation Probability">
                    <Umbrella size={12} />
                    <span>{item.rainChance}%</span>
                  </span>
                ) : (
                  <span className="daily-humidity-pill" title="Humidity">
                    <Droplets size={12} />
                    <span>{item.humidity}%</span>
                  </span>
                )}
              </div>

              {/* Temperature Range (Min / Max with visual bar) */}
              <div className="daily-temp-col">
                <span className="temp-min-text">{formatTemp(item.tempMin, unit)}</span>
                <div className="temp-range-bar-track">
                  <div
                    className="temp-range-bar-fill"
                    style={{
                      left: '15%',
                      right: '15%'
                    }}
                  />
                </div>
                <span className="temp-max-text">{formatTemp(item.tempMax, unit)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DailyForecast;
