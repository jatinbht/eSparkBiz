// import type { BasicInfo } from '@job-applicants/schemas/applicant'
import { basicInfoSchema } from '@job-applicants/schemas/applicant';
import { type LoaderFunctionArgs } from 'react-router';
import { getApplicants } from './api';

export const loadApplicants = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    const [applicantsResponse, 
        // filterOptions,
    ] = await Promise.all([
        getApplicants(queryParams),
        // getFilterOptions(),
    ]);

    return {
        applicants: basicInfoSchema.array().parse(applicantsResponse.data),
        pagination: applicantsResponse.pagination,
        // filterOptions,
    };
};
