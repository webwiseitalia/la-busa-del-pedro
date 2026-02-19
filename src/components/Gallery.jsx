import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

import imgBancone from '../assets/foto/coppia-bancone-elegante.webp'
import imgSerata from '../assets/foto/serata-bar-neon.webp'
import imgBottiglie from '../assets/foto/bottiglie-premium.webp'
import imgMojito from '../assets/foto/mojito-primo-piano.webp'
import imgBarmanVista from '../assets/foto/barman-bancone-vista.webp'
import imgBicchieri from '../assets/foto/bicchieri-bar-vivace.webp'
import imgBarmanVersa from '../assets/foto/barman-versa-cocktail.webp'
import imgShaker from '../assets/foto/barman-shaker-cocktail.webp'
import imgServizio from '../assets/foto/servizio-birra-tavolo.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Gallery() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)
  const row3Ref = useRef(null)
  const featuredRef = useRef(null)

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

      // Featured image — scale reveal
      if (featuredRef.current) {
        gsap.fromTo(featuredRef.current,
          { clipPath: 'inset(10% 10% 10% 10%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)', opacity: 1,
            duration: 1.5, ease: 'power3.out',
            scrollTrigger: { trigger: featuredRef.current, start: 'top 82%' },
          }
        )
      }

      // Row animations — each row slides from different direction
      const rows = [
        { ref: row1Ref.current, x: -60, y: 20 },
        { ref: row2Ref.current, x: 40, y: 30 },
        { ref: row3Ref.current, x: -30, y: 40 },
      ]
      rows.forEach(({ ref, x, y }) => {
        if (!ref) return
        const children = Array.from(ref.children)
        gsap.fromTo(children,
          { x, y, opacity: 0, scale: 0.92 },
          {
            x: 0, y: 0, opacity: 1, scale: 1,
            duration: 1,
            stagger: { each: 0.1, from: 'random' },
            ease: 'power3.out',
            scrollTrigger: { trigger: ref, start: 'top 85%' },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="gallery" className="relative overflow-hidden">
      <div className="w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.15) 70%, transparent 100%)' }} />

      {/* Heading — centered this time (breaking the pattern of always left-aligned) */}
      <div className="px-5 lg:px-10 pt-24 lg:pt-32 pb-6 lg:pb-10 text-center">
        <span className="font-grotesk text-[10px] tracking-[0.5em] uppercase inline-block mb-6" style={{ color: 'rgba(201,168,76,0.6)' }}>
          04 — Gallery
        </span>
        <h2
          ref={headingRef}
          className="fluid-heading text-white mb-4"
        >
          L'atmosfera<br />
          della <em className="not-italic" style={{ color: '#c9a84c' }}>Büsa</em>
        </h2>
        <p className="font-body text-sm leading-relaxed max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.22)' }}>
          Scatti dal locale, dai cocktail alle serate.
        </p>
      </div>

      {/* FEATURED IMAGE — full bleed, huge, cinematic */}
      <div ref={featuredRef} className="relative w-full overflow-hidden my-8 lg:my-12">
        <img
          src={imgSerata}
          alt="Serata alla Büsa"
          className="w-full aspect-[21/9] lg:aspect-[3/1] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30" />
        <div className="absolute bottom-4 right-5 lg:right-10">
          <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,168,76,0.5)' }}>Serate</span>
        </div>
      </div>

      {/* ROW 1 — 3 images, irregular widths, tight gap */}
      <div ref={row1Ref} className="flex flex-col sm:flex-row gap-2 lg:gap-3 px-2 lg:px-3 mb-2 lg:mb-3">
        <div className="sm:w-[45%] lg:w-[38%] relative group overflow-hidden" data-hover>
          <img src={imgShaker} alt="Mixology" className="w-full aspect-[4/3] object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
          <div className="absolute bottom-3 left-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,168,76,0.7)' }}>Mixology</span>
          </div>
        </div>
        <div className="sm:w-[25%] lg:w-[24%] relative group overflow-hidden" data-hover>
          <img src={imgMojito} alt="Cocktail" className="w-full aspect-[3/4] object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
          <div className="absolute bottom-3 left-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,168,76,0.7)' }}>Cocktail</span>
          </div>
        </div>
        <div className="sm:w-[30%] lg:w-[38%] relative group overflow-hidden" data-hover>
          <img src={imgBottiglie} alt="Spirits" className="w-full aspect-[4/3] object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
          <div className="absolute bottom-3 left-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,168,76,0.7)' }}>Spirits</span>
          </div>
        </div>
      </div>

      {/* ROW 2 — 2 images, very different widths + text element */}
      <div ref={row2Ref} className="flex flex-col sm:flex-row gap-2 lg:gap-3 px-2 lg:px-3 mb-2 lg:mb-3">
        <div className="sm:w-[60%] lg:w-[55%] relative group overflow-hidden" data-hover>
          <img src={imgBarmanVista} alt="Il Bancone" className="w-full aspect-[16/9] object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
          <div className="absolute bottom-3 left-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,168,76,0.7)' }}>Il Bancone</span>
          </div>
        </div>
        <div className="sm:w-[40%] lg:w-[45%] relative group overflow-hidden" data-hover>
          <img src={imgBicchieri} alt="Dettagli" className="w-full aspect-[16/9] object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
          <div className="absolute bottom-3 left-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,168,76,0.7)' }}>Dettagli</span>
          </div>
        </div>
      </div>

      {/* ROW 3 — 3 images again, reversed proportions from row 1 */}
      <div ref={row3Ref} className="flex flex-col sm:flex-row gap-2 lg:gap-3 px-2 lg:px-3">
        <div className="sm:w-[30%] lg:w-[28%] relative group overflow-hidden" data-hover>
          <img src={imgBarmanVersa} alt="Creazioni" className="w-full aspect-[3/4] object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
          <div className="absolute bottom-3 left-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,168,76,0.7)' }}>Creazioni</span>
          </div>
        </div>
        <div className="sm:w-[40%] lg:w-[44%] relative group overflow-hidden" data-hover>
          <img src={imgServizio} alt="Servizio" className="w-full aspect-[4/3] object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
          <div className="absolute bottom-3 left-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,168,76,0.7)' }}>Servizio</span>
          </div>
        </div>
        <div className="sm:w-[30%] lg:w-[28%] relative group overflow-hidden" data-hover>
          <img src={imgBancone} alt="Atmosfera" className="w-full aspect-[3/4] object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
          <div className="absolute bottom-3 left-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <span className="font-grotesk text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,168,76,0.7)' }}>Atmosfera</span>
          </div>
        </div>
      </div>

      {/* Instagram link — far right */}
      <div className="px-5 lg:px-10 py-12 lg:py-20 flex items-center gap-6 justify-end">
        <div className="w-16 h-[1px] hidden lg:block" style={{ background: 'rgba(201,168,76,0.2)' }} />
        <a
          href="https://www.instagram.com/labusa_del_pedro/"
          target="_blank"
          rel="noopener noreferrer"
          data-hover
          className="font-grotesk text-xs tracking-[0.3em] uppercase transition-colors duration-500"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          Altre foto su Instagram →
        </a>
      </div>
    </section>
  )
}
