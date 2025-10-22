import React from 'react'

export default function Services(){
  return (
    <div className="page container">
      <h1>All Services</h1>
      <section id="report-fault" className="card" style={{ marginTop: '1rem' }}>
        <h2>Report a Fault</h2>
        <p>Log service delivery issues such as water, electricity, or road faults.</p>
      </section>
      <section id="employment" className="card" style={{ marginTop: '1rem' }}>
        <h2>Employment Opportunities</h2>
        <p>View and apply for current vacancies.</p>
      </section>
      <section id="accounts" className="card" style={{ marginTop: '1rem' }}>
        <h2>Municipal Accounts</h2>
        <p>Billing queries, balances, and account management.</p>
      </section>
      <section id="property-rates" className="card" style={{ marginTop: '1rem' }}>
        <h2>Property Rates</h2>
        <p>Rates information, assessments, and payments.</p>
      </section>
      <section id="traffic" className="card" style={{ marginTop: '1rem' }}>
        <h2>Traffic Services</h2>
        <p>Fines, licensing and traffic-related services.</p>
      </section>
      <section id="complaints" className="card" style={{ marginTop: '1rem' }}>
        <h2>Municipal Complaints</h2>
        <p>Lodge complaints and track responses.</p>
      </section>
      <section id="community" className="card" style={{ marginTop: '1rem' }}>
        <h2>Community Services</h2>
        <p>Community programs and social support services.</p>
      </section>
    </div>
  )
}
