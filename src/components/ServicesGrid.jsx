import React from 'react'
import ServiceCard from './ServiceCard'

export default function ServicesGrid({ services }) {
  return (
    <section className="services-section">
      <h2 className="section-title">Municipality Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            link={service.link}
          />
        ))}
      </div>
    </section>
  )
}