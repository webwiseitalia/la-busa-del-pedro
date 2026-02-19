import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { FaInstagram, FaFacebookF } from 'react-icons/fa'
import { ParkingCircle, CreditCard } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const orari = [
  { giorno: 'Lun', orario: 'Chiuso' },
  { giorno: 'Mar', orario: 'Chiuso' },
  { giorno: 'Mer', orario: '17:00 – 00:00' },
  { giorno: 'Gio', orario: '17:00 – 00:00' },
  { giorno: 'Ven', orario: '17:00 – 01:00' },
  { giorno: 'Sab', orario: '17:00 – 01:00' },
  { giorno: 'Dom', orario: '16:00 – 00:00' },
]

export default function Contatti() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const splitH = new SplitType(headingRef.current, { types: 'chars', tagName: 'span' })
      gsap.fromTo(splitH.chars,
        { y: '100%', opacity: 0 },
        {
          y: '0%', opacity: 1,
          duration: 0.7,
          stagger: 0.025,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      )

      gsap.fromTo(leftRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 85%' },
        }
      )

      gsap.fromTo(rightRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: { trigger: rightRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contatti" className="relative overflow-hidden">
      <div className="w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.15) 70%, transparent 100%)' }} />

      <div className="px-5 lg:px-10 pt-24 lg:pt-34 pb-20 lg:pb-30">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[1px]" style={{ background: '#c9a84c' }} />
          <span className="font-grotesk text-[10px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,168,76,0.6)' }}>
            05 — Contatti
          </span>
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="fluid-heading text-white mb-16 lg:mb-24"
        >
          Vieni a<br />
          <em className="not-italic" style={{ color: '#c9a84c' }}>trovarci</em>
        </h2>

        {/* Split layout - uneven columns */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
          {/* Left - 55%, contact info stacked vertically with varying spacing */}
          <div ref={leftRef} className="lg:w-[55%] lg:pr-20">
            {/* Address block */}
            <div className="mb-12">
              <span className="font-grotesk text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: 'rgba(201,168,76,0.5)' }}>
                Indirizzo
              </span>
              <p className="font-display text-xl lg:text-2xl text-white leading-snug">
                Via Agostino Rizzieri 1
              </p>
              <p className="font-body text-sm mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                25043 Breno (BS) — Valle Camonica, Lombardia
              </p>
            </div>

            {/* Orari - not a table, editorial style */}
            <div className="mb-12">
              <span className="font-grotesk text-[10px] tracking-[0.3em] uppercase block mb-6" style={{ color: 'rgba(201,168,76,0.5)' }}>
                Orari
              </span>
              <div className="space-y-3">
                {orari.map((o) => (
                  <div
                    key={o.giorno}
                    className="flex items-center gap-4"
                  >
                    <span className="font-grotesk text-xs tracking-wider w-10" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {o.giorno}
                    </span>
                    <div className="flex-1 h-[1px]" style={{ background: 'rgba(255,255,255,0.04)' }} />
                    <span
                      className="font-grotesk text-xs tracking-wider"
                      style={{ color: o.orario === 'Chiuso' ? 'rgba(255,255,255,0.15)' : '#c9a84c' }}
                    >
                      {o.orario}
                    </span>
                  </div>
                ))}
              </div>
              <p className="font-body text-[11px] mt-4 italic" style={{ color: 'rgba(255,255,255,0.15)' }}>
                * Orari indicativi, possono variare durante eventi speciali
              </p>
            </div>

            {/* Social + contact */}
            <div className="mb-12">
              <span className="font-grotesk text-[10px] tracking-[0.3em] uppercase block mb-5" style={{ color: 'rgba(201,168,76,0.5)' }}>
                Social
              </span>
              <div className="flex items-center gap-5">
                <a
                  href="https://www.instagram.com/labusa_del_pedro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="w-11 h-11 flex items-center justify-center transition-all duration-500"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
                  aria-label="Instagram"
                >
                  <FaInstagram size={16} />
                </a>
                <a
                  href="https://www.facebook.com/LABUSAdelpedro"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="w-11 h-11 flex items-center justify-center transition-all duration-500"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
                  aria-label="Facebook"
                >
                  <FaFacebookF size={14} />
                </a>
                <span className="font-grotesk text-xs tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  @labusa_del_pedro
                </span>
              </div>
            </div>

            {/* Come arrivare */}
            <div>
              <span className="font-grotesk text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: 'rgba(201,168,76,0.5)' }}>
                Come arrivare
              </span>
              <div className="space-y-3">
                <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>In auto</span> — SS42 da Brescia/Lago d'Iseo, parcheggi in centro
                </p>
                <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>In treno</span> — Stazione Breno (Trenord Brescia-Iseo-Edolo), 5 min a piedi
                </p>
              </div>
            </div>
          </div>

          {/* Right - 45%, map with offset */}
          <div ref={rightRef} className="lg:w-[45%] lg:mt-16">
            <div className="relative overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
              <iframe
                title="La Büsa del Pedro - Mappa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1380.5!2d10.3005!3d46.0345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47823edbc3fd7e25%3A0x4c2fd5f0e5c2d0!2sVia+Agostino+Rizzieri%2C+1%2C+25043+Breno+BS!5e0!3m2!1sit!2sit!4v1708200000000!5m2!1sit!2sit"
                width="100%"
                height="450"
                style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.7)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Overlay coordinates */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,168,76,0.6)' }}>
                  Breno, BS
                </span>
                <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  46.034°N — 10.300°E
                </span>
              </div>
            </div>

            {/* Practical info below map */}
            <div className="flex gap-8 mt-6">
              <div className="flex items-center gap-2">
                <ParkingCircle size={13} style={{ color: '#c9a84c' }} />
                <span className="font-grotesk text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>Parcheggi vicini</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard size={13} style={{ color: '#c9a84c' }} />
                <span className="font-grotesk text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>Carte accettate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
