export const authRepository = {
  async findByEmail(email?: string) {
    return {
      id: 1,
      email: email ?? 'test@example.com',
      name: 'Stub User',
    };
  },

  async create(payload: { email?: string; password?: string; name?: string }) {
    return {
      id: 2,
      email: payload.email ?? 'new@example.com',
      name: payload.name ?? 'New Stub User',
    };
  },
};
