import React, { useState } from 'react'
import Icon from '@components/Icon'
import storage from '@shared/services/storage'

export default function Feedback() {
  const [rating, setRating] = useState(0)
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [file, setFile] = useState(null)
  const [sent, setSent] = useState(false)

  function handleSubmit() {
    storage.saveFeedback({ category, message, name, contact })
    setSent(true)
    setCategory('')
    setMessage('')
    setRating(0)
    setFile(null)
  }

  return (
    <div className="page">
      <h1>Submit Feedback</h1>
      
      <section className="feedback-form card">
        <div className="rating-section">
          <h2>Rate Your Experience</h2>
          <div className="rating-stars">
            {[1,2,3,4,5].map(star => (
              <button key={star} className={`star-btn ${rating >= star ? 'active' : ''}`} onClick={() => setRating(star)}>
                ⭐
              </button>
            ))}
          </div>
        </div>

        <div className="category-select">
          <h2>Feedback Category</h2>
          <select className="category-dropdown" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">Select category...</option>
            <option value="complaint">Complaint</option>
            <option value="suggestion">Suggestion</option>
            <option value="compliment">Compliment</option>
            <option value="general">General Inquiry</option>
          </select>
        </div>

        <div className="comment-section">
          <h2>Your Comments</h2>
          <textarea 
            className="feedback-textarea"
            placeholder="Tell us about your experience..."
            rows={4}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>

        <div className="contact-section">
          <input placeholder="Your name (optional)" value={name} onChange={e => setName(e.target.value)} />
          <input placeholder="Contact (optional)" value={contact} onChange={e => setContact(e.target.value)} />
        </div>

        <div className="attachment-section">
          <h2>File Upload (optional)</h2>
          <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
          <div className="text-muted">Max size 5MB. Accepted formats: PDF, JPG, PNG.</div>
        </div>

        {sent && <div className="text-muted">Thank you — your feedback was submitted.</div>}

        <button className="submit-btn" onClick={handleSubmit}>
          <Icon name="Feedback" />
          Submit Feedback
        </button>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {/* FAQ items will go here */}
        </div>
      </section>

      <section className="card" style={{ marginTop: '1rem' }}>
        <h2>Anonymous Feedback Option</h2>
        <p>You may submit feedback anonymously by leaving your name and contact blank. We won’t be able to respond to anonymous submissions.</p>
      </section>
    </div>
  )
}