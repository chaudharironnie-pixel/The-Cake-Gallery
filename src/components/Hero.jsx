import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion'
import WhatsAppIcon from './WhatsAppIcon'
import ImageWithFallback from './ImageWithFallback'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&q=80',
    alt: 'Rich dark chocolate cake with glossy ganache',
  },
  {
    src: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=1920&q=80',
    alt: 'Elegant wedding cake decorated with flowers',
  },
  {
    src: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=1920&q=80',
    alt: 'Colorful cupcakes with swirl frosting',
  },
  {
    src: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1920&q=80',
    alt: 'Chocolate truffle cake slice',
  },
  {
    src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1920&q=80',
    alt: 'Fresh fruit celebration cake',
  },
  {
    src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1920&q=80',
    alt: 'Beautifully decorated bento cake',
  },
  {
    src: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1920&q=80',
    alt: 'Fudgy brownies fresh from the oven',
  },
  {
    src: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=1920&q=80',
    alt: 'Bomboloni filled with cream',
  },
  {
    src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1920&q=80',
    alt: 'Dessert bowl with layers of truffle',
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
  const [isHovered, setIsHovered] = useState(false)
  const [direction, setDirection] = useState(1)
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const preloadedRef = useRef(new Set())

  const parallaxY = useTransform(scrollY, [0, 800], [0, shouldReduceMotion ? 0 : 200])
  const overlayOpacity = useTransform(scrollY, [0, 600], [1, 0.5])

  const goToSlide = useCallback((index) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }, [currentSlide])

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  // Preload next image
  useEffect(() => {
    const nextIndex = (currentSlide + 1) % SLIDES.length
    if (!preloadedRef.current.has(nextIndex)) {
      const src = SLIDES[nextIndex].src
      if (typeof src === 'string') {
        const img = new Image()
        img.src = src
      }
      preloadedRef.current.add(nextIndex)
    }
  }, [currentSlide])

  // Auto-play with pause on hover
  useEffect(() => {
    if (isHovered || shouldReduceMotion) return
    const interval = setInterval(nextSlide, 4500)
    return () => clearInterval(interval)
  }, [nextSlide, isHovered, shouldReduceMotion])

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
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Parallax background images with crossfade */}
      <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
        <AnimatePresence mode="sync" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2, ease: 'easeInOut' }, scale: { duration: 8, ease: 'easeOut' } }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={SLIDES[currentSlide].src}
              alt={SLIDES[currentSlide].alt}
              className="w-full h-full object-cover"
              loading={currentSlide === 0 ? 'eager' : 'lazy'}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-cocoa/50 via-cocoa/30 to-cocoa/60"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={stagger}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
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
                <ChevronDown className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/40 transition-all duration-300 opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
        style={{ opacity: isHovered ? 0.8 : 0 }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/40 transition-all duration-300 opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
        style={{ opacity: isHovered ? 0.8 : 0 }}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Carousel dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
            aria-label={`Slide ${i + 1}: ${SLIDES[i].alt}`}
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
        <ChevronDown className="w-6 h-6" />
      </motion.a>
    </section>
  )
}
