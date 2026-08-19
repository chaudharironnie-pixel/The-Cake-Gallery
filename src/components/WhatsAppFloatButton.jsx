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
      aria-