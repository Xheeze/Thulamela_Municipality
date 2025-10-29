import React from 'react'

export default function ServiceCard({ icon, title, link }) {
  return (
    <a href={link} className="service-card">
      <div className="service-icon">
        {icon}
      </div>
      <div className="service-title">{title}</div>
    </a>
  )
}