// getApplicants()
// getApplicant(id)
// getFilterOptions()
// createApplicant(data)
// updateApplicant(id, data)
// deleteApplicant(id)


import { http } from '@/utils/http';

export async function getApplicants(params?: Record<string, string>) {
    return http.get('/applicants', params);
}

export async function getFilterOptions() {
    return http.get('/applicants/filter-options');
}
