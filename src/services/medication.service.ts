import {MedicationSchedule} from '@prisma/client';
import {notificationService} from "./notification.service";
import prisma from '../../prisma/prisma-client';
/**
 * @description Service layer for medication management
 * @exports medicationService
 */
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

    async getMedications(userId: number) {
        return prisma.medicationEntry.findMany({
            where: {userId},
            orderBy: {
                id: 'desc'
            },
            include: {reminders: true}
        });
    }
};