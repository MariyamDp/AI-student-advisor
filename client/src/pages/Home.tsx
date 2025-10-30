import { useNavigate } from 'react-router-dom';
import Header from '../components/nav/Header';
import Button from '../components/button/Button';
import './Home.css';
// import Footer from '../components/footer/Footer.tsx';

const Home = () => {
  const navigate = useNavigate();

  const handleStartChatting = () => {
    navigate('/chat');
  };

  return (
    <div className="home-page">
      <Header />

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">
                  Your Personal Academic <span className="text-red">AI Agent</span>
                </h1>
                <p className="hero-description">
                  Navigate your university journey with confidence. Get personalized guidance for
                  course planning, academic mobility, double degrees, and research opportunities.
                </p>
                <Button
                  variant="primary"
                  size="large"
                  onClick={handleStartChatting}
                  className="hero-cta"
                >
                  Start Chatting
                </Button>
              </div>

              <div className="hero-visual">
                <div className="chat-preview">
                  <div className="chat-header">
                    <div className="chat-logo">
                      <img src="/logomain.png" alt="logo" className="logo-img" />
                      <span>AI Agent</span>
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
                        Let me help you with that. Based on your current academic progress, I
                        recommend checking your milestones page to see your next steps.
                      </div>
                    </div>

                    <div className="message user-message">
                      <div className="message-content">Sure, thank you so much!</div>
                    </div>
                  </div>

                  <div className="chat-input">
                    <input
                      type="text"
                      placeholder="Type your message here..."
                      className="message-input"
                    />
                    <button className="send-btn">
                      <img src="/arrow.png" alt="send" />
                    </button>
                  </div>
                </div>

                <div className="floating-chat-icon">
                  <span className="logo-icon">🎓</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-wrap">
            <h2 className="about-main-title">
              Empower Every Student to Realize Their Boldest Career Dreams
            </h2>

            <div className="about-content">
              <div className="about-copy">
                <h3 className="about-subtitle">About AI Agent</h3>

                <p>
                  <strong>AI Agent</strong> is an intelligent academic advisor built to transform
                  how students, advisors, and administrators interact within the university system.
                </p>

                <p>
                  It goes beyond simple automation — empowering every user to make informed, timely,
                  and confident academic decisions.
                </p>

                <p>
                  By integrating data, personalization, and AI technology, AI Agent creates a
                  unified academic ecosystem — where every student receives tailored guidance and
                  every advisor has the tools to ensure success.
                </p>

                <p>
                  The platform bridges communication, simplifies academic management, and turns
                  complex educational paths into clear, achievable goals.
                </p>
              </div>

              <figure className="about-shot">
                <img src="/about.png" alt="AI Agent Interface" />
              </figure>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
