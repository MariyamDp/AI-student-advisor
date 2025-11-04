import { useState } from 'react';
import { useChat } from '../hooks/useChat';
import ChatHeader from '../components/chat/ChatHeader';
import Sidebar from '../components/chat/Sidebar';
import CategoriesSection from '../components/chat/CategoriesSection';
import ChatContainer from '../components/chat/ChatContainer';
import BookIcon from '../assets/bookIcon.svg';
import DateIcon from '../assets/dateIcon.svg';
import GlassIcon from '../assets/glassIcon.svg';
import ProfileIcon from '../assets/profileIcon.svg';
import PlaneIcon from '../assets/plIcon.png';
import QuestionIcon from '../assets/questionIcon.svg';
import './ChatAssistant.css';

const ChatAssistant = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    await sendMessage(inputValue);
    setInputValue('');
  };

  const suggestedActions = [
    'Check prerequisites',
    'Show my milestones',
    'View course catalog',
    'Check GPA',
  ];

  const categories = [
    { name: 'Academic Planning', icon: BookIcon },
    { name: 'Course Registration', icon: DateIcon },
    { name: 'Academic Mobility', icon: PlaneIcon },
    { name: 'Double Degree Program', icon: ProfileIcon },
    { name: 'Research Opportunities', icon: GlassIcon },
    { name: 'General Support', icon: QuestionIcon },
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
          <div 
            className="sidebar-overlay" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <CategoriesSection categories={categories} />
        <main className="chat-main">
          <ChatContainer
            messages={messages}
            suggestedActions={suggestedActions}
            inputValue={inputValue}
            isLoading={isLoading}
            onInputChange={setInputValue}
            onSend={handleSendMessage}
            onActionClick={sendMessage}
          />
        </main>
      </div>
    </div>
  );
};

export default ChatAssistant;
