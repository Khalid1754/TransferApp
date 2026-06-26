
import { useState } from 'react'
import { login } from '../services/authService'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const data = await login(email, password)
      loginUser(data)
      navigate('/')
    } catch (err) {
      setError('Fel email eller lösenord.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F1F5F9] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 justify-center mb-10">
          <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
          <span className="font-display font-bold text-lg tracking-tight">TRANSFERHUB</span>
        </div>

        <div className="bg-[#141925] border border-[#1E2433] rounded-lg p-8">
          <h1 className="font-display text-2xl font-bold mb-1">Logga in</h1>
          <p className="text-[#94A3B8] text-sm mb-6">
            Logga in med din klubbs konto
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#94A3B8] uppercase tracking-wide mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#0B0E14] border border-[#1E2433] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#22C55E] transition"
              />
            </div>

            <div>
              <label className="block text-xs text-[#94A3B8] uppercase tracking-wide mb-2">
                Lösenord
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#0B0E14] border border-[#1E2433] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#22C55E] transition"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#22C55E] text-[#0B0E14] font-semibold rounded-lg py-2.5 text-sm hover:bg-[#4ADE80] transition disabled:opacity-50"
            >
              {loading ? 'Loggar in...' : 'Logga in'}
            </button>
          </form>

          <p className="text-center text-[#94A3B8] text-sm mt-6">
            Inget konto? <Link to="/register" className="text-[#22C55E] hover:underline">Registrera klubb</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login