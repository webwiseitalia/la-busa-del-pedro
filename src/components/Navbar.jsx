import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'
import logo from '../assets/logo-labusa-del-pedro.webp'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Il Locale', href: '#chi-siamo' },
  { label: 'Drink', href: '#drink-menu' },
  { label: 'Eventi', href: '#eventi' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contatti', href: '#contatti' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-brand-black/95 backdrop-blur-md shadow-lg shadow-black/20 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex-shrink-0">
            <img
              src={logo}
              alt="La Büsa del Pedro"
              className="h-12 sm:h-14 w-auto transition-all duration-300"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-white/70 hover:text-brand-gold transition-colors duration-300 tracking-wider uppercase"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.instagram.com/labusa_del_pedro/"
              target="_blank"
              rel="noopener noreferrer"
              className="gold-button text-sm tracking-wider uppercase"
            >
              Seguici
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Menu"
          >
            {isOpen ? <HiX size={28} /> : <HiOutlineMenuAlt3 size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-black/98 backdrop-blur-lg border-t border-brand-gold/10"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block py-3 text-lg text-white/70 hover:text-brand-gold transition-colors border-b border-white/5 tracking-wider"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-4">
                <a
                  href="https://www.instagram.com/labusa_del_pedro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-button block text-center text-sm tracking-wider uppercase"
                >
                  Seguici su Instagram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
