import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }
  return <header className="topbar">
    <Link to="/tickets" className="wordmark"><span className="brand-mark small">H</span> Helpdesk</Link>
    <nav aria-label="Main navigation"><NavLink to="/tickets">Ticket List</NavLink></nav>
    <div className="account"><span>{user?.username}<small>System Administrator</small></span><button className="secondary" onClick={handleLogout}>Log out</button></div>
  </header>;
}
