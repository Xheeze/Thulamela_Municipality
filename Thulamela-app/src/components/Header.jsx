import React from 'react'

export default function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <nav className="top-nav">
          <a href="#government">Government</a>
          <a href="#vacancies">Vacancies</a>
          <a href="#consumer">Consumer Portal</a>
        </nav>
        <div className="social-links">
          <a href="#facebook" aria-label="Facebook">f</a>
          <a href="#twitter" aria-label="Twitter">t</a>
          <a href="#youtube" aria-label="YouTube">yt</a>
          <a href="#tiktok" aria-label="TikTok">tt</a>
        </div>
      </div>
      
      <div className="header-main">
        <div className="brand">
          <img 
            src="../thulamelalogo.png" 
            alt="Thulamela Municipality"
            className="logo"
          />
          <div className="brand-text">
            <span className="brand-name">THULAMELA</span>
            <span className="brand-type">MUNICIPALITY</span>
          </div>
        </div>

        <div className="header-right">
          <div className="lang-selector">
            <button className="lang-btn">EN</button>
            <span>/</span>
            <button className="lang-btn">ES</button>
          </div>
          <button className="user-btn" aria-label="User account">
            <span className="user-icon">👤</span>
          </button>
        </div>
      </div>
    </header>
  )
}
