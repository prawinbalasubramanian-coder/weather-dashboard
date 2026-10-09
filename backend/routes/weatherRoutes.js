import express from 'express';
import { getWeather, getWeatherByCoords, getHealth } from '../controllers/weatherController.js';

const router = express.Router();

// Routes
router.get('/weather', getWeather);
router.get('/weather/coordinates', getWeatherByCoords);
router.get('/health', getHealth);

export default router;
