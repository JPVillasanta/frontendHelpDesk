import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppLayout from '../../components/common/AppLayout';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import TicketTable from '../../components/ticket/TicketTable';
import { ticketService } from '../../services/ticketService';

export default function TicketsPage() {
  const location = useLocation();
  const [tickets, setTickets] = useState([]); const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const [notice, setNotice] = useState(location.state?.notice || ''); const [deleting, setDeleting] = useState(null); const [busy, setBusy] = useState(false);
  async function load() { setLoading(true); setError(''); try { const result = await ticketService.list(search); setTickets(result.tickets || []); } catch (e) { setError(e.message); } finally { setLoading(false); } }
  useEffect(() => { let active = true; ticketService.list(search).then((result) => { if (active) { setTickets(result.tickets || []); setError(''); } }).catch((e) => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [search]);
  async function remove() { setBusy(true); try { await ticketService.remove(deleting.id); setDeleting(null); setNotice('Ticket deleted.'); await load(); } catch (e) { setError(e.message); } finally { setBusy(false); } }
  return <AppLayout><div className="heading"><div><p className="eyebrow">IT SUPPORT</p><h1>Helpdesk tickets</h1><p className="muted">Track and manage support requests.</p></div><Link className="button-link" to="/tickets/new">+ Add Ticket</Link></div>
    {notice && <div className="notice" role="status">{notice}<button className="secondary" onClick={() => setNotice('')}>Dismiss</button></div>}{error && <div className="alert" role="alert">{error}<button className="secondary" onClick={load}>Retry</button></div>}
    <section className="panel"><div className="section-head"><h2>Ticket List</h2><input className="search" aria-label="Search tickets" placeholder="Search tickets…" value={search} onChange={(event) => setSearch(event.target.value)} /></div>{loading ? <LoadingSpinner label="Loading tickets…" /> : <TicketTable tickets={tickets} onDelete={setDeleting} />}</section>
    <Link to="/tickets/new" className="floating-action" aria-label="Add ticket">+</Link>
    <ConfirmDialog open={Boolean(deleting)} title="Delete this ticket?" message={deleting ? `${deleting.ticket_number} will be permanently removed.` : ''} onConfirm={remove} onCancel={() => setDeleting(null)} busy={busy} />
  </AppLayout>;
}
