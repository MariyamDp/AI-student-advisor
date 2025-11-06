import botIcon from '../../assets/botIcon.svg';
import './ChatPreview.css';

const ChatPreview = () => {
  return (
    <div className="hero-visual">
      <div className="chat-preview">
        <div className="chat-header">
          <div className="chat-logo">
            <img src="/logomain.png" alt="logo" className="chat-logo-img" />
            <span>AI Advisor</span>
          </div>
        </div>

        <div className="chat-messages">
          <div className="message ai-message">
            <div className="message-content">
              Hello! I'm your MNU Academic Assistant. How can I help you today?
            </div>
          </div>

          <div className="message user-message">
            <div className="message-content">Check my GPA</div>
          </div>

          <div className="message ai-message">
            <div className="message-content">
              Let me help you with that. Based on your current academic progress, I recommend
              checking your milestones page to see your next steps.
            </div>
          </div>

          <div className="message user-message">
            <div className="message-content">Sure, thank you so much!</div>
          </div>
        </div>

        <div className="chat-input">
          <div className="message-input">Type your message here...</div>
          <button className="send-btn">
            <img src="/arrow.svg" alt="send" className="send-icon" />
          </button>
        </div>
      </div>

      <div className="floating-chat-icon">
        <img src={botIcon} alt="bot icon" width={32} height={32} />
      </div>
    </div>
  );
};

export default ChatPreview;
