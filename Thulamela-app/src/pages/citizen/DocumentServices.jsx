import { useEffect, useState, useRef } from 'react'
import Icon from '@components/Icon'
import storage from '@shared/services/storage'

export default function DocumentServices() {
  const [files, setFiles] = useState([])
  const [history, setHistory] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    setHistory(storage.getDocuments())
  }, [])

  function handleFiles(list) {
    const arr = Array.from(list)
    setFiles(arr)
  }

  async function saveAll() {
    for (const f of files) {
      // Convert small files to dataURL for demo persistence (< 1MB)
      let dataUrl = null
      if (f.size < 1024 * 1024) {
        dataUrl = await fileToDataUrl(f)
      }
      const doc = storage.saveDocument({ name: f.name, size: f.size, type: f.type, dataUrl })
      setHistory(prev => [doc, ...prev])
    }
    setFiles([])
    if (inputRef.current) inputRef.current.value = null
  }

  function fileToDataUrl(file) {
    return new Promise((res, rej) => {
      const reader = new FileReader()
      reader.onload = () => res(reader.result)
      reader.onerror = rej
      reader.readAsDataURL(file)
    })
  }

  return (
    <div className="page">
      <h1>Document Services</h1>
      
      <section className="upload-section card">
        <div className="upload-area">
          <Icon name="Upload" className="icon-large" />
          <h2>Upload Documents</h2>
          <p>Drag and drop files here or click to browse</p>
          <input 
            ref={inputRef}
            type="file"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
          />
          {files.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <button className="view-all" onClick={saveAll}>Submit {files.length} file(s)</button>
            </div>
          )}
        </div>

        {files.length > 0 && (
          <div className="preview-list">
            {files.map((file, i) => (
              <div key={i} className="preview-item">
                <Icon name="Document" />
                <span>{file.name}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="history-section card">
        <h2>Submission History</h2>
        <div className="history-list">
          {history.length === 0 ? (
            <div className="text-muted">No submissions yet.</div>
          ) : (
            history.map(item => (
              <div key={item.id} className="history-item">
                <div className="history-left">
                  <Icon name="Document" />
                </div>
                <div className="history-main">
                  <div className="history-title">{item.name}</div>
                  <div className="history-meta">{new Date(item.createdAt).toLocaleString()} • {Math.round(item.size / 1024)} KB</div>
                </div>
                <div className="history-actions">
                  <button className="view-all" onClick={() => window.open(item.dataUrl || '#')}>View</button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="card" style={{ marginTop: '1rem' }}>
        <h2>Requirements</h2>
        <p>Ensure you have your original ID document, proof of residence, and any other supporting documents specific to your request.</p>
      </section>
      <section className="card" style={{ marginTop: '1rem' }}>
        <h2>Processing Times and Fees</h2>
        <p>Standard requests take 5-7 business days. Expedited services may be available for an additional fee.</p>
      </section>
      <section className="card" style={{ marginTop: '1rem' }}>
        <h2>Download Forms</h2>
        <p>Access forms to complete offline before submission. (Forms library coming soon.)</p>
      </section>
      <section className="card" style={{ marginTop: '1rem' }}>
        <h2>Track Your Application Status</h2>
        <p>Use your reference number to check progress. (Tracker coming soon.)</p>
      </section>
    </div>
  )
}