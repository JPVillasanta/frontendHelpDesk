export default function AdminStats({ stats }) {
  const cards = [['Users', stats?.users], ['Admins', stats?.admins], ['Products', stats?.products]];
  return <div className="stats">{cards.map(([label, value]) => <div className="panel stat" key={label}><span>{label}</span><strong>{value ?? '—'}</strong></div>)}</div>;
}
