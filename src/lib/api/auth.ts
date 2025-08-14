import { api } from './index';
import type {
  RegisterCredentials,
  RegisterResponse,
  LoginCredentials,
  LoginResponse,
} from '@/types';

const AUTH_PATH = '/auth';

export function registerUser(credentials: RegisterCredentials): Promise<RegisterResponse> {
  return api<RegisterResponse>(`${AUTH_PATH}/register`, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  return api<LoginResponse>(`${AUTH_PATH}/login`, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}
