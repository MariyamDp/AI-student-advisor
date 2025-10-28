import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import './ChatAssistant.css';

// Импорт иконок
import booksIcon from '../assets/icons/books.png';
import calendarIcon from '../assets/icons/calendar.png';
import planeIcon from '../assets/icons/plane.png';
import peopleIcon from '../assets/icons/people.png';
import labIcon from '../assets/icons/lab.png';
import questionIcon from '../assets/icons/question.png';
import logoIcon from '../assets/icons/logo.png';
import chatIcon from '../assets/icons/chat.png';

const ChatAssistant = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    await sendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const suggestedActions = [
    'Check prerequisites',
    'Show my milestones',
    'View course catalog',
    'Check GPA',
  ];

  const categories = [
    { name: 'Academic Planning', icon: booksIcon },
    { name: 'Course Registration', icon: calendarIcon },
    { name: 'Academic Mobility', icon: planeIcon },
    { name: 'Double Degree Program', icon: peopleIcon },
    { name: 'Research Opportunities', icon: labIcon },
    { name: 'General Support', icon: questionIcon },
  ];

  const navItems = [
    { name: 'Chat Assistant', path: '/chat', active: true },
    { name: 'Milestones', path: '/milestones', active: false },
    { name: 'Dashboard', path: '/dashboard', active: false },
    { name: 'Profile', path: '/profile', active: false },
    { name: 'Resources', path: '/resources', active: false },
  ];

  return (
    <div className="chat-assistant-page">
      {/* Header */}
      <header className="chat-header">
        <div className="header-left">
          <button className="menu-btn">
            <img src={chatIcon} alt="menu" width="22" />
          </button>
          <div className="header-logo">
            <img src={logoIcon} alt="MNU logo" className="logo-icon" />
            <span className="logo-text">MNU Portal</span>
          </div>
        </div>
        <div className="header-right">
          <div className="user-avatar">AS</div>
        </div>
      </header>

      <div className="chat-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            {navItems.map(item => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-item ${item.active ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Categories */}
        <section className="categories-section">
          <h3 className="categories-title">Academic Categories</h3>
          <div className="categories-grid">
            {categories.map(category => (
              <div key={category.name} className="category-item">
                <img src={category.icon} alt={category.name} className="category-icon" />
                <span className="category-name">{category.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Chat */}
        <main className="chat-main">
          <div className="chat-container">
            {/* Messages */}
            <div className="chat-messages">
              {messages.map(message => (
                <div key={message.id} className={`message ${message.sender}-message`}>
                  <div className="message-avatar">
                    <img
                      src={message.sender === 'ai' ? logoIcon : peopleIcon}
                      alt="avatar"
                      width="30"
                      className="avatar-img"
                    />
                  </div>
                  <div className="message-content">
                    <div className="message-text">{message.content}</div>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Actions */}
            <div className="suggested-actions">
              {suggestedActions.map(action => (
                <button
                  key={action}
                  className="action-btn"
                  onClick={() => sendMessage(action)}
                  disabled={isLoading}
                >
                  {action}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="chat-input-container">
              <div className="chat-input">
                <button className="mic-btn">
                  <img src={chatIcon} alt="mic" width="22" />
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your academic journey..."
                  className="message-input"
                />
                <button
                  className="send-btn"
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                >
                  {isLoading ? '⏳' : <img src={planeIcon} alt="send" className="send-icon" />}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatAssistant;
