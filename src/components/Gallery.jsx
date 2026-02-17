import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const items = [
  { emoji: '🍸', label: 'Cocktail d\'autore', w: 'col-span-2 lg:col-span-3', h: 'row-span-2', bg: 'rgba(201,168,76,0.06)' },
  { emoji: '🎧', label: 'DJ Set', w: 'col-span-1 lg:col-span-2', h: 'row-span-1', bg: 'rgba(168,85,247,0.06)' },
  { emoji: '🌿', label: 'Piazzetta', w: 'col-span-1 lg:col-span-2', h: 'row-span-1', bg: 'rgba(16,185,129,0.06)' },
  { emoji: '✨', label: 'Atmosfera', w: 'col-span-2 lg:col-span-3', h: 'row-span-1', bg: 'rgba(244,63,94,0.06)' },
  { emoji: '🏓', label: 'Beer Pong', w: 'col-span-1 lg:col-span-2', h: 'row-span-1', bg: 'rgba(59,130,246,0.06)' },
  { emoji: '🥂', label: 'Aperitivo', w: 'col-span-1 lg:col-span-2', h: 'row-span-2', bg: 'rgba(245,158,11,0.06)' },
  { emoji: '🔥', label: 'Serate live', w: 'col-span-2 lg:col-span-3', h: 'row-span-1', bg: 'rgba(239,68,68,0.06)' },
]

export default function Gallery() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const gridRef = useRef(null)

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

      // Grid items - scale up from small
      const gridItems = gridRef.current?.children
      if (gridItems) {
        gsap.fromTo(Array.from(gridItems),
          { scale: 0.85, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 0.8,
            stagger: { each: 0.07, from: 'random' },
            ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="gallery" className="relative overflow-hidden">
      <div className="w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.15) 70%, transparent 100%)' }} />

      <div className="px-5 lg:px-10 pt-24 lg:pt-34 pb-20 lg:pb-30">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[1px]" style={{ background: '#c9a84c' }} />
          <span className="font-grotesk text-[10px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,168,76,0.6)' }}>
            04 — Gallery
          </span>
        </div>

        {/* Heading + description - split layout */}
        <div className="mb-16 lg:mb-24">
          <h2
            ref={headingRef}
            className="fluid-heading text-white mb-6"
          >
            L'atmosfera<br />
            della <em className="not-italic" style={{ color: '#c9a84c' }}>Büsa</em>
          </h2>
          <p className="font-body text-sm leading-relaxed max-w-md lg:ml-[20%]" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Presto caricheremo le foto dei nostri migliori momenti.
            Per ora, ecco un assaggio di quello che ti aspetta.
          </p>
        </div>

        {/* Irregular grid - not uniform, overlapping, varied sizes */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-7 auto-rows-[140px] lg:auto-rows-[180px] gap-3 lg:gap-4"
        >
          {items.map((item) => (
            <div
              key={item.label}
              className={`${item.w} ${item.h} relative group overflow-hidden transition-all duration-700`}
              style={{
                background: item.bg,
                border: '1px solid rgba(255,255,255,0.04)',
              }}
              data-hover
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                <span className="text-3xl lg:text-4xl group-hover:scale-125 transition-transform duration-700">
                  {item.emoji}
                </span>
                <span className="font-grotesk text-[9px] lg:text-[10px] tracking-[0.3em] uppercase text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  {item.label}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'rgba(5,5,5,0.7)' }}>
                <span className="font-grotesk text-[10px] tracking-[0.3em] uppercase" style={{ color: '#c9a84c' }}>
                  Coming soon
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram link - bottom, asymmetric */}
        <div className="mt-12 lg:mt-16 flex items-center gap-6 lg:justify-end">
          <div className="w-16 h-[1px] hidden lg:block" style={{ background: 'rgba(201,168,76,0.2)' }} />
          <a
            href="https://www.instagram.com/labusa_del_pedro/"
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="font-grotesk text-xs tracking-[0.3em] uppercase transition-colors duration-500"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Foto su Instagram →
          </a>
        </div>
      </div>
    </section>
  )
}
