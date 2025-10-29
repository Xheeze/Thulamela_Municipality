import React, { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@components/ThemeProvider'
import { ErrorBoundary } from '@components/ErrorBoundary'
import { SuspenseBoundary } from '@components/SuspenseBoundary'
import ProtectedRoute from '@components/ProtectedRoute'

// Layouts
const CitizenLayout = lazy(() => import('@layouts/CitizenLayout'))
const StaffLayout = lazy(() => import('@layouts/StaffLayout'))

// Citizen Pages
const CitizenHome = lazy(() => import('@pages/citizen/Home'))
const DocumentServices = lazy(() => import('@pages/citizen/DocumentServices'))
const Appointments = lazy(() => import('@pages/citizen/Appointments'))
const Feedback = lazy(() => import('@pages/citizen/Feedback'))
const Profile = lazy(() => import('@pages/citizen/Profile'))
const Landing = lazy(() => import('@pages/Landing'))
const Auth = lazy(() => import('@pages/Auth'))
const OnlineServices = lazy(() => import('@pages/citizen/OnlineServices'))
const Services = lazy(() => import('@pages/citizen/Services'))

// Staff Pages
const StaffDashboard = lazy(() => import('@pages/staff/Dashboard'))
const QueueManagement = lazy(() => import('@pages/staff/QueueManagement'))
const DocumentProcessing = lazy(() => import('@pages/staff/DocumentProcessing'))
const TaskManagement = lazy(() => import('@pages/staff/TaskManagement'))

// Services data for the grid
export const municipalityServices = [
  {
    icon: '📋',
    title: 'Tenders Updates',
    link: '#tenders'
  },
  {
    icon: '👥',
    title: 'Employment And Job Planning',
    link: '#employment'
  },
  {
    icon: '🏗️',
    title: 'Planning and Development',
    link: '#planning'
  },
  {
    icon: '💰',
    title: 'Business Tax And Finance',
    link: '#finance'
  },
  {
    icon: '🚦',
    title: 'Traffic & Law Enforcement',
    link: '#traffic'
  },
  {
    icon: '🏛️',
    title: 'Municipal Facilities',
    link: '#facilities'
  },
  {
    icon: '🤝',
    title: 'Community Services',
    link: '#community'
  },
  {
    icon: '🎓',
    title: 'Universities and Colleges',
    link: '#education'
  }
]

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SuspenseBoundary>
        <CitizenLayout />
      </SuspenseBoundary>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <SuspenseBoundary>
            <Landing />
          </SuspenseBoundary>
        )
      },
      {
        path: 'home',
        element: (
          <SuspenseBoundary>
            <CitizenHome />
          </SuspenseBoundary>
        )
      },
      {
        path: 'documents',
        element: (
          <SuspenseBoundary>
            <DocumentServices />
          </SuspenseBoundary>
        )
      },
      {
        path: 'appointments',
        element: (
          <SuspenseBoundary>
            <Appointments />
          </SuspenseBoundary>
        )
      },
      {
        path: 'feedback',
        element: (
          <SuspenseBoundary>
            <Feedback />
          </SuspenseBoundary>
        )
      },
      {
        path: 'online',
        element: (
          <SuspenseBoundary>
            <OnlineServices />
          </SuspenseBoundary>
        )
      },
      {
        path: 'services',
        element: (
          <SuspenseBoundary>
            <Services />
          </SuspenseBoundary>
        )
      },
      {
        path: 'profile',
        element: (
          <SuspenseBoundary>
            <Profile />
          </SuspenseBoundary>
        )
      }
    ]
  },
  {
    path: '/staff',
    element: (
      <SuspenseBoundary>
        <ProtectedRoute allowedRoles={['staff']}>
          <StaffLayout />
        </ProtectedRoute>
      </SuspenseBoundary>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <SuspenseBoundary>
            <StaffDashboard />
          </SuspenseBoundary>
        )
      },
      {
        path: 'queue',
        element: (
          <SuspenseBoundary>
            <QueueManagement />
          </SuspenseBoundary>
        )
      },
      {
        path: 'documents',
        element: (
          <SuspenseBoundary>
            <DocumentProcessing />
          </SuspenseBoundary>
        )
      },
      {
        path: 'tasks',
        element: (
          <SuspenseBoundary>
            <TaskManagement />
          </SuspenseBoundary>
        )
      }
    ]
  },
  {
    path: '/auth',
    element: (
      <SuspenseBoundary>
        <Auth />
      </SuspenseBoundary>
    ),
    errorElement: <ErrorBoundary />
  }
])

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
