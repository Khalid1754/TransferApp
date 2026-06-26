import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('transferapp_user')
    return stored ? JSON.parse(stored) : null
  })

  const loginUser = (authResponse) => {
    setUser(authResponse)
    localStorage.setItem('transferapp_user', JSON.stringify(authResponse))
  }

  const logoutUser = () => {
    setUser(null)
    localStorage.removeItem('transferapp_user')
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}