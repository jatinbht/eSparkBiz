import { z } from 'zod';
const emptyToDefault = (defaultVal) => (v) => (v === '' || v === undefined) ? defaultVal : v;

export const basicInfoQuerySchema = z.object({
    limit: z.preprocess(emptyToDefault(10), z.coerce.number().min(1).max(100)).default(10),
    page: z.preprocess(emptyToDefault(1), z.coerce.number()).default(1).transform(p => Math.max(1, p)),

    sortBy: z
        .enum(['id', 'first_name', 'last_name', 'created_at'])
        .default('id'),

    order: z.enum(['asc', 'desc']).default('asc'),
});
