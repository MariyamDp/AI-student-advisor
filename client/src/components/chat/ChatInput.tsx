import './ChatInput.css';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading?: boolean;
}

const ChatInput = ({ value, onChange, onSend, isLoading }: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input-section">
        <button className="mic-btn">🎤</button>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about your academic journey..."
          className="message-input"
        />
        <button className="send-btn" onClick={onSend} disabled={isLoading || !value.trim()}>
          {isLoading ? '⏳' : '✈️'}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
