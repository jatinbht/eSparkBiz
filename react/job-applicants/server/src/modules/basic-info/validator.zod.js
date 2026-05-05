import { z } from 'zod';

export const basicInfoQuerySchema = z.object({
    limit: z.coerce.number().min(1).max(100).default(10),
    offset: z.coerce.number().min(0).default(0),

    sortBy: z
        .enum(['id', 'first_name', 'last_name', 'created_at'])
        .default('id'),

    order: z.enum(['asc', 'desc']).default('asc'),
});
