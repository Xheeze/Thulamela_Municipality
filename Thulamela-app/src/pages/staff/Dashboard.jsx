import React, { useState, useEffect } from 'react'
import Icon from '@components/Icon'
import { useNavigate } from 'react-router-dom'
import storage from '@shared/services/storage'

export default function StaffDashboard() {
  const navigate = useNavigate();
  function getSafeQueue() {
    const fallback = { nowServing: 'A092', next: ['A093', 'A094', 'A095'], counter: 'Counter 3' };
    let q = fallback;
    try {
      const raw = storage.getQueueState();
      if (raw && typeof raw === 'object' && raw.nowServing && Array.isArray(raw.next)) {
        q = raw;
      }
    } catch {}
    return q;
  }

  const [queue, setQueue] = useState(getSafeQueue());

  useEffect(() => {
    setQueue(getSafeQueue());
  }, []);

  function handleCallNext() {
    const updated = storage.callNext();
    setQueue(getSafeQueue());
  }

  return (
    <div className="page">
      <h1>Staff Dashboard</h1>
      <div className="kpi-grid staff-kpis">
        <div className="kpi-card">
          <Icon name="Ticket" />
          <div className="kpi-value">{Array.isArray(queue.next) ? queue.next.length : 0}</div>
          <div className="kpi-label">Tickets in Queue</div>
        </div>
        <div className="kpi-card">
          <Icon name="Document" />
          <div className="kpi-value">{12}</div>
          <div className="kpi-label">Pending Documents</div>
        </div>
        <div className="kpi-card">
          <Icon name="Queue" />
          <div className="kpi-value">{queue.nowServing || ""}</div>
          <div className="kpi-label">Now Serving</div>
        </div>
      </div>

      <section className="quick-actions" style={{ marginTop: '1rem' }}>
        <button className="action-btn" onClick={() => {/* new intake flow */}}>
          <Icon name="Upload" />
          New Intake
        </button>
        <button className="action-btn" onClick={handleCallNext}>
          <Icon name="Queue" />
          Call Next
        </button>
        <button className="action-btn" onClick={() => navigate('/staff/queue')}>
          <Icon name="Settings" />
          Queue Management
        </button>
        <button className="action-btn secondary" onClick={() => {/* create task */}}>
          <Icon name="Document" />
          Create Task
        </button>
      </section>

      <section className="queue-preview">
        <h2>Current Queue</h2>
        <div className="card" style={{ marginTop: '0.5rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>Now Serving: <strong>{queue.nowServing || '-'} </strong></div>
          <div>Next: {Array.isArray(queue.next) && queue.next.length ? queue.next.join(', ') : 'No one waiting'}</div>
        </div>
      </section>
    </div>
  );
}