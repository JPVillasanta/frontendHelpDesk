import { Link } from 'react-router-dom';

export default function ProductCard({ product, onDelete }) {
  return (
    <article className="panel product-card">
      {product.image_url && <img src={product.image_url} alt={product.name} loading="lazy" />}
      <p className="eyebrow">PRODUCT</p>
      <h2><Link to={`/products/${product.id}`}>{product.name}</Link></h2>
      <p className="muted card-description">{product.description || 'No description provided.'}</p>
      <strong>₱{Number(product.price).toFixed(2)}</strong>
      <div className="actions card-actions">
        <Link className="button-link secondary" to={`/products/${product.id}`}>Details</Link>
        <Link className="button-link secondary" to={`/products/${product.id}/edit`}>Edit</Link>
        <button className="danger" onClick={() => onDelete(product)}>Delete</button>
      </div>
    </article>
  );
}
