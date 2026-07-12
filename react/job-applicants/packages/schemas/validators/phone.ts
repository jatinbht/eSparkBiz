import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export const PhoneSchema = z
    .string()
    .trim()
    .refine(isValidPhoneNumber, {
        message: 'Invalid phone number',
    });