import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '../utils/gsap'

export function useScrollProgress() {
  useLayoutEffect(() => {
    const bar = document.querySelector('[data-scroll-progress]')
    if (!bar) return undefined

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2,
        },
      })
    })

    return () => ctx.revert()
  }, [])
}
