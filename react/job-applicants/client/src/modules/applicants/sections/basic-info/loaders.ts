// import type { BasicInfo } from '@job-applicants/schemas/applicant'
import { createBasicInfoSchema } from '@job-applicants/schemas/applicant';


const loadApplicants = async () => {
    const response = await fetch('/api/applicants');
    if (!response.ok) {
        const text = await response.text();
        throw new Response(`Error! Response: ${text}`, {
            // headers: response.headers, //It may unintentionally leak server headers (cookies, etc.)
            status: response.status,
            statusText: response.statusText,
        });
    }
    const data = await response.json()
    return createBasicInfoSchema.array().parse(data)
};

export { loadApplicants };
