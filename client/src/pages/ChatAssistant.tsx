import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import ChatHeader from '../components/chat/ChatHeader';
import Sidebar from '../components/chat/Sidebar';
import ChatContainer from '../components/chat/ChatContainer';
import './ChatAssistant.css';

const ChatAssistant = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    const messageToSend = inputValue.trim();
    setInputValue('');
    await sendMessage(messageToSend);
  };

  const navItems = [
    { name: 'Chat Assistant', path: '/chat', active: location.pathname === '/chat' },
    { name: 'Milestones', path: '/milestones', active: location.pathname === '/milestones' },
    { name: 'Profile', path: '/profile', active: location.pathname === '/profile' },
  ];

  return (
    <div className="chat-assistant-page">
      <ChatHeader
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="chat-layout">
        <Sidebar
          navItems={navItems}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        {isSidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
        )}
        <main className="chat-main">
          <ChatContainer
            messages={messages}
            inputValue={inputValue}
            isLoading={isLoading}
            onInputChange={setInputValue}
            onSend={handleSendMessage}
          />
        </main>
      </div>
    </div>
  );
};

export default ChatAssistant;
