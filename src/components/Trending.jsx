import { trending } from '../data/trending'
import ScrollReveal from './ScrollReveal'
import WhatsAppIcon from './WhatsAppIcon'
import ImageWithFallback from './ImageWithFallback'
import { motion, useReducedMotion } from 'framer-motion'
import { Flame, Star } from 'lucide-react'

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
                <Flame className="w-3 h-3" />
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
                  <div className="flex items-center gap-0.5 mb-3">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-4 h-4" fill="#D4A76A" stroke="#D4A76A" strokeWidth={1.5} />
                    ))}
                    <span className="text-xs text-chocolate-light/60 ml-1">({item.reviews})</span>
                  </div>
                  <motion.button
                    onClick={() => onOrderCake(item.name, item.price)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-green-500 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-green-600 transition-colors duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon />
                    Order Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
