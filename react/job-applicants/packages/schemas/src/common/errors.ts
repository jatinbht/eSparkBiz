import { z } from 'zod';

export const ErrorCode = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    CONFLICT: 'CONFLICT',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

export const ErrorCodeSchema = z.enum(ErrorCode);

export const ErrorResponseSchema = z.object({
    code: ErrorCodeSchema,
    message: z.string(),
});
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

export const ValidationErrorResponseSchema = ErrorResponseSchema.extend({
    code: z.literal(ErrorCode.VALIDATION_ERROR),
    errors: z.record(z.string(), z.array(z.string())),
});
export type ValidationErrorResponse = z.infer<typeof ValidationErrorResponseSchema>;
