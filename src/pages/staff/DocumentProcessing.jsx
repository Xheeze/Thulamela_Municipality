import React, { useEffect, useState } from 'react'
import Icon from '@components/Icon'
import storage from '@shared/services/storage'

export default function DocumentProcessing() {
  const [documents, setDocuments] = useState([])
  const [filteredDocs, setFilteredDocs] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDoc, setSelectedDoc] = useState(null)

  useEffect(() => {
    loadDocuments()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [documents, statusFilter, categoryFilter, searchQuery])

  function loadDocuments() {
    const docs = storage.getDocuments()
    setDocuments(docs)
  }

  function applyFilters() {
    let filtered = [...documents]
    
    if (statusFilter) {
      filtered = filtered.filter(doc => doc.status === statusFilter)
    }
    
    if (categoryFilter) {
      filtered = filtered.filter(doc => doc.meta?.category === categoryFilter)
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(query) ||
        doc.id.toLowerCase().includes(query)
      )
    }
    
    setFilteredDocs(filtered)
  }

  function updateDocumentStatus(id, newStatus) {
    storage.updateDocument(id, { status: newStatus })
    loadDocuments()
  }

  function getStatusBadge(status) {
    const styles = {
      'submitted': { bg: '#DBEAFE', color: '#1E40AF', text: 'Submitted' },
      'processing': { bg: '#FEF3C7', color: '#92400E', text: 'Processing' },
      'processed': { bg: '#D1FAE5', color: '#065F46', text: 'Processed' },
      'rejected': { bg: '#FEE2E2', color: '#991B1B', text: 'Rejected' }
    }
    const style = styles[status] || styles.submitted
    return (
      <span style={{
        background: style.bg,
        color: style.color,
        padding: '0.25rem 0.75rem',
        borderRadius: '999px',
        fontSize: '0.75rem',
        fontWeight: '600'
      }}>
        {style.text}
      </span>
    )
  }

  const stats = {
    submitted: documents.filter(d => d.status === 'submitted').length,
    processing: documents.filter(d => d.status === 'processing').length,
    processed: documents.filter(d => d.status === 'processed').length,
    rejected: documents.filter(d => d.status === 'rejected').length
  }

  const documentCategories = [
    { value: 'general', label: 'General Document' },
    { value: 'id', label: 'ID Document' },
    { value: 'proof-address', label: 'Proof of Address' },
    { value: 'application', label: 'Application Form' },
    { value: 'rates', label: 'Rates & Taxes' },
    { value: 'permit', label: 'Permit/License' }
  ]

  return (
    <div className="page">
      <h1>Document Processing</h1>
      
      {/* Stats Dashboard */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1E40AF' }}>{stats.submitted}</div>
          <div style={{ color: 'var(--text-secondary)' }}>Submitted</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#F59E0B' }}>{stats.processing}</div>
          <div style={{ color: 'var(--text-secondary)' }}>Processing</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10B981' }}>{stats.processed}</div>
          <div style={{ color: 'var(--text-secondary)' }}>Processed</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#EF4444' }}>{stats.rejected}</div>
          <div style={{ color: 'var(--text-secondary)' }}>Rejected</div>
        </div>
      </div>

      <div className="document-actions" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button className="action-btn secondary" onClick={loadDocuments}>
          <Icon name="Dashboard" />
          Refresh
        </button>
        <button 
          className="action-btn secondary"
          onClick={() => {
            const pending = documents.filter(d => d.status === 'submitted')
            pending.forEach(d => updateDocumentStatus(d.id, 'processing'))
          }}
        >
          <Icon name="Document" />
          Batch Process All
        </button>
      </div>

      <section className="document-queue card">
        <h2 style={{ marginBottom: '1rem' }}>Document Queue ({filteredDocs.length})</h2>
        
        {/* Filters */}
        <div className="document-filters" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem', 
          marginBottom: '1.5rem' 
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
              Status
            </label>
            <select 
              className="filter-dropdown"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--muted)' }}
            >
              <option value="">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="processing">Processing</option>
              <option value="processed">Processed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
              Category
            </label>
            <select 
              className="filter-dropdown"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--muted)' }}
            >
              <option value="">All Categories</option>
              {documentCategories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
              Search
            </label>
            <input 
              type="search" 
              placeholder="Search by name or ID..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--muted)' }}
            />
          </div>
        </div>

        {/* Documents List */}
        <div className="documents-list">
          {filteredDocs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
              <Icon name="Document" size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>No documents found matching your criteria.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredDocs.map(d => (
                <div 
                  key={d.id} 
                  className="document-item"
                  style={{
                    padding: '1rem',
                    background: 'var(--light)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setSelectedDoc(d)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Icon name="Document" style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div className="doc-title" style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                        {d.name}
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                        ID: {d.id} • {new Date(d.createdAt).toLocaleString()} • {Math.round(d.size / 1024)} KB
                        {d.meta?.category && ` • ${documentCategories.find(c => c.value === d.meta.category)?.label || d.meta.category}`}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      {getStatusBadge(d.status)}
                      <select
                        value={d.status}
                        onChange={(e) => {
                          e.stopPropagation()
                          updateDocumentStatus(d.id, e.target.value)
                        }}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          border: '1px solid var(--muted)'
                        }}
                      >
                        <option value="submitted">Submitted</option>
                        <option value="processing">Processing</option>
                        <option value="processed">Processed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      {d.dataUrl && (
                        <button
                          className="view-all"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(d.dataUrl)
                          }}
                          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                        >
                          View
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Document Preview Modal */}
      {selectedDoc && (
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
          zIndex: 1000,
          padding: '2rem'
        }}
        onClick={() => setSelectedDoc(null)}
        >
          <div 
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '8px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ marginBottom: '0.5rem' }}>{selectedDoc.name}</h2>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Document ID: {selectedDoc.id}
                </div>
              </div>
              <button 
                onClick={() => setSelectedDoc(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: 'var(--muted)'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <strong>Submitted:</strong>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    {new Date(selectedDoc.createdAt).toLocaleString()}
                  </div>
                </div>
                <div>
                  <strong>Category:</strong>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    {documentCategories.find(c => c.value === selectedDoc.meta?.category)?.label || 'General'}
                  </div>
                </div>
                <div>
                  <strong>Size:</strong>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    {(selectedDoc.size / 1024).toFixed(2)} KB
                  </div>
                </div>
                <div>
                  <strong>Type:</strong>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    {selectedDoc.type || 'Unknown'}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Status:</strong>
              <select
                value={selectedDoc.status}
                onChange={(e) => {
                  updateDocumentStatus(selectedDoc.id, e.target.value)
                  setSelectedDoc({ ...selectedDoc, status: e.target.value })
                }}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  border: '1px solid var(--muted)'
                }}
              >
                <option value="submitted">Submitted</option>
                <option value="processing">Processing</option>
                <option value="processed">Processed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {selectedDoc.dataUrl && (
              <div style={{ marginBottom: '1.5rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Preview:</strong>
                <div style={{ 
                  border: '1px solid var(--muted)', 
                  borderRadius: '6px', 
                  overflow: 'hidden',
                  maxHeight: '400px'
                }}>
                  {selectedDoc.type?.startsWith('image/') ? (
                    <img 
                      src={selectedDoc.dataUrl} 
                      alt={selectedDoc.name}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      <Icon name="Document" size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                      <p>Preview not available for this file type</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              {selectedDoc.dataUrl && (
                <button 
                  className="action-btn secondary"
                  onClick={() => window.open(selectedDoc.dataUrl)}
                >
                  <Icon name="Document" size={16} />
                  Open Full View
                </button>
              )}
              <button 
                className="action-btn"
                onClick={() => setSelectedDoc(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}