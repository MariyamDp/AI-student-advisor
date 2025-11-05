import './ChatInput.css';
import SendIcon from '../../assets/arrow.svg';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading?: boolean;
}

const ChatInput = ({ value, onChange, onSend, isLoading = false }: ChatInputProps) => {
  return (
    <div className="chat-input-container">
      <div className="chat-input-section">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Ask me anything about your academic journey..."
          className="message-input"
          disabled={isLoading}
        />
        <button className="send-btn" onClick={onSend} disabled={isLoading}>
          <img src={SendIcon} alt="Send" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
