import { Link } from 'react-router-dom';

export default function TicketTable({ tickets, onDelete }) {
  if (!tickets.length) return <div className="empty">No tickets found. Add a ticket to get started.</div>;
  return <div className="table-wrap"><table><thead><tr><th>Ticket #</th><th>Requester</th><th>Subject</th><th>Priority</th><th>Status</th><th>Date Created</th><th>Actions</th></tr></thead>
    <tbody>{tickets.map((ticket) => <tr key={ticket.id}>
      <td><Link to={`/tickets/${ticket.id}`}>{ticket.ticket_number}</Link></td><td>{ticket.requester_name}<small>{ticket.requester_email}</small></td><td>{ticket.subject}</td><td><span className={`badge priority-${ticket.priority.toLowerCase()}`}>{ticket.priority}</span></td><td>{ticket.status}</td><td>{new Date(ticket.created_at).toLocaleString()}</td>
      <td><div className="actions"><Link className="button-link secondary" to={`/tickets/${ticket.id}`}>View</Link><button className="danger" onClick={() => onDelete(ticket)}>Delete</button></div></td>
    </tr>)}</tbody></table></div>;
}
