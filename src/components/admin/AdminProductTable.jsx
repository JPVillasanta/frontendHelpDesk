import { Link } from 'react-router-dom';

export default function AdminProductTable({ products, onDelete }) {
  if (!products.length) return <p className="empty">No products found.</p>;
  return <div className="table-wrap"><table><thead><tr><th>Product</th><th>Owner</th><th>Price</th><th>Actions</th></tr></thead>
    <tbody>{products.map((product) => <tr key={product.id}><td><Link to={`/products/${product.id}`}>{product.name}</Link><small>{product.description}</small></td><td>{product.user?.name || product.user?.email || 'Unknown'}</td><td>₱{Number(product.price).toFixed(2)}</td><td><button className="danger" onClick={() => onDelete(product)}>Delete</button></td></tr>)}</tbody>
  </table></div>;
}
