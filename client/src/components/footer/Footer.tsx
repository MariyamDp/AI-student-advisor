import './Footer.css';
import logo from '../../assets/icon.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo-wrap">
            <img src={logo} alt="AI Advisor logo" className="footer__logo-icon" />
          </div>
          <div className="footer__brand-text">
            <div className="footer__brand-name">AI Advisor</div>
            <div className="footer__brand-subtitle">
              Maqsut Narikbayev University
              <br />
              Astana, Kazakhstan
            </div>
          </div>
        </div>

        <div className="footer__grid">
          <div className="footer__column">
            <h4 className="footer__column-title">Who We Serve</h4>
            <ul className="footer__list">
              <li>Students</li>
              <li>Academic Advisors</li>
              <li>Career Advisors</li>
              <li>International Office</li>
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Product</h4>
            <ul className="footer__list">
              <li>AI Chatbot</li>
              <li>Milestone Tracker</li>
              <li>GPA &amp; Credit Tools</li>
              <li>Integration Setup</li>
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Company</h4>
            <ul className="footer__list">
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Support</h4>
            <ul className="footer__list">
              <li>Contact Support</li>
              <li>Schedule a Demo</li>
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Legal</h4>
            <ul className="footer__list">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">© 2025 AI Advisor. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
