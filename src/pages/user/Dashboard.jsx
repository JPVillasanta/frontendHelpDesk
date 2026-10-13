import { Link } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout';
import { useAuth } from '../../hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();
  return <AppLayout><div className="heading"><div><p className="eyebrow">WORKSPACE</p><h1>Welcome, {user?.name}</h1><p className="muted">Manage your products from one place.</p></div></div>
    <div className="dashboard-actions"><Link className="panel dashboard-tile" to="/products">Open product catalog <span>Search, create, edit, and delete your products →</span></Link>
      {user?.role === 'admin' && <Link className="panel dashboard-tile" to="/admin">Open admin dashboard <span>Review users, products, and system totals →</span></Link>}</div>
  </AppLayout>;
}
