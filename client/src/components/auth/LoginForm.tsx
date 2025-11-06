import { useState } from 'react';
import './LoginForm.css';
import Button from '../button/Button';
import Input from '../input/Input';
import GoogleSignInButton from './GoogleSignInButton';

interface LoginFormProps {
  onSubmit: (email: string) => Promise<void> | void;
  onGoogleSignIn?: (idToken: string) => Promise<void> | void;
  loading?: boolean;
  error?: string | null;
}

const LoginForm = ({ onSubmit, onGoogleSignIn, loading, error }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    await onSubmit(email.trim());
  };

  const handleGoogleSuccess = async (idToken: string) => {
    if (!onGoogleSignIn) return;
    setGoogleLoading(true);
    try {
      await onGoogleSignIn(idToken);
    } catch (err) {
      console.error('Google sign-in error:', err);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={error}
        />
        <Button className="login-form-button" variant="primary" disabled={!!loading || !email.trim()} type="submit">
          {loading ? 'Signing in…' : 'Login'}
        </Button>
      </form>
      <div className="login-form-divider">
        <span>or</span>
      </div>
      <GoogleSignInButton
        onSuccess={handleGoogleSuccess}
        onError={(err) => console.error('Google Sign-In error:', err)}
        disabled={loading || googleLoading}
      />
    </>
  );
};

export default LoginForm;
