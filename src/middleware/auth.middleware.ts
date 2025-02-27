import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/prisma-client';
import {ApiError} from '../utils/apiError';
import {config} from '../config/config';
import logger from "../utils/logger";
/**
 * @description Middleware to authenticate user by verifying ACCESS token in header or cookie
 * @returns {Promise<void>} - Calls the next middleware function
 * @throws {ApiError} 401 - Authentication required
 * @throws {ApiError} 401 - Invalid authentication credentials
 * @throws {ApiError} 401 - User not found
 * @throws {Error} Any other error
 */
declare module 'express' {
    interface Request {
        user?: {
            id: number;
            role: string;
        };
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get ACCESS token from header or cookie
        const token = req.headers.authorization?.split(' ')[1] || req.cookies.accessToken;

        if (!token) {
            logger.error('No token provided');
            throw new ApiError(401, 'Authentication required');
        }

        // Verify ACCESS token only (no session check)
        const decoded = jwt.verify(token, config.JWT_SECRET) as { id: number };

        // Check user exists
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, role: true }
        });

        if (!user) {
            logger.error('User not found');
            throw new ApiError(401, 'User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        logger.error('Authentication error:', error);
        next(new ApiError(401, 'Invalid authentication credentials'));
    }
};

export const validateRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            logger.error('Refresh token required');
            throw new ApiError(401, 'Refresh token required');
        }

        // Verify REFRESH token
        const decoded = jwt.verify(refreshToken, config.JWT_SECRET) as { id: number };

        // Check valid session in database
        const validSession = await prisma.userSession.findFirst({
            where: {
                userId: decoded.id,
                token: refreshToken,
                revoked: false,
                expiresAt: { gt: new Date() }
            }
        });

        if (!validSession) {
            logger.error('Session expired or revoked');
            throw new ApiError(401, 'Session expired or revoked');
        }


        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, role: true }
        });

        if (!user) {
            logger.error('User not found');
            throw new ApiError(401, 'User not found');
        }

        req.user = { id: user.id, role: user.role };
        next();
    } catch (error) {
        logger.error('Refresh token error:', error);
        next(new ApiError(401, 'Invalid refresh token'));
    }
};