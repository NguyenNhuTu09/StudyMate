import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Chờ 10 giây
});

// Interceptor để tự động đính kèm token vào mỗi request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// --- Auth Services ---
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);

// --- Subject Services ---
export const getSubjects = () => api.get('/subjects');
export const createSubject = (subjectData) => api.post('/subjects', subjectData);
export const getSubjectById = (subjectId) => api.get(`/subjects/${subjectId}`);

// --- Study Module Services ---
export const getModulesForSubject = (subjectId) => api.get(`/subjects/${subjectId}/modules`);
export const createModule = (subjectId, moduleData) => api.post(`/subjects/${subjectId}/modules`, moduleData);
export const getReviewSession = (subjectId) => api.get(`/subjects/${subjectId}/modules/review`);

// Bạn có thể thêm các hàm khác như updateUser, deleteSubject... ở đây

export default api;