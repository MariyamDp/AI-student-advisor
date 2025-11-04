import './ChatHeader.css';
import LogoIcon from '../../assets/logoIcon.svg';

const ChatHeader = () => {
  return (
    <header className="chat-header-container">
      <div className="header-left">
        <button className="menu-btn">☰</button>
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
