import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import logo from '../assets/logo-labusa-del-pedro.webp'

const navLinks = [
  { label: 'Locale', href: '#chi-siamo', num: '01' },
  { label: 'Drink', href: '#drink-menu', num: '02' },
  { label: 'Eventi', href: '#eventi', num: '03' },
  { label: 'Gallery', href: '#gallery', num: '04' },
  { label: 'Contatti', href: '#contatti', num: '05' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuItemsRef = useRef([])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(
        menuItemsRef.current.filter(Boolean),
        { y: 80, opacity: 0, rotateX: -15 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.2,
        }
      )
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'py-3' : 'py-5 lg:py-8'
        }`}
        style={{
          background: scrolled ? 'rgba(5,5,5,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="flex items-center justify-between px-5 lg:px-10">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            data-hover
          >
            <img
              src={logo}
              alt="La Büsa del Pedro"
              className={`transition-all duration-500 ${scrolled ? 'h-9' : 'h-11 lg:h-14'}`}
            />
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                data-hover
                className="group relative font-grotesk text-xs tracking-[0.25em] uppercase text-white/40 hover:text-white transition-colors duration-500"
              >
                <span className="text-[10px] text-brand-gold/60 mr-1.5 font-light">{link.num}</span>
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-8 h-8 flex flex-col items-end justify-center gap-1.5"
            data-hover
            aria-label="Menu"
          >
            <span className={`block h-[1px] bg-white transition-all duration-500 origin-right ${isOpen ? 'w-8 rotate-[-45deg] translate-y-[1px]' : 'w-8'}`} />
            <span className={`block h-[1px] bg-brand-gold transition-all duration-500 ${isOpen ? 'w-0 opacity-0' : 'w-5'}`} />
            <span className={`block h-[1px] bg-white transition-all duration-500 origin-right ${isOpen ? 'w-8 rotate-[45deg] -translate-y-[1px]' : 'w-7'}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex items-center"
            style={{ background: '#0a0a0a' }}
          >
            <div className="w-full px-8 lg:px-20">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <a
                    key={link.href}
                    ref={(el) => (menuItemsRef.current[i] = el)}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    data-hover
                    className="group flex items-baseline gap-4 lg:gap-8 py-3 border-b border-white/5 opacity-0"
                  >
                    <span className="font-grotesk text-xs text-brand-gold/50 tracking-widest">
                      {link.num}
                    </span>
                    <span className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white/80 group-hover:text-brand-gold transition-colors duration-500 italic">
                      {link.label}
                    </span>
                    <span className="hidden sm:block font-grotesk text-xs text-white/20 tracking-widest uppercase ml-auto">
                      scroll
                    </span>
                  </a>
                ))}
              </div>
              <div className="mt-12 flex gap-6">
                <a href="https://www.instagram.com/labusa_del_pedro/" target="_blank" rel="noopener noreferrer" data-hover className="font-grotesk text-xs tracking-[0.3em] uppercase text-white/30 hover:text-brand-gold transition-colors">
                  Instagram
                </a>
                <a href="https://www.facebook.com/LABUSAdelpedro" target="_blank" rel="noopener noreferrer" data-hover className="font-grotesk text-xs tracking-[0.3em] uppercase text-white/30 hover:text-brand-gold transition-colors">
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
