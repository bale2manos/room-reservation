import { createContext, useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const { t } = useTranslation()
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const login = (userData) => {
    if (!userData) {
      throw new Error(t('auth.errors.userNotFound'))
    }
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  const checkAuth = () => {
    if (!user) {
      throw new Error(t('auth.errors.loginRequired'))
    }
    return true
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 