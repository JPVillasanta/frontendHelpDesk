import { useEffect, useState } from 'react';
import AuthContext from './auth-context';
import { authService } from '../services/authService';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('product_token')));

  useEffect(() => {
    if (!localStorage.getItem('product_token')) return undefined;
    let active = true;
    authService.currentUser()
      .then((result) => { if (active) setUser(result.user); })
      .catch(() => localStorage.removeItem('product_token'))
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  async function login(credentials) {
    const result = await authService.login(credentials);
    localStorage.setItem('product_token', result.token);
    setUser(result.user);
  }

  async function logout() {
    try { await authService.logout(); } catch { /* Local logout still completes if the API is unavailable. */ }
    localStorage.removeItem('product_token');
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}
