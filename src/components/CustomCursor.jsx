import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const outlineRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    const moveCursor = (e) => {
      gsap.to(dot, { x: e.clientX - 4, y: e.clientY - 4, duration: 0.1, ease: 'power2.out' })
      gsap.to(outline, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.35, ease: 'power2.out' })
    }

    const handleEnter = () => outline.classList.add('hovering')
    const handleLeave = () => outline.classList.remove('hovering')

    window.addEventListener('mousemove', moveCursor)

    const interactives = document.querySelectorAll('a, button, [data-hover]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    // Re-observe for dynamically added elements
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll('a, button, [data-hover]')
      newInteractives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      observer.disconnect()
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden lg:block" />
      <div ref={outlineRef} className="cursor-outline hidden lg:block" />
    </>
  )
}
