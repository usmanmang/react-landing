import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../utils/gsap'

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const handleReducedMotionAnchorClick = (event) => {
        const link = event.target.closest('a[href^="#"]')
        if (!link) return

        const hash = link.getAttribute('href')
        if (!hash || hash === '#') return

        const target = document.querySelector(hash)
        if (!target) return

        event.preventDefault()
        window.history.pushState(null, '', hash)
        target.scrollIntoView({ block: 'start' })
      }

      document.addEventListener('click', handleReducedMotionAnchorClick)
      return () => document.removeEventListener('click', handleReducedMotionAnchorClick)
    }

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const updateLenis = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    const handleAnchorClick = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (!link) return

      const hash = link.getAttribute('href')
      if (!hash || hash === '#') return

      const target = document.querySelector(hash)
      if (!target) return

      event.preventDefault()
      window.history.pushState(null, '', hash)
      lenis.scrollTo(target, {
        offset: hash === '#top' ? 0 : -24,
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [])
}
