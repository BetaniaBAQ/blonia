import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { useAuth } from '../contexts/AuthContext'
import { sendOTPCode, verifyOTPCode } from '../lib/auth-server'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const { setToken } = useAuth()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'input' | 'verify'>('input')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log('🖱️ CLIENT: Send Code button clicked')
    console.log('📧 CLIENT: Email:', email)

    try {
      console.log('📡 CLIENT: Calling sendOTPCode server function...')

      const result = await sendOTPCode({
        data: {
          email,
        },
      })

      console.log('✅ CLIENT: Server function returned:', result)

      console.log('📧 ============================================')
      console.log('📧 Email sent! Check your inbox for the OTP code')
      console.log('📧 ============================================')

      setStep('verify')
    } catch (err) {
      console.error('❌ CLIENT: Error:', err)
      setError(err instanceof Error ? err.message : 'Failed to send code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await verifyOTPCode({
        data: {
          code,
          email,
        },
      })

      // Store token and redirect
      setToken(result.token)
      navigate({ to: '/' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setStep('input')
    setCode('')
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <h1 className="text-5xl font-black text-white tracking-tight">
                BLONIA
              </h1>
              <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mt-3 rounded-full"></div>
            </div>
            <p className="text-gray-400 text-lg">Welcome back</p>
            <p className="text-gray-500 text-sm mt-1">Sign in to continue</p>
          </div>

          {step === 'input' ? (
            <>
              <form onSubmit={handleSendCode}>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Code'}
                </Button>
              </form>
            </>
          ) : (
            <form onSubmit={handleVerifyCode}>
              <div className="mb-6">
                <div className="text-center mb-4">
                  <p className="text-gray-400 text-sm">
                    We sent a code to{' '}
                    <span className="text-white font-medium">{email}</span>
                  </p>
                </div>

                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Verification Code
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="000000"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-center text-2xl tracking-widest"
                  maxLength={6}
                  required
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </Button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full text-gray-400 hover:text-white text-sm transition-colors"
              >
                Use a different email
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

