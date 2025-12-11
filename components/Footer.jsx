export default function Footer() {
  return (
    <footer className="py-12 glass">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
        <div className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Novus Exchange. All rights reserved.</div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
