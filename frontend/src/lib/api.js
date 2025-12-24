import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Only add Content-Type for JSON requests 
  if (config.data && !(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }
  
  return config;
});

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  sendResetCode: (email) => api.post('/auth/send-reset-code', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
};

// Question Paper APIs
export const questionPaperAPI = {
  upload: (formData) => {
    return api.post('/questionpapers/upload', formData);
  },
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return api.get(`/questionpapers${params ? `?${params}` : ''}`);
  },
  getById: (id) => api.get(`/questionpapers/${id}`),
  getMyUploads: () => api.get('/questionpapers/my/uploads'),
  getMyDownloads: () => api.get('/questionpapers/my/downloads'),
};

// Subject APIs (public for users)
export const subjectAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return api.get(`/subjects${params ? `?${params}` : ''}`);
  },
  getById: (id) => api.get(`/subjects/${id}`),
};

export default api;
