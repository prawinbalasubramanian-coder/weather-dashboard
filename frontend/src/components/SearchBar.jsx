import React, { useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

export const SearchBar = ({ onSearch, loading }) => {
  const [cityInput, setCityInput] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = cityInput.trim();

    if (!query) {
      setValidationError('Please enter a city name');
      return;
    }

    setValidationError('');
    onSearch(query);
  };

  const handleInputChange = (e) => {
    setCityInput(e.target.value);
    if (validationError) setValidationError('');
  };

  const handleClear = () => {
    setCityInput('');
    setValidationError('');
  };

  return (
    <div className="search-bar-wrapper">
      <form onSubmit={handleSubmit} className="search-bar-form" role="search">
        <div className="search-input-group">
          <Search size={18} className="search-icon-inside" aria-hidden="true" />
          <input
            type="text"
            className={`search-input ${validationError ? 'input-error' : ''}`}
            placeholder="Search city (e.g. Coimbatore, London, Tokyo)..."
            value={cityInput}
            onChange={handleInputChange}
            disabled={loading}
            aria-label="Search city"
            aria-invalid={!!validationError}
            id="city-search-input"
          />
          {cityInput && !loading && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={handleClear}
              aria-label="Clear input"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button
          type="submit"
          className="search-submit-btn"
          disabled={loading || !cityInput.trim()}
          aria-label="Search"
          id="city-search-submit"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="spin-animation" />
              <span>Searching</span>
            </>
          ) : (
            <span>Search</span>
          )}
        </button>
      </form>

      {validationError && (
        <span className="search-validation-msg" role="alert">
          {validationError}
        </span>
      )}
    </div>
  );
};

export default SearchBar;
