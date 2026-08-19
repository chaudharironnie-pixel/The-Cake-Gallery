import { motion, useReducedMotion } from 'framer-motion'

const directionMap = {
  up: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } },
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
  amount = 0.2,
}) {
  const shouldReduceMotion = useReducedMotion()
  const variants = directionMap[direction] || directionMap.up

  return (
    <motion.div
      initial={shouldReduceMotion ? false : variants.initial}
      whileInView={shouldReduceMotion ? {} : variants.animate}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
