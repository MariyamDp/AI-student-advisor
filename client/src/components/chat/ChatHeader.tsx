import './ChatHeader.css';

const ChatHeader = () => {
  return (
    <header className="chat-header-container">
      <div className="header-left">
        <button className="menu-btn">☰</button>
        <div className="header-logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">MNU Portal</span>
        </div>
      </div>
      <div className="header-right">
        <div className="user-avatar">AS</div>
      </div>
    </header>
  );
};

export default ChatHeader;
