import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  login: async (data) => {
    const res = await apiClient.post('/api/auth/login', data);
    return res.data;
  },
  signup: async (data) => {
    const res = await apiClient.post('/api/auth/signup', data);
    return res.data;
  },
};

export const productService = {
  getAll: async () => {
    const res = await apiClient.get('/api/products');
    return res.data;
  },
  getById: async (id) => {
    const res = await apiClient.get(`/api/products/${id}`);
    return res.data;
  },
  create: async (data) => {
    const res = await apiClient.post('/api/products', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await apiClient.put(`/api/products/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await apiClient.delete(`/api/products/${id}`);
    return res.data;
  },
};

export const categoryService = {
  getAll: async () => {
    const res = await apiClient.get('/api/categories');
    return res.data;
  },
};

export const orderService = {
  createOrder: async (data) => {
    const res = await apiClient.post('/api/orders', data);
    return res.data;
  },
  addItems: async (orderId, items) => {
    const res = await apiClient.post(`/api/orders/${orderId}/items`, items);
    return res.data;
  },
};

export default apiClient;
