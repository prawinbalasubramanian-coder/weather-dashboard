import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import weatherRoutes from './routes/weatherRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Resolve current directory for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from cwd, backend directory, or root
dotenv.config();
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow frontend access from localhost and deployment URLs
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// API Routes (mount on both /api and / to handle Vercel rewrites and direct server access)
app.use('/api', weatherRoutes);
app.use('/', weatherRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'WeatherPulse Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      weatherByCity: '/api/weather?city={cityName}',
      weatherByCoordinates: '/api/weather/coordinates?lat={lat}&lon={lon}'
    }
  });
});

// 404 Catch-All
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start server when executed directly (skip when invoked in Vercel serverless environment)
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(` WeatherPulse Backend Server Running `);
    console.log(` URL: http://localhost:${PORT}`);
    console.log(` Health: http://localhost:${PORT}/api/health`);
    console.log(` Weather: http://localhost:${PORT}/api/weather?city=Coimbatore`);
    console.log(`===============================================`);
  });
}

export default app;
