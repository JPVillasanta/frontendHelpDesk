import { apiRequest } from './api';

export const productService = {
  list: (search = '', page = 1) => apiRequest(`/products?search=${encodeURIComponent(search)}&page=${page}`),
  get: (id) => apiRequest(`/products/${id}`),
  create: (product) => apiRequest('/products', {
    method: 'POST', body: JSON.stringify(product),
  }),
  update: (id, product) => apiRequest(`/products/${id}`, {
    method: 'PUT', body: JSON.stringify(product),
  }),
  remove: (id) => apiRequest(`/products/${id}`, { method: 'DELETE' }),
};
