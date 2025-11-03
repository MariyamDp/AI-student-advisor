import { useState } from 'react';
import './SignUpForm.css';
import Button from '../button/Button';
import Input from '../input/Input';

interface SignUpFormProps {
  onSubmit: (email: string) => Promise<void> | void;
  loading?: boolean;
  error?: string | null;
}

const SignUpForm = ({ onSubmit, loading, error }: SignUpFormProps) => {
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
      <Button className="signup-form-button" variant="primary" disabled={!!loading || !email.trim()} type="submit">
        {loading ? 'Creating account…' : 'Sign up'}
      </Button>
    </form>
  );
};

export default SignUpForm;
