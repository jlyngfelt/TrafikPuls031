import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <p className="copyright-text">
          © {currentYear} TrafikPuls031 - Data från Sveriges Radio
        </p>
        <div className="footer-links">
          <a href="https://sverigesradio.se/oppetapi" target="_blank" rel="noopener noreferrer" className="api-link">
            API-dokumentation
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;