import { getWeatherDataByCity, getWeatherDataByCoordinates } from '../services/weatherService.js';

/**
 * Controller: Get weather by city name
 * Route: GET /api/weather?city=Coimbatore
 */
export const getWeather = async (req, res, next) => {
  try {
    const { city } = req.query;

    if (!city || typeof city !== 'string' || city.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'City parameter is required. (e.g. ?city=Coimbatore)'
      });
    }

    const cleanCity = city.trim();
    if (cleanCity.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'City name exceeds allowable character limit.'
      });
    }

    const weatherData = await getWeatherDataByCity(cleanCity);

    return res.status(200).json({
      success: true,
      message: 'Weather data retrieved successfully',
      data: weatherData
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller: Get weather by geographical coordinates
 * Route: GET /api/weather/coordinates?lat=11.0168&lon=76.9558
 */
export const getWeatherByCoords = async (req, res, next) => {
  try {
    const { lat, lon } = req.query;

    if (lat === undefined || lon === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Both latitude (lat) and longitude (lon) parameters are required.'
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude must be valid numeric values.'
      });
    }

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({
        success: false,
        message: 'Latitude must be between -90 and 90, Longitude between -180 and 180.'
      });
    }

    const weatherData = await getWeatherDataByCoordinates(latitude, longitude);

    return res.status(200).json({
      success: true,
      message: 'Weather data retrieved successfully for coordinates',
      data: weatherData
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller: API Health check
 * Route: GET /api/health
 */
export const getHealth = (req, res) => {
  const hasKey = Boolean(process.env.WEATHER_API_KEY && process.env.WEATHER_API_KEY !== 'your_openweathermap_api_key');
  res.status(200).json({
    success: true,
    status: 'online',
    service: 'WeatherPulse Backend API',
    apiKeyConfigured: hasKey,
    timestamp: new Date().toISOString()
  });
};
