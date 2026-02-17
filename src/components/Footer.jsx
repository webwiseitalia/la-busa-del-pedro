import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logo from '../assets/logo-labusa-del-pedro.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)
  const marqueeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer marquee
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: '-50%',
          duration: 30,
          repeat: -1,
          ease: 'none',
        })
      }
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      {/* Large marquee text */}
      <div className="overflow-hidden py-10 lg:py-16 border-y" style={{ borderColor: 'rgba(255,255,255,0.03)' }}>
        <div ref={marqueeRef} className="marquee-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-5xl lg:text-8xl font-bold italic whitespace-nowrap"
              style={{ color: 'rgba(255,255,255,0.03)', paddingRight: '6rem' }}
            >
              La Büsa del Pedro &bull;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 lg:px-10 py-12 lg:py-16">
        {/* Three columns - irregular widths */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 mb-16">
          {/* Logo + tagline */}
          <div className="lg:w-[35%]">
            <img src={logo} alt="La Büsa del Pedro" className="h-14 w-auto mb-4" />
            <p className="font-body text-xs leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Il nuovo cuore della notte brenese.
              Cocktail, eventi e buona musica nel centro storico di Breno.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:w-[30%] lg:pl-12">
            <span className="font-grotesk text-[10px] tracking-[0.3em] uppercase block mb-5" style={{ color: 'rgba(201,168,76,0.4)' }}>
              Naviga
            </span>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Il Locale', href: '#chi-siamo' },
                { label: 'Drink List', href: '#drink-menu' },
                { label: 'Eventi', href: '#eventi' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Contatti', href: '#contatti' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  data-hover
                  className="font-grotesk text-xs tracking-wider transition-colors duration-500"
                  style={{ color: 'rgba(255,255,255,0.2)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Info + back to top */}
          <div className="lg:w-[35%] flex flex-col justify-between">
            <div>
              <span className="font-grotesk text-[10px] tracking-[0.3em] uppercase block mb-5" style={{ color: 'rgba(201,168,76,0.4)' }}>
                Info
              </span>
              <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
                Via Agostino Rizzieri 1
              </p>
              <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
                25043 Breno (BS)
              </p>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://www.instagram.com/labusa_del_pedro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="font-grotesk text-[10px] tracking-[0.2em] uppercase transition-colors duration-500"
                  style={{ color: 'rgba(255,255,255,0.2)' }}
                >
                  Instagram
                </a>
                <span style={{ color: 'rgba(255,255,255,0.06)' }}>|</span>
                <a
                  href="https://www.facebook.com/LABUSAdelpedro"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="font-grotesk text-[10px] tracking-[0.2em] uppercase transition-colors duration-500"
                  style={{ color: 'rgba(255,255,255,0.2)' }}
                >
                  Facebook
                </a>
              </div>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              data-hover
              className="self-start lg:self-end mt-8 lg:mt-0 font-grotesk text-[10px] tracking-[0.3em] uppercase flex items-center gap-3 transition-colors duration-500"
              style={{ color: 'rgba(255,255,255,0.15)' }}
            >
              <span>↑</span>
              Torna su
            </button>
          </div>
        </div>

        {/* Bottom bar - spread wide */}
        <div className="border-t pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          <p className="font-body text-[10px]" style={{ color: 'rgba(255,255,255,0.12)' }}>
            &copy; 2026 La Busa del Pedro di Pedretti Daniel — Breno (BS)
          </p>
          <p className="font-body text-[10px]" style={{ color: 'rgba(255,255,255,0.1)' }}>
            Bevi responsabilmente. Vietata la vendita di alcolici ai minori di 18 anni.
          </p>
        </div>
      </div>
    </footer>
  )
}
