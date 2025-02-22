import {Request, Response, NextFunction} from 'express';
import {ApiError} from '../utils/apiError';
import {Prisma} from '@prisma/client';
import {config} from '../config/config';
import logger from "../utils/logger";

export const errorConverter = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let error = err;

    // Convert Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const message = `Database error: ${error.meta?.message || error.message}`;
        error = new ApiError(400, message);
        logger.error('Prisma error:', error);
    }

    // Convert Zod errors
    if (!(error instanceof ApiError)) {
        const statusCode =
            (error as any).statusCode ||
            (error as any).status ||
            500;
        const message = (error as any).message || 'Internal Server Error';
        error = new ApiError(statusCode, message);
        logger.error('Unknown error:', error);
    }

    next(error);
};

export const errorHandler = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {statusCode, message} = err;

    res.status(statusCode || 500).json({
        success: false,
        message,
        ...(config.NODE_ENV === 'development' && {stack: err.stack})
    });
};