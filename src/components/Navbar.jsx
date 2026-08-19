import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import WhatsAppIcon from './WhatsAppIcon'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#menu', label: 'Menu' },
  { href: '#trending', label: 'Best Sellers' },
  { href: '#custom-order', label: 'Custom Order' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
]

const WHATSAPP_URL = 'https://wa.me/917777934474?text=Hi%20Prachi!%20I%27d%20like%20to%20place%20an%20order.'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const handleScroll = () => {
      const scrollY = window.scrollY + 100
      sections.forEach(section => {
        const top = section.offsetTop
        const height = section.offsetHeight
        const id = section.getAttribute('id')
        if (scrollY >= top && scrollY < top + height) {
          setActiveSection(id)
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) {
      const navbar = document.getElementById('navbar')
      const offset = navbar ? navbar.offsetHeight + 10 : 80
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  return (
    <motion.nav
      id="navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'navbar-solid' : ''}`}
      initial={false}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-2xl md:text-3xl" aria-hidden="true">🎂</span>
            <span className="font-serif text-xl md:text-2xl font-bold text-chocolate group-hover:text-blush-dark transition-colors">
              The Cake Gallery
            </span>
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`nav-link ${activeSection === href.slice(1) ? 'active' : ''}`}
              >
                {label}
              </a>
            ))}
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              <WhatsAppIcon />
              Order Now
            </motion.a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-chocolate hover:bg-blush/30 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                animate={{ d: mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16' }}
                transition={{ duration: 0.2 }}
              />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-cream/95 backdrop-blur-lg border-t border-blush/30 shadow-lg"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.a
                  key={hr