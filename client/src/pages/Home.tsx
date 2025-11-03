import { useNavigate } from 'react-router-dom';
import Header from '../components/nav/Header';
import HeroSection from '../components/hero/HeroSection';
import FeaturesSection from '../components/features/FeaturesSection';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleStartChatting = () => {
    navigate('/chat');
  };

  return (
    <div className="home-page">
      <Header />

      <main className="main-content">
        <HeroSection onStartChatting={handleStartChatting} />
        <FeaturesSection />
      </main>
    </div>
  );
};

export default Home;
