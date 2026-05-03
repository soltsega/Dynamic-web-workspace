import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Add token to requests if in admin mode
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const projectApi = {
  getAll: (category) => api.get('/projects', { params: { category } }),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const credentialApi = {
  getAll: (category) => api.get('/credentials', { params: { category } }),
  create: (data) => api.post('/credentials', data),
  update: (id, data) => api.put(`/credentials/${id}`, data),
  delete: (id) => api.delete(`/credentials/${id}`),
};

export const messageApi = {
  send: (data) => api.post('/messages', data),
  getAll: () => api.get('/messages'),
};

export const authApi = {
  login: (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return api.post('/auth/login', formData);
  },
};

export default api;
