import { useEffect, useState } from 'react';
import AdminStats from '../../components/admin/AdminStats';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { userService } from '../../services/userService';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    userService.stats().then(setStats).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false));
  }, []);
  if (loading) return <LoadingSpinner label="Loading dashboard…" />;
  return <section>{error && <div className="alert">{error}</div>}<AdminStats stats={stats || {}} /><p className="muted">Use the tabs above to review users and products.</p></section>;
}
