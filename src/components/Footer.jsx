import { Cake } from 'lucide-react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-cocoa border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cake className="w-5 h-5 text-white/70" strokeWidth={1.5} />
            <span className="font-serif text-lg font-bold">The Cake Gallery</span>
          </div>
          <p className="text-white/40 text-sm text-center">
            &copy; 2026 The Cake Gallery by Prachi Patel. Baked with love in Bharuch, Gujarat.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/the.cake_gallery_bharuch/"
              target="_blank"
              rel="noopener"
              className="text-white/40 hover:text-pink-400 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/prachihere_16/"
              target="_blank"
              rel="noopener"
              className="text-white/40 hover:text-pink-400 transition-colors"
              aria-label="Prachi on Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/917777934474"
              target="_blank"
              rel="noopener"
              className="text-white/40 hover:text-green-400 transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
