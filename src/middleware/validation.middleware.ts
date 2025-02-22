import {Request, Response, NextFunction} from 'express';
import {AnyZodObject, ZodError} from 'zod';
import {ApiError} from '../utils/apiError';
import logger from "../utils/logger";

export const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            });
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const message = error.errors.map(err => `${err.path.join('.')} - ${err.message}`).join(', ');
                next(new ApiError(400, `Validation failed: ${message}`));
                logger.error('Validation error:', message);
            }
            next(error);
        }
    };
};