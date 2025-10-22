import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Auth() {
  const navigate = useNavigate();

  function loginAsStaff() {
    try { localStorage.setItem('digiserve:role', 'staff'); } catch {}
    navigate('/staff', { replace: true });
  }

  function signOut() {
    try { localStorage.removeItem('digiserve:role'); } catch {}
    navigate('/', { replace: true });
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>Sign In</h1>
      <p className="text-muted">Staff access will redirect you to the staff dashboard.</p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button onClick={loginAsStaff}>Enter as Staff</button>
        <button className="btn-outline" onClick={signOut}>Sign Out</button>
      </div>
      <p className="text-muted" style={{ marginTop: '1rem' }}>This is a temporary demo login. Replace with real authentication later.</p>
    </div>
  );
}
