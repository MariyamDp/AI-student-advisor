import './ChatHeader.css';
import LogoIcon from '../../assets/logoIcon.svg';
import BurgerMenu from '../burger/BurgerMenu';
import { useNavigate } from 'react-router-dom';

interface ChatHeaderProps {
  onMenuClick: () => void;
  isSidebarOpen?: boolean;
}

const ChatHeader = ({ onMenuClick, isSidebarOpen = false }: ChatHeaderProps) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="chat-header-container">
      <div className="header-left">
        <BurgerMenu onClick={onMenuClick} isOpen={isSidebarOpen} />
        <button type="button" className="header-logo" onClick={handleLogoClick}>
          <img src={LogoIcon} alt="Logo" />
          <span className="logo-title">MNU Portal</span>
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
