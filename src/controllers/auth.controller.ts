import {Request, Response} from 'express';
import {authService} from '../services/auth.service';
import {config} from '../config/config';
import logger from "../utils/logger";

export const authController = {
    async register(req: Request, res: Response) {
        try {
            const {email, password, name} = req.body;
            const user = await authService.register(email, password, name);

            res.status(201).json({
                success: true,
                data: user
            });
        } catch (error) {
            logger.error('Registration error:', error);
            res.status(400).json({
                success: false,
                error: 'Registration failed'
            });
        }
    },

    async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            const tokens = await authService.login(email, password);

            res.cookie('accessToken', tokens.accessToken, {
                httpOnly: true,
                maxAge: config.ACCESS_TOKEN_COOKIE_MAX_AGE
            });

            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                maxAge: config.REFRESH_TOKEN_COOKIE_MAX_AGE
            });

            res.json({
                success: true,
                data: {accessToken: tokens.accessToken}
            });
        } catch (error) {
            logger.error('Login error:', error);
            res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
    },

    async refreshToken(req: Request, res: Response) {
        try {
            // Now using validateRefreshToken middleware
            const tokens = await authService.generateTokens(req.user!.id);

            res.cookie('accessToken', tokens.accessToken, {
                httpOnly: true,
                maxAge: config.ACCESS_TOKEN_COOKIE_MAX_AGE
            });

            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                maxAge: config.REFRESH_TOKEN_COOKIE_MAX_AGE
            });

            res.json({
                success: true,
                data: {accessToken: tokens.accessToken}
            });
        } catch (error) {
            logger.error('Refresh token error:', error);
            res.status(401).json({
                success: false,
                error: 'Invalid refresh token'
            });
        }
    },

    async logout(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies.refreshToken;
            await authService.invalidateSession(refreshToken);

            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');

            res.json({
                success: true,
                data: {message: 'Logged out successfully'}
            });
        } catch (error) {
            logger.error('Logout error:', error);
            res.status(400).json({
                success: false,
                error: 'Logout failed'
            });
        }
    }
};