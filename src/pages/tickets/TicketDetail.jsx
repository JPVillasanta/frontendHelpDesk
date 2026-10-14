import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { ticketService } from '../../services/ticketService';

export default function TicketDetail() {
  const { id } = useParams(); const navigate = useNavigate();
  const [ticket, setTicket] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [confirm, setConfirm] = useState(false); const [busy, setBusy] = useState(false);
  useEffect(() => { let active = true; ticketService.get(id).then((result) => { if (active) setTicket(result.ticket); }).catch((e) => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [id]);
  async function remove() { setBusy(true); try { await ticketService.remove(id); navigate('/tickets', { replace: true, state: { notice: 'Ticket deleted.' } }); } catch (e) { setError(e.message); setConfirm(false); } finally { setBusy(false); } }
  return <AppLayout><Link to="/tickets">← Back to Ticket List</Link>{error && <div className="alert" role="alert">{error}</div>}{loading ? <LoadingSpinner /> : ticket && <article className="panel detail ticket-detail"><div className="heading"><div><p className="eyebrow">{ticket.ticket_number}</p><h1>{ticket.subject}</h1></div><div className="actions"><Link className="button-link" to={`/tickets/${id}/edit`}>Edit Ticket</Link><button className="danger" onClick={() => setConfirm(true)}>Delete</button></div></div><div className="detail-grid"><p><strong>Requester</strong><span>{ticket.requester_name}</span></p><p><strong>Email</strong><span>{ticket.requester_email}</span></p><p><strong>Category</strong><span>{ticket.category}</span></p><p><strong>Priority</strong><span>{ticket.priority}</span></p><p><strong>Status</strong><span>{ticket.status}</span></p><p><strong>Date Created</strong><span>{new Date(ticket.created_at).toLocaleString()}</span></p></div><h2>Description</h2><p className="description">{ticket.description}</p></article>}
    <ConfirmDialog open={confirm} title="Delete this ticket?" message={ticket ? `${ticket.ticket_number} will be permanently removed.` : ''} onConfirm={remove} onCancel={() => setConfirm(false)} busy={busy} />
  </AppLayout>;
}
