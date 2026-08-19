import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { galleryItems } from '../data/gallery'
import ScrollReveal from './ScrollReveal'
import ImageWithFallback from './ImageWithFallback'
import { FaInstagram } from 'react-icons/fa'
import { X } from 'lucide-react'

const INSTAGRAM_URL = 'https://www.instagram.com/the.cake_gallery_bharuch/'

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
            >
              <FaInstagram className="w-5 h-5" />
              Follow @the.cake_gallery_bharuch
            </motion.a>
          </div>
        </ScrollReveal>
      </div>

      {/* Animated Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 bg-cocoa/90 z-[200] flex items-center justify-center cursor-pointer p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <motion.img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-[90vw] max-h-[85vh] rounded-xl shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
            <motion.button
              className="absolute top-6 right-6 text-white hover:text-blush transition-colors"
              onClick={closeLightbox}
              aria-label="Close image"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.2 }}
            >
              <X className="w-8 h-8" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
