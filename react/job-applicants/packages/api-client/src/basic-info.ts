import type { BasicInfo, CreateBasicInfo } from '@job-applicants/schemas';
import { http } from './http';

export type BasicInfoQueryParams = {
  page?: number;
  pageSize?: number;
  sortOn?: string;
  order?: 'asc' | 'desc';
  city?: string;
  designation?: string;
  state?: string;
  gender?: string;
  relationship_status?: string;
  dob_from?: string;
  dob_to?: string;
};

export type PaginatedResult<T> = {
  data: T[];
  pagination: {
    page: number;
    offset: number;
    pageSize: number;
    total: number;
    pageCount: number;
  };
};

export type BasicInfoFilterOptions = Record<string, string[]>;

export async function getApplicants(params?: BasicInfoQueryParams) {
  return http.get<PaginatedResult<BasicInfo>>('/applicants', params);
}

export async function getFilterOptions() {
  return http.get<BasicInfoFilterOptions>('/applicants/filter-options');
}

export async function getApplicant(id: number) {
  return http.get<BasicInfo>(`/applicants/${id}`);
}

export async function createApplicant(data: CreateBasicInfo) {
  return http.post<BasicInfo>('/applicants', data);
}

export async function updateApplicant(id: number, data: CreateBasicInfo) {
  return http.put<BasicInfo>(`/applicants/${id}`, data);
}

export async function deleteApplicant(id: number) {
  return http.delete<void>(`/applicants/${id}`);
}
