import React, { useState, useEffect } from 'react'
import Icon from '@components/Icon'
import storage from '@shared/services/storage'


export default function QueueManagement() {
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
  }, []);z

  function handleCallNext() {
    storage.callNext();
    setQueue(getSafeQueue());
  }

  return (
    <div className="staff-page">
      <div className="container">
        <h1 style={{ color: 'var(--primary)' }}>Queue Management</h1>

        <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
          <button className="action-btn" onClick={handleCallNext}>
            <Icon name="Queue" /> Call Next
          </button>
          <button className="action-btn secondary">
            <Icon name="Calendar" /> View Appointments
          </button>
        </div>

        <section className="card" style={{ marginBottom: '1rem' }}>
          <h2>Current Queue</h2>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ flex: 1, textAlign: 'center', padding: '1rem', background: 'var(--light)', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary)' }}>{Array.isArray(queue.next) ? queue.next.length : 0}</div>
              <div className="text-muted">Waiting</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center', padding: '1rem', background: 'var(--light)', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary)' }}>--</div>
              <div className="text-muted">Avg Wait</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center', padding: '1rem', background: 'var(--light)', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary)' }}>{queue.nowServing || '-'}</div>
              <div className="text-muted">Current</div>
            </div>
          </div>

          <div className="preview-list" style={{ marginTop: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--light)' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem' }}>Number</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem' }}>Time</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(queue.next) && queue.next.length > 0 ? queue.next.map((n, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                    <td style={{ padding: '0.75rem' }}>{n}</td>
                    <td style={{ padding: '0.75rem' }}>--</td>
                    <td style={{ padding: '0.75rem' }}>Waiting</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={3} style={{ padding: '0.75rem', textAlign: 'center', color: '#888' }}>No one waiting</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card">
          <h2>Service Points</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ background: 'var(--light)', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="doc-title">Counter 1</span>
                <span style={{ background: '#DCFCE7', padding: '0.25rem 0.5rem', borderRadius: '999px', color: '#14532D', fontSize: '0.75rem' }}>Active</span>
              </div>
              <div className="text-muted">Currently serving: {queue.nowServing || '-'}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}