import { useState } from 'react'
import Image from 'next/image'

function TrendCard({ item, onClick }) {
  const [imgSrc, setImgSrc] = useState(item.image)
  const fallbackImage = 'https://placehold.co/1920x1080/111111/ffffff?text=Trending'
  return (
    <div onClick={onClick} className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-500 group cursor-pointer neon-card shine-hover">
      <div className="relative h-48 overflow-hidden">
        <Image src={imgSrc || fallbackImage} alt={item.title} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized onError={() => setImgSrc(fallbackImage)} />
        <div className="absolute top-3 right-3 bg-red-600/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-lg border border-red-500/50">Live</div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60"></div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold leading-snug mb-2 neon-text">{item.title}</h3>
        <p className="text-xs text-gray-400 line-clamp-2">{item.summary}</p>
      </div>
    </div>
  )
}

export default function Trending() {
  const trendingItems = [
    { id: 1, title: 'Global Market Shift: Asia Rising', image: 'https://placehold.co/1920x1080/0f172a/cbd5e1?text=Market+Shift', summary: 'Asian markets are outpacing Western counterparts in Q3, driven by tech sector growth and supply chain stabilization.', details: 'Full trend analysis: The shift represents a fundamental rebalancing of global capital flows...' },
    { id: 2, title: 'Tech Sector Layoffs: A Correction?', image: 'https://placehold.co/1920x1080/334155/e2e8f0?text=Tech+Sector', summary: 'Major tech firms announce another round of workforce reductions, citing AI efficiency and post-pandemic normalization.', details: 'Full trend analysis: While painful, analysts suggest this is a necessary correction to bloated pandemic-era hiring...' },
    { id: 3, title: 'Oil Prices Volatility Continues', image: 'https://placehold.co/1920x1080/1e293b/94a3b8?text=Oil+Prices', summary: 'Geopolitical tensions in the Middle East continue to drive uncertainty in energy markets, with Brent Crude fluctuating wildly.', details: 'Full trend analysis: Energy independence strategies are being stress-tested as supply shocks become the new normal...' }
  ]
  const [selectedTrend, setSelectedTrend] = useState(null)
  return (
    <section id="trending" className="min-h-screen py-32 relative bg-black/40 reveal scroll-mt-24 snap-start">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-black mb-6 text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Global Trending</h2>
        <p className="text-xl text-white/70 mb-16 text-center max-w-2xl mx-auto font-light">AI-curated daily bites of the top three stories shaping the global narrative right now. Click to expand.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingItems.map(item => (
            <TrendCard key={item.id} item={item} onClick={() => setSelectedTrend(item)} />
          ))}
        </div>
      </div>
      {selectedTrend && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedTrend(null)}>
          <div className="bg-[#111] border border-white/20 rounded-2xl max-w-lg w-full p-8 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedTrend(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">{selectedTrend.title}</h3>
            <Image src={selectedTrend.image} alt={selectedTrend.title} width={1200} height={800} className="w-full h-48 object-cover rounded-lg mb-6" unoptimized />
            <p className="text-gray-300 leading-relaxed">{selectedTrend.details}</p>
          </div>
        </div>
      )}
    </section>
  )
}
