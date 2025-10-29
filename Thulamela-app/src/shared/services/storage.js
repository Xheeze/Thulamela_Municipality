// Minimal localStorage-backed service for documents, appointments, profile, feedback, and queue

const LS_KEYS = {
  DOCUMENTS: 'digiserve:documents',
  APPOINTMENTS: 'digiserve:appointments',
  PROFILE: 'digiserve:profile',
  FEEDBACK: 'digiserve:feedback',
  QUEUE: 'digiserve:queue',
  TASKS: 'digiserve:tasks'
}

function read(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (e) {
    console.error('storage read error', e)
    return fallback
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('storage write error', e)
  }
}

function id(prefix = '') {
  return prefix + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9)
}

// Documents
export function getDocuments() {
  return read(LS_KEYS.DOCUMENTS, [])
}

export function saveDocument({ name, size, type, dataUrl = null, meta = {} }) {
  const docs = getDocuments()
  const d = {
    id: id('doc_'),
    name,
    size,
    type,
    dataUrl,
    meta,
    status: 'submitted',
    createdAt: new Date().toISOString()
  }
  docs.unshift(d)
  write(LS_KEYS.DOCUMENTS, docs)
  return d
}

export function updateDocument(idVal, patch) {
  const docs = getDocuments()
  const idx = docs.findIndex(d => d.id === idVal)
  if (idx === -1) return null
  docs[idx] = { ...docs[idx], ...patch }
  write(LS_KEYS.DOCUMENTS, docs)
  return docs[idx]
}

// Appointments
export function getAppointments() {
  return read(LS_KEYS.APPOINTMENTS, [])
}

export function saveAppointment({ service, date, time, name, contact }) {
  const appointments = getAppointments()
  // Basic double-booking prevention: same service/date/time
  const exists = appointments.find(a => a.service === service && a.date === date && a.time === time)
  if (exists) throw new Error('Slot already booked')
  const a = {
    id: id('appt_'),
    service,
    date,
    time,
    name,
    contact,
    status: 'scheduled',
    createdAt: new Date().toISOString()
  }
  appointments.push(a)
  write(LS_KEYS.APPOINTMENTS, appointments)
  return a
}

export function cancelAppointment(idVal) {
  let appointments = getAppointments()
  appointments = appointments.map(a => a.id === idVal ? { ...a, status: 'cancelled' } : a)
  write(LS_KEYS.APPOINTMENTS, appointments)
}

// Profile
export function getProfile() {
  return read(LS_KEYS.PROFILE, null)
}

export function saveProfile(profile) {
  write(LS_KEYS.PROFILE, profile)
  return profile
}

// Feedback
export function getFeedback() {
  return read(LS_KEYS.FEEDBACK, [])
}

export function saveFeedback({ category, message, name, contact }) {
  const f = getFeedback()
  const item = {
    id: id('fb_'),
    category,
    message,
    name,
    contact,
    createdAt: new Date().toISOString()
  }
  f.unshift(item)
  write(LS_KEYS.FEEDBACK, f)
  return item
}

// Simple queue (read-only generator for UI)
export function getQueue() {
  return read(LS_KEYS.QUEUE, {
    nowServing: 'A092',
    next: ['A093', 'A094', 'A095'],
    counter: 'Counter 3'
  })
}

export function getQueueState() {
  return read(LS_KEYS.QUEUE, {
    nowServing: 'A092',
    next: ['A093', 'A094', 'A095'],
    counter: 'Counter 3'
  })
}

export function callNext() {
  const q = getQueueState()
  if (!q.next || q.next.length === 0) {
    // no next, keep the same
    return q
  }
  const next = q.next.shift()
  q.nowServing = next
  write(LS_KEYS.QUEUE, q)
  return q
}

export function addToQueue(ticket) {
  const q = getQueueState()
  q.next = q.next || []
  q.next.push(ticket)
  write(LS_KEYS.QUEUE, q)
  return q
}

// Tasks
export function getTasks() {
  return read(LS_KEYS.TASKS, [])
}

export function saveTask({ title, description, assignedTo, priority, dueDate, category }) {
  const tasks = getTasks()
  const task = {
    id: id('task_'),
    title,
    description,
    assignedTo,
    priority: priority || 'medium',
    dueDate,
    category: category || 'general',
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  tasks.unshift(task)
  write(LS_KEYS.TASKS, tasks)
  return task
}

export function updateTask(idVal, patch) {
  const tasks = getTasks()
  const idx = tasks.findIndex(t => t.id === idVal)
  if (idx === -1) return null
  tasks[idx] = { ...tasks[idx], ...patch, updatedAt: new Date().toISOString() }
  write(LS_KEYS.TASKS, tasks)
  return tasks[idx]
}

export function deleteTask(idVal) {
  let tasks = getTasks()
  tasks = tasks.filter(t => t.id !== idVal)
  write(LS_KEYS.TASKS, tasks)
  return true
}

export default {
  getDocuments,
  saveDocument,
  updateDocument,
  getAppointments,
  saveAppointment,
  cancelAppointment,
  getProfile,
  saveProfile,
  getFeedback,
  saveFeedback,
  getQueue,
  getQueueState,
  callNext,
  addToQueue,
  getTasks,
  saveTask,
  updateTask,
  deleteTask
}
