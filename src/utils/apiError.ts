/**
 * @class ApiError - Custom error class for API errors
 * @extends Error - JavaScript built-in error class
 * @returns {ApiError} - Custom error instance
 */
export class ApiError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public isOperational = true,
        stack = ''
    ) {
        super(message);
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}