import { motion } from 'framer-motion'
import { FaInstagram } from 'react-icons/fa'
import { MapPin, Wine, Music } from 'lucide-react'
import logo from '../assets/logo-labusa-del-pedro.webp'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-dark to-brand-black" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-gold/3 rounded-full blur-[100px]" />
      </div>

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* NEW OPENING Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 text-brand-gold text-sm font-medium tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
            </span>
            New Opening 2026
          </span>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <img
            src={logo}
            alt="La Büsa del Pedro"
            className="w-64 sm:w-80 md:w-96 mx-auto"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-white/50 font-light tracking-[0.2em] uppercase mb-4"
        >
          Cocktails &bull; Events &bull; Good Vibes
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg text-white/40 font-light max-w-2xl mx-auto mb-10"
        >
          Il nuovo cuore della notte brenese. Cocktail d'autore, musica e atmosfera unica
          nel centro storico di Breno, Valle Camonica.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#eventi"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#eventi')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="gold-button text-sm tracking-widest uppercase flex items-center gap-2"
          >
            <Music size={16} />
            Scopri gli eventi
          </a>
          <a
            href="https://www.instagram.com/labusa_del_pedro/"
            target="_blank"
            rel="noopener noreferrer"
            className="outline-button text-sm tracking-widest uppercase flex items-center gap-2"
          >
            <FaInstagram size={16} />
            Seguici su Instagram
          </a>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {[
            { icon: <MapPin size={16} />, text: 'Breno, Valle Camonica' },
            { icon: <Wine size={16} />, text: 'Cocktail Bar' },
            { icon: <Music size={16} />, text: 'DJ Set & Eventi' },
          ].map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 text-white/40 text-sm"
            >
              <span className="text-brand-gold">{badge.icon}</span>
              {badge.text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-brand-gold/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
        </motion.div>
      </motion.div>
    </section>
  )
}
