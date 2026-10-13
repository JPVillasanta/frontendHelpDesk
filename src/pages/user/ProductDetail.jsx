import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { productService } from '../../services/productService';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    productService.get(id).then((result) => { if (active) setProduct(result.product); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);
  return <AppLayout><Link to="/products">← Back to products</Link>{error && <div className="alert">{error}</div>}{loading ? <LoadingSpinner /> : product && <article className="panel detail"><p className="eyebrow">PRODUCT DETAIL</p><h1>{product.name}</h1><p>{product.description || 'No description.'}</p><strong>₱{Number(product.price).toFixed(2)}</strong>{product.image_url && <img src={product.image_url} alt={product.name} />}{product.user && <p className="muted">Owner: {product.user.name}</p>}</article>}</AppLayout>;
}
