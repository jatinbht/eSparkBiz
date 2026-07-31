// import { z } from 'zod';
import * as z from "zod";
import { PhoneSchema } from "../common/phone.js";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';


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
    email: z.string().nullable(),
    phone: z.string(),
    country: z.string().nullable(),
    state: z.string().nullable(),
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
    country: z.preprocess(
        emptyStringToNull,
        z.string().min(2).nullable()
    ),
    state: z.preprocess(
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






extendZodWithOpenApi(z);

const emptyToDefault = <T>(defaultValue: T) => (value: unknown): unknown =>
        value === '' || value === undefined ? defaultValue : value;

export const BasicInfoListQuerySchema = z.object({
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


export type BasicInfoListQuery = z.infer<typeof BasicInfoListQuerySchema>;

//-------------------------

import { createPaginatedResultSchema } from "../common/pagination.js";

export const BasicInfoListResponseSchema =
    createPaginatedResultSchema(BasicInfoSchema);

export type BasicInfoListResponse =
    z.infer<typeof BasicInfoListResponseSchema>;


//------------------------------

export const BasicInfoFilterOptionsSchema = z.object({
    designation: z.array(z.string()),
    country: z.array(z.string()),
    state: z.array(z.string()),
    city: z.array(z.string()),
    gender: z.array(z.enum(["male", "female", "other"])),
    relationshipStatus: z.array(
        z.enum(["single", "committed"])
    ),
    // dob: z.null(),
    // dob: z.object({}),
});

export type BasicInfoFilterOptions = z.infer<typeof BasicInfoFilterOptionsSchema>;