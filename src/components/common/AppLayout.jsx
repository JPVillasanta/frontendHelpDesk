import Navbar from './Navbar';
import Footer from './Footer';

export default function AppLayout({ children }) {
  return <div className="shell"><Navbar /><main className="content">{children}</main><Footer /></div>;
}
