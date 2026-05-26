// import type { BasicInfo } from '@job-applicants/schemas/applicant'
import { createBasicInfoSchema } from '@job-applicants/schemas/applicant';
import { redirect, type LoaderFunctionArgs } from 'react-router';


const loadApplicants = async ({ request }:LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const params = url.searchParams.toString()
    const fetchUrl = `/api/applicants${params ? `?${params}` : ''}`
    const response = await fetch(fetchUrl);

    if (response.redirected) {
        const redirectedUrl = new URL(response.url)
        throw redirect(redirectedUrl.search) // e.g. ?page=11
    }

    if (!response.ok) {
        const text = await response.text();
        throw new Response(`Error! Response: ${text}`, {
            // headers: response.headers, //It may unintentionally leak server headers (cookies, etc.)
            status: response.status,
            statusText: response.statusText,
        });
    }
    const result = await response.json()
    return {
        applicants: createBasicInfoSchema.array().parse(result.data),
        pagination: result.pagination
    }
};

export { loadApplicants };
