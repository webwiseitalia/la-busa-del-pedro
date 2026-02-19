import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import logo from '../assets/logo-labusa-trasparente.webp'
import heroBg from '../assets/foto/birra-spina-neon.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const logoRef = useRef(null)
  const badgeRef = useRef(null)
  const lineRef = useRef(null)
  const scrollRef = useRef(null)
  const imgRef = useRef(null)
  const diagonalRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(imgRef.current,
        { scale: 1.3, opacity: 0 },
        { scale: 1.1, opacity: 1, duration: 2.2, ease: 'power2.out', delay: 0.1 }
      )

      const split = new SplitType(headlineRef.current, {
        types: 'chars',
        tagName: 'span',
      })

      gsap.fromTo(logoRef.current,
        { scale: 1.4, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1.6, ease: 'power3.out', delay: 0.3 }
      )

      gsap.fromTo(split.chars,
        { y: '110%', opacity: 0 },
        {
          y: '0%', opacity: 1,
          duration: 1.0,
          stagger: { each: 0.03, from: 'random' },
          ease: 'power4.out',
          delay: 0.8,
        }
      )

      gsap.fromTo(subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 1.5 }
      )

      gsap.fromTo(badgeRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.8 }
      )

      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'power2.inOut', delay: 1.2 }
      )

      // Diagonal accent line
      if (diagonalRef.current) {
        gsap.fromTo(diagonalRef.current,
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 2, ease: 'power2.inOut', delay: 0.5 }
        )
      }

      gsap.fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 2.5 }
      )

      // Parallax on scroll
      gsap.to(imgRef.current, {
        y: -80,
        scale: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      gsap.to(logoRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      gsap.to(headlineRef.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden pb-12 lg:pb-20"
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          ref={imgRef}
          src={heroBg}
          alt="Atmosfera La Büsa del Pedro"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlays — asymmetric, heavier on left */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/40 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-[#050505]/20 to-transparent" />
      </div>

      {/* Diagonal accent line — raw, cuts across the hero */}
      <div
        ref={diagonalRef}
        className="absolute top-0 left-[18%] lg:left-[22%] w-[1px] h-[70%] origin-top"
        style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.3), transparent)', transform: 'rotate(8deg)' }}
      />

      {/* Vertical line accent — secondary */}
      <div className="absolute top-0 left-[6%] lg:left-[8%] w-[1px] h-[35%] bg-gradient-to-b from-transparent via-brand-gold/15 to-transparent" />

      {/* Logo — off-center, pulled to top-right */}
      <div
        ref={logoRef}
        className="absolute top-[10vh] lg:top-[8vh] right-5 lg:right-[6%] z-10"
      >
        <img
          src={logo}
          alt="La Büsa del Pedro"
          className="w-40 sm:w-52 lg:w-72 opacity-90"
        />
      </div>

      {/* Main content — pushed to bottom-left */}
      <div className="relative z-10 px-5 lg:px-10">
        <div ref={badgeRef} className="mb-6 lg:mb-10">
          <span className="inline-block font-grotesk text-[10px] tracking-[0.5em] uppercase border px-4 py-2" style={{ color: 'rgba(201,168,76,0.7)', borderColor: 'rgba(201,168,76,0.2)', background: 'rgba(5,5,5,0.4)', backdropFilter: 'blur(8px)' }}>
            New Opening &mdash; Febbraio 2026
          </span>
        </div>

        <div className="mb-5 lg:mb-8 max-w-[92vw] lg:max-w-[65vw]">
          <h1
            ref={headlineRef}
            className="fluid-display text-white"
            style={{ lineHeight: '0.85' }}
          >
            <span className="block">La Büsa</span>
            <span className="block mt-2 lg:mt-4">
              <span className="italic font-normal" style={{ fontSize: '0.6em', color: '#c9a84c' }}>del</span>
              {' '}Pedro
            </span>
          </h1>
        </div>

        <div
          ref={lineRef}
          className="w-[35vw] lg:w-[22vw] h-[1px] mb-6 origin-left"
          style={{ background: 'rgba(201,168,76,0.4)' }}
        />

        {/* Sub text — intentionally NOT aligned with heading */}
        <div ref={subRef} className="ml-0 lg:ml-[20%] max-w-sm lg:max-w-md mb-16 lg:mb-0">
          <p className="font-grotesk text-sm lg:text-base leading-relaxed tracking-wide" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Cocktail d'autore, eventi e atmosfera unica
            <br className="hidden lg:block" />
            nel cuore di Breno, Valle Camonica.
          </p>
          <div className="flex items-center gap-6 mt-6">
            <a
              href="#eventi"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#eventi')?.scrollIntoView({ behavior: 'smooth' })
              }}
              data-hover
              className="font-grotesk text-xs tracking-[0.3em] uppercase pb-1 transition-colors duration-500"
              style={{ color: '#c9a84c', borderBottom: '1px solid rgba(201,168,76,0.4)' }}
            >
              Eventi
            </a>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>—</span>
            <a
              href="https://www.instagram.com/labusa_del_pedro/"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="font-grotesk text-xs tracking-[0.3em] uppercase hover:text-brand-gold transition-colors duration-500"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 right-6 lg:right-10 flex flex-col items-center gap-3"
      >
        <span className="font-grotesk text-[9px] tracking-[0.4em] uppercase"
          style={{ writingMode: 'vertical-lr', color: 'rgba(255,255,255,0.2)' }}
        >
          Scroll
        </span>
        <div className="w-[1px] h-12 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)' }}>
          <div className="absolute w-full h-4 animate-bounce" style={{ background: '#c9a84c', animationDuration: '2s' }} />
        </div>
      </div>

      {/* Coordinates */}
      <div className="absolute bottom-8 left-5 lg:left-10">
        <span className="font-grotesk text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
          46.034°N 10.300°E — Breno (BS)
        </span>
      </div>
    </section>
  )
}
