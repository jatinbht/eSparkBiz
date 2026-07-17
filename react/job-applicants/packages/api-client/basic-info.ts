// getApplicants()
// getApplicant(id)
// getFilterOptions()
// createApplicant(data)
// updateApplicant(id, data)
// deleteApplicant(id)


import type { CreateBasicInfo } from '@job-applicants/schemas/applicant';
import { http } from '../../apps/web/src/lib/http';

export async function getApplicants(params?: Record<string, string>) {
    return http.get('/applicants', params);
}

export async function getFilterOptions() {
    return http.get('/applicants/filter-options');
}

export async function getApplicant(id: number) {
    return http.get(`/applicants/${id}`);
}

export async function createApplicant(data: CreateBasicInfo) {
    return http.post('/applicants', data);
}

export async function updateApplicant(
    id: number,
    data: CreateBasicInfo,
) {
    return http.put(`/applicants/${id}`, data);
}

export async function deleteApplicant(id: number) {
    return http.delete(`/applicants/${id}`);
}
