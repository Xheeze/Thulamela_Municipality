import { useEffect, useState, useRef } from 'react'
import Icon from '@components/Icon'
import storage from '@shared/services/storage'

export default function DocumentServices() {
  const [files, setFiles] = useState([])
  const [history, setHistory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    loadHistory()
  }, [])

  function loadHistory() {
    setHistory(storage.getDocuments())
  }

  function handleFiles(list) {
    const arr = Array.from(list)
    setFiles(arr)
  }

  async function saveAll() {
    if (files.length === 0) return
    
    setUploading(true)
    for (const f of files) {
      // Convert small files to dataURL for demo persistence (< 1MB)
      let dataUrl = null
      if (f.size < 1024 * 1024) {
        dataUrl = await fileToDataUrl(f)
      }
      const doc = storage.saveDocument({ 
        name: f.name, 
        size: f.size, 
        type: f.type, 
        dataUrl,
        meta: { category: selectedCategory }
      })
      setHistory(prev => [doc, ...prev])
    }
    setFiles([])
    setUploading(false)
    if (inputRef.current) inputRef.current.value = null
    loadHistory()
  }

  function fileToDataUrl(file) {
    return new Promise((res, rej) => {
      const reader = new FileReader()
      reader.onload = () => res(reader.result)
      reader.onerror = rej
      reader.readAsDataURL(file)
    })
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
      <h1>Document Services</h1>
      
      <section className="upload-section card">
        <h2 style={{ marginBottom: '1rem' }}>Upload Documents</h2>
        
        {/* Category Selection */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Document Category
          </label>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ 
              width: '100%', 
              maxWidth: '400px',
              padding: '0.5rem', 
              borderRadius: '6px', 
              border: '1px solid var(--muted)' 
            }}
          >
            {documentCategories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div className="upload-area" style={{ 
          border: '2px dashed var(--muted)', 
          borderRadius: '8px', 
          padding: '2rem', 
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}>
          <Icon name="Upload" className="icon-large" style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{ marginBottom: '0.5rem' }}>Drop files here or click to browse</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Supported formats: PDF, JPG, PNG, DOC (Max 5MB per file)
          </p>
          <input 
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={(e) => handleFiles(e.target.files)}
            style={{ 
              opacity: 0, 
              position: 'absolute', 
              width: '100%', 
              height: '100%', 
              top: 0, 
              left: 0, 
              cursor: 'pointer' 
            }}
          />
        </div>

        {files.length > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Selected Files ({files.length})</h3>
            <div className="preview-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {files.map((file, i) => (
                <div key={i} className="preview-item" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  padding: '0.75rem',
                  background: 'var(--light)',
                  borderRadius: '6px'
                }}>
                  <Icon name="Document" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600' }}>{file.name}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {(file.size / 1024).toFixed(2)} KB
                    </div>
                  </div>
                  <button 
                    onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                    style={{ 
                      background: 'transparent',
                      color: 'var(--muted)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.25rem'
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button 
              className="view-all" 
              onClick={saveAll}
              disabled={uploading}
              style={{ 
                width: '100%', 
                marginTop: '1rem',
                opacity: uploading ? 0.6 : 1
              }}
            >
              {uploading ? 'Uploading...' : `Submit ${files.length} file(s)`}
            </button>
          </div>
        )}
      </section>

      <section className="history-section card" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Submission History</h2>
          <button 
            className="action-btn secondary" 
            onClick={loadHistory}
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
          >
            <Icon name="Dashboard" size={16} />
            Refresh
          </button>
        </div>

        <div className="history-list">
          {history.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem 1rem', 
              color: 'var(--text-secondary)' 
            }}>
              <Icon name="Document" size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>No documents submitted yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {history.map(item => (
                <div key={item.id} className="history-item" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'var(--light)',
                  borderRadius: '8px'
                }}>
                  <Icon name="Document" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div className="history-title" style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                      {item.name}
                    </div>
                    <div className="history-meta" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {new Date(item.createdAt).toLocaleString()} • {Math.round(item.size / 1024)} KB
                      {item.meta?.category && ` • ${documentCategories.find(c => c.value === item.meta.category)?.label || item.meta.category}`}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {getStatusBadge(item.status)}
                    {item.dataUrl && (
                      <button 
                        className="view-all" 
                        onClick={() => window.open(item.dataUrl || '#')}
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                      >
                        View
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        <section className="card">
          <h2 style={{ marginBottom: '0.5rem' }}>Requirements</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Ensure you have your original ID document, proof of residence, and any other supporting documents specific to your request.
          </p>
        </section>
        
        <section className="card">
          <h2 style={{ marginBottom: '0.5rem' }}>Processing Times</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Standard requests take 5-7 business days. Expedited services may be available for an additional fee.
          </p>
        </section>
      </div>
    </div>
  )
}