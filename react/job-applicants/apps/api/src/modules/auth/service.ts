import { authRepository } from './repository.js';

export async function loginService(credentials: { email?: string; password?: string }) {
  const user = await authRepository.findByEmail(credentials.email);
  return {
    message: 'Login is a stub. Implement authentication flow later.',
    user,
    token: 'stub-token',
  };
}

export async function signupService(payload: { email?: string; password?: string; name?: string }) {
  const user = await authRepository.create(payload);
  return {
    message: 'Signup is a stub. Replace with real user creation flow.',
    user,
    token: 'stub-token',
  };
}
