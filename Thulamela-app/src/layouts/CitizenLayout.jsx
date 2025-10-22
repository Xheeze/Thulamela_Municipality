import { Outlet } from 'react-router-dom'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function CitizenLayout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}