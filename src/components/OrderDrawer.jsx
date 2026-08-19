import { motion, AnimatePresence } from 'framer-motion'
import WhatsAppIcon from './WhatsAppIcon'
import { X, Phone } from 'lucide-react'

export default function OrderDrawer({ isOpen, onClose, cakeName, cakePrice, cakeCategory }) {
  const handleWhatsApp = () => {
    const categoryText = cakeCategory ? ` (${cakeCategory})` : ''
    const msg = encodeURIComponent(
      `Hi, I'd like to order: ${cakeName}${categoryText} (${cakePrice}). Please share the details.`
    )
    window.open('https://wa.me/917777934474?text=' + msg, '_blank')
  }

  const handleCall = () => {
    window.location.href = 'tel:+917777934474'
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-cocoa/50 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-0 right-0 w-full max-w-[420px] bg-white rounded-t-3xl p-6 z-[100] shadow-[0_-10px_40px_rgba(0,0,0,0.15)]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="w-10 h-1 bg-[#E8E0D8] rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-bold text-chocolate">Quick Order</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-cream transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5 text-chocolate" />
              </button>
            </div>

            <div className="bg-cream rounded-xl p-4 mb-5">
              <p className="text-sm text-chocolate-light/70 mb-1">You're ordering</p>
              <p className="font-serif text-lg font-bold text-chocolate">{cakeName}</p>
              {cakeCategory && (
                <p className="text-xs text-blush-dark font-medium mb-0.5">{cakeCategory}</p>
              )}
              <p className="text-gold font-bold">{cakePrice}</p>
            </div>

            <div className="space-y-3">
              <motion.button
                onClick={handleWhatsApp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-green-500 text-white py-3.5 rounded-xl font-semibold hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Order on WhatsApp
              </motion.button>
              <motion.button
                onClick={handleCall}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-chocolate text-white py-3.5 rounded-xl font-semibold hover:bg-cocoa transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Instead
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
