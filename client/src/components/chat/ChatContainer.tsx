import type { Message as Message } from '../../hooks/useChat';
import ChatMessages from './ChatMessages';
import SuggestedActions from './SuggestedActions';
import ChatInput from './ChatInput';
import './ChatContainer.css';

interface ChatContainerProps {
  messages: Message[];
  suggestedActions: string[];
  inputValue: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onActionClick: (action: string) => void;
}

const ChatContainer = ({
  messages,
  suggestedActions,
  inputValue,
  isLoading,
  onInputChange,
  onSend,
  onActionClick,
}: ChatContainerProps) => {
  return (
    <div className="chat-container">
      <ChatMessages messages={messages} />
      <SuggestedActions actions={suggestedActions} onActionClick={onActionClick} disabled={isLoading} />
      <ChatInput value={inputValue} onChange={onInputChange} onSend={onSend} isLoading={isLoading} />
    </div>
  );
};

export default ChatContainer;

