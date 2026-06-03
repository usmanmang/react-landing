import { lazy, Suspense, useLayoutEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'

const ParticleField = lazy(() => import('./ParticleField'))

export default function Hero({ ready }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!ready) return undefined
    const ctx = gsap.context(() => {
      gsap.timeline().from('[data-hero-reveal]', { y: 80, opacity: 0, duration: 1, stagger: 0.12, ease: 'power4.out' })
      gsap.from('[data-stat]', { textContent: 0, duration: 2, ease: 'power2.out', snap: { textContent: 1 }, scrollTrigger: { trigger: '[data-stats]', start: 'top 85%' } })
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section id="top" className="relative grid min-h-svh items-center overflow-hidden px-[max(24px,7vw)] pb-24 pt-44 max-[760px]:pt-36" ref={root}>
      <div className="absolute inset-0 bg-black opacity-80">
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </div>
      <div className="relative z-[1] max-w-[900px]">
        <p className="section-kicker" data-hero-reveal>Luxury digital atelier</p>
        <h1 className="display-title" data-hero-reveal>We craft<br /><span className="serif">digital</span><br />experiences</h1>
        <p className="mt-[1.4rem] max-w-[560px] text-[clamp(1rem,2vw,1.25rem)] leading-[1.7] text-cream" data-hero-reveal>Brand systems, immersive interfaces, and high-conversion web experiences shaped for ambitious studios and founders.</p>
        <div className="mt-[2.2rem] flex flex-wrap gap-4" data-hero-reveal><a className="btn filled" href="#work">Explore Work</a><a className="btn" href="#contact">Book a Call</a></div>
      </div>
      <div className="absolute bottom-20 right-[7vw] z-[1] flex gap-8 text-muted max-[760px]:relative max-[760px]:bottom-auto max-[760px]:right-auto max-[760px]:mt-12 max-[760px]:flex-wrap" data-stats>
        <span><strong className="block font-display text-[2.2rem] text-off-white" data-stat>28</strong> launches</span><span><strong className="block font-display text-[2.2rem] text-off-white" data-stat>14</strong> awards</span><span><strong className="block font-display text-[2.2rem] text-off-white" data-stat>92</strong>% retention</span>
      </div>
      <div className="absolute bottom-16 left-[7vw] text-xs uppercase tracking-[0.2em] text-muted max-[760px]:hidden">Scroll<span className="mt-3 block h-[52px] w-px animate-draw bg-gradient-to-b from-gold to-transparent" /></div>
    </section>
  )
}
