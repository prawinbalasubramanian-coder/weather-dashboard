import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchWeatherByCity, fetchWeatherByCoordinates } from '../services/weatherService';

const DEFAULT_CITY = 'Coimbatore';
const AUTO_REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes

/**
 * Custom React Hook to manage Weather state, caching, search and periodic refreshes
 */
export const useWeather = (initialCity = DEFAULT_CITY) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // Track current query target: either city name or coordinates
  const currentTargetRef = useRef({ type: 'city', city: initialCity, coords: null });

  /**
   * Core fetch handler by city
   */
  const loadWeatherByCity = useCallback(async (cityName, isBackground = false) => {
    if (!cityName || !cityName.trim()) return;

    if (isBackground) {
      setRefreshing(true);
    } else {
      setLoading(true);
      setError(null);
    }

    try {
      const data = await fetchWeatherByCity(cityName);
      setWeatherData(data);
      setLastUpdated(new Date());
      setError(null);
      currentTargetRef.current = { type: 'city', city: cityName, coords: null };
    } catch (err) {
      console.error('[useWeather] Error fetching city weather:', err);
      setError(err.message || 'Unable to load weather data. Please check the city name or try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  /**
   * Core fetch handler by coordinates
   */
  const loadWeatherByCoordinates = useCallback(async (lat, lon, isBackground = false) => {
    if (lat === undefined || lon === undefined) return;

    if (isBackground) {
      setRefreshing(true);
    } else {
      setLoading(true);
      setError(null);
    }

    try {
      const data = await fetchWeatherByCoordinates(lat, lon);
      setWeatherData(data);
      setLastUpdated(new Date());
      setError(null);
      currentTargetRef.current = { type: 'coords', city: data.current.city, coords: { lat, lon } };
    } catch (err) {
      console.error('[useWeather] Error fetching coordinates weather:', err);
      setError(err.message || 'Unable to retrieve weather for your coordinates.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  /**
   * Manual refresh trigger
   */
  const refresh = useCallback(() => {
    const target = currentTargetRef.current;
    if (target.type === 'coords' && target.coords) {
      loadWeatherByCoordinates(target.coords.lat, target.coords.lon, true);
    } else {
      loadWeatherByCity(target.city || DEFAULT_CITY, true);
    }
  }, [loadWeatherByCity, loadWeatherByCoordinates]);

  /**
   * Initial data load for default city (Coimbatore)
   */
  useEffect(() => {
    loadWeatherByCity(initialCity);
  }, [initialCity, loadWeatherByCity]);

  /**
   * Periodic automatic refresh every 10 minutes
   */
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('[useWeather] Auto-refreshing weather data...');
      refresh();
    }, AUTO_REFRESH_INTERVAL);

    // Clean up timer on unmount
    return () => clearInterval(timer);
  }, [refresh]);

  return {
    weatherData,
    loading,
    refreshing,
    error,
    lastUpdated,
    searchCity: (city) => loadWeatherByCity(city, false),
    searchCoordinates: (lat, lon) => loadWeatherByCoordinates(lat, lon, false),
    refresh
  };
};
