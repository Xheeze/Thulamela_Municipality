import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <div className="landing container">
      <section className="hero">
        <h2>Welcome to Thulamela Municipality</h2>
        <p>Your one-stop portal for services, documents, appointments and more.</p>
        <div className="hero-actions">
          <Link to="/home" className="btn btn-primary">Enter Citizen Portal</Link>
          <Link to="/auth" className="btn btn-outline">Staff Login</Link>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h3>Quick Services</h3>
          <p>Access the most requested services like permits, payments and planning.</p>
        </div>
        <div className="feature">
          <h3>Live Queue</h3>
          <p>Check current queue status before you visit our offices.</p>
        </div>
        <div className="feature">
          <h3>Support</h3>
          <p>Contact us for assistance with any municipal services.</p>
        </div>
      </section>
    </div>
  )
}
