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
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/who-we-serve" className="nav-link">
            Who We Serve
          </Link>
          <Link to="/product" className="nav-link">
            Product
          </Link>
          <Link to="/pricing" className="nav-link">
            Pricing
          </Link>
          <Link to="/faqs" className="nav-link">
            FAQs
          </Link>
        </nav>

        <button className="login-btn">Login</button>
      </div>
    </header>
  );
};

export default Header;
