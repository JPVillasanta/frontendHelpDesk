import { apiRequest } from './api';

export const authService = {
  login: (credentials) => apiRequest('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  currentUser: () => apiRequest('/me'),
  logout: () => apiRequest('/logout', { method: 'POST' }),
};
