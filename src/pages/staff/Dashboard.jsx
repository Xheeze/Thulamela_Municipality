import React, { useState, useEffect } from 'react'
import Icon from '@components/Icon'
import { useNavigate } from 'react-router-dom'
import storage from '@shared/services/storage'
import LiveQueue from '@shared/components/LiveQueue'

export default function StaffDashboard() {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium',
    dueDate: '',
    category: 'general'
  });
  
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
    
    // Auto-refresh queue every 5 seconds
    const interval = setInterval(() => {
      setQueue(getSafeQueue());
    }, 5000);

    return () => clearInterval(interval);
  }, [refreshKey]);

  function handleCallNext() {
    const updated = storage.callNext();
    setQueue(getSafeQueue());
    setRefreshKey(prev => prev + 1);
  }

  function handleAddToQueue() {
    const newTicketNum = generateNextTicket();
    storage.addToQueue(newTicketNum);
    setQueue(getSafeQueue());
    setRefreshKey(prev => prev + 1);
  }

  function generateNextTicket() {
    const q = getSafeQueue();
    const allTickets = [q.nowServing, ...q.next].filter(Boolean);
    
    if (allTickets.length === 0) return 'A001';
    
    // Get the highest number
    const numbers = allTickets.map(ticket => {
      const match = ticket.match(/(\d+)$/);
      return match ? parseInt(match[1]) : 0;
    });
    
    const maxNum = Math.max(...numbers);
    const nextNum = (maxNum + 1).toString().padStart(3, '0');
    return `A${nextNum}`;
  }

  function handleCreateTask(e) {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    
    storage.saveTask(newTask);
    setShowTaskModal(false);
    setNewTask({
      title: '',
      description: '',
      assignedTo: '',
      priority: 'medium',
      dueDate: '',
      category: 'general'
    });
  }

  return (
    <div className="page">
      <h1>Staff Dashboard</h1>
      <div className="kpi-grid staff-kpis">
        <div className="kpi-card">
          <Icon name="Ticket" />
          <div className="kpi-value">{Array.isArray(queue.next) ? queue.next.length : 0}</div>
          <div className="kpi-label">Tickets in Queue</div>
        </div>
        <div className="kpi-card">
          <Icon name="Document" />
          <div className="kpi-value">{12}</div>
          <div className="kpi-label">Pending Documents</div>
        </div>
        <div className="kpi-card">
          <Icon name="Queue" />
          <div className="kpi-value">{queue.nowServing || ""}</div>
          <div className="kpi-label">Now Serving</div>
        </div>
      </div>

      <section className="quick-actions" style={{ marginTop: '1rem' }}>
        <button className="action-btn" onClick={handleAddToQueue}>
          <Icon name="Upload" />
          New Ticket
        </button>
        <button className="action-btn" onClick={handleCallNext}>
          <Icon name="Queue" />
          Call Next
        </button>
        <button className="action-btn" onClick={() => navigate('/staff/queue')}>
          <Icon name="Settings" />
          Queue Management
        </button>
        <button className="action-btn secondary" onClick={() => setShowTaskModal(true)}>
          <Icon name="Document" />
          Create Task
        </button>
      </section>

      {/* Live Queue Display for Staff */}
      <section style={{ marginTop: '2rem' }}>
        <LiveQueue />
      </section>

      <section className="queue-preview">
        <h2>Current Queue</h2>
        <div className="card" style={{ marginTop: '0.5rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>Now Serving: <strong>{queue.nowServing || '-'} </strong></div>
          <div>Next: {Array.isArray(queue.next) && queue.next.length ? queue.next.join(', ') : 'No one waiting'}</div>
        </div>
      </section>

      {/* Create Task Modal */}
      {showTaskModal && (
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
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Title *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--muted)' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows={3}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--muted)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Priority</label>
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
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Category</label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--muted)' }}
                  >
                    <option value="general">General</option>
                    <option value="document">Document Processing</option>
                    <option value="queue">Queue Management</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Assigned To</label>
                  <input
                    type="text"
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    placeholder="Staff member name"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--muted)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Due Date</label>
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
                  onClick={() => setShowTaskModal(false)}
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
  );
}