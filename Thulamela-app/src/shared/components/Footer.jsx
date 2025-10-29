import React from 'react';
import logo from '../../thulamelalogo.png';
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={logo} alt="Thulamela Logo" className="footer-logo" />
            <p className="footer-tagline">
              Making service delivery our priority through sustainable development and good governance.
            </p>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <address>
              <p>123 Main Road</p>
              <p>Thulamela Central</p>
              <p>Limpopo, 0999</p>
              <p>Tel: (012) 345-6789</p>
              <p>Email: info@thulamela.gov.za</p>
            </address>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/documents">Document Services</a></li>
              <li><a href="/appointments">Book Appointment</a></li>
              <li><a href="/feedback">Submit Feedback</a></li>
              <li><a href="/profile">My Profile</a></li>
              <li><a href="/services">All Services</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Operating Hours</h3>
            <div className="hours-list">
              <p>Monday - Friday:</p>
              <p>08:00 - 16:30</p>
              <p>Saturday:</p>
              <p>09:00 - 13:00</p>
              <p>Sunday & Public Holidays:</p>
              <p>Closed</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            © 2025 Thulamela Municipality. All rights reserved.
          </div>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}