import { cakes } from '../data/cakes'
import ScrollReveal from './ScrollReveal'
import WhatsAppIcon from './WhatsAppIcon'
import ImageWithFallback from './ImageWithFallback'
import { motion, useReducedMotion } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'

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

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Menu({ onOrderCake }) {
  return (
    <section id="menu" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-blush/40 text-chocolate rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
              Our Menu
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-chocolate mb-4">
              Flavors You'll Love
            </h2>
            <p className="text-chocolate-light/70 text-base md:text-lg max-w-xl mx-auto">
              Each flavor is crafted from scratch with premium ingredients and endless love.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-