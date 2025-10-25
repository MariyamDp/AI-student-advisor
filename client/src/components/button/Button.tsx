import './Button.css';

interface ButtonProps {
  className?: string;
  onClick?: (() => void) | (() => Promise<void>);
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const Button = ({
  className = '',
  onClick,
  children,
  disabled = false,
  type = 'button',
  variant = 'primary',
  size = 'medium',
}: ButtonProps) => (
  <button
    className={`btn btn-${variant} btn-${size} ${className}`}
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    {children}
  </button>
);

export default Button;
