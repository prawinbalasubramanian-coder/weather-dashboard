import React from 'react';
import { Heart, X, MapPin } from 'lucide-react';

export const FavoriteCities = ({
  favorites = [],
  currentCity = '',
  onSelectCity,
  onRemoveFavorite
}) => {
  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-empty-container glass-card">
        <div className="fav-empty-content">
          <Heart size={18} className="fav-empty-icon" />
          <span>No favorite cities saved yet. Tap the heart icon next to any city to save it!</span>
        </div>
      </div>
    );
  }

  return (
    <section className="favorites-section glass-card" aria-label="Favorite Cities">
      <div className="favorites-header">
        <div className="fav-title-wrap">
          <Heart size={18} className="fav-header-icon" fill="currentColor" />
          <h3 className="section-title">Saved Locations</h3>
        </div>
        <span className="fav-count-badge">{favorites.length} saved</span>
      </div>

      <div className="favorites-list" role="list">
        {favorites.map((cityName) => {
          const isActive = currentCity.toLowerCase() === cityName.toLowerCase();
          return (
            <div
              key={cityName}
              className={`favorite-chip ${isActive ? 'favorite-chip-active' : ''}`}
              role="listitem"
            >
              <button
                type="button"
                className="fav-chip-select-btn"
                onClick={() => onSelectCity(cityName)}
                aria-label={`Load weather for ${cityName}`}
                title={`Click to view weather for ${cityName}`}
              >
                <MapPin size={14} className="chip-pin-icon" />
                <span className="chip-name">{cityName}</span>
              </button>

              <button
                type="button"
                className="fav-chip-remove-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFavorite(cityName);
                }}
                aria-label={`Remove ${cityName} from favorites`}
                title={`Remove ${cityName}`}
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FavoriteCities;
