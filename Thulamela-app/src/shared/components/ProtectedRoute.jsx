import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ allowedRoles = [], children }){
  const location = useLocation()
  let role = null
  try {
    role = localStorage.getItem('digiserve:role')
  } catch {}

  const allowed = role && (allowedRoles.length === 0 || allowedRoles.includes(role))

  if (!allowed){
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  return children
}
