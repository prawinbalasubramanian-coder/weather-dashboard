import axios from 'axios';

// Base API URL configured from environment variable or defaults to empty (which uses Vite /api proxy)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Fetch weather by city name from the Express backend
 * @param {string} city
 * @returns {Promise<Object>}
 */
export const fetchWeatherByCity = async (city) => {
  try {
    const response = await apiClient.get('/api/weather', {
      params: { city: city.trim() }
    });

    if (response.data && response.data.success) {
      return response.data.data;
    }

    throw new Error(response.data?.message || 'Failed to retrieve weather data.');
  } catch (error) {
    if (error.response) {
      const msg = error.response.data?.message || `Server error (${error.response.status})`;
      throw new Error(msg);
    } else if (error.request) {
      throw new Error('Backend server is unreachable. Please ensure the backend is running on port 5000.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred while requesting weather.');
    }
  }
};

/**
 * Fetch weather by geographical coordinates from Express backend
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<Object>}
 */
export const fetchWeatherByCoordinates = async (lat, lon) => {
  try {
    const response = await apiClient.get('/api/weather/coordinates', {
      params: { lat, lon }
    });

    if (response.data && response.data.success) {
      return response.data.data;
    }

    throw new Error(response.data?.message || 'Failed to retrieve weather by location.');
  } catch (error) {
    if (error.response) {
      const msg = error.response.data?.message || `Location weather error (${error.response.status})`;
      throw new Error(msg);
    } else if (error.request) {
      throw new Error('Backend server is unreachable. Please verify backend connection.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred with geolocation lookup.');
    }
  }
};

/**
 * Check backend connection and health status
 */
export const checkBackendHealth = async () => {
  try {
    const response = await apiClient.get('/api/health');
    return response.data;
  } catch (error) {
    return { success: false, status: 'offline', message: error.message };
  }
};
