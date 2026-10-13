const API_BASE = `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/api/v1`;

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('product_token');
  const headers = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch {
    throw new Error('Could not reach the API. Check that the backend is running.');
  }

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const validationMessage = Object.values(body.errors || {}).flat()[0];
    throw new Error(body.message || validationMessage || `Request failed (${response.status}).`);
  }
  return body;
}
