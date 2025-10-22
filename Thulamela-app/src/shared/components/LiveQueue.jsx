import React from 'react';

export default function LiveQueue() {
  return (
    <section className="live-queue">
      <h2>Live Queue Status</h2>
      <div className="queue-grid">
        <div className="queue-card">
          <div className="card-label">Now Serving</div>
          <div className="ticket-number">A092</div>
          <div className="queue-info">
            Estimated wait: 5 mins
          </div>
        </div>
        <div className="queue-card">
          <div className="card-label">Next Numbers</div>
          <div className="next-numbers">
            <div className="next-ticket">A093</div>
            <div className="next-ticket">A094</div>
            <div className="next-ticket">A095</div>
          </div>
          <div className="queue-info">
            Currently serving: Counter 3
          </div>
        </div>
      </div>
    </section>
  );
}