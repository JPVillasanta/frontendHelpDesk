import { useEffect, useState } from 'react';
import AdminProductTable from '../../components/admin/AdminProductTable';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import PaginationControls from '../../components/common/PaginationControls';
import { userService } from '../../services/userService';

export default function ProductManagement() {
  const [products, setProducts] = useState({ data: [], meta: null });
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [deleting, setDeleting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    userService.products(page)
      .then((result) => { if (active) { setProducts(result); setError(''); } })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [page, refreshKey]);

  async function remove() {
    setBusy(true); setLoading(true);
    try { await userService.removeProduct(deleting.id); setDeleting(null); setPage(1); setRefreshKey((key) => key + 1); }
    catch (requestError) { setError(requestError.message); setLoading(false); }
    finally { setBusy(false); }
  }
  function changePage(nextPage) { setLoading(true); setPage(nextPage); }

  return <section className="panel"><h2>All products</h2>{error && <div className="alert">{error}</div>}
    {loading ? <LoadingSpinner /> : <><AdminProductTable products={products.data || []} onDelete={setDeleting} /><PaginationControls meta={products.meta} onPageChange={changePage} /></>}
    <ConfirmDialog open={Boolean(deleting)} title="Delete this product?" message={deleting ? `“${deleting.name}” will be permanently removed.` : ''} onConfirm={remove} onCancel={() => setDeleting(null)} busy={busy} />
  </section>;
}
