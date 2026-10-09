import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export const ErrorMessage = ({ message, onRetry }) => {
  if (!message) return null;

  return (
    <div className="error-banner glass-card" role="alert">
      <div className="error-content">
        <div className="error-icon-box">
          <AlertCircle size={28} className="error-icon" />
        </div>
        <div className="error-details">
          <h4 className="error-title">Unable to Load Weather</h4>
          <p className="error-text">{message}</p>
        </div>
      </div>

      {onRetry && (
        <button
          type="button"
          className="error-retry-btn"
          onClick={onRetry}
          aria-label="Retry loading weather"
        >
          <RotateCcw size={16} />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
