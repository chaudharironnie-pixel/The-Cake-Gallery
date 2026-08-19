import { motion, useReducedMotion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import { FaInstagram } from 'react-icons/fa'
import { Cake, Award, Leaf } from 'lucide-react'
import bakerImage from '../assets/hero-image.png'

export default function About() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="about" className="py-20 md:py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <ScrollReveal direction="left">
            <motion.div
              className="relative"
              whileHover={shouldReduceMotion ? {} : { rotate: -1, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <div className="absolute -inset-4 bg-blush/30 rounded-3xl rotate-3" />
              <img
                src={bakerImage}
                alt="Prachi Patel — the heart behind The Cake Gallery"
                className="relative rounded-2xl shadow-xl w-full object-cover aspect-[4/5] md:aspect-[3/4]"
                loading="lazy"
              />
              <motion.div
                className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white rounded-2xl shadow-lg px-5 py-3 text-center"
                initial={shouldReduceMotion ? {} : { scale: 0, rotate: -10 }}
                whileInView={shouldReduceMotion ? {} : { scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="font-serif text-2xl font-bold text-chocolate">5+</p>
                <p className="text-xs text-chocolate-light font-medium">Years of Baking</p>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <span className="inline-block px-3 py-1 bg-blush/40 text-chocolate rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
              Our Story
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-chocolate mb-6 leading-tight">
              Baked with Passion,<br />Served with Love
            </h2>
            <p className="text-chocolate-light/80 text-base md:text-lg leading-relaxed mb-4">
              Hi, I'm <strong className="text-chocolate font-semibold">Prachi Patel</strong> — the heart and hands behind The Cake Gallery. What started as a passion experiment in my kitchen in Bharuch has blossomed into a beloved home bakery trusted by hundreds of happy customers.
            </p>
            <p className="text-chocolate-light/80 text-base md:text-lg leading-relaxed mb-6">
              Every cake I bake is a labor of love — from sourcing the finest ingredients to hand-decorating each creation. Whether it's a grand wedding cake or a simple birthday treat, I pour the same care and artistry into every order.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                { icon: <Cake className="w-4 h-4" />, label: '500+ Happy Customers' },
                { icon: <Award className="w-4 h-4" />, label: 'Top Rated in Bharuch' },
                { icon: <Leaf className="w-4 h-4" />, label: 'Fresh Ingredients' },
              ].map((tag, i) => (
                <motion.span
                  key={tag.label}
                  className="px-3 py-1.5 bg-cream rounded-full text-sm text-chocolate font-medium inline-flex items-center gap-1.5"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  {tag.icon}
                  {tag.label}
                </motion.span>
              ))}
            </div>
            <a
              href="https://www.instagram.com/the.cake_gallery_bharuch/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-chocolate font-semibold hover:text-blush-dark transition-colors group"
            >
              Follow our journey on Instagram
              <FaInstagram className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
