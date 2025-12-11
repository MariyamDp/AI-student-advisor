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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setPasswordError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    
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
          error={null}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            setPasswordError(null);
          }}
          error={null}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => {
            setConfirmPassword(e.target.value);
            setPasswordError(null);
          }}
          error={passwordError || error}
        />
        <Button
          className="signup-form-button"
          variant="primary"
          disabled={!!loading || !email.trim() || !password.trim() || !confirmPassword.trim()}
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
