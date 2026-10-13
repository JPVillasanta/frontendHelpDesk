import { useEffect, useState } from 'react';
import AppLayout from '../../components/common/AppLayout';
import ProductForm from '../../components/user/ProductForm';
import ProductList from '../../components/user/ProductList';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import PaginationControls from '../../components/common/PaginationControls';
import { productService } from '../../services/productService';

export default function ProductsPage() {
  const [products, setProducts] = useState({ data: [], meta: null });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [deleting, setDeleting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    productService.list(search, page)
      .then((result) => { if (active) { setProducts(result); setError(''); } })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [search, page, refreshKey]);

  async function save(product) {
    setBusy(true); setLoading(true); setError('');
    try { await productService.create(product); setPage(1); setRefreshKey((key) => key + 1); }
    catch (requestError) { setError(requestError.message); setLoading(false); }
    finally { setBusy(false); }
  }
  async function confirmDelete() {
    setBusy(true); setLoading(true);
    try { await productService.remove(deleting.id); setDeleting(null); setPage(1); setRefreshKey((key) => key + 1); }
    catch (requestError) { setError(requestError.message); setLoading(false); }
    finally { setBusy(false); }
  }
  function changePage(nextPage) { setLoading(true); setPage(nextPage); }
  function changeSearch(value) { setLoading(true); setSearch(value); setPage(1); }

  return <AppLayout><div className="heading"><div><p className="eyebrow">PRODUCTS</p><h1>Product catalog</h1><p className="muted">Your products are private to your account.</p></div></div>
    {error && <div className="alert" role="alert">{error}</div>}
    <ProductForm onSubmit={save} busy={busy} />
    <section className="panel"><div className="section-head"><h2>Your products</h2><input className="search" aria-label="Search products" placeholder="Search products…" value={search} onChange={(event) => changeSearch(event.target.value)} /></div>
      {loading ? <LoadingSpinner /> : <><ProductList products={products.data || []} onDelete={setDeleting} /><PaginationControls meta={products.meta} onPageChange={changePage} /></>}</section>
    <ConfirmDialog open={Boolean(deleting)} title="Delete this product?" message={deleting ? `“${deleting.name}” will be permanently removed.` : ''} onConfirm={confirmDelete} onCancel={() => setDeleting(null)} busy={busy} />
  </AppLayout>;
}
