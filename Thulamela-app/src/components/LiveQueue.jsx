import React from 'react'

export default function LiveQueue() {
  return (
    <section className="live-queue">
      <div className="live-left">
        <div className="refresh">↺</div>
      </div>
      <div className="live-right">
        <div className="live-label">Live queue</div>
        <div className="ticket">A093</div>
        <div className="estimate">Estimated wait: <strong>18 min</strong></div>
        <button className="ticket-btn">Get Ticket</button>
      </div>
    </section>
  )
}
