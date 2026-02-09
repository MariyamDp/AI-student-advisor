import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/icon.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" className="logo-icon" width={32} height={32} />
          <span className="logo-text">AI Advisor</span>
        </Link>

        <nav className="nav-menu">
          <button
            className="nav-link"
            onClick={() => {
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Home
          </button>

          <button
            className="nav-link"
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            About
          </button>

          <button
            className="nav-link"
            onClick={() => {
              document.getElementById('who-we-serve')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Who We Serve
          </button>

          <button
            className="nav-link"
            onClick={() => {
              document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Product
          </button>

          <button
            className="nav-link"
            onClick={() => {
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Pricing
          </button>

          <button
            className="nav-link"
            onClick={() => {
              document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            FAQs
          </button>
        </nav>

        <Link to="/login" className="login-btn">
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
