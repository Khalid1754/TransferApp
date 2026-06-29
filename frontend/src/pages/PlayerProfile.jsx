import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPlayer } from '../services/playerService'
import Navbar from '../components/Navbar'

function PlayerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getPlayer(id)
      .then((data) => setPlayer(data))
      .catch(() => setError('Kunde inte hitta spelaren.'))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F1F5F9]">
      <Navbar />

      <main className="px-8 py-10 max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-[#94A3B8] text-sm hover:text-[#F1F5F9] transition mb-8"
        >
          ← Tillbaka
        </button>

        {loading && <p className="text-[#94A3B8] text-sm">Hämtar spelare...</p>}

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {!loading && !error && player && (
          <div>
            {/* Hero-sektion */}
            <div className="flex items-start justify-between mb-10">
              <div>
                <p className="text-[#22C55E] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                  {player.position} · {player.nationality}
                </p>
                <h1 className="font-display text-5xl font-bold tracking-tight mb-2">
                  {player.name}
                </h1>
                <p className="text-[#94A3B8] text-sm">{player.age} år</p>
              </div>

              <div className="text-right">
                <p className="text-[#94A3B8] text-xs uppercase tracking-wide mb-1">
                  Marknadsvärde
                </p>
                <p className="font-display text-3xl font-bold text-[#22C55E]">
                  {player.marketValue.toLocaleString('sv-SE')} €
                </p>
              </div>
            </div>

            {/* Info-grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-[#141925] border border-[#1E2433] rounded-lg p-4">
                <p className="text-[#94A3B8] text-xs uppercase tracking-wide mb-2">Position</p>
                <p className="font-display font-bold text-lg">{player.position}</p>
              </div>
              <div className="bg-[#141925] border border-[#1E2433] rounded-lg p-4">
                <p className="text-[#94A3B8] text-xs uppercase tracking-wide mb-2">Ålder</p>
                <p className="font-display font-bold text-lg">{player.age}</p>
              </div>
              <div className="bg-[#141925] border border-[#1E2433] rounded-lg p-4">
                <p className="text-[#94A3B8] text-xs uppercase tracking-wide mb-2">Nationalitet</p>
                <p className="font-display font-bold text-lg">{player.nationality}</p>
              </div>
              <div className="bg-[#141925] border border-[#1E2433] rounded-lg p-4">
                <p className="text-[#94A3B8] text-xs uppercase tracking-wide mb-2">Spelare-ID</p>
                <p className="font-display font-bold text-lg">#{player.id}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default PlayerProfile