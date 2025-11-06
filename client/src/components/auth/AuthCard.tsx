import './AuthCard.css';

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const AuthCard = ({ title, subtitle, children }: AuthCardProps) => {
  return (
    <div className="auth-page-center">
      <div className="auth-card">
        <h2 className="auth-card-title">{title}</h2>
        {subtitle ? <p className="auth-card-subtitle">{subtitle}</p> : null}
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
