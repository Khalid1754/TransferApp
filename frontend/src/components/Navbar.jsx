import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logoutUser } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/marketplace', label: 'Transfermarknad' },
    { to: '/my-listings', label: 'Mina spelare' },
  ]

  return (
    <header className="border-b border-[#1E2433] px-8 py-5 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
          <span className="font-display font-bold text-lg tracking-tight">TRANSFERHUB</span>
        </div>

        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition ${
                location.pathname === link.to
                  ? 'text-[#22C55E]'
                  : 'text-[#94A3B8] hover:text-[#F1F5F9]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-[#94A3B8]">
          Klubb #{user?.clubId} <span className="text-[#1E2433]">/</span> {user?.role}
        </span>
        <button
          onClick={handleLogout}
          className="text-sm text-[#94A3B8] hover:text-red-400 transition"
        >
          Logga ut
        </button>
      </div>
    </header>
  )
}

export default Navbar