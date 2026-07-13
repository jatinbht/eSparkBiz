import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export const PhoneSchema = z
    .string()
    .trim()
    .refine(isValidPhoneNumber, {
        message: 'Invalid phone number',
    });

// console.log('919468713324', isValidPhoneNumber("919468713324"))
// console.log('+919468713324', isValidPhoneNumber("+919468713324"))
// console.log('9468713324', isValidPhoneNumber("9468713324"))
// console.log('stringified PhoneSchema', JSON.stringify(PhoneSchema, null, 2));
