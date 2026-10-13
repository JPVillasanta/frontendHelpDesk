export default function LoadingSpinner({ label = 'Loading…' }) {
  return <div className="center" role="status">{label}</div>;
}
