import dotenv from 'dotenv';
import {cleanEnv, str, num} from 'envalid';

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
    CLIENT_URL: str({default: 'http://localhost:19006'}), // Expo default
    CURRENT_API_VERSION: str({default: 'v1'}),
    OPENFDA_API_KEY: str({default: ''}),
    MEDIFIND_API_KEY: str({default: ''})
});