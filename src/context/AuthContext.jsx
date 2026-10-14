import { useState } from 'react';
import AuthContext from './auth-context';

const LOGIN_USERNAME = 'itadmin';
const LOGIN_PASSWORD = 'helpdesk123';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => localStorage.getItem('helpdesk_authenticated') === 'true' ? { username: LOGIN_USERNAME } : null);

  function login({ username, password }) {
    if (username !== LOGIN_USERNAME || password !== LOGIN_PASSWORD) {
      throw new Error('Incorrect username or password. Please try again.');
    }
    localStorage.setItem('helpdesk_authenticated', 'true');
    setUser({ username: LOGIN_USERNAME });
  }

  function logout() {
    localStorage.removeItem('helpdesk_authenticated');
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, loading: false, login, logout }}>{children}</AuthContext.Provider>;
}
