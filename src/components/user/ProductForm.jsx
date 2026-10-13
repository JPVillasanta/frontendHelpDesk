import { useState } from 'react';

export default function ProductForm({ initial = {}, onSubmit, submitLabel = 'Save product', onCancel, busy = false }) {
  const [form, setForm] = useState({
    name: initial.name || '',
    description: initial.description || '',
    price: initial.price ?? '',
    image_url: initial.image_url || '',
  });

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    onSubmit({ ...form, price: Number(form.price) });
  }

  return (
    <form className="panel form" onSubmit={submit}>
      <h2>{initial.id ? 'Edit product' : 'Add a product'}</h2>
      <label>Name<input required maxLength="150" name="name" value={form.name} onChange={update} /></label>
      <label>Description<textarea maxLength="5000" name="description" value={form.description} onChange={update} /></label>
      <label>Price<input required min="0" step="0.01" type="number" name="price" value={form.price} onChange={update} /></label>
      <label>Image URL<input type="url" name="image_url" value={form.image_url} onChange={update} /></label>
      <div className="actions"><button disabled={busy}>{busy ? 'Saving…' : submitLabel}</button>{onCancel && <button type="button" className="secondary" onClick={onCancel}>Cancel</button>}</div>
    </form>
  );
}
