import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/Login';
import TicketsPage from './pages/tickets/TicketsPage';
import TicketDetail from './pages/tickets/TicketDetail';
import TicketFormPage from './pages/tickets/TicketFormPage';
import './App.css';

export default function App() {
  return <AuthProvider><BrowserRouter><Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Navigate to="/tickets" replace />} />
    <Route path="/tickets" element={<ProtectedRoute><TicketsPage /></ProtectedRoute>} />
    <Route path="/tickets/new" element={<ProtectedRoute><TicketFormPage /></ProtectedRoute>} />
    <Route path="/tickets/:id" element={<ProtectedRoute><TicketDetail /></ProtectedRoute>} />
    <Route path="/tickets/:id/edit" element={<ProtectedRoute><TicketFormPage /></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/tickets" replace />} />
  </Routes></BrowserRouter></AuthProvider>;
}
