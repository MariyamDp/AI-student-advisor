import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthCard from '../components/auth/AuthCard';
import LoginForm from '../components/auth/LoginForm';
import Header from '../components/nav/Header';

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import './Login.css';

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (val: string) => {
    if (!val.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await login(val.trim());
      navigate('/chat');
    } catch (err) {
      const details = err instanceof Error ? err.message : 'Login failed';
      setError(details);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse: unknown) => {
    setError(null);
    setLoading(true);

    try {
      // Проверяем, что объект валидный
      if (
        typeof credentialResponse !== 'object' ||
        credentialResponse === null ||
        !('credential' in credentialResponse)
      ) {
        setError('Google login response is invalid');
        return;
      }

      // Достаём credential
      const { credential } = credentialResponse as { credential: string };

      // Декодируем токен Google
      const userData: { email?: string } = jwtDecode(credential);

      if (!userData.email) {
        setError('Google account does not provide an email address');
        return;
      }

      // Пробуем логин, если нет пользователя — создаём
      try {
        await login(userData.email);
      } catch {
        await signup(userData.email);
      }

      // ДЕЛАЕМ задержку чтобы Context успел обновиться
      setTimeout(() => navigate('/chat'), 100);
    } catch (err) {
      console.error('Google Login Error:', err);
      setError('Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Header />
      <AuthCard title="Sign in" subtitle="Enter your email to continue">
        <LoginForm onSubmit={onSubmit} loading={loading} error={error} />

        <div className="google-login-wrapper">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setError('Google login failed')}
          />
        </div>

        <p className="login-page-link">
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </AuthCard>
    </div>
  );
};

export default Login;
