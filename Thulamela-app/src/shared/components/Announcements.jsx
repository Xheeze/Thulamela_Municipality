import React from 'react';

export default function Announcements() {
  return (
    <section className="announcements">
      <h2>Latest Announcements</h2>
      <div className="announcements-list">
        <div className="announcement-item primary">
          <div className="announcement-date">March 15, 2025</div>
          <h3>New Water Conservation Initiative Launched</h3>
          <p>
            The City of Tshwane has introduced new measures to promote water saving. Learn more about how you can contribute.
          </p>
        </div>
        <div className="announcement-item secondary">
          <div className="announcement-date">March 12, 2025</div>
          <h3>Road Maintenance Schedule Update</h3>
          <p>
            Find out when road repairs will be happening in your area and plan your commutes accordingly.
          </p>
        </div>
        <div className="announcement-item accent">
          <div className="announcement-date">March 8, 2025</div>
          <h3>Public Meeting on Local Development Plan</h3>
          <p>
            Join us for a community discussion on the future development of our municipal area.
          </p>
        </div>
      </div>
      
      <button className="view-all">View All Announcements</button>
    </section>
  );
}