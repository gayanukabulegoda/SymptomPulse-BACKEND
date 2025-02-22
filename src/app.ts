import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import {config} from './config/config';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import symptomRoutes from './routes/symptom.routes';
import medicationRoutes from './routes/medication.routes';
import notificationRoutes from "./routes/notification.routes";
import {ApiError} from './utils/apiError';
import {errorConverter, errorHandler} from './middleware/error.middleware';
import {morganStream} from "./utils/logger";
import logger from "./utils/logger";

const app = express();

// Middleware pipeline
app.use(helmet());
app.use(
    cors({
        origin: config.CLIENT_URL,
        credentials: true
    })
);
app.use(morgan('combined', {stream: morganStream}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/symptoms', symptomRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Error handling
app.use((req, res, next) => {
    logger.error(`Not found - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    next(new ApiError(404, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

export default app;