import Button from '../button/Button';
import './HeroText.css';

interface HeroTextProps {
  onStartChatting: () => void;
}

const HeroText = ({ onStartChatting }: HeroTextProps) => {
  return (
    <div className="hero-text">
      <h1 className="hero-title">
        Your Personal Academic <span className="text-red">AI Advisor</span>
      </h1>
      <p className="hero-description">
        Navigate your university journey with confidence. Get personalized guidance for course
        planning, academic mobility, double degrees, and research opportunities.
      </p>
      <Button variant="primary" size="large" onClick={onStartChatting} className="hero-cta">
        Start Chatting
      </Button>
    </div>
  );
};

export default HeroText;
