import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import storage from '@shared/services/storage'
import logo from '../../thulamelalogo.png'

export default function Header() {
  const [profileName, setProfileName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const p = storage.getProfile();
    if (p && p.fullName) setProfileName(p.fullName);
  }, []);

  function handleLogout() {
    try { localStorage.removeItem('digiserve:role'); } catch {}
    navigate('/', { replace: true });
  }

  return (
    <header>
      <div className="top-bar">
        <div className="container">
          <div className="contact-info">
            <a href="tel:+27123456789" className="contact-link">
              <span>📞</span>
              <span>(012) 345-6789</span>
            </a>
            <a href="mailto:info@thulamela.gov.za" className="contact-link">
              <span>✉️</span>
              <span>info@thulamela.gov.za</span>
            </a>
          </div>
          <div className="language-switcher">
            {profileName ? <div className="profile-greet">Hello, {profileName.split(' ')[0]}</div> : null}
            <button className="lang-btn">English</button>
            <span>|</span>
            <button className="lang-btn">Tshivenda</button>
            <button className="lang-btn" style={{ marginLeft: '1rem', color: '#c00' }} onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>

      <nav className="main-nav">
        <div className="container">
          <Link to="/" className="brand">
            <img src={logo} alt="Thulamela Logo" className="logo" />
            <div className="brand-text">
              <h1>Thulamela</h1>
              <p>Local Municipality</p>
            </div>
          </Link>

          <div className="nav-links">
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/documents" className="nav-link">Documents</Link>
            <Link to="/appointments" className="nav-link">Appointments</Link>
            <Link to="/feedback" className="nav-link">Feedback</Link>
            <Link to="/online" className="nav-link">Online</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}