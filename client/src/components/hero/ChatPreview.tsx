import './ChatPreview.css';
import SendButton from '../../assets/arrow.svg';
import LogoIcon from '../../assets/icon.svg';

const ChatPreview = () => {
  return (
    <div className="hero-visual">
      <div className="chat-preview">
        <div className="chat-header">
          <div className="chat-logo">
            <img src={LogoIcon} alt="logo icon" />
            <span>AI Agent</span>
          </div>
        </div>

        <div className="chat-messages-preview">
          <div className="message ai-message-preview">
            <div className="message-content-preview">
              Hello! I'm your MNU Academic Assistant. How can I help you today?
            </div>
          </div>

          <div className="message user-message-preview">
            <div className="message-content-preview">Check my GPA</div>
          </div>

          <div className="message ai-message-preview">
            <div className="message-content-preview">
              Let me help you with that. Based on your current academic progress, I recommend
              checking your milestones page to see your next steps.
            </div>
          </div>

          <div className="message user-message-preview">
            <div className="message-content-preview">Sure, thank you so much!</div>
          </div>
        </div>

        <div className="chat-input">
          <div className="message-input">Type your message here...</div>
          <button className="send-btn-preview">
            <img src={SendButton} alt="send button" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;
