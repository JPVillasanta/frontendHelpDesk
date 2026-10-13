import { useEffect, useState } from 'react';
import AdminUserDetails from '../../components/admin/AdminUserDetails';
import UserTable from '../../components/admin/UserTable';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import PaginationControls from '../../components/common/PaginationControls';
import { userService } from '../../services/userService';

export default function UserManagement() {
  const [users, setUsers] = useState({ data: [], meta: null });
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    userService.list(search, page)
      .then((result) => { if (active) { setUsers(result); setError(''); } })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [search, page, refreshKey]);

  async function remove() {
    setBusy(true); setLoading(true);
    try { await userService.remove(deleting.id); setDeleting(null); setSelected(null); setPage(1); setRefreshKey((key) => key + 1); }
    catch (requestError) { setError(requestError.message); setLoading(false); }
    finally { setBusy(false); }
  }
  function changePage(nextPage) { setLoading(true); setPage(nextPage); }
  function changeSearch(value) { setLoading(true); setSearch(value); setPage(1); }

  return <section className="panel"><div className="section-head"><h2>Users</h2><input className="search" aria-label="Search users" placeholder="Search users…" value={search} onChange={(event) => changeSearch(event.target.value)} /></div>
    {error && <div className="alert">{error}</div>}
    {loading ? <LoadingSpinner /> : <><UserTable users={users.data || []} onSelect={setSelected} onDelete={setDeleting} /><PaginationControls meta={users.meta} onPageChange={changePage} /></>}
    <AdminUserDetails user={selected} onClose={() => setSelected(null)} />
    <ConfirmDialog open={Boolean(deleting)} title="Delete this user?" message={deleting ? `Delete ${deleting.name} and their products?` : ''} onConfirm={remove} onCancel={() => setDeleting(null)} busy={busy} />
  </section>;
}
