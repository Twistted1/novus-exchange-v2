import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import LatestArticles from '../components/LatestArticles'
import Trending from '../components/Trending'
import Solutions from '../components/Solutions'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import AskNovus from '../components/AskNovus'
import ExitIntentModal from '../components/ExitIntentModal'
import SiteChatbot from '../components/SiteChatbot'

const Spacer = () => <div className="h-32 md:h-48 w-full" />

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef(null)
  const [showExitIntent, setShowExitIntent] = useState(false)
  const enableExitIntent = process.env.NEXT_PUBLIC_ENABLE_EXIT_INTENT === 'true'
  const [hasDwelled, setHasDwelled] = useState(false)
  const [hasScrolledHalf, setHasScrolledHalf] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    if (router.asPath.includes('#')) {
      router.replace('/', undefined, { shallow: true })
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [router])

  useEffect(() => {
    if (!enableExitIntent) return
    const dwellTimer = setTimeout(() => setHasDwelled(true), 30000)
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0 && scrollTop / docHeight >= 0.5) setHasScrolledHalf(true)
    }
    window.addEventListener('scroll', onScroll)
    const onMouseOut = (e) => {
      if (sessionStorage.getItem('nx_exit_shown')) return
      if (e.clientY <= 0 && (hasDwelled || hasScrolledHalf)) {
        setShowExitIntent(true)
        sessionStorage.setItem('nx_exit_shown', '1')
      }
    }
    window.addEventListener('mouseout', onMouseOut)
    return () => {
      clearTimeout(dwellTimer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mouseout', onMouseOut)
    }
  }, [enableExitIntent, hasDwelled, hasScrolledHalf])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view') }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])



  return (
    <>
      <Head>
        <title>Novus Exchange</title>
        <meta name="description" content="Critical, clear-eyed commentary and AI-powered insights." />
        <meta property="og:title" content="Novus Exchange" />
        <meta property="og:description" content="Critical commentary, articles, trending insights, and Ask Novus." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novusexchange.com" />
        <meta property="og:image" content="https://novusexchange.com/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@NovusExchange" />
        <link rel="canonical" href="https://novusexchange.com" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org', '@type': 'WebSite', name: 'Novus Exchange',
            url: 'https://novusexchange.com', potentialAction: {
              '@type': 'SearchAction', target: 'https://novusexchange.com/?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          })
        }} />
      </Head>
      <div className="min-h-screen theme-bg text-white">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <main ref={containerRef} className="max-w-6xl mx-auto px-6">
          <Hero />
          <Spacer />
          <About />
          <Spacer />
          <LatestArticles searchQuery={searchQuery} />
          <Spacer />
          <Trending />
          <Spacer />
          <Solutions />
          <Spacer />
          <AskNovus />
          <Spacer />
          <Contact />
        </main>
        <Footer />
        <ExitIntentModal open={showExitIntent} onClose={() => setShowExitIntent(false)} />
        <SiteChatbot />
      </div>
    </>
  )
}

// cleaned up internal section functions; now using components
