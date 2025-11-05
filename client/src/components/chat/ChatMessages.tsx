import type { Message as Message } from '../../hooks/useChat';
import ChatIcon from '../../assets/chatIcon.svg';
import './ChatMessages.css';

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className="chat-messages">
      {messages.map(message => (
        <div key={message.id} className={`message ${message.sender}-message`}>
          {message.sender === 'ai' && (
            <div className="message-avatar">
              <img src={ChatIcon} alt="AI" />
            </div>
          )}
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
