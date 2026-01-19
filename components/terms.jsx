export default function Footer() {
  return (
    <footer className="w-full mt-24 border-t border-gray-200 bg-white/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo / Title */}
          <div className="text-xl font-semibold text-gray-800 tracking-tight">
            Collabs
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-gray-500 text-sm font-medium">
            <a href="#" className="hover:text-gray-800 transition-all">Terms</a>
            <a href="#" className="hover:text-gray-800 transition-all">Privacy</a>
            <a href="#" className="hover:text-gray-800 transition-all">Security</a>
            <a href="#" className="hover:text-gray-800 transition-all">Support</a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 my-8"></div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Collabs — All rights reserved.</p>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="https://x.com/Aarav1253336" className="hover:text-gray-700 transition">Twitter</a>
            <a href="https://www.instagram.com/aaravchaprana27/" className="hover:text-gray-700 transition">Instagram</a>
            <a href="https://github.com/innovativecoder1267" className="hover:text-gray-700 transition">GitHub</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
