import Icon from '@components/Icon'
import LiveQueue from '@components/LiveQueue'
import Announcements from '@components/Announcements'
import { Link } from 'react-router-dom'

const quickActions = [
  {
    icon: 'Feedback',
    title: 'Report a Fault',
    link: '/feedback',
    description: 'Log an issue or service fault'
  },
  {
    icon: 'Document',
    title: 'Apply for Services',
    link: '/online',
    description: 'Use our online services portal'
  },
  {
    icon: 'Finance',
    title: 'Pay Bills',
    link: '/online',
    description: 'Settle municipal accounts online'
  }
]

const municipalServices = [
  { icon: 'Feedback', title: 'Report a Fault', link: '/services#report-fault', description: 'Report service delivery issues' },
  { icon: 'Employment', title: 'Employment Opportunities', link: '/services#employment', description: 'Jobs and applications' },
  { icon: 'Finance', title: 'Municipal Accounts', link: '/services#accounts', description: 'Billing and account queries' },
  { icon: 'Finance', title: 'Property Rates', link: '/services#property-rates', description: 'Rates information and payments' },
  { icon: 'Traffic', title: 'Traffic Services', link: '/services#traffic', description: 'Fines and licensing' },
  { icon: 'Feedback', title: 'Municipal Complaints', link: '/services#complaints', description: 'Lodge a complaint' },
  { icon: 'Community', title: 'Community Services', link: '/services#community', description: 'Community programs' },
  { icon: 'Document', title: 'E-Services', link: '/online', description: 'Access online services' }
]

export default function CitizenHome() {
  return (
    <div className="home-layout">
      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <Link 
              key={index} 
              to={action.link} 
              className="action-card"
            >
              <div className="action-icon">
                <Icon name={action.icon} className="icon-large" />
              </div>
              <div className="action-text">{action.title}</div>
              <div className="action-description">{action.description}</div>
            </Link>
          ))}
        </div>
      </section>

      <div className="status-section">
        <LiveQueue />
      </div>

      <section className="services-section">
        <h2>Municipal Services</h2>
        <div className="services-grid">
          {municipalServices.map((service, index) => (
            <Link 
              key={index} 
              to={service.link} 
              className="service-card"
            >
              <div className="service-icon">
                <Icon name={service.icon} className="icon-medium" />
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="info-section">
        <Announcements />
      </div>
    </div>
  )
}