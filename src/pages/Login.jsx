import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import LoginForm from '../components/common/LoginForm';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  if (user) return <Navigate to="/tickets" replace />;
  function submit(credentials) {
    setBusy(true); setError('');
    try { login(credentials); navigate('/tickets', { replace: true }); }
    catch (requestError) { setError(requestError.message); }
    finally { setBusy(false); }
  }
  return <main className="login-page"><LoginForm onSubmit={submit} busy={busy} error={error} /></main>;
}
