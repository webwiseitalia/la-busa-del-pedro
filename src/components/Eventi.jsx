import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    icon: '🎧',
    title: 'DJ Set',
    sub: 'Ogni weekend',
    description: 'Musica live e selezioni dei migliori DJ. Ogni weekend una serata diversa, ogni serata un ricordo.',
    position: 'lg:col-start-1 lg:row-start-1',
    size: 'lg:col-span-7',
    gradient: 'from-purple-500/[0.08] to-transparent',
    borderColor: 'rgba(168,85,247,0.12)',
  },
  {
    icon: '🍻',
    title: 'Happy Hour',
    sub: 'Mer — Dom',
    description: 'Aperitivo con buffet e drink speciali. Il momento perfetto per iniziare la serata.',
    position: 'lg:col-start-8 lg:row-start-1',
    size: 'lg:col-span-5',
    gradient: 'from-amber-500/[0.08] to-transparent',
    borderColor: 'rgba(245,158,11,0.12)',
  },
  {
    icon: '🏓',
    title: 'Beer Pong',
    sub: 'con Distrettoundici',
    description: 'Tornei e sfide epiche. Metti alla prova la tua mira con i campioni di Distrettoundici!',
    position: 'lg:col-start-1 lg:row-start-2',
    size: 'lg:col-span-5',
    gradient: 'from-emerald-500/[0.08] to-transparent',
    borderColor: 'rgba(16,185,129,0.12)',
  },
  {
    icon: '🎉',
    title: 'Serate Speciali',
    sub: 'Stay tuned',
    description: 'Eventi a tema, feste, inaugurazioni e sorprese. Seguici per non perderti nulla!',
    position: 'lg:col-start-6 lg:row-start-2',
    size: 'lg:col-span-7',
    gradient: 'from-rose-500/[0.08] to-transparent',
    borderColor: 'rgba(244,63,94,0.12)',
  },
]

const partners = ['R3SET Club', 'Distrettoundici', 'BEACH Lake Endine', 'K Barber Soul']

export default function Eventi() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef([])
  const ctaRef = useRef(null)

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

      // Cards - each with different entrance
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        const directions = [
          { x: -60, y: 30, rotate: -2 },
          { x: 60, y: 20, rotate: 1 },
          { x: -40, y: 50, rotate: 1.5 },
          { x: 50, y: 40, rotate: -1 },
        ]
        const dir = directions[i % 4]
        gsap.fromTo(card,
          { x: dir.x, y: dir.y, opacity: 0, rotation: dir.rotate },
          {
            x: 0, y: 0, opacity: 1, rotation: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        )
      })

      // CTA
      gsap.fromTo(ctaRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 90%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="eventi" className="relative overflow-hidden">
      <div className="w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.15) 70%, transparent 100%)' }} />

      <div className="px-5 lg:px-10 pt-24 lg:pt-34 pb-20 lg:pb-30">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[1px]" style={{ background: '#c9a84c' }} />
          <span className="font-grotesk text-[10px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,168,76,0.6)' }}>
            03 — Programmazione
          </span>
        </div>

        {/* Heading - right-aligned this time, breaking the pattern */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-24">
          <p className="font-body text-sm leading-relaxed max-w-xs order-2 lg:order-1 lg:pb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Ogni settimana qualcosa di nuovo.
            Seguici sui social per non perderti nulla.
          </p>
          <h2
            ref={headingRef}
            className="fluid-heading text-white order-1 lg:order-2 lg:text-right"
          >
            Eventi &<br />
            <em className="not-italic" style={{ color: '#c9a84c' }}>Serate</em>
          </h2>
        </div>

        {/* Event cards - broken grid with overlaps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          {events.map((event, i) => (
            <div
              key={event.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`${event.position} ${event.size} group relative p-6 lg:p-8 overflow-hidden transition-all duration-700`}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${event.borderColor}`,
              }}
              data-hover
            >
              {/* Hover gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-3xl lg:text-4xl">{event.icon}</span>
                  <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    {event.sub}
                  </span>
                </div>
                <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors duration-500">
                  {event.title}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA - asymmetric */}
        <div ref={ctaRef} className="mt-20 lg:mt-26 flex flex-col lg:flex-row lg:items-end gap-8">
          <div className="lg:w-[55%]">
            <p className="font-display text-2xl lg:text-3xl italic leading-snug" style={{ color: 'rgba(255,255,255,0.15)' }}>
              "Segui il nostro Instagram per scoprire tutti gli eventi in programma"
            </p>
          </div>
          <div className="lg:w-[45%] flex flex-col items-start lg:items-end gap-4">
            <a
              href="https://www.instagram.com/labusa_del_pedro/"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="font-grotesk text-sm tracking-[0.2em] uppercase pb-1 transition-colors duration-500"
              style={{ color: '#c9a84c', borderBottom: '1px solid rgba(201,168,76,0.4)' }}
            >
              @labusa_del_pedro
            </a>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {partners.map((p) => (
                <span key={p} className="font-grotesk text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.12)' }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
