import {z} from 'zod';
/**
 * @description Auth validation schema
 * @property {object} register - Register validation schema
 * @property {object} login - Login validation schema
 */
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