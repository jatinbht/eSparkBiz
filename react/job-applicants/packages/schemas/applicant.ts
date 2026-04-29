// packages/schemas/applicant.ts
import { z } from 'zod';

export const createBasicInfoSchema = z.object({
    id: z.number(),

    // z.string() is the base, then you chain refinements — same idea as body().notEmpty().trim()
    first_name: z.string().min(1).trim(),
    last_name: z.string().min(1).trim(),
    designation: z.string().min(1).trim().toLowerCase(),
    email: z.email(),
    phone: z.string().min(7),   // zod has no isMobilePhone, you'd use .regex() for strict validation

    city: z
        .string()
        .min(2)
        .nullable(),

    // .optional() means the field can be absent entirely
    // .or(z.literal('')) handles empty string — equivalent to your { values: 'falsy' }
    state: z.preprocess(
        v => {
            if (v === "") return null
            if (typeof v === "string") return v.toLowerCase()
            return v
        },
        z.enum(["gujarat","rajasthan"]).nullable()
    ),

    gender: z.enum(['male', 'female', 'other']),  // note: your express-validator version has a bug here —
                                                   // isIn() takes an array, not separate arguments

    zip: z.string().regex(/^\d{5}$/).optional().or(z.literal('')),

    relationship: z.enum(['single', 'committed']).optional().or(z.literal('')),

    dob: z.coerce.date(), // validates YYYY-MM-DD format
});

// This is the key line — TypeScript type inferred automatically from the schema.
// You never write a separate `type Applicant = { ... }` again.
export type BasicInfo = z.infer<typeof createBasicInfoSchema>;