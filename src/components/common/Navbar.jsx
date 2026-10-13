import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="topbar">
      <Link to="/" className="wordmark"><span className="brand-mark small">P</span> ProductDesk</Link>
      <nav aria-label="Main navigation">
        <NavLink to="/">My products</NavLink>
        {user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
      </nav>
      <div className="account">
        <span>{user?.name} <small>{user?.role}</small></span>
        <button className="secondary" onClick={handleLogout}>Log out</button>
      </div>
    </header>
  );
}
