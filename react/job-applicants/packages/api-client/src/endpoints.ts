import { Routes } from '@job-applicants/api-contract';

export const Api = {
  applicants: {
    list: Routes.applicants.list,
    create: Routes.applicants.list,
    byId: (id: number) => Routes.applicants.byId.replace(':id', String(id)),
    update: (id: number) => Routes.applicants.byId.replace(':id', String(id)),
    delete: (id: number) => Routes.applicants.byId.replace(':id', String(id)),
    filterOptions: `${Routes.applicants.list}/filter-options`,
  },

  auth: {
    login: Routes.auth.login,
    logout: Routes.auth.logout,
  },
} as const;
