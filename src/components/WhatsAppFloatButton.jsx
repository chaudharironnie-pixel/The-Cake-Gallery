import { motion, useReducedMotion } from 'framer-motion'
import WhatsAppIcon from './WhatsAppIcon'

export default function WhatsAppFloatButton({ drawerOpen }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.a
      href="https://wa.me/917777934474?text=Hi%20Prachi!%20I%27d%20like%20to%20place%20an%20order."
      target="_blank"
      rel="noopener"
      className={`whatsapp-float ${drawerOpen ? 'hidden-drawer' : ''}`}
      aria-label="Chat on WhatsApp"
      whileHover={shouldReduceMotion ? {} : { scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      animate={
        shouldReduceMotion || drawerOpen
          ? {}
          : {
              scale: [1, 1.08, 1],
              boxShadow: [
                '0 4px 20px rgba(37, 211, 102, 0.4)',
                '0 4px 30px rgba(37, 211, 102, 0.6), 0 0 0 12px rgba(37, 211, 102, 0.12)',
                '0 4px 20px rgba(37, 211, 102, 0.4)',
              ],
            }
      }
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <WhatsAppIcon />
    </motion.a>
  )
}
