import ProductCard from './ProductCard';

export default function ProductList({ products, onDelete }) {
  if (!products.length) return <section className="panel empty">No products found. Add your first product above.</section>;
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} onDelete={onDelete} />)}</div>;
}
