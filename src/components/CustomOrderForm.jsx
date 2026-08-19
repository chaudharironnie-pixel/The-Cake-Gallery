import { useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import WhatsAppIcon from './WhatsAppIcon'

const ConfettiParticle = ({ index }) => {
  const colors = ['#F4C2C2', '#D4A76A', '#5C3D2E', '#E8A0A0', '#3E2723']
  const randomX = Math.random() * 200 - 100
  const randomRotation = Math.random() * 720 - 360

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        backgroundColor: colors[index % colors.length],
        left: '50%',
        top: '50%',
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: randomX,
        y: -(Math.random() * 120 + 60),
        opacity: 0,
        scale: 0,
        rotate: randomRotation,
      }}
      transition={{ duration: 1, ease: 'easeOut' }}
    />
  )
}

const AnimatedInput = ({ label, id, ...props }) => {
  const [focused, setFocused] = useState(false)

  const baseClass =
    'w-full px-4 py-3 rounded-xl border bg-cream/50 text-cocoa placeholder-chocolate-light/40 focus:outline-none transition-all duration-300'
  const borderClass = focused
    ? 'border-blush ring-2 ring-blush/50 border-transparent shadow-[0_0_0_3px_rgba(244,194,194,0.2)]'
    : 'border-blush/40 focus:border-transparent'

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-chocolate mb-1.5">
        {label}
      </label>
      <motion.div
        animate={focused ? { scale: 1.01 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <input
          id={id}
          className={`${baseClass} ${borderClass}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </motion.div>
    </div>
  )
}

const AnimatedSelect = ({ label, id, children, ...props }) => {
  const [focused, setFocused] = useState(false)

  const baseClass =
    'w-full px-4 py-3 rounded-xl border bg-cream/50 text-cocoa focus:outline-none transition-all duration-300 appearance-none'
  const borderClass = focused
    ? 'border-blush ring-2 ring-blush/50 border-transparent shadow-[0_0_0_3px_rgba(244,194,194,0.2)]'
    : 'border-blush/40 focus:border-transparent'

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-chocolate mb-1.5">
        {label}
      </label>
      <motion.div
        animate={focused ? { scale: 1.01 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <select
          id={id}
          className={`${baseClass} ${borderClass}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        >
          {children}
        </select>
      </motion.div>
    </div>
  )
}

export default function CustomOrderForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    occasion: '',
    flavor: '',
    size: '',
    date: '',
    message: '',
    notes: '',
  })
  const [showConfetti, setShowConfetti] = useState(false)
  const formRef = useRef(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 1200)

    let text = '*New Custom Cake Order*\n\n'
    text += '*Name:* ' + form.name + '\n'
    text += '*Phone:* ' + form.phone + '\n'
    text += '*Occasion:* ' + form.occasion + '\n'
    text += '*Flavor:* ' + form.flavor + '\n'
    text += '*Size:* ' + form.size + '\n'
    text += '*Delivery Date:* ' + form.date + '\n'
    if (form.message) text += '*Message on Cake:* ' + form.message + '\n'
    if (form.notes) text += '*Special Instructions:* ' + form.notes + '\n'

    const waUrl = 'https://wa.me/917777934474?text=' + encodeURIComponent(text)
    window.open(waUrl, '_blank')
  }

  return (
    <section id="custom-order" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <ScrollReveal direction="left">
            <span className="inline-block px-3 py-1 bg-blush/40 text-chocolate rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
              Custom Orders
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-chocolate mb-6 leading-tight">
              Dream It.<br />We'll Bake It.
            </h2>
            <p className="text-chocolate-light/80 text-base md:text-lg leading-relaxed mb-6">
              Have a special occasion? Tell us your vision and we'll create a custom cake that's as unique as your celebration. From themed birthday cakes to elegant wedding tiers — nothing is too big or too small.
            </p>
            <div className="space-y-4 mb-8">
              {[
                { emoji: '🎂', title: 'Any Flavor', desc: 'Chocolate, vanilla, red velvet, butterscotch, or your custom request.' },
                { emoji: '🎨', title: 'Custom Design', desc: 'Share a reference image or describe your idea — we'll bring it to life.' },
                { emoji: '📦', title: 'Delivery in Bharuch', desc: 'Free delivery within Bharuch city. Carefully packed for safe transit.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-blush/40 rounded-full flex items-center justify-center text-sm">
                    {item.emoji}
                  </span>
                  <div>
                    <h4 className="font-semibold text-chocolate">{item.title}</h4>
                    <p className="text-sm text-chocolate-light/70">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="relative" ref={formRef}>
              {/* Confetti effect */}
              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <ConfettiParticle key={i} index={i} />
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-5">
                <AnimatedInput
                  label="Your Name"
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={form.name}
                  onChange={handleChange}
                />
                <AnimatedInput
                  label="Contact Number"
                  id="phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-2 gap-4">
                  <AnimatedSelect
                    label="Occasion"
                    id="occasion"
                    required
                    value={form.occasion}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option>Birthday</option>
                    <option>Wedding</option>
                    <option>Anniversary</option>
                    <option>Graduation</option>
                    <option>Baby Shower</option>
                    <option>Festival</option>
                    <option>Other</option>
                  </AnimatedSelect>
                  <AnimatedSelect
                    label="Flavor"
                    id="flavor"
                    required
                    value={form.flavor}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option>Chocolate Truffle</option>
                    <option>Red Velvet</option>
                    <option>Vanilla Bean</option>
                    <option>Black Forest</option>
                    <option>Butterscotch</option>
                    <option>Fruit Cake</option>
                    <option>Pineapple</option>
                    <option>Mango</option>
                    <option>Other</option>
                  </AnimatedSelect>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <AnimatedSelect
                    label="Size"
                    id="size"
                    required
                    value={form.size}
                    onChange={handleChange}
                 