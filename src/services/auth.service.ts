import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {config} from '../config/config';
import prisma from '../../prisma/prisma-client';
import logger from "../utils/logger";
/**
 * @description Service layer for user authentication
 * @exports authService
 */
const SALT_ROUNDS = 10;

export const authService = {
    async register(email: string, password: string, name?: string) {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        return prisma.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
                name,
                role: 'USER'
            },
            select: {id: true, email: true, name: true}
        });
    },

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: {email},
            select: {id: true, passwordHash: true}
        });

        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            logger.error(`Invalid login attempt for ${email}`);
            throw new Error('Invalid credentials');
        }

        return this.generateTokens(user.id);
    },

    async generateTokens(userId: number) {
        const accessToken = jwt.sign(
            {id: userId},
            config.JWT_SECRET,
            {expiresIn: "30m"}
        );

        const refreshToken = jwt.sign(
            {id: userId},
            config.JWT_SECRET,
            {expiresIn: "7d"}
        );

        await prisma.userSession.create({
            data: {
                userId,
                token: refreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
            }
        });

        return {accessToken, refreshToken};
    },

    async invalidateSession(token: string) {
        await prisma.userSession.updateMany({
            where: {token},
            data: {revoked: true}
        });
    },

    async getUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: {email},
            select: {id: true, email: true, name: true}
        });
    }
};