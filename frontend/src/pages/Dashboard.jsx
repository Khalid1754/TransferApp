import { useEffect, useState } from 'react'
import { getTransferListings } from '../services/transferListingService'

function Dashboard() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getTransferListings()
      .then((data) => setListings(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const stats = [
    { label: "Aktiva listningar", value: listings.length.toString(), change: "Just nu på marknaden" },
    { label: "Spelare i bevakning", value: "47", change: "8 nya träffar" },
    { label: "Genomförda affärer", value: "5", change: "Senast: 3 dagar sedan" },
  ]

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F1F5F9]">
      <header className="border-b border-[#1E2433] px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
          <span className="font-display font-bold text-lg tracking-tight">TRANSFERHUB</span>
        </div>
        <div className="text-sm text-[#94A3B8]">
          Liverpool FC <span className="text-[#1E2433]">/</span> Owner
        </div>
      </header>

      <main className="px-8 py-10 max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-[#22C55E] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Transferfönster — sommar 2026
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight">
            Vad händer på marknaden idag
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[#141925] border-l-2 border-[#22C55E] rounded-r-lg px-5 py-4">
              <p className="text-[#94A3B8] text-xs uppercase tracking-wide mb-2">{stat.label}</p>
              <p className="font-display text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-[#94A3B8] text-xs">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#141925] border border-[#1E2433] rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1E2433] flex items-center justify-between">
            <h2 className="font-display font-semibold text-sm uppercase tracking-wide">
              Senaste listningarna
            </h2>
            <button className="text-[#22C55E] text-sm font-medium hover:text-[#4ADE80] transition">
              Se alla →
            </button>
          </div>

          <div>
            {loading && (
              <p className="px-5 py-6 text-[#94A3B8] text-sm">Hämtar listningar...</p>
            )}

            {error && (
              <p className="px-5 py-6 text-red-400 text-sm">Kunde inte hämta data: {error}</p>
            )}

            {!loading && !error && listings.length === 0 && (
              <p className="px-5 py-6 text-[#94A3B8] text-sm">Inga aktiva listningar just nu.</p>
            )}

            {!loading && !error && listings.map((listing) => (
              <div
                key={listing.id}
                className="flex items-center justify-between px-5 py-4 border-b border-[#1E2433] last:border-0 hover:bg-[#1A2030] transition cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#94A3B8] text-xs font-mono w-8">
                    {listing.playerPosition}
                  </span>
                  <div>
                    <p className="font-medium text-sm">{listing.playerName}</p>
                    <p className="text-[#94A3B8] text-xs">
                      {listing.listedByClubName} · {listing.playerAge} år
                    </p>
                  </div>
                </div>
                <span className="font-display font-bold text-[#22C55E] text-sm">
                  {listing.askingPrice.toLocaleString('sv-SE')} €
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard