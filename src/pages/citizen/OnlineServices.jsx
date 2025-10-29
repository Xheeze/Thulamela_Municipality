import React from 'react'

export default function OnlineServices(){
  return (
    <div className="page container">
      <h1>Online Services Portal</h1>
      <section className="card" style={{ marginTop: '1rem' }}>
        <h2>Access Your Municipal Services Online</h2>
        <p>Welcome to the Thulamela Local Municipality Online Services Portal. Here you can conveniently manage various municipal tasks from the comfort of your home or office.</p>
        <div style={{ display:'flex', gap:'1rem', marginTop:'0.5rem' }}>
          <button>Login</button>
          <button className="btn-outline">Register</button>
        </div>
      </section>

      <section className="card" style={{ marginTop: '1rem' }}>
        <h2>Available Online Services</h2>
        <ul className="services-list" style={{ marginTop:'0.5rem' }}>
          <li>Pay Municipal Bills</li>
          <li>Apply for Certificates</li>
          <li>Submit Building Plans</li>
          <li>Business License Applications</li>
          <li>Property Valuations</li>
          <li>Water & Electricity Applications</li>
        </ul>
      </section>

      <section className="card" style={{ marginTop: '1rem' }}>
        <h2>Digital Services Dashboard</h2>
        <p>Once logged in, your personalized dashboard provides a quick overview of your accounts, applications, and important notifications.</p>
      </section>

      <section className="card" style={{ marginTop: '1rem' }}>
        <h2>Digital Payment Options</h2>
        <ul>
          <li>Credit/Debit Card</li>
          <li>EFT (Electronic Fund Transfer)</li>
          <li>Instant SID EFT</li>
          <li>QR Code Payments</li>
        </ul>
      </section>

      <section className="card" style={{ marginTop: '1rem' }}>
        <h2>Help and Support</h2>
        <p>Phone: (012) 345-6789</p>
        <p>Email: onlinesupport@thulamela.gov.za</p>
        <p>Operating Hours: Mon - Fri, 08:00 - 16:30</p>
      </section>
    </div>
  )
}
