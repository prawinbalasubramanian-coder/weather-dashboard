import React from 'react';
import { CloudSun, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-glass">
      <div className="footer-container">
        <div className="footer-brand-row">
          <div className="footer-title-wrap">
            <CloudSun size={20} className="footer-brand-icon" />
            <span className="footer-title">WeatherPulse</span>
            <span className="footer-dash">–</span>
            <span className="footer-subtitle">Real-Time Weather Dashboard</span>
          </div>

          <div className="footer-college-tag">
            <span>Modern Web Development Academic Project</span>
          </div>
        </div>

        <div className="footer-details-row">
          <p className="footer-attribution">
            Meteorological data provided by{' '}
            <a
              href="https://openweathermap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              OpenWeatherMap API
              <ExternalLink size={12} />
            </a>
            . Protected through server-side Node.js/Express proxy architecture.
          </p>

          <div className="footer-tech-badges">
            <span className="tech-badge">React 18</span>
            <span className="tech-badge">Express.js</span>
            <span className="tech-badge">Vite</span>
            <span className="tech-badge">REST API</span>
          </div>
        </div>

        <div className="footer-bottom-row">
          <span className="footer-copy">
            © {year} WeatherPulse. Built for demonstration, viva, and GitHub portfolio.
          </span>
          <span className="footer-secure">
            <ShieldCheck size={14} /> Zero Client API Key Exposure
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
