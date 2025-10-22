import React, { useEffect, useState } from 'react'
import Icon from '@components/Icon'
import storage from '@shared/services/storage'

export default function DocumentProcessing() {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    setDocuments(storage.getDocuments())
  }, [])

  function markProcessed(id) {
    storage.updateDocument(id, { status: 'processed' })
    setDocuments(storage.getDocuments())
  }

  return (
    <div className="page">
      <h1>Document Processing</h1>
      
      <div className="document-actions">
        <button className="action-btn">
          <Icon name="Upload" />
          New Document
        </button>
        <button className="action-btn">
          <Icon name="Document" />
          Batch Process
        </button>
      </div>

      <section className="document-queue card">
        <h2>Pending Documents</h2>
        <div className="document-filters">
          <select className="filter-dropdown">
            <option value="">All Types</option>
            <option value="id">ID Documents</option>
            <option value="proof">Proof of Address</option>
            <option value="application">Applications</option>
          </select>
          <input 
            type="search" 
            placeholder="Search documents..." 
            className="search-input"
          />
        </div>

        <div className="documents-list">
          {documents.length === 0 ? (
            <div className="text-muted">No documents submitted.</div>
          ) : (
            documents.map(d => (
              <div key={d.id} className="document-item">
                <div>
                  <div className="doc-title">{d.name}</div>
                  <div className="text-muted">{d.createdAt} • {d.status}</div>
                </div>
                <div>
                  {d.status !== 'processed' ? (
                    <button className="view-all" onClick={() => markProcessed(d.id)}>Mark Processed</button>
                  ) : (
                    <span className="text-muted">Processed</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="ocr-preview card">
        <h2>OCR Preview</h2>
        <div className="preview-panel">
          {/* OCR preview content will go here */}
        </div>
      </section>
    </div>
  )
}