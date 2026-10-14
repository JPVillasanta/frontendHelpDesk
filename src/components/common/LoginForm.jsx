import { useState } from 'react';

export default function LoginForm({ onSubmit, busy, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return <form className="panel login" onSubmit={(event) => { event.preventDefault(); onSubmit({ username, password }); }}>
    <div className="brand-mark">H</div><p className="eyebrow">IT SUPPORT WORKSPACE</p>
    <h1>Helpdesk sign in</h1><p className="muted">Sign in to manage IT support tickets.</p>
    {error && <div className="alert" role="alert">{error}</div>}
    <label>Username<input required autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} /></label>
    <label>Password<input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
    <button disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
  </form>;
}
