import React, { useEffect, useState } from 'react'
import Icon from '@components/Icon'
import storage from '@shared/services/storage'

export default function Profile() {
  const [profile, setProfile] = useState({ fullName: '', idNumber: '', contact: '', email: '', language: 'en', notifications: { sms: false, email: false, whatsapp: false } })

  useEffect(() => {
    const p = storage.getProfile()
    if (p) setProfile(p)
  }, [])

  function handleSave() {
    storage.saveProfile(profile)
    alert('Profile saved')
  }

  return (
    <div className="page">
      <h1>Citizen Profile</h1>
      
      <section className="profile-section card">
        <div className="profile-header">
          <div className="profile-avatar">
            <Icon name="Profile" className="icon-large" />
          </div>
          <div className="profile-info">
            <h2>Personal Information</h2>
            <form className="profile-form" onSubmit={e => e.preventDefault()}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Your full name" value={profile.fullName} onChange={e => setProfile({ ...profile, fullName: e.target.value })} />
              </div>
              <div className="form-group">
                <label>ID Number</label>
                <input type="text" placeholder="Your ID number" value={profile.idNumber} onChange={e => setProfile({ ...profile, idNumber: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input type="tel" placeholder="Your phone number" value={profile.contact} onChange={e => setProfile({ ...profile, contact: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Your email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
              </div>
            </form>
          </div>
        </div>

        <div className="preferences-section">
          <h2>Preferences</h2>
          <div className="preference-group">
            <label>Language</label>
            <select value={profile.language} onChange={e => setProfile({ ...profile, language: e.target.value })}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          <div className="preference-group">
            <label>Notifications</label>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" checked={profile.notifications.sms} onChange={e => setProfile({ ...profile, notifications: { ...profile.notifications, sms: e.target.checked } })} /> SMS
              </label>
              <label>
                <input type="checkbox" checked={profile.notifications.email} onChange={e => setProfile({ ...profile, notifications: { ...profile.notifications, email: e.target.checked } })} /> Email
              </label>
              <label>
                <input type="checkbox" checked={profile.notifications.whatsapp} onChange={e => setProfile({ ...profile, notifications: { ...profile.notifications, whatsapp: e.target.checked } })} /> WhatsApp
              </label>
            </div>
          </div>
        </div>

        <button className="save-btn" onClick={handleSave}>
          <Icon name="Settings" />
          Save Changes
        </button>
      </section>
    </div>
  )
}