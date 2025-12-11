export default function About() {
  const playlistSrc = "https://www.youtube.com/embed/videoseries?list=PL-CfrwN0sygN_N7sflltRA_yb9k3WY9uR&autoplay=1&mute=1&loop=1"
  return (
    <section id="about" className="relative reveal scroll-mt-24 flex items-center snap-start">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white mb-4 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">About</h2>
          <p className="text-gray-400 text-lg font-light">Our mission, values, and team.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden group transition-all duration-500 hover:shadow-[0_0_50px_rgba(34,211,238,0.1)] hover:border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-3 space-y-6 border-l-2 border-cyan-500/50 pl-6 lg:pl-6">
              <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-[0.25em] drop-shadow-md">Novus Exchange</h3>
              <div className="space-y-4 text-gray-300 text-[11px] leading-relaxed font-light tracking-wide">
                <p>People deserve more than just headlines. Novus Exchange was founded to provide the full story, challenging conventional narratives and exposing the complexities of pressing issues.</p>
                <p>Our mission is to inform, provoke thought, and foster discussion by shining a light on the injustices and abuses of power impacting individuals and society.</p>
              </div>
            </div>
            <div className="lg:col-span-9 relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/80">
              <iframe className="absolute inset-0 w-full h-full" src={playlistSrc} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
