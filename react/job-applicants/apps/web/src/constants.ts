// constants.ts
import type { CreateBasicInfo } from '@job-applicants/schemas';

export const EMPTY_BASIC_INFO: CreateBasicInfo = {
    firstName: '',
    lastName: '',
    designation: '',
    email: '',
    phone: '',
    country: 'IN',
    state: '',
    city: '',
    gender: 'male',
    zipCode: null,
    relationshipStatus: null,
    dob: '',
};
