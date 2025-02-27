import prisma from '../../prisma/prisma-client';
/**
 * @description Service layer for notification fetching
 * @exports notificationService
 */
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

    async getNotifications(userId: number) {
        return prisma.notification.findMany({
            where: {
                userId,
                isSent: false
            },
            orderBy: {
                id: 'desc'
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