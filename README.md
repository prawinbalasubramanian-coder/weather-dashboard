# WeatherPulse – Real-Time Weather Dashboard

[![React](https://img.shields.io/badge/React-18.3-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-000000.svg?logo=express&logoColor=white)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933.svg?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A modern, full-stack, real-time meteorological dashboard built for a **Modern Web Development college project**. Demonstrates end-to-end frontend and backend architecture, secure server-side API proxying, responsive glassmorphism UI, and real-time atmospheric data visualization.

---

## 🏛️ System Architecture

WeatherPulse implements a secure three-tier architecture ensuring the client browser never directly exposes external API keys:

```
┌──────────────────────────────────────────────┐
│                  Client                      │
│        React.js (Vite) + Lucide Icons        │
│   (State, Hooks, LocalStorage, Geolocation)  │
└──────────────────────┬───────────────────────┘
                       │
                       │ REST API Requests (/api/weather)
                       ▼
┌──────────────────────────────────────────────┐
│              Backend Service                 │
│         Node.js + Express + CORS             │
│   (API Key Shielding, Input Validation,      │
│    Data Transformation, Error Middleware)    │
└──────────────────────┬───────────────────────┘
                       │
                       │ Secured API Calls with Server Secret
                       ▼
┌──────────────────────────────────────────────┐
│           External Weather Provider          │
│             OpenWeatherMap API               │
└──────────────────────────────────────────────┘
```

---

## ✨ Features

- 🔍 **City Search**: Instant lookup for any worldwide city with Enter key support, input validation, and clear button.
- 📍 **Default City**: Automatically initializes with **Coimbatore, India** on launch without manual search.
- 🎯 **Geolocation Support**: One-tap **"Use My Location"** button utilizing the browser's Geolocation API.
- 🌡️ **Dual Temperature Units**: Instant switching between Celsius (**°C**) and Fahrenheit (**°F**) updating all current, hourly, and 5-day statistics dynamically without page reloads.
- 🌓 **Theme Customization**: Sleek **Light Mode** and **Dark Mode** toggle with persistent user preference stored in `localStorage`.
- 🎨 **Dynamic Atmospheric Backgrounds**: Ambient gradients and glowing background accents dynamically react to current weather (Clear, Clouds, Rain, Thunderstorm, Snow, Night).
- 📊 **Hero Weather Card**: Prominently displays temperature, feels-like, highs/lows, condition badge, observation timestamp, and favorite bookmark button.
- 📈 **Atmospheric Metrics**: Dedicated cards for Humidity, Wind Velocity & Direction, Barometric Pressure, Atmospheric Visibility, UV Index, and Cloud Coverage.
- ⏱️ **24-Hour Hourly Forecast**: Smooth, horizontally scrollable cards detailing temperature, conditions, and precipitation probability for the next 24 hours.
- 📅 **5-Day Outlook**: Daily weather forecast featuring min/max range bars, weather condition icons, and rain probabilities.
- 💖 **Favorite Cities**: Bookmark favorite locations to `localStorage` with quick one-click weather switching and easy removal.
- 🔄 **Real-Time Periodic Synchronization**: Automatic background weather refresh approximately every 10 minutes, plus a manual refresh button with spinning status indicator and "Last Updated" timestamp.
- 🛡️ **Zero API Key Exposure**: Sensitive API credentials remain strictly confined to the backend server.
- 📱 **Fully Responsive Glassmorphic Design**: Built with pure CSS3 and responsive breakpoints optimized for Mobile, Tablet, Laptop, and Desktop.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18
- **Tooling**: Vite
- **Styling**: Vanilla CSS3 (Custom Glassmorphism Design System, CSS Variables, Flexbox & CSS Grid)
- **Icons**: Lucide React (`lucide-react`)
- **HTTP Client**: Axios
- **State Management**: React Hooks (`useState`, `useEffect`, `useCallback`, `useRef`, Custom Hook `useWeather`)
- **Browser APIs**: `localStorage`, Geolocation API

### Backend
- **Runtime**: Node.js
- **Server Framework**: Express.js
- **Middleware**: CORS, Express JSON, Custom Centralized Error Handler
- **HTTP Client**: Axios
- **Configuration**: dotenv

### External API
- **Provider**: OpenWeatherMap API (Current Weather & 5-Day/3-Hour Forecast Endpoints)

---

## 📁 Project Directory Structure

```text
weather-dashboard/
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg                  # Vector weather pulse icon
│   ├── src/
│   │   ├── components/
│   │   │   ├── CurrentWeather.jsx       # Large hero weather conditions card
│   │   │   ├── DailyForecast.jsx        # 5-day weather outlook
│   │   │   ├── ErrorMessage.jsx         # User-friendly error notification
│   │   │   ├── FavoriteCities.jsx       # Bookmarked cities chip list
│   │   │   ├── Footer.jsx               # Project credits & API attribution
│   │   │   ├── Header.jsx               # Brand logo, search, and global toggles
│   │   │   ├── HourlyForecast.jsx       # 24-hour horizontal forecast cards
│   │   │   ├── Loading.jsx              # Skeleton loaders & loading animations
│   │   │   ├── LocationButton.jsx       # Browser geolocation trigger
│   │   │   ├── SearchBar.jsx            # Validated search form with enter support
│   │   │   ├── ThemeToggle.jsx          # Light / Dark mode toggle switch
│   │   │   ├── UnitToggle.jsx           # °C / °F temperature unit toggle
│   │   │   ├── WeatherDetails.jsx       # 6 atmospheric parameter cards
│   │   │   └── WeatherIcon.jsx          # Dynamic Lucide icon mapper
│   │   ├── hooks/
│   │   │   └── useWeather.js            # Custom React hook for weather state
│   │   ├── pages/
│   │   │   └── Dashboard.jsx            # Main dashboard container page
│   │   ├── services/
│   │   │   └── weatherService.js        # Frontend client API service
│   │   ├── utils/
│   │   │   └── weatherUtils.js          # Unit conversions and weather helpers
│   │   ├── App.jsx                      # App root with theme & background state
│   │   ├── index.css                    # Glassmorphism design tokens & styles
│   │   └── main.jsx                     # React DOM entrypoint
│   ├── .env.example                     # Frontend environment template
│   ├── index.html                       # HTML5 template with fonts & metadata
│   ├── package.json                     # Frontend dependencies
│   └── vite.config.js                   # Vite configuration with /api proxy
│
├── backend/
│   ├── controllers/
│   │   └── weatherController.js         # Request validation & responses
│   ├── middleware/
│   │   └── errorHandler.js              # Centralized error handler
│   ├── routes/
│   │   └── weatherRoutes.js             # REST API route declarations
│   ├── services/
│   │   └── weatherService.js            # OpenWeatherMap requests & transformers
│   ├── .env.example                     # Backend environment template
│   ├── package.json                     # Backend dependencies
│   └── server.js                        # Express server entry point
│
├── api/
│   └── index.js                         # Vercel serverless function entrypoint
├── .gitignore                           # Ignores node_modules, dist, and .env
├── package.json                         # Workspace script runner
├── README.md                            # Complete project documentation
└── vercel.json                          # Vercel deployment configuration
```

---

## 🚀 Installation & Local Setup

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed on your system.

### 2. Clone or Navigate to Project
```bash
cd weather-dashboard
```

### 3. Install Dependencies
Run the workspace script to install dependencies for both frontend and backend:
```bash
npm run install:all
```
*(Or manually run `npm install` inside both `frontend/` and `backend/` directories).*

### 4. Configure Backend Environment
Create a `.env` file inside the `backend/` directory:

```bash
# In backend/.env
WEATHER_API_KEY=your_openweathermap_api_key_here
PORT=5000
```
> **How to obtain a free key**: Visit [OpenWeatherMap](https://openweathermap.org/api) and register for a free account to receive an API key.
>
> *(Note: If no API key is set or before activation, the backend automatically serves realistic demonstration data so you can test and showcase the full UI immediately without a broken screen).*

---

## 💻 Running the Application

### Option A: Run Both (Recommended)

1. **Start the Express Backend** (in terminal 1):
   ```bash
   npm run dev:backend
   ```
   *Backend runs on `http://localhost:5000`*

2. **Start the React Frontend** (in terminal 2):
   ```bash
   npm run dev:frontend
   ```
   *Frontend opens on `http://localhost:3000`*

### Option B: Run From Specific Folders
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

---

## 🔌 Backend REST API Endpoints

| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/health` | None | Service status and API configuration health |
| `GET` | `/api/weather` | `?city=CityName` | Retrieves current weather, hourly forecast, and 5-day outlook for the city |
| `GET` | `/api/weather/coordinates` | `?lat=11.0168&lon=76.9558` | Retrieves weather and forecasts for GPS coordinates |

### Sample Response Format
```json
{
  "success": true,
  "message": "Weather data retrieved successfully",
  "data": {
    "isDemo": false,
    "current": {
      "city": "Coimbatore",
      "country": "IN",
      "temp": 28.5,
      "feelsLike": 30.1,
      "humidity": 64,
      "windSpeed": 13.8,
      "windDeg": 120,
      "pressure": 1012,
      "visibility": 10,
      "clouds": 25,
      "uvIndex": 6.8,
      "sunrise": 1728261720,
      "sunset": 1728305100,
      "condition": "Clouds",
      "description": "scattered clouds",
      "icon": "03d",
      "isNight": false
    },
    "hourly": [...],
    "daily": [...],
    "coordinates": { "lat": 11.0168, "lon": 76.9558 }
  }
}
```

---

## 📦 Production Build

To test and create an optimized production build of the frontend:

```bash
npm run build:frontend
```
The compiled, production-ready static assets will be output to `frontend/dist/`.

---

## 🐙 Pushing to GitHub

1. Initialize git in the project root:
   ```bash
   git init
   ```
2. Verify that `.env` files are ignored:
   ```bash
   git status
   ```
   *(Ensure `backend/.env`, `frontend/.env`, and all `node_modules/` are NOT staged).*
3. Stage all files:
   ```bash
   git add .
   ```
4. Commit your changes:
   ```bash
   git commit -m "Initial commit: WeatherPulse full-stack weather dashboard"
   ```
5. Create a new repository on [GitHub](https://github.com/new).
6. Link your local repository and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/weather-dashboard.git
   git push -u origin main
   ```

---

## 🌐 Deploying to Vercel

WeatherPulse includes built-in configurations (`vercel.json` and `api/index.js`) for seamless deployment.

### Steps to Deploy:
1. Push your project to **GitHub**.
2. Log in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your **weather-dashboard** GitHub repository.
4. Set the **Framework Preset** to `Vite`.
5. Under **Environment Variables**, add:
   - `WEATHER_API_KEY`: Your OpenWeatherMap API Key
   - `VITE_API_BASE_URL`: (Leave empty if deploying as Vercel Serverless, or set to your deployed backend URL if hosting backend separately on Render/Railway).
6. Click **Deploy**.
7. Once deployed, open the production URL and verify live weather searches!

---

## 🎓 Academic Demonstration & Viva Points

For your **Modern Web Development college presentation and viva**, highlight these key technical points:

1. **Why Full-Stack instead of Client-Only?**
   - Directly calling third-party APIs with a private key in React bundle code exposes the key to anyone inspecting browser network traffic. The Express backend acts as an authenticated proxy shield.
2. **React Hooks Utilization**:
   - `useState`: Manages dynamic UI state (weather data, unit, theme, active favorites, loading spinners).
   - `useEffect`: Manages side effects (fetching Coimbatore on initial render, synchronizing `localStorage`, setting document attributes, setting up and tearing down the 10-minute refresh timer).
   - `useCallback` & `useRef`: Prevents unnecessary function recreation and tracks active query target across automatic refresh cycles.
   - Custom Hook (`useWeather`): Encapsulates all fetching, periodic refresh, and error handling logic, keeping presentation components clean and modular.
3. **Responsive Design & Modern CSS**:
   - Implemented without third-party bloated CSS frameworks. Utilizes native CSS variables, CSS Grid, Flexbox, backdrop-filter glassmorphism, and media queries for fluid responsive performance.
4. **Resilience & Graceful Degradation**:
   - Handles network downtime, city not found (404), invalid inputs, geolocation rejection, and missing API keys gracefully with clear user feedback.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
