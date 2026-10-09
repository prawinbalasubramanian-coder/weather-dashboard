import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock, Umbrella } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { formatTemp } from '../utils/weatherUtils';

export const HourlyForecast = ({ hourly = [], unit = 'C' }) => {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (!hourly || hourly.length === 0) return null;

  return (
    <section className="hourly-forecast-section glass-card" aria-label="Hourly Forecast">
      <div className="section-header-row">
        <div className="section-title-wrap">
          <Clock size={18} className="section-header-icon" />
          <h3 className="section-title">24-Hour Forecast</h3>
        </div>
        <div className="scroll-controls" aria-label="Scroll hourly forecast">
          <button
            type="button"
            className="scroll-btn"
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="scroll-btn"
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="hourly-scroll-container" ref={scrollContainerRef}>
        {hourly.map((item, index) => {
          const isNow = index === 0;
          return (
            <div
              key={item.dt || index}
              className={`hourly-card ${isNow ? 'hourly-card-active' : ''}`}
            >
              <span className="hourly-time">{isNow ? 'Now' : item.time}</span>
              <div className="hourly-icon-wrap">
                <WeatherIcon
                  condition={item.condition}
                  iconCode={item.icon}
                  size={36}
                  className="hourly-icon"
                />
              </div>
              <span className="hourly-temp">{formatTemp(item.temp, unit)}</span>
              <span className="hourly-condition">{item.condition}</span>

              {item.pop > 0 && (
                <div className="hourly-pop" title="Precipitation chance">
                  <Umbrella size={12} />
                  <span>{item.pop}%</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HourlyForecast;
