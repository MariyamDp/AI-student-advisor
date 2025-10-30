import { useNavigate } from 'react-router-dom';
import Header from '../components/nav/Header';
import Button from '../components/button/Button';
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
                    <button className="send-btn">✈️</button>
                  </div>
                </div>

                <div className="floating-chat-icon">
                  <span className="logo-icon">🎓</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <p>Plan your semester with ease</p>
              </div>

              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <p>Find the best exchange or double degree opportunities</p>
              </div>

              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <p>Visualize your progress with smart dashboards</p>
              </div>

              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <p>Get quick answers for registration, research, and university services</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
