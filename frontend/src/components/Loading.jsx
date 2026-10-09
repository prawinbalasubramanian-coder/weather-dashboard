import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading = ({ message = 'Fetching real-time atmospheric data...' }) => {
  return (
    <div className="loading-container glass-card" role="status" aria-live="polite">
      <div className="loading-spinner-box">
        <Loader2 size={44} className="spin-animation loader-accent" />
      </div>
      <p className="loading-message">{message}</p>
      
      {/* Skeleton placeholders */}
      <div className="skeleton-grid">
        <div className="skeleton-card skeleton-hero pulse-shimmer" />
        <div className="skeleton-metrics-row">
          <div className="skeleton-card skeleton-metric pulse-shimmer" />
          <div className="skeleton-card skeleton-metric pulse-shimmer" />
          <div className="skeleton-card skeleton-metric pulse-shimmer" />
          <div className="skeleton-card skeleton-metric pulse-shimmer" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
