import { menuItems, categories } from '../data/menuItems'
import ScrollReveal from './ScrollReveal'
import WhatsAppIcon from './WhatsAppIcon'
import ImageWithFallback from './ImageWithFallback'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useCallback, useMemo } from 'react'
import { Flame, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'

const INITIAL_VISIBLE = 6

function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 })
  const shouldReduceMotion = useReducedMotion()

  const handleMouseMove = useCallback((e) => {
    if (shouldReduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    setTilt({ rotateX, rotateY, scale: 1.02 })
  }, [shouldReduceMotion])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 })
  }, [])

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      animate={shouldReduceMotion ? {} : tilt}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
}

function TagBadge({ tag }) {
  if (!tag) return null
  const isTrending = tag === 'Trending'
  const isNew = tag === 'New'
  const isBestseller = tag === 'Bestseller'

  return (
    <span
      className={`absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md flex items-center gap-0.5 ${
        isTrending
          ? 'bg-gold text-white'
          : isNew
          ? 'bg-blush text-chocolate'
          : 'bg-chocolate text-white'
      }`}
    >
      {isTrending && <Flame className="w-2.5 h-2.5" />}
      {isNew && <Sparkles className="w-2.5 h-2.5" />}
      {isBestseller && <Flame className="w-2.5 h-2.5" />}
      {tag}
    </span>
  )
}

function MenuCard({ item, onOrderCake }) {
  return (
    <TiltCard className="cake-card group">
      <div className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-500">
        <TagBadge tag={item.tag} />
        <div className="aspect-[4/3] overflow-hidden">
          <ImageWithFallback
            src={item.image}
            alt={item.alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="p-3">
          <div className="flex items-start justify-between gap-1 mb-1">
            <h3 className="font-serif text-base font-bold text-chocolate leading-tight">{item.name}</h3>
            <span className="text-gold font-bold text-sm whitespace-nowrap">{item.price}</span>
          </div>
          <p className="text-chocolate-light/60 text-xs mb-3 leading-relaxed line-clamp-1">{item.description}</p>
          <motion.button
            onClick={() => onOrderCake(item.name, item.price, item.category)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-chocolate text-white py-2 rounded-lg font-medium text-xs hover:bg-cocoa transition-colors duration-300 hover:shadow-md flex items-center justify-center gap-1.5"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            Order on WhatsApp
          </motion.button>
        </div>
      </div>
    </TiltCard>
  )
}

export default function Menu({ onOrderCake }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [showAll, setShowAll] = useState(false)
  const tabsRef = useRef(null)

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return menuItems
    return menuItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  const visibleItems = useMemo(() => {
    if (showAll || filteredItems.length <= INITIAL_VISIBLE) return filteredItems
    return filteredItems.slice(0, INITIAL_VISIBLE)
  }, [filteredItems, showAll])

  const hasMore = filteredItems.length > INITIAL_VISIBLE

  const categoryCounts = useMemo(() => {
    const counts = { All: menuItems.length }
    menuItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1
    })
    return counts
  }, [])

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setShowAll(false)
  }

  return (
    <section id="menu" className="bg-cream">
      {/* Sticky category tabs */}
      <div
        ref={tabsRef}
        className="sticky top-16 md:top-20 z-30 bg-cream/95 backdrop-blur-md border-b border-blush/20 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? 'bg-chocolate text-white shadow-md'
                    : 'bg-white text-chocolate hover:bg-blush/40 shadow-sm'
                }`}
              >
                {cat}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeCategory === cat
                    ? 'bg-white/20 text-white'
                    : 'bg-chocolate/10 text-chocolate/60'
                }`}>
                  {categoryCounts[cat] || 0}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 md:pb-28">
        <ScrollReveal>
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-blush/40 text-chocolate rounded-full text-xs font-semibold tracking-widest uppercase mb-3">
              Our Menu
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-chocolate mb-3">
              Flavors You'll Love
            </h2>
            <p className="text-chocolate-light/70 text-sm md:text-base max-w-xl mx-auto">
              Each flavor is crafted from scratch with premium ingredients and endless love.
            </p>
          </div>
        </ScrollReveal>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {visibleItems.map((item) => (
              <MenuCard key={item.id} item={item} onOrderCake={onOrderCake} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View More / Show Less */}
        {hasMore && (
          <div className="text-center mt-8">
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-chocolate font-semibold text-sm shadow-md hover:shadow-lg border border-blush/30 transition-all duration-300"
            >
              {showAll ? (
                <>
                  Show Less
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  View All {filteredItems.length} Items
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  )
}
