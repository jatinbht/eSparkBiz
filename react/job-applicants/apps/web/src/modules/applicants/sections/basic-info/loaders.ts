// import type { BasicInfo } from '@job-applicants/schemas/applicant'
import { BasicInfoQuerySchema, BasicInfoSchema } from '@job-applicants/schemas';
import { type LoaderFunctionArgs } from 'react-router';
import { getApplicants } from '@job-applicants/api-client';

export const loadApplicants = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const rawQuery = Object.fromEntries(url.searchParams.entries());

    const queryParams = BasicInfoQuerySchema.parse(rawQuery);

    const [applicantsResponse, 
        // filterOptions,
    ] = await Promise.all([
        getApplicants(queryParams),
    ]);

    return {
        applicants: BasicInfoSchema.array().parse(applicantsResponse.data),
        pagination: applicantsResponse.pagination,
        // filterOptions,
    };
};
