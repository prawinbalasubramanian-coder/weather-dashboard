import React from 'react';

export const UnitToggle = ({ unit, onToggle }) => {
  return (
    <div className="unit-toggle-container" role="radiogroup" aria-label="Temperature unit selector">
      <button
        type="button"
        className={`unit-toggle-btn ${unit === 'C' ? 'active' : ''}`}
        onClick={() => onToggle('C')}
        aria-checked={unit === 'C'}
        role="radio"
        id="unit-celsius-btn"
      >
        °C
      </button>
      <button
        type="button"
        className={`unit-toggle-btn ${unit === 'F' ? 'active' : ''}`}
        onClick={() => onToggle('F')}
        aria-checked={unit === 'F'}
        role="radio"
        id="unit-fahrenheit-btn"
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
