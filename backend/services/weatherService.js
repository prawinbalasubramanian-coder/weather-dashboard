import axios from 'axios';

const OWM_BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Get configured API Key
 */
const getApiKey = () => {
  return process.env.WEATHER_API_KEY;
};

/**
 * Check if the API key is a valid non-placeholder key
 */
const isValidApiKey = (key) => {
  return Boolean(
    key &&
    key.trim() !== '' &&
    key !== 'your_openweathermap_api_key' &&
    key !== 'your_api_key_here'
  );
};

/**
 * Helper to generate realistic simulated weather data for demo/evaluation
 * when API key has not yet been configured by the user.
 */
const generateDemoData = (cityName = 'Coimbatore', country = 'IN', lat = 11.0168, lon = 76.9558) => {
  const now = Math.floor(Date.now() / 1000);
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour >= 19;

  const baseTemp = 28.5;
  const condition = isNight ? 'Clear' : 'Partly Cloudy';
  const icon = isNight ? '01n' : '02d';

  // 8 slots for 24 hours (3-hour steps)
  const hourly = Array.from({ length: 8 }, (_, i) => {
    const time = new Date(Date.now() + i * 3 * 3600 * 1000);
    const itemHour = time.getHours();
    const itemIsNight = itemHour < 6 || itemHour >= 19;
    const tempDelta = Math.sin((itemHour - 8) / 4) * 4;
    return {
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dt: Math.floor(time.getTime() / 1000),
      temp: parseFloat((baseTemp + tempDelta).toFixed(1)),
      feelsLike: parseFloat((baseTemp + tempDelta + 1.2).toFixed(1)),
      condition: itemIsNight ? 'Clear' : (i % 3 === 0 ? 'Clouds' : 'Clear'),
      description: itemIsNight ? 'clear sky' : 'few clouds',
      icon: itemIsNight ? '01n' : (i % 3 === 0 ? '02d' : '01d'),
      pop: Math.round(Math.abs(Math.sin(i)) * 25),
      humidity: Math.round(62 + Math.cos(i) * 10),
      windSpeed: parseFloat((14.5 + Math.sin(i) * 3).toFixed(1))
    };
  });

  // 5 days
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daily = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(Date.now() + (i + 1) * 24 * 3600 * 1000);
    const conditions = ['Clear', 'Partly Cloudy', 'Scattered Clouds', 'Light Rain', 'Sunny'];
    const icons = ['01d', '02d', '03d', '10d', '01d'];
    return {
      day: days[date.getDay()],
      date: date.toLocaleDateString([], { month: 'short', day: 'numeric' }),
      tempMin: Math.round(22 + (i % 2)),
      tempMax: Math.round(32 - (i % 3)),
      condition: conditions[i % conditions.length],
      description: conditions[i % conditions.length].toLowerCase(),
      icon: icons[i % icons.length],
      humidity: 60 + i * 3,
      windSpeed: 12 + i * 2,
      rainChance: (i === 3 ? 65 : 15 + i * 5)
    };
  });

  return {
    isDemo: true,
    current: {
      city: cityName,
      country: country,
      temp: baseTemp,
      feelsLike: 30.1,
      tempMin: 23.0,
      tempMax: 33.0,
      humidity: 64,
      windSpeed: 13.8, // km/h
      windDeg: 120,
      pressure: 1012,
      visibility: 10, // km
      clouds: 25,
      uvIndex: isNight ? 0 : 6.8,
      sunrise: new Date().setHours(6, 12, 0, 0) / 1000,
      sunset: new Date().setHours(18, 25, 0, 0) / 1000,
      dt: now,
      condition: condition,
      description: isNight ? 'clear night sky' : 'pleasant partly cloudy',
      icon: icon,
      isNight: isNight
    },
    hourly,
    daily,
    coordinates: {
      lat: parseFloat(lat),
      lon: parseFloat(lon)
    }
  };
};

/**
 * Transforms OpenWeatherMap raw responses into a clean structured payload
 */
const formatWeatherData = (currentRes, forecastRes) => {
  const current = currentRes.data;
  const forecast = forecastRes ? forecastRes.data : null;

  const now = current.dt || Math.floor(Date.now() / 1000);
  const sunrise = current.sys?.sunrise || now;
  const sunset = current.sys?.sunset || now;
  const isNight = now < sunrise || now > sunset;

  // Format Current
  const formattedCurrent = {
    city: current.name,
    country: current.sys?.country || '',
    temp: Math.round(current.main.temp * 10) / 10,
    feelsLike: Math.round(current.main.feels_like * 10) / 10,
    tempMin: Math.round(current.main.temp_min * 10) / 10,
    tempMax: Math.round(current.main.temp_max * 10) / 10,
    humidity: current.main.humidity,
    windSpeed: Math.round((current.wind.speed * 3.6) * 10) / 10, // convert m/s to km/h
    windDeg: current.wind.deg || 0,
    pressure: current.main.pressure,
    visibility: current.visibility ? Math.round(current.visibility / 100) / 10 : 10, // meters to km
    clouds: current.clouds?.all || 0,
    uvIndex: Math.max(0, Math.min(11, Math.round((1 - (current.clouds?.all || 0) / 100) * 8 * 10) / 10)), // estimated standard UV
    sunrise: sunrise,
    sunset: sunset,
    dt: now,
    condition: current.weather[0]?.main || 'Clear',
    description: current.weather[0]?.description || '',
    icon: current.weather[0]?.icon || '01d',
    isNight
  };

  // Format Hourly (First 8 forecast points = next 24 hours, 3h intervals)
  let formattedHourly = [];
  if (forecast && forecast.list) {
    formattedHourly = forecast.list.slice(0, 8).map((item) => {
      const timeDate = new Date(item.dt * 1000);
      return {
        time: timeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dt: item.dt,
        temp: Math.round(item.main.temp * 10) / 10,
        feelsLike: Math.round(item.main.feels_like * 10) / 10,
        condition: item.weather[0]?.main || 'Clear',
        description: item.weather[0]?.description || '',
        icon: item.weather[0]?.icon || '01d',
        pop: Math.round((item.pop || 0) * 100), // Probability of precipitation %
        humidity: item.main.humidity,
        windSpeed: Math.round((item.wind.speed * 3.6) * 10) / 10 // km/h
      };
    });
  }

  // Format 5-Day Daily Forecast
  // OpenWeatherMap free forecast gives 40 records (every 3 hours for 5 days).
  // Group by day to calculate accurate daily highs, lows, and midday conditions.
  const dailyMap = {};
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  if (forecast && forecast.list) {
    forecast.list.forEach((item) => {
      const dateObj = new Date(item.dt * 1000);
      const dateKey = dateObj.toISOString().split('T')[0];

      if (!dailyMap[dateKey]) {
        dailyMap[dateKey] = {
          day: dayNames[dateObj.getDay()],
          date: dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' }),
          rawDate: dateKey,
          temps: [],
          humidities: [],
          windSpeeds: [],
          pops: [],
          conditions: []
        };
      }

      dailyMap[dateKey].temps.push(item.main.temp);
      dailyMap[dateKey].humidities.push(item.main.humidity);
      dailyMap[dateKey].windSpeeds.push(item.wind.speed * 3.6);
      dailyMap[dateKey].pops.push((item.pop || 0) * 100);
      dailyMap[dateKey].conditions.push({
        condition: item.weather[0]?.main || 'Clear',
        description: item.weather[0]?.description || '',
        icon: item.weather[0]?.icon || '01d',
        hour: dateObj.getHours()
      });
    });
  }

  // Convert map to sorted array of 5 days (excluding today or starting from tomorrow)
  const todayKey = new Date().toISOString().split('T')[0];
  const formattedDaily = Object.keys(dailyMap)
    .filter((key) => key !== todayKey || Object.keys(dailyMap).length <= 5)
    .slice(0, 5)
    .map((key) => {
      const entry = dailyMap[key];
      const minTemp = Math.min(...entry.temps);
      const maxTemp = Math.max(...entry.temps);
      // Pick midday condition (closest to 12:00) or most frequent
      const midDayCond = entry.conditions.reduce((prev, curr) => {
        return Math.abs(curr.hour - 12) < Math.abs(prev.hour - 12) ? curr : prev;
      }, entry.conditions[0]);

      const avgHumidity = Math.round(
        entry.humidities.reduce((a, b) => a + b, 0) / entry.humidities.length
      );
      const avgWind = Math.round(
        entry.windSpeeds.reduce((a, b) => a + b, 0) / entry.windSpeeds.length
      );
      const maxPop = Math.round(Math.max(...entry.pops));

      return {
        day: entry.day,
        date: entry.date,
        tempMin: Math.round(minTemp),
        tempMax: Math.round(maxTemp),
        condition: midDayCond.condition,
        description: midDayCond.description,
        icon: midDayCond.icon.replace('n', 'd'), // display day icon for 5-day cards
        humidity: avgHumidity,
        windSpeed: avgWind,
        rainChance: maxPop
      };
    });

  return {
    isDemo: false,
    current: formattedCurrent,
    hourly: formattedHourly,
    daily: formattedDaily,
    coordinates: {
      lat: current.coord?.lat,
      lon: current.coord?.lon
    }
  };
};

/**
 * Fetch weather by City name
 */
export const getWeatherDataByCity = async (cityName) => {
  const apiKey = getApiKey();

  if (!isValidApiKey(apiKey)) {
    console.warn(`[WeatherService] WEATHER_API_KEY is not configured or placeholder. Serving simulated response for "${cityName}".`);
    return generateDemoData(cityName, 'IN');
  }

  try {
    const [currentRes, forecastRes] = await Promise.all([
      axios.get(`${OWM_BASE_URL}/weather`, {
        params: {
          q: cityName,
          appid: apiKey,
          units: 'metric'
        },
        timeout: 8000
      }),
      axios.get(`${OWM_BASE_URL}/forecast`, {
        params: {
          q: cityName,
          appid: apiKey,
          units: 'metric'
        },
        timeout: 8000
      })
    ]);

    return formatWeatherData(currentRes, forecastRes);
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        const notFoundError = new Error(`City "${cityName}" not found. Please verify spelling.`);
        notFoundError.statusCode = 404;
        throw notFoundError;
      }
      if (status === 401) {
        console.warn(`[WeatherService] 401 Invalid OpenWeatherMap API key. Serving fallback preview.`);
        return generateDemoData(cityName, 'IN');
      }
      const apiError = new Error(error.response.data?.message || 'OpenWeatherMap service error');
      apiError.statusCode = status;
      throw apiError;
    }
    const networkError = new Error('Network error connecting to OpenWeatherMap service.');
    networkError.statusCode = 503;
    throw networkError;
  }
};

/**
 * Fetch weather by Geographical Coordinates (lat, lon)
 */
export const getWeatherDataByCoordinates = async (lat, lon) => {
  const apiKey = getApiKey();

  if (!isValidApiKey(apiKey)) {
    console.warn(`[WeatherService] WEATHER_API_KEY is not configured. Serving simulated response for coordinates (${lat}, ${lon}).`);
    return generateDemoData('My Location', 'LOC', lat, lon);
  }

  try {
    const [currentRes, forecastRes] = await Promise.all([
      axios.get(`${OWM_BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: apiKey,
          units: 'metric'
        },
        timeout: 8000
      }),
      axios.get(`${OWM_BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: apiKey,
          units: 'metric'
        },
        timeout: 8000
      })
    ]);

    return formatWeatherData(currentRes, forecastRes);
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        return generateDemoData('My Location', 'LOC', lat, lon);
      }
      const apiError = new Error(error.response.data?.message || 'Weather service coordinates error');
      apiError.statusCode = status;
      throw apiError;
    }
    const networkError = new Error('Network error connecting to Weather service.');
    networkError.statusCode = 503;
    throw networkError;
  }
};
