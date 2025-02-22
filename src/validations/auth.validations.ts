import {z} from 'zod';

export const authValidation = {
    register: z.object({
        body: z.object({
            email: z.string().email(),
            password: z.string().min(8),
            name: z.string().optional()
        })
    }),

    login: z.object({
        body: z.object({
            email: z.string().email(),
            password: z.string().min(8)
        })
    })
};