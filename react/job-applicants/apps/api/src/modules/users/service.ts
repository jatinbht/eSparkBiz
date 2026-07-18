import { userRepository } from './repository.js';

export async function getUsersService() {
  return userRepository.findAll();
}

export async function getUserByIdService(id: number) {
  return userRepository.findById(id);
}
