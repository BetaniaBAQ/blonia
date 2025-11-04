import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import type { Doc } from '../../convex/_generated/dataModel'

interface AuthContextType {
  user: Doc<'users'> | null | undefined
  token: string | null
  setToken: (token: string | null) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token')
    }
    return null
  })

  const user = useQuery(
    api.auth.getCurrentUser,
    token ? { token } : 'skip'
  ) as Doc<'users'> | null | undefined

  const setToken = (newToken: string | null) => {
    setTokenState(newToken)
    if (typeof window !== 'undefined') {
      if (newToken) {
        localStorage.setItem('auth_token', newToken)
      } else {
        localStorage.removeItem('auth_token')
      }
    }
  }

  const logout = () => {
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setToken,
        logout,
        isLoading: user === undefined,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
