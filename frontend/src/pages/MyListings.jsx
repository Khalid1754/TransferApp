import { useEffect, useState } from 'react'
import { getMyClubListings } from '../services/transferListingService'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

function MyListings() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    getMyClubListings()
      .then((data) => setListings(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F1F5F9]">
      <Navbar />

      <main className="px-8 py-10 max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-[#22C55E] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Klubb #{user?.clubId}
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight">
            Mina listade spelare
          </h1>
        </div>

        <div className="bg-[#141925] border border-[#1E2433] rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1E2433] flex items-center justify-between">
            <h2 className="font-display font-semibold text-sm uppercase tracking-wide">
              Aktiva listningar
            </h2>
            <span className="text-[#94A3B8] text-sm">{listings.length} spelare</span>
          </div>

          {loading && (
            <p className="px-5 py-6 text-[#94A3B8] text-sm">Hämtar dina listningar...</p>
          )}

          {error && (
            <p className="px-5 py-6 text-red-400 text-sm">Kunde inte hämta data: {error}</p>
          )}

          {!loading && !error && listings.length === 0 && (
            <p className="px-5 py-6 text-[#94A3B8] text-sm">
              Du har inga listade spelare just nu.
            </p>
          )}

          {!loading && !error && listings.map((listing) => (
            <div
              key={listing.id}
              className="flex items-center justify-between px-5 py-4 border-b border-[#1E2433] last:border-0 hover:bg-[#1A2030] transition"
            >
              <div className="flex items-center gap-4">
                <span className="text-[#94A3B8] text-xs font-mono border border-[#1E2433] rounded px-2 py-1 w-12 text-center">
                  {listing.playerPosition}
                </span>
                <div>
                  <p className="font-medium text-sm">{listing.playerName}</p>
                  <p className="text-[#94A3B8] text-xs">{listing.playerAge} år</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-[#94A3B8] text-xs uppercase tracking-wide mb-1">Begärt pris</p>
                  <p className="font-display font-bold text-[#22C55E] text-sm">
                    {listing.askingPrice.toLocaleString('sv-SE')} €
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[#94A3B8] text-xs uppercase tracking-wide mb-1">Status</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    listing.status === 'Active'
                      ? 'bg-[#22C55E]/10 text-[#22C55E]'
                      : 'bg-[#94A3B8]/10 text-[#94A3B8]'
                  }`}>
                    {listing.status === 'Active' ? 'Aktiv' : listing.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default MyListings