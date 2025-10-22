import { create } from 'zustand'

const useAppStore = create((set) => ({
  // Theme state
  isDarkMode: false,
  toggleDarkMode: () => set(state => ({ isDarkMode: !state.isDarkMode })),
  
  // Language state
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  
  // Auth state
  isAuthenticated: false,
  user: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
  
  // Queue state
  currentTicket: null,
  estimatedWait: null,
  setQueueInfo: (ticket, wait) => set({ currentTicket: ticket, estimatedWait: wait })
}))

export default useAppStore