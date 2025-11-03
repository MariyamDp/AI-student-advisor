import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthCard from '../components/auth/AuthCard';
import SignUpForm from '../components/auth/SignUpForm';
import Header from '../components/nav/Header';
import './SignUp.css';

const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (val: string) => {
    if (!val.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await signup(val.trim());
      navigate('/chat');
    } catch (err) {
      const details = err instanceof Error ? err.message : 'Sign up failed';
      setError(details);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <Header />
      <AuthCard title="Create account" subtitle="Enter your email to get started">
        <SignUpForm onSubmit={onSubmit} loading={loading} error={error} />
        <p className="signup-page-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </AuthCard>
    </div>
  );
};

export default SignUp;
