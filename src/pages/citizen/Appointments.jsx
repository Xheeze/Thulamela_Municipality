import React, { useEffect, useState } from 'react'
import Icon from '@components/Icon'
import storage from '@shared/services/storage'

export default function Appointments() {
  const [service, setService] = useState('documents')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [appointments, setAppointments] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    setAppointments(storage.getAppointments())
  }, [])

  function handleBook() {
    setError(null)
    try {
      const appt = storage.saveAppointment({ service, date, time, name, contact })
      setAppointments(prev => [...prev, appt])
      // Clear form
      setDate('')
      setTime('')
    } catch (e) {
      setError(e.message)
    }
  }

  function handleCancel(id) {
    storage.cancelAppointment(id)
    setAppointments(storage.getAppointments())
  }

  return (
    <div className="page">
      <h1>Book Appointment</h1>
      
      <section className="booking-section card">
        <div className="service-select">
          <h2>Select Service</h2>
          <select className="service-dropdown" value={service} onChange={e => setService(e.target.value)}>
            <option value="documents">Document Processing</option>
            <option value="registration">Registration</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>

        <div className="date-select">
          <h2>Select Date & Time</h2>
          <input type="date" className="date-input" value={date} onChange={e => setDate(e.target.value)} />
          <select className="time-dropdown" value={time} onChange={e => setTime(e.target.value)}>
            <option value="">Choose time...</option>
            <option value="09:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
          </select>
        </div>

        <div className="contact-fields">
          <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
          <input placeholder="Contact (phone or email)" value={contact} onChange={e => setContact(e.target.value)} />
        </div>

        {error && <div className="text-muted">{error}</div>}

        <button className="book-btn" onClick={handleBook}>
          <Icon name="Calendar" />
          Book Appointment
        </button>
      </section>

      <section className="upcoming-section card">
        <h2>Upcoming Appointments</h2>
        <div className="appointments-list">
          {appointments.length === 0 ? (
            <div className="text-muted">No upcoming appointments.</div>
          ) : (
            appointments.map(a => (
              <div key={a.id} className="appointment-item">
                <div>
                  <div className="appointment-title">{a.service} • {a.date} @ {a.time}</div>
                  <div className="text-muted">{a.name} • {a.contact}</div>
                </div>
                <div>
                  {a.status !== 'cancelled' ? (
                    <button className="view-all" onClick={() => handleCancel(a.id)}>Cancel</button>
                  ) : (
                    <span className="text-muted">Cancelled</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}