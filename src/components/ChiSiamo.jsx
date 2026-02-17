import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export default function ChiSiamo() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const col1Ref = useRef(null)
  const col2Ref = useRef(null)
  const marqueeRef = useRef(null)
  const counterRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading split & reveal
      const splitHeading = new SplitType(headingRef.current, { types: 'chars', tagName: 'span' })
      gsap.fromTo(splitHeading.chars,
        { y: '100%', opacity: 0 },
        {
          y: '0%', opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      )

      // Left column - slides from left
      gsap.fromTo(col1Ref.current,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: col1Ref.current,
            start: 'top 80%',
          },
        }
      )

      // Right column - slides from right, slightly delayed
      gsap.fromTo(col2Ref.current,
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: col2Ref.current,
            start: 'top 80%',
          },
        }
      )

      // Marquee continuous scroll
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: '-50%',
          duration: 25,
          repeat: -1,
          ease: 'none',
        })
      }

      // Counter animations
      counterRefs.current.filter(Boolean).forEach((el) => {
        const target = parseInt(el.dataset.value)
        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="chi-siamo" className="relative overflow-hidden">
      {/* Marquee divider */}
      <div className="overflow-hidden py-6 border-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div ref={marqueeRef} className="marquee-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="font-grotesk text-xs tracking-[0.5em] uppercase" style={{ color: 'rgba(255,255,255,0.08)' }}>
              Caffè Specialty &bull; Birreria &bull; Vineria &bull; Lounge &bull; Bar &bull; Cocktails &bull; Eventi &bull; DJ Set &bull;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 lg:px-10 pt-24 lg:pt-34 pb-20 lg:pb-30">
        {/* Section label - off to the side */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[1px]" style={{ background: '#c9a84c' }} />
          <span className="font-grotesk text-[10px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,168,76,0.6)' }}>
            01 — Il Locale
          </span>
        </div>

        {/* Heading - large, left-aligned, broken */}
        <h2
          ref={headingRef}
          className="fluid-heading text-white mb-16 lg:mb-24 max-w-[80vw] lg:max-w-[55vw]"
        >
          Benvenuti
          <br />
          alla <em className="not-italic" style={{ color: '#c9a84c' }}>Büsa</em>
        </h2>

        {/* Asymmetric two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
          {/* Left column - 40%, offset top */}
          <div ref={col1Ref} className="lg:w-[40%] lg:pr-16">
            <p className="font-body text-base lg:text-lg leading-[1.8] mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Nel cuore di Breno, dove la piazzetta incontra la notte.
              La Büsa del Pedro è il nuovo punto di riferimento per chi cerca
              cocktail d'autore, buona musica e l'atmosfera giusta.
            </p>
            <p className="font-body text-base lg:text-lg leading-[1.8]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Un locale che nasce dalla passione di{' '}
              <span className="font-medium" style={{ color: '#c9a84c' }}>Pedro</span>{' '}
              per la mixology e l'intrattenimento, in una location
              storica e unica nel suo genere.
            </p>
          </div>

          {/* Right column - 60%, offset down with different rhythm */}
          <div ref={col2Ref} className="lg:w-[60%] lg:pt-20">
            <div className="border-l pl-8 lg:pl-12" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
              <p className="font-display text-xl lg:text-2xl italic leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
                "Una piazzetta caratteristica, tavoli all'aperto d'estate,
                e un interno accogliente dove ogni serata diventa speciale."
              </p>
              <p className="font-body text-sm leading-[1.8]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Che tu stia cercando un aperitivo al tramonto, una serata con amici
                o un evento da ricordare, alla Büsa trovi sempre il mood giusto.
                La tradizione dei grandi cocktail di Breno continua con una visione nuova.
              </p>
            </div>

            {/* Stats - irregular layout, not a grid */}
            <div className="flex flex-wrap gap-x-16 gap-y-8 mt-16 lg:mt-20">
              <div>
                <span
                  ref={(el) => (counterRefs.current[0] = el)}
                  data-value="2026"
                  className="block font-display text-4xl lg:text-5xl font-bold"
                  style={{ color: '#c9a84c' }}
                >
                  0
                </span>
                <span className="font-grotesk text-[10px] tracking-[0.3em] uppercase mt-2 block" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  Anno di apertura
                </span>
              </div>
              <div className="lg:mt-8">
                <span className="block font-display text-4xl lg:text-5xl font-bold" style={{ color: '#c9a84c' }}>
                  &infin;
                </span>
                <span className="font-grotesk text-[10px] tracking-[0.3em] uppercase mt-2 block" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  Cocktail da provare
                </span>
              </div>
              <div className="lg:-mt-4">
                <span className="block font-display text-4xl lg:text-5xl font-bold" style={{ color: '#c9a84c' }}>
                  1
                </span>
                <span className="font-grotesk text-[10px] tracking-[0.3em] uppercase mt-2 block" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  Piazzetta unica
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
