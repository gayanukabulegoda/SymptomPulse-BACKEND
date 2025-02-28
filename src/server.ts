import {PrismaClient} from "@prisma/client";
import {config} from './config/config';
import app from "./app";
import logger from "./utils/logger";
/**
 * @author: Gayanuka Bulegoda
 * @github: https://github.com/gayanukabulegoda
 * @portfolio: https://grbulegoda.me
 * -------------------------------------------------------------------
 * @project: SymptomPulse BACKEND
 * @since: 20-02-2025 06:22 PM
 * @version: 1.0.0
 * -------------------------------------------------------------------
 * @file: server.ts (Main server file)
 * -------------------------------------------------------------------
 */
const prisma = new PrismaClient();
const PORT = config.PORT || 5000;

// Connect to the database and start the server
const connectDB = async () => {
    try {
        await prisma.$connect();
        logger.info('✅ Database connected successfully');
    } catch (error) {
        logger.error('❌ Database connection error:', error);
        process.exit(1);
    }
};

const startServer = async () => {
    try {
        await connectDB();
        const server = app.listen(PORT, () => {
            logger.info(`🚀 Server running on port ${PORT}`);
        });

        // Graceful shutdown
        const shutdown = async () => {
            logger.info('🔴 Shutting down server...');
            server.close(async () => {
                await prisma.$disconnect();
                logger.info('✅ Server terminated');
                process.exit(0);
            });
        };

        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    } catch (error) {
        logger.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();