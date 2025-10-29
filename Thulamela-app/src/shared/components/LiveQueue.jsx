import React, { useState, useEffect } from 'react';
import { useQueue } from '@shared/hooks/useQueue';

export default function LiveQueue({ refreshInterval = 5000, showControls = false }) {
  const { queue, lastUpdate, waitingCount, estimatedWait, refreshQueue } = useQueue(refreshInterval);
  const [isUpdating, setIsUpdating] = useState(false);

  // Visual feedback on update
  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 300);
    return () => clearTimeout(timer);
  }, [queue.nowServing, waitingCount]);

  return (
    <section className="live-queue" style={{
      transition: 'all 0.3s ease',
      transform: isUpdating ? 'scale(0.99)' : 'scale(1)',
      opacity: isUpdating ? 0.9 : 1
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h2 style={{ margin: 0 }}>Live Queue Status</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: '#10B981',
              display: 'inline-block',
              animation: 'pulse 2s infinite'
            }}></span>
            Updated {lastUpdate.toLocaleTimeString()}
          </div>
          {showControls && (
            <button 
              onClick={refreshQueue}
              style={{
                background: 'transparent',
                border: '1px solid var(--muted)',
                borderRadius: '4px',
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
                color: 'var(--text-primary)'
              }}
              title="Refresh now"
            >
              ↻ Refresh
            </button>
          )}
        </div>
      </div>
      <div className="queue-grid">
        <div className="queue-card">
          <div className="card-label">Now Serving</div>
          <div className="ticket-number">{queue.nowServing || '-'}</div>
          <div className="queue-info">
            Estimated wait: {estimatedWait} mins
          </div>
        </div>
        <div className="queue-card">
          <div className="card-label">Next Numbers</div>
          <div className="next-numbers">
            {queue.next && queue.next.length > 0 ? (
              queue.next.slice(0, 3).map((ticket, idx) => (
                <div key={idx} className="next-ticket">{ticket}</div>
              ))
            ) : (
              <div style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>No one waiting</div>
            )}
          </div>
          <div className="queue-info">
            {waitingCount > 0 ? (
              <>People waiting: {waitingCount}</>
            ) : (
              <>Currently serving: {queue.counter || 'Counter 1'}</>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}