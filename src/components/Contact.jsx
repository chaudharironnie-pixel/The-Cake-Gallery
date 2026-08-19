import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { MapPin, Clock } from 'lucide-react'

const contactItems = [
  {
    type: 'link',
    href: 'https://wa.me/917777934474?text=Hi%20Prachi!%20I\'d%20like%20to%20know%20more%20about%20your%20cakes.',
    icon: <FaWhatsapp className="w-6 h-6 text-green-500" />,
    iconBg: 'bg-green-500/20 group-hover:bg-green-500/30',
    title: 'WhatsApp',
    subtitle: '+91 77779 34474',
  },
  {
    type: 'link',
    href: 'https://www.instagram.com/the.cake_gallery_bharuch/',
    icon: <FaInstagram className="w-6 h-6 text-pink-400" />,
    iconBg: 'bg-pink-500/20 group-hover:bg-pink-500/30',
    title: '@the.cake_gallery_bharuch',
    subtitle: 'Follow us for latest creations',
  },
  {
    type: 'static',
    icon: <MapPin className="w-6 h-6 text-blush" />,
    iconBg: 'bg-blush/20',
    title: 'Location',
    subtitle: 'Bharuch, Gujarat, India',
  },
  {
    type: 'static',
    icon: <Clock className="w-6 h-6 text-gold" />,
    iconBg: 'bg-gold/20',
    title: 'Business Hours',
    subtitle: 'Mon - Sat: 9:00 AM - 8:00 PM',
    extra: 'Sunday: By appointment',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-cocoa text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <ScrollReveal direction="left">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
              Ready to order or have a question? We'd love to hear from you. Reach out via WhatsApp for the fastest response!
            </p>
            <div className="space-y-5">
              {contactItems.map((item, i) => {
                const content = (
                  <>
                    <div className={`flex-shrink-0 w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center transition-colors`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-white/60 text-sm">{item.subtitle}</p>
                      {item.extra && <p className="text-white/60 text-sm">{item.extra}</p>}
                    </div>
                  </>
                )

                const Wrapper = item.type === 'link' ? motion.a : motion.div
                const wrapperProps = item.type === 'link'
                  ? { href: item.href, target: '_blank', rel: 'noopener', className: 'flex items-center gap-4 group' }
                  : { className: 'flex items-center gap-4' }

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Wrapper {...wrapperProps}>{content}</Wrapper>
                  </motion.div>
                )
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="rounded-2xl overflow-hidden shadow-lg h-80 md:h-full min-h-[320px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119065.38504982854!2d72.93641499999999!3d21.7143464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397ff0426b9c8e3d%3A0xfc14e2a84c345e97!2sBharuch%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 320 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Cake Gallery location in Bharuch, Gujarat"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
