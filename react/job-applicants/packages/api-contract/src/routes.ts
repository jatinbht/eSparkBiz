export const Routes = {
  applicants: {
    base: '/applicants',
    filterOptions: '/applicants/filter-options',
    byId: '/applicants/:id',
  },

  auth: {
    base: '/auth',
    login: '/auth/login',
    logout: '/auth/logout',
    signup: '/auth/signup',
  },

  users: {
    base: '/users',
    byId: '/users/:id',
  },
} as const;

export const RouteBuilders = {
  applicants: {
    byId(id: number | string) {
      return Routes.applicants.byId.replace(':id', String(id));
    },
  },

  users: {
    byId(id: number | string) {
      return Routes.users.byId.replace(':id', String(id));
    },
  },
};
