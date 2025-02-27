import {z} from 'zod';
import {MedicationSchedule} from '@prisma/client';
/**
 * @description Medication validation schema
 * @function dateSchema - Preprocess date string to Date object
 * @property {object} createEntry - Create medication entry validation schema
 */
const dateSchema = z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) {
        return new Date(arg);
    }
}, z.date());

export const medicationValidation = {
    createEntry: z.object({
        body: z.object({
            name: z.string().min(3),
            dosage: z.string().optional(),
            schedule: z.nativeEnum(MedicationSchedule),
            startDate: dateSchema,
            endDate: dateSchema.optional()
        })
    })
};