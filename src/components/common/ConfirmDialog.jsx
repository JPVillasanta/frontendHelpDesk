export default function ConfirmDialog({ open, title = 'Please confirm', message, onConfirm, onCancel, busy = false }) {
  if (!open) return null;
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onCancel()}>
      <section className="panel confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
        <h2 id="confirm-title">{title}</h2>
        <p>{message}</p>
        <div className="actions">
          <button className="danger" disabled={busy} onClick={onConfirm}>{busy ? 'Deleting…' : 'Delete'}</button>
          <button className="secondary" disabled={busy} onClick={onCancel}>Cancel</button>
        </div>
      </section>
    </div>
  );
}
