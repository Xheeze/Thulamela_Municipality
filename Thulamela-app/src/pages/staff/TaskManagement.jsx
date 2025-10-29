import React, { useState, useEffect } from 'react'
import Icon from '@components/Icon'
import storage from '@shared/services/storage'

export default function TaskManagement() {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium',
    dueDate: '',
    category: 'general'
  })

  useEffect(() => {
    loadTasks()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [tasks, statusFilter])

  function loadTasks() {
    const allTasks = storage.getTasks()
    setTasks(allTasks)
  }

  function applyFilters() {
    let filtered = [...tasks]
    if (statusFilter) {
      filtered = filtered.filter(task => task.status === statusFilter)
    }
    setFilteredTasks(filtered)
  }

  function handleCreateTask(e) {
    e.preventDefault()
    if (!newTask.title.trim()) return
    
    storage.saveTask(newTask)
    loadTasks()
    setShowCreateModal(false)
    setNewTask({
      title: '',
      description: '',
      assignedTo: '',
      priority: 'medium',
      dueDate: '',
      category: 'general'
    })
  }

  function handleUpdateStatus(taskId, newStatus) {
    storage.updateTask(taskId, { status: newStatus })
    loadTasks()
  }

  function handleDeleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
      storage.deleteTask(taskId)
      loadTasks()
    }
  }

  const stats = {
    open: tasks.filter(t => t.status === 'open').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    overdue: tasks.filter(t => {
      if (!t.dueDate) return false
      return new Date(t.dueDate) < new Date() && t.status !== 'completed'
    }).length,
    completed: tasks.filter(t => t.status === 'completed').length
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case 'high': return '#EF4444'
      case 'medium': return '#F59E0B'
      case 'low': return '#10B981'
      default: return '#6B7280'
    }
  }

  function getStatusBadge(status) {
    const styles = {
      'open': { bg: '#DBEAFE', color: '#1E40AF' },
      'in-progress': { bg: '#FEF3C7', color: '#92400E' },
      'review': { bg: '#E0E7FF', color: '#3730A3' },
      'completed': { bg: '#D1FAE5', color: '#065F46' }
    }
    const style = styles[status] || styles.open
    return (
      <span style={{
        background: style.bg,
        color: style.color,
        padding: '0.25rem 0.75rem',
        borderRadius: '999px',
        fontSize: '0.75rem',
        fontWeight: '600'
      }}>
        {status.replace('-', ' ').toUpperCase()}
      </span>
    )
  }
  return (
    <div className="page">
      <h1>Task Management</h1>
      
      <div className="task-actions" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button className="action-btn" onClick={() => setShowCreateModal(true)}>
          <Icon name="Document" />
          Create Task
        </button>
        <button className="action-btn secondary" onClick={loadTasks}>
          <Icon name="Dashboard" />
          Refresh
        </button>
      </div>

      {/* Task Stats */}
      <section className="tasks-overview" style={{ marginBottom: '2rem' }}>
        <div className="task-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="stat-card card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div className="stat-value" style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>{stats.open}</div>
            <div className="stat-label" style={{ color: 'var(--text-secondary)' }}>Open</div>
          </div>
          <div className="stat-card card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div className="stat-value" style={{ fontSize: '2rem', fontWeight: '700', color: '#F59E0B' }}>{stats.inProgress}</div>
            <div className="stat-label" style={{ color: 'var(--text-secondary)' }}>In Progress</div>
          </div>
          <div className="stat-card card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div className="stat-value" style={{ fontSize: '2rem', fontWeight: '700', color: '#EF4444' }}>{stats.overdue}</div>
            <div className="stat-label" style={{ color: 'var(--text-secondary)' }}>Overdue</div>
          </div>
          <div className="stat-card card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div className="stat-value" style={{ fontSize: '2rem', fontWeight: '700', color: '#10B981' }}>{stats.completed}</div>
            <div className="stat-label" style={{ color: 'var(--text-secondary)' }}>Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="task-filters" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <select 
            className="filter-dropdown" 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--muted)' }}
          >
            <option value="">All Tasks</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Needs Review</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Tasks List */}
        <div className="tasks-list card" style={{ padding: '1rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Tasks ({filteredTasks.length})</h2>
          {filteredTasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
              <Icon name="Document" size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>No tasks found. Create a new task to get started.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredTasks.map(task => (
                <div 
                  key={task.id} 
                  className="task-item"
                  style={{
                    padding: '1rem',
                    background: 'var(--light)',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${getPriorityColor(task.priority)}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                          {task.description}
                        </p>
                      )}
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--muted)' }}>
                        {task.assignedTo && <span>👤 {task.assignedTo}</span>}
                        {task.category && <span>📁 {task.category}</span>}
                        {task.dueDate && <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>}
                        <span>Priority: {task.priority}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                      {getStatusBadge(task.status)}
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <select
                          value={task.status}
                          onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
                          style={{ 
                            fontSize: '0.75rem', 
                            padding: '0.25rem 0.5rem', 
                            borderRadius: '4px',
                            border: '1px solid var(--muted)'
                          }}
                        >
                          <option value="open">Open</option>
                          <option value="in-progress">In Progress</option>
                          <option value="review">Review</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          style={{
                            background: '#EF4444',
                            color: 'white',
                            border: 'none',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.75rem'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Create New Task</h2>
            <form onSubmit={handleCreateTask}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Title *
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--muted)' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows={3}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--muted)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--muted)' }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Category
                  </label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--muted)' }}
                  >
                    <option value="general">General</option>
                    <option value="document">Document Processing</option>
                    <option value="queue">Queue Management</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="complaint">Complaint Resolution</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Assigned To
                  </label>
                  <input
                    type="text"
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    placeholder="Staff member name"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--muted)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--muted)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="action-btn secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="action-btn">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}