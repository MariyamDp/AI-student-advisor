import { useState } from 'react';
import './LoginForm.css';
import Button from '../button/Button';
import Input from '../input/Input';

interface LoginFormProps {
  onSubmit: (email: string) => Promise<void> | void;
  loading?: boolean;
  error?: string | null;
}

const LoginForm = ({ onSubmit, loading, error }: LoginFormProps) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    await onSubmit(email.trim());
  };

  return (
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
  );
};

export default LoginForm;
