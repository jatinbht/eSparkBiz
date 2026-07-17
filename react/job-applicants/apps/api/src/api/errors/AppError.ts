import { ErrorCode } from './codes.js';

export default class AppError extends Error {
    readonly status: number;
    readonly code: keyof typeof ErrorCode;

    constructor(options: {
        status: number;
        code: keyof typeof ErrorCode;
        message: string;
        cause?: unknown;
    }) {
        super(options.message, {
            cause: options.cause,
        });

        this.name = "AppError";

        this.status = options.status;
        this.code = options.code;
    }
}
