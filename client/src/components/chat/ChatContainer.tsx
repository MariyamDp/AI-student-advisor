import type { Message as Message } from '../../hooks/useChat';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import './ChatContainer.css';

interface ChatContainerProps {
  messages: Message[];
  inputValue: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

const ChatContainer = ({
  messages,
  inputValue,
  isLoading,
  onInputChange,
  onSend,
}: ChatContainerProps) => {
  return (
    <div className="chat-container">
      <ChatMessages messages={messages} />
      <ChatInput
        value={inputValue}
        onChange={onInputChange}
        onSend={onSend}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatContainer;
