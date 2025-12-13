import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Header({ searchQuery, setSearchQuery }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/10' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Brand />
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-8">
            {['Home', 'About', 'Articles', 'Trending', 'Ask Novus', 'Contact'].map((item) => (
              <a key={item} href={item === 'Home' ? '#home' : `#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-gray-300 hover:text-white transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                {item}
              </a>
            ))}
          </div>
          <div className="relative">
            <div className="flex items-center bg-white/5 backdrop-blur-md rounded-full border border-white/10 px-4 py-2 min-w-[200px]">
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-white/40 focus:placeholder-white/60"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Brand() {
  const [fallback, setFallback] = useState(false)
  return (
    <a href="#home" className="flex items-center gap-3 shine-hover">
      {!fallback ? (
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Novus Exchange" width={50} height={50} className="h-12 w-12" unoptimized onError={() => setFallback(true)} />
          <div className="flex flex-col">
            <div className="text-lg font-bold tracking-tight text-cyan-400">Novus Exchange</div>
            <div className="text-[10px] text-gray-400 tracking-wider">Connecting perspectives</div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
            <span className="text-white font-black text-lg">NE</span>
          </div>
          <div className="flex flex-col">
            <div className="text-lg font-bold tracking-tight text-cyan-400 drop-shadow-lg neon-text">Novus<span className="text-cyan-400">.</span>Exchange</div>
            <div className="text-[10px] text-gray-400 tracking-wider">Connecting perspectives</div>
          </div>
        </div>
      )}
    </a>
  )
}
