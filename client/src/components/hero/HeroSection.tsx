import HeroText from './HeroText';
import ChatPreview from './ChatPreview';
import './HeroSection.css';

interface HeroSectionProps {
  onStartChatting: () => void;
}

const HeroSection = ({ onStartChatting }: HeroSectionProps) => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <HeroText onStartChatting={onStartChatting} />
          <ChatPreview />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

