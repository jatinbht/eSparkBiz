import type { CreateBasicInfo, BasicInfoQuery } from '@job-applicants/schemas';
import { orpc } from '../orpc';
// import { http } from '../http';
// import { Routes, RouteBuilder } from '@job-applicants/api-contract';

// export type BasicInfoQueryParams = {
//   page?: number;
//   pageSize?: number;
//   sortOn?: string;
//   order?: 'asc' | 'desc';
//   city?: string;
//   designation?: string;
//   state?: string;
//   gender?: string;
//   relationship_status?: string;
//   dob_from?: string;
//   dob_to?: string;
// };

// export type PaginatedResult<T> = {
//   data: T[];
//   pagination: {
//     page: number;
//     offset: number;
//     pageSize: number;
//     total: number;
//     pageCount: number;
//   };
// };

export type BasicInfoFilterOptions = Record<string, string[]>;

export async function getApplicants(params?: BasicInfoQuery) {
  // return http.get<PaginatedResult<BasicInfo>>(Routes.applicants.base, params);
  return orpc.applicants.basicInfo.list(params ?? {});
}

export async function getFilterOptions() {
  // return http.get<BasicInfoFilterOptions>(Routes.applicants.filterOptions);
  return orpc.applicants.basicInfo.filterOptions();
}

export async function getApplicant(id: number) {
  // return http.get<BasicInfo>(RouteBuilder.applicants.byId(id));
  return orpc.applicants.basicInfo.show({ id });
}

export async function createApplicant(data: CreateBasicInfo) {
  // return http.post<BasicInfo>(Routes.applicants.base, data);
  return orpc.applicants.basicInfo.create(data);

}

// export async function updateApplicant(id: number, data: CreateBasicInfo) {
//   // return http.put<BasicInfo>(RouteBuilder.applicants.byId(id), data);
// }

// export async function deleteApplicant(id: number) {
//   // return http.delete<void>(RouteBuilder.applicants.byId(id));
// }
