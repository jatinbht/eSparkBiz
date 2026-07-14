import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

const emptyToDefault = <T>(defaultValue: T) => (value: unknown): unknown =>
        value === '' || value === undefined ? defaultValue : value;

export const BasicInfoQuerySchema = z.object({
    pageSize: z
        .preprocess(emptyToDefault(10), z.coerce.number().min(1).max(100))
        .default(10)
        .openapi({ example: 10 }),
    page: z
        .preprocess(emptyToDefault(1), z.coerce.number())
        .default(1)
        .transform((p) => Math.max(1, p))
        .openapi({ example: 1 }),

    sortOn: z
        .enum(['id', 'firstName', 'lastName', 'createdAt', 'email'])
        .default('id'),

    order: z.enum(['asc', 'desc']).default('asc'),

    city: z.string().optional(),
    designation: z.string().optional(),
    state: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    relationship_status: z.enum(['single', 'committed']).optional(),

    dob_from: z.iso.date().optional().openapi({ example: '1990-01-01' }),
    dob_to: z.iso.date().optional().openapi({ example: '2000-12-31' }),
});

// export const distinctColumnSchema = z.object({
//     column: z.enum([
//         'city',
//         'state',
//         'designation'
//     ])
// });
