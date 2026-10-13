import { useAuth } from './useAuth';

export default function useRole() {
  const { user } = useAuth();
  return {
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    role: user?.role ?? null,
  };
}
