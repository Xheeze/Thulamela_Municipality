import React from 'react'
import Icon from '@components/Icon'
import useAppStore from '@stores/appStore'

export default function TaskManagement() {
  return (
    <div className="page">
      <h1>Task Management</h1>
      
      <div className="task-actions">
        <button className="action-btn">
          <Icon name="Document" />
          Create Task
        </button>
        <button className="action-btn">
          <Icon name="Dashboard" />
          View Reports
        </button>
      </div>

      <section className="tasks-overview">
        <div className="task-stats">
          <div className="stat-card">
            <div className="stat-value">12</div>
            <div className="stat-label">Open</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">5</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">3</div>
            <div className="stat-label">Overdue</div>
          </div>
        </div>

        <div className="task-filters">
          <select className="filter-dropdown">
            <option value="">All Tasks</option>
            <option value="open">Open</option>
            <option value="progress">In Progress</option>
            <option value="review">Needs Review</option>
            <option value="completed">Completed</option>
          </select>
          <select className="filter-dropdown">
            <option value="">All Staff</option>
            {/* Staff members will be populated here */}
          </select>
        </div>

        <div className="tasks-list">
          {/* Task items will go here */}
        </div>
      </section>

      <section className="task-timeline">
        <h2>Timeline</h2>
        <div className="timeline-view">
          {/* Timeline items will go here */}
        </div>
      </section>
    </div>
  )
}