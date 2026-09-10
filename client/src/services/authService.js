import { apiClient } from './apiClient';

export async function loginUser(credentials) {
  const { data } = await apiClient.post('/auth/login', credentials);
  return data;
}

export async function registerUser(payload) {
  const { data } = await apiClient.post('/auth/register', payload);
  return data;
}
