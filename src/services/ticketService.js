import { apiRequest } from './api';

export const ticketService = {
  list: (search = '') => apiRequest(`/tickets?search=${encodeURIComponent(search)}`),
  get: (id) => apiRequest(`/tickets/${id}`),
  create: (ticket) => apiRequest('/tickets', { method: 'POST', body: JSON.stringify(ticket) }),
  update: (id, ticket) => apiRequest(`/tickets/${id}`, { method: 'PUT', body: JSON.stringify(ticket) }),
  remove: (id) => apiRequest(`/tickets/${id}`, { method: 'DELETE' }),
};
