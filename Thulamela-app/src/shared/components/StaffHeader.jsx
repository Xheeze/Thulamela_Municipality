import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAppStore from '@stores/appStore';

export default function StaffHeader() {
  const { staff } = useAppStore();
  const navigate = useNavigate();

  function handleLogout() {
    try { localStorage.removeItem('digiserve:role'); } catch {}
    navigate('/', { replace: true });
  }

  return (
    <header className="staff-header">
      <div className="container staff-header-inner">
        <div className="brand">Staff Dashboard</div>
        <nav className="staff-nav">
          <Link to="/staff">Dashboard</Link>
          <Link to="/staff/queue">Queue</Link>
          <Link to="/staff/documents">Documents</Link>
          <Link to="/staff/tasks">Tasks</Link>
        </nav>
        <div className="staff-user">
          <span className="profile-greet">{staff?.name || 'Staff Member'}</span>
          <button className="lang-btn" style={{ marginLeft: '1rem', color: '#c00' }} onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
}