import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../../utils/gsap'

const AbstractShape = lazy(() => import('./AbstractShape'))

export default function About() {
  const root = useRef(null)
  const [showShape, setShowShape] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(max-width: 760px), (prefers-reduced-motion: reduce)').matches) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setShowShape(true)
      observer.disconnect()
    }, { rootMargin: '400px 0px' })

    if (root.current) observer.observe(root.current)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-about]', { x: 60, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 70%' } })
    }, root)
    return () => ctx.revert()
  }, [])
  return <section id="about" className="grid grid-cols-[0.9fr_1.1fr] items-center gap-[5vw] border-t border-line px-[max(24px,7vw)] py-32 max-[860px]:grid-cols-1 max-[760px]:py-24" ref={root}><div className="relative h-[clamp(380px,44vw,560px)] overflow-hidden rounded-[34px] border border-line bg-[radial-gradient(circle_at_50%_48%,rgba(201,169,110,0.22),rgba(201,169,110,0.08)_28%,transparent_62%),linear-gradient(145deg,rgba(255,255,255,0.035),rgba(255,255,255,0))] before:absolute before:inset-[17%] before:rotate-[-18deg] before:scale-x-[1.18] before:rounded-full before:border before:border-gold-light/10 after:pointer-events-none after:absolute after:left-1/2 after:top-1/2 after:aspect-square after:w-[46%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-[radial-gradient(circle,rgba(228,201,154,0.14),transparent_66%)] after:blur-[18px] [&_canvas]:relative [&_canvas]:z-[1] [&_canvas]:!h-full [&_canvas]:!w-full max-[760px]:hidden">{showShape && <Suspense fallback={null}><AbstractShape /></Suspense>}</div><div data-about><p className="section-kicker">Philosophy</p><h2 className="display-title">Designed with restraint. Built with nerve.</h2><p className="max-w-[660px] text-[clamp(1.05rem,2vw,1.4rem)] leading-[1.7] text-cream">We blend editorial direction, systems thinking, and front-end craft to create digital products that feel premium before they say a word.</p><p className="max-w-[660px] text-[clamp(1.05rem,2vw,1.4rem)] leading-[1.7] text-cream">Every interaction has a reason: to clarify, seduce, guide, or convert.</p></div></section>
}
