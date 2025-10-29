import { Outlet } from 'react-router-dom'
import StaffHeader from '@components/StaffHeader'
import StaffSidebar from '@components/StaffSidebar'

export default function StaffLayout() {
  return (
    <div className="staff-app-layout">
      <StaffHeader />
      <div className="staff-main">
        <StaffSidebar />
        <main className="staff-content">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}