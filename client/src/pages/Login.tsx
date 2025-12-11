import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthCard from '../components/auth/AuthCard';
import LoginForm from '../components/auth/LoginForm';
import Header from '../components/nav/Header';
import './Login.css';

const Login = () => {
  // Email state is managed in LoginForm
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login, loginWithGoogle } = useAuth();

  const onSubmit = async (email: string, password: string) => {
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await login(email.trim(), password);
      // After login, redirect to chat (not profile setup)
      navigate('/chat');
    } catch (err) {
      const details = err instanceof Error ? err.message : 'Login failed';
      setError(details);
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSignIn = async (idToken: string) => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle(idToken);
      // Check if user needs profile setup (no name, major, or yearOfStudy)
      // This will be handled by the AuthContext after login
      navigate('/chat');
    } catch (err) {
      const details = err instanceof Error ? err.message : 'Google login failed';
      setError(details);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Header />
      <AuthCard title="Sign in" subtitle="Enter your email and password to continue">
        <LoginForm
          onSubmit={onSubmit}
          onGoogleSignIn={onGoogleSignIn}
          loading={loading}
          error={error}
        />
        <p className="login-page-link">
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </AuthCard>
    </div>
  );
};

export default Login;
