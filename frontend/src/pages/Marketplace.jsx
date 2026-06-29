import { useEffect, useState } from 'react'
import { getTransferListings } from '../services/transferListingService'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Marketplace() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const [positionFilter, setPositionFilter] = useState('Alla')
  const [search, setSearch] = useState('')

  useEffect(() => {
    getTransferListings()
      .then((data) => setListings(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const positions = ['Alla', ...new Set(listings.map((l) => l.playerPosition))]

  const filteredListings = listings.filter((listing) => {
    const matchesPosition =
      positionFilter === 'Alla' || listing.playerPosition === positionFilter
    const matchesSearch = listing.playerName
      .toLowerCase()
      .includes(search.toLowerCase())
    return matchesPosition && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F1F5F9]">
      <Navbar />

      <main className="px-8 py-10 max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-[#22C55E] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Transfermarknad
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight">
            Spelare till salu just nu
          </h1>
        </div>

        {/* Filter-rad */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <input
            type="text"
            placeholder="Sök spelare..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#141925] border border-[#1E2433] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#22C55E] transition w-64"
          />

          <div className="flex gap-2">
            {positions.map((pos) => (
              <button
                key={pos}
                onClick={() => setPositionFilter(pos)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  positionFilter === pos
                    ? 'bg-[#22C55E] text-[#0B0E14]'
                    : 'bg-[#141925] text-[#94A3B8] border border-[#1E2433] hover:border-[#22C55E]'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>

          <span className="text-[#94A3B8] text-sm ml-auto">
            {filteredListings.length} spelare
          </span>
        </div>

        {/* Resultat */}
        {loading && (
          <p className="text-[#94A3B8] text-sm py-8 text-center">Hämtar marknaden...</p>
        )}

        {error && (
          <p className="text-red-400 text-sm py-8 text-center">Kunde inte hämta data: {error}</p>
        )}

        {!loading && !error && filteredListings.length === 0 && (
          <p className="text-[#94A3B8] text-sm py-8 text-center">
            Inga spelare matchar din sökning.
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                onClick={() => navigate(`/players/${listing.playerId}`)}
                className="bg-[#141925] border border-[#1E2433] rounded-lg p-5 hover:border-[#22C55E] transition cursor-pointer group"
                >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[#94A3B8] text-xs font-mono border border-[#1E2433] rounded px-2 py-1">
                    {listing.playerPosition}
                  </span>
                  <span className="text-[#94A3B8] text-xs">{listing.playerAge} år</span>
                </div>

                <h3 className="font-display font-bold text-lg mb-1 group-hover:text-[#22C55E] transition">
                  {listing.playerName}
                </h3>
                <p className="text-[#94A3B8] text-sm mb-4">{listing.listedByClubName}</p>

                <div className="flex items-center justify-between pt-4 border-t border-[#1E2433]">
                  <span className="text-[#94A3B8] text-xs uppercase tracking-wide">
                    Begärt pris
                  </span>
                  <span className="font-display font-bold text-[#22C55E]">
                    {listing.askingPrice.toLocaleString('sv-SE')} €
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Marketplace