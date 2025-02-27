import dotenv from 'dotenv';
import {cleanEnv, str, num} from 'envalid';
/**
 * @fileOverview This file is used to load environment variables from .env file and validate them using envalid package
 * @exports config
 * @requires dotenv
 */
dotenv.config();

export const config = cleanEnv(process.env, {
    NODE_ENV: str({
        choices: ['development', 'production'],
        default: 'development'
    }),
    PORT: num({default: 5000}),
    DATABASE_URL: str(),
    JWT_SECRET: str(),
    JWT_EXPIRES_IN: str({default: '7d'}),
    ACCESS_TOKEN_EXPIRES_IN: str({default: '15m'}),
    REFRESH_TOKEN_EXPIRES_IN: str({default: '7d'}),
    ACCESS_TOKEN_COOKIE_MAX_AGE: num({default: 15 * 60 * 1000}), // 15 minutes
    REFRESH_TOKEN_COOKIE_MAX_AGE: num({default: 7 * 24 * 60 * 60 * 1000}), // 7 days
    CLIENT_URL: str({default: 'http://localhost:8081'}),
    CURRENT_API_VERSION: str({default: 'v1'}),
    OPENFDA_API_URL: str({default: 'https://api.fda.gov/drug/event.json'}),
});