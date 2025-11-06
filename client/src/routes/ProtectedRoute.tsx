import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, token } = useAuth();

  // Если state ещё не успел обновиться — подхватываем токен из localStorage
  const storedToken = localStorage.getItem('auth_token');

  if (isAuthenticated || token || storedToken) {
    return <>{children}</>;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
