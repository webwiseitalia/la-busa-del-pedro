import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { Headphones, Beer, Target, Sparkles } from 'lucide-react'
import imgSerata from '../assets/foto/serata-bar-neon.webp'
import imgBirra from '../assets/foto/servizio-birra-tavolo.webp'

gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    icon: <Headphones size={28} strokeWidth={1.5} />,
    title: 'DJ Set',
    sub: 'Ogni weekend',
    description: 'Musica live e selezioni dei migliori DJ. Ogni weekend una serata diversa, ogni serata un ricordo.',
    iconColor: 'rgba(168,85,247,0.6)',
    accentColor: 'rgba(168,85,247,0.08)',
    borderColor: 'rgba(168,85,247,0.15)',
  },
  {
    icon: <Beer size={28} strokeWidth={1.5} />,
    title: 'Happy Hour',
    sub: 'Mer — Dom',
    description: 'Aperitivo con buffet e drink speciali. Il momento perfetto per iniziare la serata.',
    iconColor: 'rgba(245,158,11,0.6)',
    accentColor: 'rgba(245,158,11,0.08)',
    borderColor: 'rgba(245,158,11,0.15)',
  },
  {
    icon: <Target size={28} strokeWidth={1.5} />,
    title: 'Beer Pong',
    sub: 'con Distrettoundici',
    description: 'Tornei e sfide epiche. Metti alla prova la tua mira con i campioni di Distrettoundici!',
    iconColor: 'rgba(16,185,129,0.6)',
    accentColor: 'rgba(16,185,129,0.08)',
    borderColor: 'rgba(16,185,129,0.15)',
  },
  {
    icon: <Sparkles size={28} strokeWidth={1.5} />,
    title: 'Serate Speciali',
    sub: 'Stay tuned',
    description: 'Eventi a tema, feste, inaugurazioni e sorprese. Seguici per non perderti nulla!',
    iconColor: 'rgba(244,63,94,0.6)',
    accentColor: 'rgba(244,63,94,0.08)',
    borderColor: 'rgba(244,63,94,0.15)',
  },
]

const partners = ['R3SET Club', 'Distrettoundici', 'BEACH Lake Endine', 'K Barber Soul']

export default function Eventi() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef([])
  const ctaRef = useRef(null)
  const heroImgRef = useRef(null)
  const sideImgRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const splitH = new SplitType(headingRef.current, { types: 'chars', tagName: 'span' })
      gsap.fromTo(splitH.chars,
        { y: '100%', opacity: 0 },
        {
          y: '0%', opacity: 1,
          duration: 0.7,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      )

      // Label slide in
      if (labelRef.current) {
        gsap.fromTo(labelRef.current,
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: labelRef.current, start: 'top 90%' } }
        )
      }

      // Photo — horizontal reveal
      if (heroImgRef.current) {
        gsap.fromTo(heroImgRef.current,
          { clipPath: 'inset(0 0 0 100%)' },
          {
            clipPath: 'inset(0 0 0 0%)',
            duration: 1.5, ease: 'power4.inOut',
            scrollTrigger: { trigger: heroImgRef.current, start: 'top 80%' },
          }
        )
      }

      // Side image
      if (sideImgRef.current) {
        gsap.fromTo(sideImgRef.current,
          { y: 80, opacity: 0, rotation: 2 },
          {
            y: 0, opacity: 1, rotation: 0,
            duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: sideImgRef.current, start: 'top 92%' },
          }
        )
      }

      // Cards — staggered with varied entrance directions
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        const variations = [
          { x: -100, y: 0, rotate: -3 },
          { x: 100, y: 20, rotate: 2 },
          { x: -60, y: 60, rotate: 1 },
          { x: 80, y: -20, rotate: -2 },
        ]
        const v = variations[i % 4]
        gsap.fromTo(card,
          { x: v.x, y: v.y, opacity: 0, rotation: v.rotate },
          {
            x: 0, y: 0, opacity: 1, rotation: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%' },
          }
        )
      })

      // CTA
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: ctaRef.current, start: 'top 90%' } }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="eventi" className="relative overflow-hidden">
      <div className="w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.15) 70%, transparent 100%)' }} />

      {/* TOP ZONE: Full-bleed photo with heading overlaid */}
      <div className="relative">
        {/* Photo — full width, big */}
        <div ref={heroImgRef} className="relative w-full overflow-hidden">
          <img
            src={imgSerata}
            alt="Serata alla Büsa del Pedro"
            className="w-full aspect-[16/9] lg:aspect-[2.2/1] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-[#050505]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 via-transparent to-transparent" />
        </div>

        {/* Heading — overlaid on photo, bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 px-5 lg:px-10 pb-10 lg:pb-16">
          <div ref={labelRef} className="flex items-center gap-4 mb-4 lg:ml-[50%]">
            <div className="w-12 h-[1px]" style={{ background: '#c9a84c' }} />
            <span className="font-grotesk text-[10px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,168,76,0.7)' }}>
              03 — Programmazione
            </span>
          </div>
          <h2
            ref={headingRef}
            className="fluid-heading text-white"
          >
            Eventi &<br />
            <em className="not-italic" style={{ color: '#c9a84c' }}>Serate</em>
          </h2>
        </div>
      </div>

      {/* CARDS ZONE — intentionally weird layout: 3 columns, not a grid */}
      <div className="px-5 lg:px-10 pt-16 lg:pt-24">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">
          {/* Left stack — 2 cards stacked, narrow */}
          <div className="lg:w-[35%] flex flex-col gap-5 lg:gap-6">
            {events.slice(0, 2).map((event, i) => (
              <div
                key={event.title}
                ref={(el) => (cardsRef.current[i] = el)}
                className="group relative p-6 lg:p-8 overflow-hidden transition-all duration-700"
                style={{
                  background: 'rgba(255,255,255,0.015)',
                  borderLeft: `2px solid ${event.borderColor}`,
                }}
                data-hover
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `linear-gradient(135deg, ${event.accentColor}, transparent)` }} />
                <div className="relative">
                  <div className="flex items-start justify-between mb-5">
                    <span style={{ color: event.iconColor }}>{event.icon}</span>
                    <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>{event.sub}</span>
                  </div>
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors duration-500">{event.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>{event.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Middle — single tall card + small photo underneath */}
          <div className="lg:w-[30%] flex flex-col gap-5 lg:gap-6 lg:mt-12">
            <div
              ref={(el) => (cardsRef.current[2] = el)}
              className="group relative p-6 lg:p-8 overflow-hidden transition-all duration-700 flex-1"
              style={{
                background: 'rgba(255,255,255,0.015)',
                borderLeft: `2px solid ${events[2].borderColor}`,
              }}
              data-hover
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `linear-gradient(135deg, ${events[2].accentColor}, transparent)` }} />
              <div className="relative">
                <div className="flex items-start justify-between mb-5">
                  <span style={{ color: events[2].iconColor }}>{events[2].icon}</span>
                  <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>{events[2].sub}</span>
                </div>
                <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors duration-500">{events[2].title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>{events[2].description}</p>
              </div>
            </div>

            {/* Small photo — tucked under card */}
            <div ref={sideImgRef} className="relative overflow-hidden">
              <img
                src={imgBirra}
                alt="Servizio birra"
                className="w-full aspect-[16/10] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,168,76,0.5)' }}>Servizio</span>
              </div>
            </div>
          </div>

          {/* Right — last card, offset down more */}
          <div className="lg:w-[35%] lg:mt-28">
            <div
              ref={(el) => (cardsRef.current[3] = el)}
              className="group relative p-6 lg:p-8 overflow-hidden transition-all duration-700"
              style={{
                background: 'rgba(255,255,255,0.015)',
                borderLeft: `2px solid ${events[3].borderColor}`,
              }}
              data-hover
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `linear-gradient(135deg, ${events[3].accentColor}, transparent)` }} />
              <div className="relative">
                <div className="flex items-start justify-between mb-5">
                  <span style={{ color: events[3].iconColor }}>{events[3].icon}</span>
                  <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>{events[3].sub}</span>
                </div>
                <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors duration-500">{events[3].title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>{events[3].description}</p>
              </div>
            </div>

            {/* Description text — floating after the card */}
            <p className="font-body text-sm leading-relaxed mt-8 lg:mt-12 lg:pl-4" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Ogni settimana qualcosa di nuovo.
              Seguici sui social per non perderti nulla.
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA — slashed, not centered */}
      <div ref={ctaRef} className="px-5 lg:px-10 pt-20 lg:pt-28 pb-20 lg:pb-32">
        <div className="lg:ml-[25%] lg:max-w-xl">
          <p className="font-display text-2xl lg:text-4xl italic leading-snug mb-8" style={{ color: 'rgba(255,255,255,0.12)' }}>
            "Segui il nostro Instagram per scoprire tutti gli eventi in programma"
          </p>
          <a
            href="https://www.instagram.com/labusa_del_pedro/"
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="font-grotesk text-sm tracking-[0.2em] uppercase pb-1 transition-colors duration-500 inline-block mb-6"
            style={{ color: '#c9a84c', borderBottom: '1px solid rgba(201,168,76,0.4)' }}
          >
            @labusa_del_pedro
          </a>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {partners.map((p) => (
              <span key={p} className="font-grotesk text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.1)' }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
