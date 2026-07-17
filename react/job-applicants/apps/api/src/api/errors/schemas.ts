import { z } from 'zod';
import { ErrorCode } from './codes.js';

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
