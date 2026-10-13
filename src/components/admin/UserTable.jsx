export default function UserTable({ users, onSelect, onDelete }) {
  if (!users.length) return <p className="empty">No users found.</p>;
  return <div className="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Products</th><th>Actions</th></tr></thead>
    <tbody>{users.map((user) => <tr key={user.id}><td>{user.name}</td><td>{user.email}</td><td><span className="badge">{user.role}</span></td><td>{user.products_count}</td><td className="actions"><button className="secondary" onClick={() => onSelect(user)}>Details</button>{user.role !== 'admin' && <button className="danger" onClick={() => onDelete(user)}>Delete</button>}</td></tr>)}</tbody>
  </table></div>;
}
