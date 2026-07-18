export const userRepository = {
  async findAll() {
    return [
      { id: 1, name: 'Stub User', email: 'test@example.com' },
    ];
  },

  async findById(id: number) {
    return {
      id,
      name: `Stub User ${id}`,
      email: `user${id}@example.com`,
    };
  },
};
