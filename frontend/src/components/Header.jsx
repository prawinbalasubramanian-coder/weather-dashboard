import React from 'react';
import { Activity, CloudSun } from 'lucide-react';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import UnitToggle from './UnitToggle';
import LocationButton from './LocationButton';

export const Header = ({
  onSearch,
  loading,
  unit,
  onUnitToggle,
  theme,
  onThemeToggle,
  onLocationFound,
  onLocationError
}) => {
  return (
    <header className="header-glass">
      <div className="header-container">
        {/* Brand / Logo */}
        <div className="header-brand">
          <div className="logo-symbol">
            <CloudSun className="brand-icon" size={28} />
            <span className="pulse-indicator" title="Live meteorological feed active" />
          </div>
          <div className="brand-text">
            <h1 className="brand-title">WeatherPulse</h1>
            <span className="brand-subtitle">Real-Time Atmosphere</span>
          </div>
        </div>

        {/* Central Search Component */}
        <div className="header-search">
          <SearchBar onSearch={onSearch} loading={loading} />
        </div>

        {/* Right Action Controls */}
        <div className="header-controls">
          <LocationButton
            onLocationFound={onLocationFound}
            onError={onLocationError}
          />
          <UnitToggle unit={unit} onToggle={onUnitToggle} />
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </div>
    </header>
  );
};

export default Header;
