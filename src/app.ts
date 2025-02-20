import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import {config} from './config/config';
import cookieParser from 'cookie-parser';
// import authRoutes from './routes/auth.routes';
// import symptomRoutes from './routes/symptom.routes';
// import medicationRoutes from './routes/medication.routes';
import {ApiError} from './utils/ApiError';
// import { errorConverter, errorHandler } from './middleware/error.middleware';

const app = express();

// ======================
// Middleware Setup
// ======================
app.use(helmet());
app.use(
    cors({
        origin: config.CLIENT_URL,
        credentials: true
    })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// ======================
// API Routes
// ======================
// app.use('/api/auth', authRoutes);
// app.use('/api/symptoms', symptomRoutes);
// app.use('/api/medications', medicationRoutes);

// ======================
// Health Check Endpoint
// ======================
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// ======================
// Error Handling
// ======================
app.use((req, res, next) => {
    next(new ApiError(404, 'Not found'));
});

// app.use(errorConverter);
// app.use(errorHandler);

export default app;