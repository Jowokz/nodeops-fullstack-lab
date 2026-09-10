import { apiClient } from './apiClient';

export async function getJobs() {
  const { data } = await apiClient.get('/jobs');
  return data;
}

export async function getJobById(id) {
  const { data } = await apiClient.get(`/jobs/${id}`);
  return data;
}

export async function uploadCsv(file) {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await apiClient.post('/uploads/csv', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
}

export async function getHealth() {
  const { data } = await apiClient.get('/health');
  return data;
}

export async function runDebugEndpoint(type) {
  const { data } = await apiClient.get(`/debug/${type}`);
  return data;
}
