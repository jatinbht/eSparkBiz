// import { z } from 'zod';
import * as z from "zod";
import { PhoneSchema } from "./validators/phone";

const emptyStringToNull = (value: unknown) =>
    value === '' ? null : value;

// console.log("z =", z);
// console.log("z.iso =", (z as any).iso);
// console.log(z.iso);
// console.log("z.iso?.date =", (z as any).iso?.date);
// console.log(z.string().date);
// console.log("z.string =", z.string);
// console.log(Object.keys(z).sort());

// --- Response schema (read) ---
export const BasicInfoSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    designation: z.string().nullable(),
    email: z.string(),
    phone: z.string(),
    country_code: z.string().nullable(),
    state_code: z.string().nullable(),
    city: z.string().nullable(),
    gender: z.enum(['male', 'female', 'other']),
    zipCode: z.string().nullable(),
    relationshipStatus: z.enum(['single', 'committed']).nullable(),
    // dob: z.iso.date().nullable(), // stays as "YYYY-MM-DD", no coercion
    dob: z.string().date().nullable(), // stays as "YYYY-MM-DD", no coercion
    createdAt: z.string(),
    isDeleted: z.number(),
});


// --- Create schema (write) ---
export const CreateBasicInfoSchema = z.object({
    // no id — server generates it
    firstName: z.string().trim().min(1, "First name is required."),
    lastName: z.string().trim().min(1),
    designation: z.string().trim().min(1),
    email: z.string().email(),
    phone: PhoneSchema,
    country_code: z.preprocess(
        emptyStringToNull,
        z.string().min(2).nullable()
    ),
    state_code: z.preprocess(
        emptyStringToNull,
        // value => {
        //     if (value === '') return null;
    
        //     if (typeof value === 'string') {
        //         return value.toLowerCase();
        //     }
    
        //     return value;
        // },
        z.string().min(2).nullable()
    ),
    city: z.preprocess(
        emptyStringToNull,
        z.string().min(2).nullable()
    ),
    gender: z.enum(['male', 'female', 'other']),
    zipCode: z.preprocess(
        emptyStringToNull,
        z.string().regex(/^\d{5}$/).nullable()
    ),
    relationshipStatus: z.preprocess(
        emptyStringToNull,
        z.enum(['single', 'committed']).nullable()
    ),
    // dob: z.iso.date(),  // YYYY-MM-DD string, no coercion needed for writes either
    dob: z.string().date(),  // YYYY-MM-DD string, no coercion needed for writes either
});

// UpdateBasicInfoSchema

// This is the key line — TypeScript type inferred automatically from the schema.
// You never write a separate `type Applicant = { ... }` again.
export type BasicInfo = z.infer<typeof BasicInfoSchema>;
export type CreateBasicInfo = z.infer<typeof CreateBasicInfoSchema>;