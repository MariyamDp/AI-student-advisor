import './ChatHeader.css';
import LogoIcon from '../../assets/logoIcon.svg';
import BurgerMenu from '../burger/BurgerMenu';

interface ChatHeaderProps {
  onMenuClick: () => void;
  isSidebarOpen?: boolean;
}

const ChatHeader = ({ onMenuClick, isSidebarOpen = false }: ChatHeaderProps) => {
  return (
    <header className="chat-header-container">
      <div className="header-left">
        <BurgerMenu onClick={onMenuClick} isOpen={isSidebarOpen} />
        <div className="header-logo">
          <img src={LogoIcon} alt="Logo" />
          <span className="logo-title">MNU Portal</span>
        </div>
      </div>
      <div className="header-right">
        <div className="user-avatar">AS</div>
      </div>
    </header>
  );
};

export default ChatHeader;
