import { apiRequest } from './api';

export const userService = {
  stats: () => apiRequest('/admin/stats'),
  list: (search = '', page = 1) => apiRequest(`/admin/users?search=${encodeURIComponent(search)}&page=${page}`),
  products: (page = 1) => apiRequest(`/admin/products?page=${page}`),
  remove: (id) => apiRequest(`/admin/users/${id}`, { method: 'DELETE' }),
  removeProduct: (id) => apiRequest(`/admin/products/${id}`, { method: 'DELETE' }),
};
