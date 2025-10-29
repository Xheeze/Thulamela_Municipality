import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '@components/Icon'

const links = [
  { to: '/staff', label: 'Dashboard', icon: 'Dashboard', exact: true },
  { to: '/staff/queue', label: 'Queue', icon: 'Queue' },
  { to: '/staff/documents', label: 'Documents', icon: 'Document' },
  { to: '/staff/tasks', label: 'Tasks', icon: 'Settings' }
]

export default function StaffSidebar() {
  const location = useLocation()
  return (
    <aside className="staff-sidebar">
      <div className="sidebar-inner">
        <nav>
          <ul>
            {links.map(link => {
              const active = location.pathname === link.to || (link.exact && location.pathname === '/staff' && link.to === '/staff')
              return (
                <li key={link.to}>
                  <Link to={link.to} className={active ? 'active' : ''} style={{ display: 'flex', alignItems: 'center', gap: '0.75em', fontWeight: active ? 600 : 400 }}>
                    <Icon name={link.icon} size={22} color={active ? '#006838' : '#666'} />
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
