import { z } from 'zod';

// --- Response schema (read) ---
export const basicInfoSchema = z.object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    designation: z.string().nullable(),
    email: z.string(),
    phone: z.string(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    gender: z.enum(['male', 'female', 'other']),
    zip_code: z.string().nullable(),
    relationship_status: z.enum(['single', 'committed']).nullable(),
    dob: z.iso.date().nullable(), // stays as "YYYY-MM-DD", no coercion
    created_at: z.string(),
    is_deleted: z.number(),
});


// --- Create schema (write) ---
export const createBasicInfoSchema = z.object({
    // no id — server generates it
    first_name: z.string().min(1).trim(),
    last_name: z.string().min(1).trim(),
    designation: z.string().min(1).trim().toLowerCase(),
    email: z.email(),
    phone: z.string().min(7),
    city: z.string().min(2).nullable(),
    state: z.preprocess(
        v => {
            if (v === '') return null;
            if (typeof v === 'string') return v.toLowerCase();
            return v;
        },
        z.enum(['gujarat', 'rajasthan']).nullable()
    ),
    gender: z.enum(['male', 'female', 'other']),
    zip: z.string().regex(/^\d{5}$/).optional().or(z.literal('')),
    relationship: z.enum(['single', 'committed']).optional().or(z.literal('')),
    dob: z.iso.date(),  // YYYY-MM-DD string, no coercion needed for writes either
});

// This is the key line — TypeScript type inferred automatically from the schema.
// You never write a separate `type Applicant = { ... }` again.
export type BasicInfo = z.infer<typeof basicInfoSchema>;