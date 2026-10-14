import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import TicketForm from '../../components/ticket/TicketForm';
import { ticketService } from '../../services/ticketService';

export default function TicketFormPage() {
  const { id } = useParams(); const editing = Boolean(id); const navigate = useNavigate();
  const [ticket, setTicket] = useState(null); const [loading, setLoading] = useState(editing); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  useEffect(() => { if (!editing) return undefined; let active = true; ticketService.get(id).then((result) => { if (active) setTicket(result.ticket); }).catch((e) => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [editing, id]);
  async function save(values) { setBusy(true); setError(''); try { if (editing) await ticketService.update(id, values); else await ticketService.create(values); navigate('/tickets', { replace: true, state: { notice: editing ? 'Ticket updated.' : 'Ticket created.' } }); } finally { setBusy(false); } }
  return <AppLayout><Link to="/tickets">← Back to Ticket List</Link><div className="heading"><h1>{editing ? 'Edit Ticket' : 'Add Ticket'}</h1></div>{error && <div className="alert" role="alert">{error}</div>}{loading ? <LoadingSpinner /> : (!editing || ticket) && <TicketForm key={ticket?.id || 'new'} initial={ticket || {}} onSubmit={save} busy={busy} editing={editing} />}</AppLayout>;
}
