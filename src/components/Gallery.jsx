import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { galleryItems } from '../data/gallery'
import ScrollReveal from './ScrollReveal'
import ImageWithFallback from './ImageWithFallback'

const INSTAGRAM_URL = 'https://www.instagram.com/the.cake_gallery_bharuch/'

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const itemVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const shouldReduceMotion = useReducedMotion()

  const closeLightbox = useCallback(() => {
    setLightbox(null)
    document.body.style.overflow = ''
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && lightbox) closeLightbox()
    }
    if (lightbox) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightbox, closeLightbox])

  return (
    <section id="gallery" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-blush/40 text-chocolate rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
              Gallery
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-chocolate mb-4">
              Our Creations
            </h2>
            <p className="text-chocolate-light/70 text-base md:text-lg max-w-xl mx-auto">
              A glimpse into the cakes we've crafted with love.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariant}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 1, zIndex: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`gallery-item rounded-xl overflow-hidden group cursor-pointer ${item.className}`}
              onClick={() => setLightbox(item)}
            >
              <ImageWithFallback
                src={item.src}
                alt={item.alt}
                className={`w-full ${item.heightClass || 'h-48 md:h-64'} object-cover transition-transform duration-500 group-hover:scale-110`}
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal>
          <div className="text-center mt-10">
            <motion.a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-8 py-4 rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-shadow duration-300"