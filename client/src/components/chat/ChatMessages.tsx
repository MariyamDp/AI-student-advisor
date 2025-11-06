import type { Message as Message } from '../../hooks/useChat';
import ChatIcon from '../../assets/chatIcon.svg';
import './ChatMessages.css';

interface ChatMessagesProps {
  messages: Message[];
}

// Utility function to parse markdown bold (**text**) and convert to HTML
const parseMarkdownBold = (text: string): string => {
  // Replace **text** with <strong>text</strong>
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
};

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
            <div
              className="message-text"
              dangerouslySetInnerHTML={{
                __html: parseMarkdownBold(message.content),
              }}
            />
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
