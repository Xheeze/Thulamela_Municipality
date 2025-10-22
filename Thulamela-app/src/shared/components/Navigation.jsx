import React from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import useAppStore from '../stores/appStore'

export function Navigation({ type = 'citizen' }) {
  const isAuthenticated = useAppStore(state => state.isAuthenticated)
  
  if (type === 'staff') {
    return (
      <nav className="nav staff-nav">
        <Link to="/staff" className="nav-link">
          <Icon name="Dashboard" />
          Dashboard
        </Link>
        <Link to="/staff/queue" className="nav-link">
          <Icon name="Queue" />
          Queue
        </Link>
        <Link to="/staff/documents" className="nav-link">
          <Icon name="Document" />
          Documents
        </Link>
        <Link to="/staff/tasks" className="nav-link">
          <Icon name="Settings" />
          Tasks
        </Link>
      </nav>
    )
  }

  return (
    <nav className="nav citizen-nav">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/documents" className="nav-link">Documents</Link>
      <Link to="/appointments" className="nav-link">Appointments</Link>
      <Link to="/feedback" className="nav-link">Feedback</Link>
      {isAuthenticated && (
        <Link to="/profile" className="nav-link">
          <Icon name="Profile" />
        </Link>
      )}
    </nav>
  )
}