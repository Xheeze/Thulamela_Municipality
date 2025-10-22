import React from 'react'
import useAppStore from '../stores/appStore'

export function ThemeProvider({ children }) {
  const isDarkMode = useAppStore(state => state.isDarkMode)
  
  return (
    <div className={`app-theme ${isDarkMode ? 'dark' : 'light'}`}>
      {children}
    </div>
  )
}