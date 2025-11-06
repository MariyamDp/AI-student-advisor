import { useState } from 'react';
import './SignUpForm.css';
import Button from '../button/Button';
import Input from '../input/Input';
import GoogleSignInButton from './GoogleSignInButton';

interface SignUpFormProps {
  onSubmit: (email: string, password: string) => Promise<void> | void;
  onGoogleSignIn?: (idToken: string) => Promise<void> | void;
  loading?: boolean;
  error?: string | null;
}

const SignUpForm = ({ onSubmit, onGoogleSignIn, loading, error }: SignUpFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    await onSubmit(email.trim(), password);
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
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={null}
        />
        <Button
          className="signup-form-button"
          variant="primary"
          disabled={!!loading || !email.trim() || !password.trim()}
          type="submit"
        >
          {loading ? 'Creating account…' : 'Sign up'}
        </Button>
      </form>
      <div className="signup-form-divider">
        <span>or</span>
      </div>
      <GoogleSignInButton
        onSuccess={handleGoogleSuccess}
        onError={err => console.error('Google Sign-In error:', err)}
        disabled={loading || googleLoading}
      />
    </>
  );
};

export default SignUpForm;
