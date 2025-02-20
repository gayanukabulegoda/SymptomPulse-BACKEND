import {PrismaClient} from "@prisma/client";
import {config} from './config/config';
import app from "./app";

const prisma = new PrismaClient();

/**
 * @description Connect to the database and start the server
 */
const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Database connection error:', error);
        process.exit(1);
    }
};

const PORT = config.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

        // Graceful shutdown
        const shutdown = async () => {
            console.log('🔴 Shutting down server...');
            server.close(async () => {
                await prisma.$disconnect();
                console.log('✅ Server terminated');
                process.exit(0);
            });
        };

        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();