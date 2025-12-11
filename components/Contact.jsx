export default function Contact() {
  return (
    <section id="contact" className="relative reveal scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-[0_0_50px_rgba(0,0,0,0.3)] transition-colors duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 min-h-[400px]">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-white text-center md:text-left">Get in touch</h2>
                <p className="text-gray-300 text-base mb-8 font-light leading-relaxed">We value your feedback and inquiries. Reach out with tips, corrections, or questions.</p>
                <p className="text-cyan-400 text-sm mb-10 font-mono tracking-wide"><a href="mailto:contact@novusexchange.com" className="hover:text-white">contact@novusexchange.com</a></p>
                <form action="https://formspree.io/f/mdkwzpjv" method="POST" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-white/60 text-xs uppercase tracking-widest font-bold mb-2">Name</label>
                      <input type="text" id="name" name="name" className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-black/40 placeholder-white/20" placeholder="Jane Doe" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white/60 text-xs uppercase tracking-widest font-bold mb-2">Email</label>
                      <input type="email" id="email" name="email" className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-black/40 placeholder-white/20" placeholder="jane@example.com" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-white/60 text-xs uppercase tracking-widest font-bold mb-2">Message</label>
                    <textarea id="message" name="message" rows={5} className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white resize-none focus:outline-none focus:border-cyan-500/50 focus:bg-black/40 placeholder-white/20" placeholder="How can we help?" required></textarea>
                  </div>
                  <button type="submit" className="bg-red-600 text-white font-bold text-sm py-4 px-10 rounded-lg hover:bg-red-500 transition-all shadow-lg shadow-red-900/20">Send Message</button>
                </form>
              </div>
            </div>
            <div className="flex flex-col gap-12">
              <div className="bg-white/5 rounded-2xl p-8 border border-white/5 shadow-inner">
                <h2 className="text-3xl font-bold mb-4 text-white">Newsletter</h2>
                <p className="text-gray-400 text-sm mb-8 font-light">Stay ahead of the curve with our latest articles and in-depth analysis delivered directly to your inbox.</p>
                <form action="https://formspree.io/f/xnngvoyw" method="POST" className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <input type="email" name="email" placeholder="your.email@example.com" required className="flex-grow bg-black/30 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500/50 placeholder-white/20" />
                  <button type="submit" className="bg-red-600 text-white font-bold text-sm py-3 px-6 rounded-lg hover:bg-red-500 transition-all shadow-lg shadow-red-900/20 w-full sm:w-auto">Subscribe</button>
                </form>
              </div>
              <div className="flex flex-col items-center md:items-start pl-2">
                <h3 className="text-xl font-bold text-white mb-6 tracking-tight text-center md:text-left">Connect With Us</h3>
                <div className="flex gap-6 items-center justify-center md:justify-start">
                  <a href="https://www.youtube.com/@NovusExchange" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] transition-transform duration-300" aria-label="YouTube" title="YouTube">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                  </a>
                  <a href="https://x.com/novusexchange" target="_blank" rel="noopener noreferrer" className="text-white transition-transform duration-300" aria-label="X" title="X">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H4.68l4.71 6.23L13.89 2.25h4.354zm-1.491 17.25h2.336L7.015 4.022H4.58l12.173 15.478z" /></svg>
                  </a>
                  <a href="https://www.instagram.com/novusexchange" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] transition-transform duration-300" aria-label="Instagram" title="Instagram">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.011-4.85-.069c-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85C2.163 3.854 3.708 2.309 6.93 2.163 8.181 2.105 8.559 2.094 12 2.094m0-2.094c-3.264 0-3.66.014-4.944.072C2.69 0.402 0.402 2.69 0.072 7.056 0.014 8.34 0 8.736 0 12s.014 3.66.072 4.944C0.402 21.31 2.69 23.598 7.056 23.928c1.284.058 1.68.072 4.944.072s3.66-.014 4.944-.072c4.368-.328 6.656-2.616 6.984-6.984.058-1.284.072-1.68.072-4.944s-.014-3.66-.072-4.944C23.598 2.69 21.31 0.402 16.944 0.072 15.66 0.014 15.264 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" /></svg>
                  </a>
                  <a href="https://www.facebook.com/handle" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] transition-transform duration-300" aria-label="Facebook" title="Facebook">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a href="https://www.tiktok.com/@marcioeditions" target="_blank" rel="noopener noreferrer" className="text-white transition-transform duration-300" aria-label="TikTok" title="TikTok">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.913 2.913 0 0 1 1.345-5.25c.48 0 .931.126 1.326.35V9.49c-.42-.132-.864-.208-1.326-.208C5.903 9.282 3.891 11.72 3.891 14.76s2.012 5.478 4.627 5.478c2.547 0 4.613-2.057 4.627-4.602V7.05c1.164.807 2.57 1.281 4.077 1.298V5.166c-.58-.01-1.135-.154-1.633-.48z" fill="white" /></svg>
                  </a>
                  <a href="https://rumble.com/user/handle" target="_blank" rel="noopener noreferrer" className="text-[#85C742] transition-transform duration-300" aria-label="Rumble" title="Rumble">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
