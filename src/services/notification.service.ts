import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

// Check for pending notifications every 5 minutes
setInterval(async () => {
    const pendingNotifications = await prisma.notification.findMany({
        where: {
            isSent: false,
            scheduledAt: {lte: new Date()} // ScheduledAt is less than or equal to now
        }
    });
    console.log(`Found ${pendingNotifications.length} pending notifications`);

    for (const notification of pendingNotifications) {
        await prisma.notification.update({
            where: {id: notification.id},
            data: {isSent: true}
        });
    }
}, 5 * 60 * 1000);

export const notificationService = {
    async schedule(userId: number, title: string, body: string, date: Date) {
        return prisma.notification.create({
            data: {
                userId,
                title,
                body,
                scheduledAt: date,
                isSent: false
            }
        });
    },

    async getPending(userId: number) {
        return prisma.notification.findMany({
            where: {
                userId,
                isSent: false
            },
            orderBy: {
                scheduledAt: 'desc' // Newest first
            },
            select: {
                id: true,
                title: true,
                body: true,
                scheduledAt: true,
                medicationEntryId: true
            }
        });
    }
};