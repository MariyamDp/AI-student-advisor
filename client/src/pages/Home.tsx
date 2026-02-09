import { useNavigate } from 'react-router-dom';
import Header from '../components/nav/Header';
import HeroSection from '../components/hero/HeroSection';
import FeaturesSection from '../components/features/FeaturesSection';
import './Home.css';
import About from '../components/about/About';
import WhoWeServe from '../components/serve/WhoWeServe';
import ProductSection from '../components/product/ProductSection';
import WhySection from '../components/why/WhySection';
import Pricing from '../components/pricing/Pricing';
import Questions from '../components/questions/Questions';
import Footer from '../components/footer/Footer';

const Home = () => {
  const navigate = useNavigate();

  const handleStartChatting = () => {
    navigate('/chat');
  };

  return (
    <div id="home" className="home-page">
      <Header />

      <main className="main-content">
        <HeroSection onStartChatting={handleStartChatting} />
        <FeaturesSection />
        <About />
        <WhoWeServe />
        <ProductSection />
        <WhySection />
        <Pricing />
        <Questions />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
