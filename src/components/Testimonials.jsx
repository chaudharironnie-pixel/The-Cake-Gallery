import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { testimonials } from '../data/testimonials'
import ScrollReveal from './ScrollReveal'

const StarPop = ({ delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.span
      className="text-gold text-lg"
      initial={shouldReduceMotion ? {} : { scale: 0, rotate: -180 }}
      whileInView={shouldReduceMotion ? {} : { scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15, delay }}
      viewport={{ once: true }}
    >
      ★
    </motion.span>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const goTo = useCallback((idx) => {
    setDirection(idx > active ? 1 : -1)
    setActive(idx)
  }, [active])

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  }

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-warm-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-blush/40 text-chocolate rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
              Testimonials
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-chocolate mb-4">
             