export default function AdminUserDetails({ user, onClose }) {
  if (!user) return <section className="panel muted">Select a user to view account details.</section>;
  return (
    <section className="panel">
      <div className="section-head"><h2>User details</h2><button className="secondary" onClick={onClose}>Close</button></div>
      <p><strong>{user.name}</strong></p><p>{user.email}</p>
      <p>Role: <span className="badge">{user.role}</span></p>
      <p>Products: {user.products_count ?? 0}</p>
      <p className="muted">Joined {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'date unavailable'}</p>
    </section>
  );
}
