import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { register } from '../services/authService'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [clubId, setClubId] = useState('')
  const [role, setRole] = useState('Owner')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const data = await register(email, password, parseInt(clubId), role)
      loginUser(data)
      navigate('/')
    } catch (err) {
      setError(err.response?.data || 'Något gick fel vid registrering.')
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
          <h1 className="font-display text-2xl font-bold mb-1">Registrera konto</h1>
          <p className="text-[#94A3B8] text-sm mb-6">
            Koppla ett konto till din klubb
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

            <div>
              <label className="block text-xs text-[#94A3B8] uppercase tracking-wide mb-2">
                Klubb-ID
              </label>
              <input
                type="number"
                value={clubId}
                onChange={(e) => setClubId(e.target.value)}
                required
                placeholder="T.ex. 1"
                className="w-full bg-[#0B0E14] border border-[#1E2433] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#22C55E] transition"
              />
            </div>

            <div>
              <label className="block text-xs text-[#94A3B8] uppercase tracking-wide mb-2">
                Roll
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#0B0E14] border border-[#1E2433] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#22C55E] transition"
              >
                <option value="Owner">Owner</option>
                <option value="Coach">Coach</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#22C55E] text-[#0B0E14] font-semibold rounded-lg py-2.5 text-sm hover:bg-[#4ADE80] transition disabled:opacity-50"
            >
              {loading ? 'Registrerar...' : 'Skapa konto'}
            </button>
          </form>

          <p className="text-center text-[#94A3B8] text-sm mt-6">
            Har du redan ett konto? <a href="/login" className="text-[#22C55E] hover:underline">Logga in</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register