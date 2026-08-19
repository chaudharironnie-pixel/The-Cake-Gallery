import { trending } from '../data/trending'
import ScrollReveal from './ScrollReveal'
import WhatsAppIcon from './WhatsAppIcon'
import ImageWithFallback from './ImageWithFallback'
import { motion, useReducedMotion } from 'framer-motion'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Trending({ onOrderCake }) {
  return (
    <section id="trending" className="py-20 md:py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-gold/20 text-chocolate rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
              Best Sellers
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-chocolate mb-4">
              Customer Favorites
            </h2>
            <p className="text-chocolate-light/70 text-base md:text-lg max-w-xl mx-auto">
              The cakes everyone keeps coming back for — our most-loved creations.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {trending.map((item) => (
            <motion.div
              key={item.name}
              variants={cardVariant}
              whileHover={{ scale: 1.03, y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative"
            >
              <div className="absolute -top-3 -left-3 z-10 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Trending
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-500">
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-xl font-bold text-chocolate">{item.name}</h3>
                    <span className="text-gold font-bold text-lg">{item.price}</span>
                  </div>
                  <p className="text-chocolate-light/70 text-sm mb-4">{item.description}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-gold">★★★★★</span>
                    <span className="text-xs text-cho