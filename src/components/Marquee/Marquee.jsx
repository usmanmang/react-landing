import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../utils/gsap'

const items = ['Strategy', 'Identity', 'WebGL', 'Editorial Design', 'React Systems', 'Launch Campaigns']

export default function Marquee() {
  const root = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const marquee = gsap.to('[data-marquee-track]', {
        xPercent: -50,
        duration: 24,
        repeat: -1,
        ease: 'none',
      })

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          gsap.to(marquee, {
            timeScale: self.direction,
            duration: 0.45,
            ease: 'power2.out',
            overwrite: true,
          })
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return <section className="flex overflow-hidden border-y border-line bg-[#0d0d0c]" ref={root}>{[0, 1].map((group) => <div data-marquee-track className="flex min-w-full flex-none items-center py-[1.2rem]" key={group}>{items.map((item) => <span className="inline-flex items-center gap-8 whitespace-nowrap px-4 font-display text-[clamp(1.5rem,4vw,4rem)] text-cream" key={`${group}-${item}`}>{item}<i className="h-2.5 w-2.5 rounded-full bg-gold" /></span>)}</div>)}</section>
}
