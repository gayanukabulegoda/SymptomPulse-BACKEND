import {PrismaClient} from '@prisma/client';
import {MedicationSchedule} from '@prisma/client';
import {notificationService} from "./notification.service";

const prisma = new PrismaClient();

export const medicationService = {
    async addMedication(
        userId: number,
        name: string,
        schedule: MedicationSchedule,
        startDate: Date,
        dosage?: string,
        endDate?: Date
    ) {
        const medication = prisma.medicationEntry.create({
            data: {
                userId,
                name,
                dosage,
                schedule,
                startDate,
                endDate,
            },
            include: {reminders: true}
        });

        await notificationService.schedule(
            userId,
            `Time to take ${name}`,
            `Dosage: ${dosage || 'As prescribed'}`,
            startDate
        );

        return medication;
    },

    generateReminders(schedule: MedicationSchedule, startDate: Date) {
        const reminders = [];
        const baseTime = startDate.getTime();

        // Simple scheduling logic (customize as needed)
        switch (schedule) {
            case 'DAILY':
                for (let i = 0; i < 7; i++) {
                    reminders.push({scheduledTime: new Date(baseTime + i * 24 * 60 * 60 * 1000)});
                }
                break;
            case 'TWICE_DAILY':
                for (let i = 0; i < 7; i++) {
                    reminders.push({scheduledTime: new Date(baseTime + i * 12 * 60 * 60 * 1000)});
                }
                break;
        }

        return reminders;
    },

    async getMedications(userId: number) {
        return prisma.medicationEntry.findMany({
            where: {userId},
            include: {reminders: true}
        });
    }
};