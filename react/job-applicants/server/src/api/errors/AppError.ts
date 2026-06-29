// class AppError extends Error {
//   constructor(message, statusCode, cause) {
//     super(message, { cause })
//     this.statusCode = statusCode
//   }
// }

// // usage
// throw new AppError('Applicant not found', 404, originalErr)

// // src/utils/AppError.js
// class AppError extends Error {
//   constructor(message, statusCode) {
//     super(message)
//     this.statusCode = statusCode
//   }
// }

// export default AppError

// class AppError extends Error {
//     constructor(message, code, cause) {
//         super(message, { cause });
//         this.status = code || 500
//     }
// }

// export default AppError

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
