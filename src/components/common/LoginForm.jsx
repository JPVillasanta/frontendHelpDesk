import { useState } from 'react';

export default function LoginForm({ onSubmit, busy, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form className="panel login" onSubmit={(event) => { event.preventDefault(); onSubmit({ email, password }); }}>
      <div className="brand-mark">P</div>
      <p className="eyebrow">PRODUCT WORKSPACE</p>
      <h1>Welcome back</h1>
      <p className="muted">Sign in to manage your products.</p>
      {error && <div className="alert" role="alert">{error}</div>}
      <label>Email<input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
      <label>Password<input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
      <button disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
    </form>
  );
}
