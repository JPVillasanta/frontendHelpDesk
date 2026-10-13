import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ProductForm from '../../components/user/ProductForm';
import { productService } from '../../services/productService';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    productService.get(id).then((result) => { if (active) setProduct(result.product); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);
  async function save(values) {
    setBusy(true); setError('');
    try { await productService.update(id, values); navigate('/products'); }
    catch (requestError) { setError(requestError.message); }
    finally { setBusy(false); }
  }
  return <AppLayout><Link to="/products">← Back to products</Link><div className="heading"><h1>Edit product</h1></div>{error && <div className="alert">{error}</div>}{loading ? <LoadingSpinner /> : product && <ProductForm key={product.id} initial={product} onSubmit={save} submitLabel="Update product" busy={busy} />}</AppLayout>;
}
