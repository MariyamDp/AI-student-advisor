import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import './ChatAssistant.css';

const ChatAssistant = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    await sendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const suggestedActions = [
    'Check prerequisites',
    'Show my milestones',
    'View course catalog',
    'Check GPA',
  ];

  const categories = [
    { name: 'Academic Planning', icon: '📚' },
    { name: 'Course Registration', icon: '📝' },
    { name: 'Academic Mobility', icon: '✈️' },
    { name: 'Double Degree Program', icon: '🎓' },
    { name: 'Research Opportunities', icon: '🔬' },
    { name: 'General Support', icon: '💬' },
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

      <div className="chat-layout">
        {/* Left Sidebar */}
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

        {/* Middle Section - Categories */}
        <section className="categories-section">
          <h3 className="categories-title">Academic Categories</h3>
          <div className="categories-grid">
            {categories.map(category => (
              <div key={category.name} className="category-item">
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Right Section - Chat Interface */}
        <main className="chat-main">
          <div className="chat-container">
            {/* Chat Messages */}
            <div className="chat-messages">
              {messages.map(message => (
                <div key={message.id} className={`message ${message.sender}-message`}>
                  <div className="message-avatar">{message.sender === 'ai' ? '🎓' : '👤'}</div>
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

            {/* Chat Input */}
            <div className="chat-input-container">
              <div className="chat-input">
                <button className="mic-btn">🎤</button>
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
                  {isLoading ? '⏳' : '✈️'}
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
