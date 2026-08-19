import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { testimonials } from '../data/testimonials'
import ScrollReveal from './ScrollReveal'
import { Star } from 'lucide-react'

const StarPop = ({ delay = 0, filled = true }) => {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.span
      initial={shouldReduceMotion ? {} : { scale: 0, rotate: -180 }}
      whileInView={shouldReduceMotion ? {} : { scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15, delay }}
      viewport={{ once: true }}
    >
      <Star
        className="w-5 h-5"
        fill={filled ? '#D4A76A' : 'none'}
        stroke="#D4A76A"
        strokeWidth={1.5}
      />
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
              What Our Customers Say
            </h2>
          </div>
        </ScrollReveal>

        {/* Mobile: single card carousel */}
        <div className="md:hidden relative min-h-[280px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={active}
              custom={direction}
              variants={shouldReduceMotion ? {} : variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-center gap-0.5 mb-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarPop key={i} delay={i * 0.08} />
                ))}
              </div>
              <p className="text-chocolate-light/80 text-sm leading-relaxed mb-5">
                "{testimonials[active].text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blush/40 flex items-center justify-center font-serif font-bold text-chocolate text-sm">
                  {testimonials[active].initials}
                </div>
                <div>
                  <p className="font-semibold text-chocolate text-sm">{testimonials[active].name}</p>
                  <p className="text-xs text-chocolate-light/50">{testimonials[active].location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop: grid with staggered fade-in */}
        <div className="hidden md:grid grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.15}>
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-md h-full"
                whileHover={{ y: -4, boxShadow: '0 10px 40px rgba(92,61,46,0.1)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-0.5 mb-3">
                  {[0, 1, 2, 3, 4].map((j) => (
                    <StarPop key={j} delay={j * 0.08 + i * 0.15} />
                  ))}
                </div>
                <p className="text-chocolate-light/80 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blush/40 flex items-center justify-center font-serif font-bold text-chocolate text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-chocolate text-sm">{t.name}</p>
                    <p className="text-xs text-chocolate-light/50">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Dots (mobile) */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === active ? 'bg-chocolate w-6' : 'bg-chocolate/20'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
