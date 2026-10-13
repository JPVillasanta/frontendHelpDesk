import { NavLink, Outlet } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout';

export default function AdminPanel() {
  return <AppLayout><div className="heading"><div><p className="eyebrow">ADMINISTRATION</p><h1>Admin panel</h1><p className="muted">Manage user accounts and the shared product catalog.</p></div></div>
    <nav className="admin-tabs"><NavLink end to="/admin">Overview</NavLink><NavLink to="/admin/users">Users</NavLink><NavLink to="/admin/products">Products</NavLink></nav>
    <Outlet />
  </AppLayout>;
}
