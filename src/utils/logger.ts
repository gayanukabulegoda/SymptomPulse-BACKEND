import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import {config} from '../config/config';

const {combine, timestamp, printf, colorize, errors} = winston.format;

// Custom log format
const logFormat = printf(({level, message, timestamp, stack}) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

// Configure transports
const transports: winston.transport[] = [
    new DailyRotateFile({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        level: 'info'
    }),
    new DailyRotateFile({
        filename: 'logs/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d',
        level: 'error'
    })
];

if (config.NODE_ENV !== 'production') {
    transports.push(new winston.transports.Console({
        format: combine(
            colorize(),
            logFormat
        )
    }));
}

const logger = winston.createLogger({
    level: 'debug',
    format: combine(
        errors({stack: true}),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        logFormat
    ),
    transports
});

// Morgan stream for HTTP logging
export const morganStream = {
    write: (message: string) => {
        logger.info(message.trim());
    }
};

export default logger;