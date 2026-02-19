import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import imgBarman from '../assets/foto/barman-shaker-cocktail.webp'
import imgBarmanVersa from '../assets/foto/barman-versa-cocktail.webp'

gsap.registerPlugin(ScrollTrigger)

const drinks = [
  {
    name: 'Bré',
    description: 'Un omaggio a Breno. Creazione originale con ingredienti locali e un tocco inaspettato.',
    tag: 'Signature',
    num: '01',
  },
  {
    name: 'Generale',
    description: 'Ispirato al Generale Pietro Ronchi, eroe di Breno. Intenso e deciso.',
    tag: 'Signature',
    num: '02',
  },
  {
    name: 'Sant\'Antonio',
    description: 'Dedicato al patrono di Breno. Fresco, aromatico e sorprendente.',
    tag: 'Signature',
    num: '03',
  },
  {
    name: 'Pedro\'s Special',
    description: 'La creazione del capo. Un blend segreto che racchiude l\'essenza della Büsa.',
    tag: 'Must Try',
    num: '04',
  },
  {
    name: 'Negroni',
    description: 'Gin, Campari, Vermouth rosso. L\'intramontabile.',
    tag: 'Classico',
    num: '05',
  },
  {
    name: 'Old Fashioned',
    description: 'Bourbon, zucchero, Angostura. Eleganza senza tempo.',
    tag: 'Classico',
    num: '06',
  },
  {
    name: 'Mojito',
    description: 'Rum bianco, lime, menta, zucchero di canna. Freschezza pura.',
    tag: 'Classico',
    num: '07',
  },
  {
    name: 'Moscow Mule',
    description: 'Vodka, ginger beer, lime. Rinfrescante e speziato.',
    tag: 'Classico',
    num: '08',
  },
]

const categories = ['Tutto', 'Signature', 'Classico', 'Must Try']

export default function DrinkMenu() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const itemsRef = useRef([])
  const img1Ref = useRef(null)
  const img2Ref = useRef(null)
  const floatingNumRef = useRef(null)
  const [filter, setFilter] = useState('Tutto')

  const filteredDrinks = filter === 'Tutto' ? drinks : drinks.filter(d => d.tag === filter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const splitH = new SplitType(headingRef.current, { types: 'chars', tagName: 'span' })
      gsap.fromTo(splitH.chars,
        { y: '100%', opacity: 0, rotation: 8 },
        {
          y: '0%', opacity: 1, rotation: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      )

      // Floating section number
      if (floatingNumRef.current) {
        gsap.to(floatingNumRef.current, {
          y: -120,
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 },
        })
      }

      // Photo 1 - diagonal slide
      if (img1Ref.current) {
        gsap.fromTo(img1Ref.current,
          { x: -80, y: 60, opacity: 0, rotation: -3 },
          {
            x: 0, y: 0, opacity: 1, rotation: 0,
            duration: 1.4, ease: 'power3.out',
            scrollTrigger: { trigger: img1Ref.current, start: 'top 90%' },
          }
        )
      }

      // Photo 2 - sticky with parallax on inner image
      if (img2Ref.current) {
        gsap.fromTo(img2Ref.current,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.2, ease: 'power3.inOut',
            scrollTrigger: { trigger: img2Ref.current, start: 'top 85%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const validItems = itemsRef.current.filter(Boolean)
    if (validItems.length === 0) return
    gsap.fromTo(validItems,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out',
      }
    )
  }, [filter])

  return (
    <section ref={sectionRef} id="drink-menu" className="relative overflow-hidden">
      {/* Thin divider */}
      <div className="w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.15) 70%, transparent 100%)' }} />

      {/* Floating giant section number — decorative, behind content */}
      <div ref={floatingNumRef} className="absolute top-20 right-[-5%] lg:right-[3%] pointer-events-none select-none">
        <span className="font-display text-[20rem] lg:text-[30rem] font-bold leading-none" style={{ color: 'rgba(201,168,76,0.03)' }}>
          02
        </span>
      </div>

      {/* Top zone: photo left (bleeding off edge) + heading right */}
      <div className="flex flex-col lg:flex-row">
        {/* Photo — bleeds off left edge */}
        <div ref={img1Ref} className="lg:w-[45%] relative">
          <div className="lg:-ml-10 overflow-hidden">
            <img
              src={imgBarman}
              alt="Barman al lavoro con lo shaker"
              className="w-full aspect-[3/4] lg:aspect-[4/5] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
          </div>
        </div>

        {/* Heading zone — right side, vertically centered against photo */}
        <div className="lg:w-[55%] flex flex-col justify-center px-5 lg:pl-16 lg:pr-10 py-12 lg:py-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px]" style={{ background: '#c9a84c' }} />
            <span className="font-grotesk text-[10px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,168,76,0.6)' }}>
              I Nostri Drink
            </span>
          </div>

          <h2
            ref={headingRef}
            className="fluid-heading text-white mb-8"
          >
            Drink<br />
            <em className="not-italic" style={{ color: '#c9a84c' }}>List</em>
          </h2>

          <p className="font-body text-sm leading-relaxed max-w-md mb-10" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Cocktail classici rivisitati e creazioni originali.
            Ogni drink racconta una storia, ogni sorso è un'esperienza.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-hover
                className="font-grotesk text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-500"
                style={{
                  color: filter === cat ? '#0a0a0a' : 'rgba(255,255,255,0.35)',
                  background: filter === cat ? '#c9a84c' : 'transparent',
                  border: `1px solid ${filter === cat ? '#c9a84c' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Drink list zone — off-center, with sticky photo */}
      <div className="flex flex-col lg:flex-row pb-20 lg:pb-32">
        {/* Drink list — pushed right on desktop */}
        <div className="px-5 lg:pl-[12%] lg:pr-8 lg:w-[58%] order-2 lg:order-1">
          {filteredDrinks.map((drink, i) => (
            <div
              key={drink.name + filter}
              ref={(el) => (itemsRef.current[i] = el)}
              className="group py-7 lg:py-9 flex flex-col lg:flex-row lg:items-baseline gap-2 lg:gap-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
              data-hover
            >
              <span className="font-grotesk text-[10px] tracking-widest lg:w-14 flex-shrink-0" style={{ color: 'rgba(201,168,76,0.25)' }}>
                {drink.num}
              </span>
              <span className="font-display text-2xl lg:text-3xl font-semibold text-white group-hover:text-brand-gold transition-colors duration-500 lg:w-[35%] flex-shrink-0">
                {drink.name}
              </span>
              <span className="font-body text-sm leading-relaxed flex-1 lg:px-6" style={{ color: 'rgba(255,255,255,0.28)' }}>
                {drink.description}
              </span>
              <span
                className="font-grotesk text-[9px] tracking-[0.3em] uppercase self-start lg:self-auto px-3 py-1 flex-shrink-0"
                style={{
                  color: 'rgba(201,168,76,0.5)',
                  border: '1px solid rgba(201,168,76,0.12)',
                }}
              >
                {drink.tag}
              </span>
            </div>
          ))}

          {/* Bottom note — not centered, irregular placement */}
          <div className="mt-14 lg:mt-20">
            <p className="font-display text-lg italic" style={{ color: 'rgba(255,255,255,0.15)' }}>
              Menu completo disponibile al locale
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-8 h-[1px]" style={{ background: 'rgba(201,168,76,0.25)' }} />
              <span className="font-grotesk text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.15)' }}>
                Birre &bull; Vini &bull; Bollicine &bull; Caffetteria &bull; Analcolici
              </span>
            </div>
          </div>
        </div>

        {/* Sticky photo — right side, overlapping into next section territory */}
        <div className="hidden lg:block lg:w-[42%] order-1 lg:order-2">
          <div ref={img2Ref} className="sticky top-24 mr-0 overflow-hidden -mt-20">
            <img
              src={imgBarmanVersa}
              alt="Barman che versa un cocktail"
              className="w-full aspect-[3/4] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#050505]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,168,76,0.5)' }}>
                Creazione
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
