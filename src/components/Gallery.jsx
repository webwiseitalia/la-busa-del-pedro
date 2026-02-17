import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Camera, Instagram } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  )
}

const galleryItems = [
  {
    gradient: 'from-brand-gold/20 via-amber-900/20 to-brand-dark',
    icon: '🍸',
    label: 'Cocktail d\'autore',
    aspect: 'row-span-2',
  },
  {
    gradient: 'from-purple-900/30 via-purple-800/10 to-brand-dark',
    icon: '🎧',
    label: 'DJ Set',
    aspect: '',
  },
  {
    gradient: 'from-emerald-900/20 via-emerald-800/10 to-brand-dark',
    icon: '🌿',
    label: 'Piazzetta esterna',
    aspect: '',
  },
  {
    gradient: 'from-rose-900/20 via-rose-800/10 to-brand-dark',
    icon: '✨',
    label: 'Atmosfera serale',
    aspect: 'col-span-2',
  },
  {
    gradient: 'from-blue-900/20 via-blue-800/10 to-brand-dark',
    icon: '🏓',
    label: 'Beer Pong',
    aspect: '',
  },
  {
    gradient: 'from-amber-900/20 via-amber-800/10 to-brand-dark',
    icon: '🥂',
    label: 'Aperitivo time',
    aspect: '',
  },
]

export default function Gallery() {
  return (
    <section id="gallery" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-brand-gold text-sm font-medium tracking-[0.3em] uppercase">
              Foto
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mt-4 mb-6">
              L'atmosfera della <span className="gold-text">Büsa</span>
            </h2>
            <div className="gold-divider mb-8" />
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Un assaggio dell'esperienza che ti aspetta. Presto caricheremo le foto dei nostri
              migliori momenti!
            </p>
          </div>
        </AnimatedSection>

        {/* Gallery grid - placeholder cards */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`${item.aspect} relative group rounded-2xl overflow-hidden border border-white/5 hover:border-brand-gold/20 transition-all duration-500`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                <div className="relative flex flex-col items-center justify-center h-full min-h-[180px] sm:min-h-[220px] p-6">
                  <span className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </span>
                  <span className="text-white/40 text-sm font-medium tracking-wider text-center">
                    {item.label}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-black/60 backdrop-blur-sm">
                    <Camera className="w-8 h-8 text-brand-gold" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Instagram CTA */}
        <AnimatedSection delay={0.2}>
          <div className="text-center">
            <p className="text-white/40 mb-4 text-sm">
              Seguici su Instagram per vedere tutte le nostre foto e i video delle serate
            </p>
            <a
              href="https://www.instagram.com/labusa_del_pedro/"
              target="_blank"
              rel="noopener noreferrer"
              className="outline-button inline-flex items-center gap-2 text-sm tracking-wider uppercase"
            >
              <FaInstagram size={18} />
              @labusa_del_pedro
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
