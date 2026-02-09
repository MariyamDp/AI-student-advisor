import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
}

const Input = ({ error, className = '', ...props }: InputProps) => {
  return (
    <div className="input-wrapper">
      <input className={`input ${error ? 'input-error' : ''} ${className}`} {...props} />
      {error && <div className="input-error-message">{error}</div>}
    </div>
  );
};

export default Input;
