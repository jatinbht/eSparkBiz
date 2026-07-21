export const Routes = {
  applicants: {
    list: '/applicants',
    byId: '/applicants/:id',
  },

  users: {
    list: '/users',
    byId: '/users/:id',
  },

  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
  },
} as const;
