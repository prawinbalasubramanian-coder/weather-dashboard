import React from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      id="theme-toggle"
    >
      <div className={`theme-toggle-track ${isDark ? 'dark' : 'light'}`}>
        <span className="toggle-icon-wrap sun">
          <Sun size={15} />
        </span>
        <span className="toggle-icon-wrap moon">
          <Moon size={15} />
        </span>
        <span className="toggle-thumb" />
      </div>
    </button>
  );
};

export default ThemeToggle;
