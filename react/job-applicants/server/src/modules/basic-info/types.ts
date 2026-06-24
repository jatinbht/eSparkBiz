import { DB } from '@/db/db-types.js';

export type ApplicantColumn = keyof DB['applicant'];

export type FindAllParams = {
    limit: number;
    offset: number;
    sortOn?: ApplicantColumn;
    order?: 'asc' | 'desc';
    filters?: Partial<Record<ApplicantColumn, string>>;
    dob_from?: string;
    dob_to?: string;
};

export type GetCountParams = {
    filters?: Partial<Record<ApplicantColumn, string>>;
    dob_from?: string;
    dob_to?: string;
};
