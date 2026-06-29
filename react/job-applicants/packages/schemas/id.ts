import { z } from 'zod';

export const idSchema = z.object({
    id: z.coerce
        .number({
            error: 'Applicant ID must be a number.',
        })
        .int()
        .positive('Applicant ID must be greater than 0.'),
});
