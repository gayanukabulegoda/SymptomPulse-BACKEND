import {z} from 'zod';

export const symptomValidation = {
    createEntry: z.object({
        body: z.object({
            symptoms: z.array(z.string()).min(1),
            entryDate: z.date().optional()
        })
    }),

    getHistory: z.object({
        query: z.object({
            page: z.string().regex(/^\d+$/).transform(Number).optional(),
            limit: z.string().regex(/^\d+$/).transform(Number).optional()
        })
    })
};