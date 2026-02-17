import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

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
  const [filter, setFilter] = useState('Tutto')

  const filteredDrinks = filter === 'Tutto' ? drinks : drinks.filter(d => d.tag === filter)

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
      {/* Angled divider line */}
      <div className="w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.15) 70%, transparent 100%)' }} />

      <div className="px-5 lg:px-10 pt-24 lg:pt-34 pb-20 lg:pb-30">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[1px]" style={{ background: '#c9a84c' }} />
          <span className="font-grotesk text-[10px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,168,76,0.6)' }}>
            02 — I Nostri Drink
          </span>
        </div>

        {/* Layout: heading left, description right - asymmetric */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-24">
          <h2
            ref={headingRef}
            className="fluid-heading text-white max-w-lg"
          >
            Drink
            <br />
            <em className="not-italic" style={{ color: '#c9a84c' }}>List</em>
          </h2>
          <p className="font-body text-sm leading-relaxed max-w-sm lg:text-right lg:pb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Cocktail classici rivisitati e creazioni originali.
            Ogni drink racconta una storia, ogni sorso è un'esperienza.
          </p>
        </div>

        {/* Filter tabs - left aligned, not centered */}
        <div className="flex flex-wrap gap-3 mb-12">
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

        {/* Drink list - editorial style, NOT cards */}
        <div className="max-w-5xl">
          {filteredDrinks.map((drink, i) => (
            <div
              key={drink.name + filter}
              ref={(el) => (itemsRef.current[i] = el)}
              className="group border-b py-6 lg:py-8 flex flex-col lg:flex-row lg:items-baseline gap-2 lg:gap-0"
              style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              data-hover
            >
              {/* Number */}
              <span className="font-grotesk text-[10px] tracking-widest lg:w-16 flex-shrink-0" style={{ color: 'rgba(201,168,76,0.3)' }}>
                {drink.num}
              </span>

              {/* Name - large */}
              <span className="font-display text-2xl lg:text-3xl font-semibold text-white group-hover:text-brand-gold transition-colors duration-500 lg:w-[35%] flex-shrink-0">
                {drink.name}
              </span>

              {/* Description */}
              <span className="font-body text-sm leading-relaxed flex-1 lg:px-8" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {drink.description}
              </span>

              {/* Tag */}
              <span
                className="font-grotesk text-[9px] tracking-[0.3em] uppercase self-start lg:self-auto px-3 py-1 flex-shrink-0"
                style={{
                  color: 'rgba(201,168,76,0.6)',
                  border: '1px solid rgba(201,168,76,0.15)',
                }}
              >
                {drink.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom note - off-center */}
        <div className="mt-16 lg:mt-20 lg:ml-[30%]">
          <p className="font-display text-lg italic" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Menu completo disponibile al locale
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-8 h-[1px]" style={{ background: 'rgba(201,168,76,0.3)' }} />
            <span className="font-grotesk text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Birre &bull; Vini &bull; Bollicine &bull; Caffetteria &bull; Analcolici
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
