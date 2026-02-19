import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import imgBancone from '../assets/foto/coppia-bancone-elegante.webp'
import imgAtmosfera from '../assets/foto/atmosfera-intima-bancone.webp'
import imgCocktail from '../assets/foto/cocktail-old-fashioned.webp'

gsap.registerPlugin(ScrollTrigger)

export default function ChiSiamo() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const marqueeRef = useRef(null)
  const img1Ref = useRef(null)
  const img2Ref = useRef(null)
  const img3Ref = useRef(null)
  const textBlockRef = useRef(null)
  const quoteRef = useRef(null)
  const flyerRef = useRef(null)
  const counterRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const splitHeading = new SplitType(headingRef.current, { types: 'chars', tagName: 'span' })
      gsap.fromTo(splitHeading.chars,
        { y: '100%', opacity: 0 },
        {
          y: '0%', opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      )

      // Main image - clip reveal from left
      if (img1Ref.current) {
        gsap.fromTo(img1Ref.current,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.6, ease: 'power4.inOut',
            scrollTrigger: { trigger: img1Ref.current, start: 'top 80%' },
          }
        )
      }

      // Flyer — drops in with rotation
      if (flyerRef.current) {
        gsap.fromTo(flyerRef.current,
          { y: -80, opacity: 0, rotation: -12, scale: 0.8 },
          {
            y: 0, opacity: 1, rotation: -3, scale: 1,
            duration: 1.2, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: flyerRef.current, start: 'top 88%' },
          }
        )
      }

      // Overlapping cocktail image - slides up from below
      if (img3Ref.current) {
        gsap.fromTo(img3Ref.current,
          { y: 120, opacity: 0, rotation: 2 },
          {
            y: 0, opacity: 1, rotation: 0,
            duration: 1.4, ease: 'power3.out',
            scrollTrigger: { trigger: img3Ref.current, start: 'top 95%' },
          }
        )
        gsap.to(img3Ref.current, {
          y: -60,
          scrollTrigger: { trigger: img3Ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        })
      }

      // Atmosphere image - scale in
      if (img2Ref.current) {
        gsap.fromTo(img2Ref.current,
          { scale: 1.15, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 1.8, ease: 'power2.out',
            scrollTrigger: { trigger: img2Ref.current, start: 'top 85%' },
          }
        )
        gsap.to(img2Ref.current.querySelector('img'), {
          y: -50,
          scrollTrigger: { trigger: img2Ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      // Text block
      if (textBlockRef.current) {
        gsap.fromTo(textBlockRef.current,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: textBlockRef.current, start: 'top 82%' } }
        )
      }

      // Quote
      if (quoteRef.current) {
        gsap.fromTo(quoteRef.current,
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: quoteRef.current, start: 'top 85%' } }
        )
      }

      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, { x: '-50%', duration: 25, repeat: -1, ease: 'none' })
      }

      counterRefs.current.filter(Boolean).forEach((el) => {
        const target = parseInt(el.dataset.value)
        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: target, duration: 2, ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: { trigger: el, start: 'top 90%' },
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

      {/* Section: NO uniform padding - intentionally different per block */}
      <div className="pt-20 lg:pt-28">

        {/* Heading — pushed far right on desktop, breaking left-align convention */}
        <div className="px-5 lg:px-0 lg:ml-[40%] lg:mr-10 mb-8 lg:mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px]" style={{ background: '#c9a84c' }} />
            <span className="font-grotesk text-[10px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,168,76,0.6)' }}>
              01 — Il Locale
            </span>
          </div>
          <h2
            ref={headingRef}
            className="fluid-heading text-white"
          >
            Benvenuti
            <br />
            alla <em className="not-italic" style={{ color: '#c9a84c' }}>Büsa</em>
          </h2>
        </div>

        {/* HERO IMAGE — full bleed, edge to edge, no padding */}
        <div className="relative w-full">
          <div ref={img1Ref} className="relative w-full overflow-hidden">
            <img
              src={imgBancone}
              alt="Il bancone de La Büsa del Pedro"
              className="w-full aspect-[16/9] lg:aspect-[21/9] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-transparent" />
          </div>

          {/* MINI LOCANDINA — overlaid on the photo, tilted like a real flyer */}
          <div
            ref={flyerRef}
            className="absolute top-1/2 left-1/2 z-20 aspect-[4/5]"
            style={{ transform: 'translate(-50%, -50%) rotate(-3deg)', height: '85%' }}
          >
            <div
              className="relative p-6 sm:p-8 lg:p-10 overflow-hidden w-full h-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(10,10,10,0.92), rgba(20,15,5,0.95))',
                border: '1px solid rgba(201,168,76,0.35)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
              }}
            >
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l" style={{ borderColor: '#c9a84c' }} />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r" style={{ borderColor: '#c9a84c' }} />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l" style={{ borderColor: '#c9a84c' }} />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r" style={{ borderColor: '#c9a84c' }} />

              {/* Content */}
              <div className="text-center">
                <span className="font-grotesk text-[10px] sm:text-xs lg:text-sm tracking-[0.4em] uppercase block mb-4" style={{ color: 'rgba(201,168,76,0.6)' }}>
                  La Büsa del Pedro presenta
                </span>
                <div className="w-14 h-[1px] mx-auto mb-5" style={{ background: 'rgba(201,168,76,0.3)' }} />
                <h4 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3" style={{ color: '#c9a84c' }}>
                  Notte<br />Camuna
                </h4>
                <span className="font-grotesk text-[11px] sm:text-xs lg:text-sm tracking-[0.2em] uppercase block mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  DJ Set &bull; Live Music
                </span>
                <div className="w-full h-[1px] mb-5" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <span className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold block leading-none" style={{ color: '#fff' }}>
                  15
                </span>
                <span className="font-grotesk text-xs sm:text-sm lg:text-base tracking-[0.3em] uppercase block mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Marzo 2026
                </span>
                <div className="w-full h-[1px] my-5" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <span className="font-grotesk text-[10px] sm:text-[11px] lg:text-xs tracking-[0.2em] uppercase block mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  ore 21:00 &bull; ingresso libero
                </span>
                <span className="font-grotesk text-[10px] sm:text-[11px] lg:text-xs tracking-[0.15em] uppercase block" style={{ color: 'rgba(201,168,76,0.4)' }}>
                  Piazzetta Breno (BS)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* OVERLAPPING ZONE — cocktail photo overlaps the main image, pulled up */}
        <div className="relative px-5 lg:px-10">
          <div ref={img3Ref} className="relative z-10 w-[55%] sm:w-[40%] lg:w-[28%] -mt-20 lg:-mt-32 ml-auto lg:mr-[8%]">
            <img
              src={imgCocktail}
              alt="Cocktail alla Büsa"
              className="w-full aspect-[3/4] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent" />
            <div className="absolute bottom-3 left-4">
              <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,168,76,0.5)' }}>
                L'esperienza
              </span>
            </div>
          </div>
        </div>

        {/* TEXT + PHOTO — wildly asymmetric, different widths */}
        <div className="mt-10 lg:mt-0 flex flex-col lg:flex-row">
          {/* Text — narrow column, left, lots of left padding on desktop */}
          <div ref={textBlockRef} className="px-5 lg:pl-[8%] lg:pr-8 lg:w-[38%] py-10 lg:py-20">
            <p className="font-body text-base lg:text-lg leading-[1.9] mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Nel cuore di Breno, dove la piazzetta incontra la notte.
              La Büsa del Pedro è il nuovo punto di riferimento per chi cerca
              cocktail d'autore, buona musica e l'atmosfera giusta.
            </p>
            <p className="font-body text-base lg:text-lg leading-[1.9]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Un locale che nasce dalla passione di{' '}
              <span className="font-medium" style={{ color: '#c9a84c' }}>Pedro</span>{' '}
              per la mixology e l'intrattenimento, in una location
              storica e unica nel suo genere.
            </p>

            {/* Stats — staggered, not aligned */}
            <div className="mt-14 lg:mt-20 space-y-8">
              <div>
                <span ref={(el) => (counterRefs.current[0] = el)} data-value="2026"
                  className="block font-display text-5xl lg:text-6xl font-bold" style={{ color: '#c9a84c' }}>0</span>
                <span className="font-grotesk text-[10px] tracking-[0.3em] uppercase mt-2 block" style={{ color: 'rgba(255,255,255,0.2)' }}>Anno di apertura</span>
              </div>
              <div className="lg:ml-16">
                <span className="block font-display text-5xl lg:text-6xl font-bold" style={{ color: '#c9a84c' }}>&infin;</span>
                <span className="font-grotesk text-[10px] tracking-[0.3em] uppercase mt-2 block" style={{ color: 'rgba(255,255,255,0.2)' }}>Cocktail da provare</span>
              </div>
              <div className="lg:-ml-4">
                <span className="block font-display text-5xl lg:text-6xl font-bold" style={{ color: '#c9a84c' }}>1</span>
                <span className="font-grotesk text-[10px] tracking-[0.3em] uppercase mt-2 block" style={{ color: 'rgba(255,255,255,0.2)' }}>Piazzetta unica</span>
              </div>
            </div>
          </div>

          {/* Right side — atmosphere photo, wider, different vertical position */}
          <div className="lg:w-[62%] lg:pt-32 px-5 lg:px-0 lg:pr-0">
            <div ref={img2Ref} className="relative overflow-hidden lg:-mr-10">
              <img
                src={imgAtmosfera}
                alt="Atmosfera serale"
                className="w-full aspect-[4/3] lg:aspect-[16/10] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#050505]/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 to-transparent" />
            </div>

            {/* Quote — overlapping the photo, pulled up */}
            <div ref={quoteRef} className="relative z-10 -mt-12 lg:-mt-20 mx-5 lg:ml-12 lg:mr-20 p-6 lg:p-10" style={{ background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(12px)', borderLeft: '2px solid rgba(201,168,76,0.2)' }}>
              <p className="font-display text-lg lg:text-2xl italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                "Una piazzetta caratteristica, tavoli all'aperto d'estate,
                e un interno accogliente dove ogni serata diventa speciale."
              </p>
              <p className="font-body text-sm leading-[1.8] mt-6" style={{ color: 'rgba(255,255,255,0.22)' }}>
                Che tu stia cercando un aperitivo al tramonto, una serata con amici
                o un evento da ricordare, alla Büsa trovi sempre il mood giusto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
