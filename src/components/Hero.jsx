import { useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import WhatsAppIcon from './WhatsAppIcon'
import ImageWithFallback from './ImageWithFallback'

const SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&q=80',
    alt: 'Beautifully decorated chocolate cake',
  },
  {
    src: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=1920&q=80',
    alt: 'Elegant wedding cake with flowers',
  },
  {
    src: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=1920&q=80',
    alt: 'Freshly baked cupcakes and pastries',
  },
]

const WHATSAPP_URL = 'https://wa.me/917777934474?text=Hi%20Prachi!%20I%27d%20like%20to%20place%20an%20order.'

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  const parallaxY = useTransform(scrollY, [0, 800], [0, shouldReduceMotion ? 0 : 200])
  const overlayOpacity = useTransform(scrollY, [0, 600], [1, 0.5])

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  const handleMenuClick = (e) => {
    e.preventDefault()
    const target = document.querySelector('#menu')
    if (target) {
      const navbar = document.getElementById('navbar')
      const offset = navbar ? navbar.offsetHeight + 10 : 80
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax background images */}
      <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide ${i === currentSlide ? 'active' : ''}`}
          >
            <ImageWithFallback
              src={slide.src}
              alt={slide.alt}
              className="hero-img"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </motion.div>

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-cocoa/50 via-cocoa/30 to-cocoa/60"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="hero-content"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block px-4 py-1.5 bg-blush/90 text-chocolate rounded-full text-sm font-medium mb-6 tracking-wide backdrop-blur-sm"
          >
            Home Bakery in Bharuch, Gujarat
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
          >
            Freshly Baked<br /><span className="text-blush italic">Made with Love</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed drop-shadow"
          >
            Handcrafted cakes for every occasion — from birthdays to weddings, every slice tells a story.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2.5 bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition-colors duration-300 shadow-xl hover:shadow-2xl"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Order on WhatsApp
            </motion.a>
            <motion.a
              href="#menu"
              onClick={handleMenuClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white/15 text-white px-8 py-4 rounded-full font-semibold text-lg backdrop-blur-sm border border-white/30 hover:bg-white/25 transition-colors duration-300"
            >
              View Menu
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Carousel dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll down arrow */}
      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          const target = document.querySelector('#about')
          if (target) {
            const navbar = document.getElementById('navbar')
            const offset = navbar ? navbar.offsetHeight + 10 : 80
            const top = target.getBoundingClientRect().top + window.scrollY - offset
            window.scrollTo({ top, behavior: 'smooth' })
          }
        }}
        className="absolute bottom-8 right-8 z-10 text-white/70 hover:text-white transition-colors hidden md:block"
        aria-label="Scroll down"
        animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.a>
    </section>
  )
}
