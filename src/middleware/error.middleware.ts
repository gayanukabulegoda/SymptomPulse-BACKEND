import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import config from 'config';

export const errorConverter = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode = 500;
        const message = 'Internal Server Error';
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

export const errorHandler = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        ...(config.get('env') === 'development' && { stack: err.stack })
    });
};