import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { LogOut } from 'lucide-react'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const { user, logout, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    throw redirect({ to: '/login' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-black text-white tracking-tight">
              BLONIA
            </h1>
            <Button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-6">Dashboard</h2>

          <div className="mb-6">
            <h3 className="text-xl text-gray-300 mb-4">Welcome back!</h3>
            <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
              <p className="text-gray-400 text-sm mb-2">Your Info:</p>
              <p className="text-white">
                {user.email && `Email: ${user.email}`}
                {user.phone && `Phone: ${user.phone}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
