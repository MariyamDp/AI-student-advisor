import type { Message as Message } from '../../hooks/useChat';
import './ChatMessages.css';

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
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
  );
};

export default ChatMessages;

