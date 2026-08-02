// Option A (recommended)

// Move

// AppError.ts

// into

// packages/server-core/src/errors/

// Then both

// services
// models
// database

// can throw it.

// Express converts it into HTTP responses.

// Option B

// Don't use AppError in server-core at all.

// Throw normal

// throw new Error(...)

// and let Express translate errors later.

// This keeps server-core transport-agnostic.

// For a project your size, Option A is perfectly reasonable.

import { ErrorCode } from "@job-applicants/schemas";

export default class AppError extends Error {
    readonly code: (typeof ErrorCode)[keyof typeof ErrorCode];

    constructor(options: {
        code: (typeof ErrorCode)[keyof typeof ErrorCode];
        message: string;
        cause?: unknown;
    }) {
        super(options.message, {
            cause: options.cause,
        });

        this.name = "AppError";
        this.code = options.code;
    }
}