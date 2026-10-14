import { useState } from 'react';
import { Link } from 'react-router-dom';

const emptyTicket = { requester_name: '', requester_email: '', category: '', priority: 'Medium', subject: '', description: '', status: 'Open' };
const categories = ['Hardware', 'Software', 'Network', 'Access', 'Other'];
const priorities = ['Low', 'Medium', 'High', 'Critical'];
const statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];

export default function TicketForm({ initial = {}, onSubmit, busy, editing = false }) {
  const [form, setForm] = useState({ ...emptyTicket, ...initial });
  const [error, setError] = useState('');
  function update(event) { setForm((current) => ({ ...current, [event.target.name]: event.target.value })); }
  async function submit(event) {
    event.preventDefault(); setError('');
    try { await onSubmit(form); } catch (requestError) { setError(requestError.message); }
  }
  return <form className="panel ticket-form" onSubmit={submit}>
    <h2>{editing ? 'Edit ticket' : 'Add ticket'}</h2>
    {error && <div className="alert" role="alert">{error}</div>}
    <label>Requester Name<input required maxLength="120" name="requester_name" value={form.requester_name} onChange={update} /></label>
    <label>Requester Email<input required type="email" maxLength="180" name="requester_email" value={form.requester_email} onChange={update} /></label>
    <label>Issue Category<select required name="category" value={form.category} onChange={update}><option value="">Select a category</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
    <label>Priority<select required name="priority" value={form.priority} onChange={update}>{priorities.map((item) => <option key={item}>{item}</option>)}</select></label>
    <label className="wide">Subject<input required maxLength="180" name="subject" value={form.subject} onChange={update} /></label>
    <label className="wide">Description<textarea required maxLength="5000" rows="5" name="description" value={form.description} onChange={update} /></label>
    {editing && <label>Status<select name="status" value={form.status} onChange={update}>{statuses.map((item) => <option key={item}>{item}</option>)}</select></label>}
    <div className="actions wide"><button disabled={busy}>{busy ? 'Saving…' : editing ? 'Save changes' : 'Create ticket'}</button><Link className="button-link secondary" to="/tickets">Cancel</Link></div>
  </form>;
}
