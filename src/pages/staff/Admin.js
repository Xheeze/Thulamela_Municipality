import React, { useState, useEffect } from 'react'
import '../styles/Admin.css'
import storage from '@shared/services/storage'
import { Link } from 'react-router-dom'


export default function Admin(){
	const [tab, setTab] = useState('overview')
	const [docs, setDocs] = useState([])
	const [appointments, setAppointments] = useState([])
	const [queue, setQueue] = useState({})

	useEffect(() => {
		setDocs(storage.getDocuments())
		setAppointments(storage.getAppointments())
		setQueue(storage.getQueueState())
	}, [])

	function renderTab(){
    switch(tab){
			default: return (
				<div className="admin-overview">
					<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
						<div className="card" style={{ minWidth: 180 }}>
							<h3>Documents</h3>
							<div className="kpi-value">{docs.length}</div>
							<Link to="/staff/documents" className="nav-link">Open Document Processing</Link>
						</div>
						<div className="card" style={{ minWidth: 180 }}>
							<h3>Appointments</h3>
							<div className="kpi-value">{appointments.length}</div>
							<Link to="/staff" className="nav-link">Open Dashboard</Link>
						</div>
						<div className="card" style={{ minWidth: 180 }}>
							<h3>Queue</h3>
							<div className="kpi-value">{queue.next?.length ?? 0}</div>
							<Link to="/staff/queue" className="nav-link">Manage Queue</Link>
						</div>
					</div>
				</div>
			)
		}
	}

	return (
		<div className="admin-page container">
			<h1>Admin Console</h1>
			<nav className="admin-nav">
				
			</nav>

			<section style={{ marginTop: '1rem' }}>
				{renderTab()}
			</section>
		</div>
	)
}

