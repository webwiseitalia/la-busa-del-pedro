import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ChiSiamo from './components/ChiSiamo'
import DrinkMenu from './components/DrinkMenu'
import Eventi from './components/Eventi'
import Gallery from './components/Gallery'
import Contatti from './components/Contatti'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })
    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <div className="grain">
      <CustomCursor />
      <Navbar />
      <Hero />
      <ChiSiamo />
      <DrinkMenu />
      <Eventi />
      <Gallery />
      <Contatti />
      <Footer />
    </div>
  )
}

export default App
