import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../utils/gsap'

const panels = [['01', 'Signal', 'We define the sharpest market position.'], ['02', 'System', 'We turn strategy into modular design language.'], ['03', 'Motion', 'We choreograph attention through interaction.'], ['04', 'Launch', 'We ship polished, measurable experiences.']]

export default function HorizontalScroll() {
  const section = useRef(null)
  const track = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth)
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      timeline.to(track.current, { x: () => -distance(), ease: 'none' })

      ScrollTrigger.refresh()
    }, section)
    return () => ctx.revert()
  }, [])
  return <section className="overflow-hidden bg-off-white text-black [transform:translateZ(0)]" ref={section}><div className="flex w-max will-change-transform" ref={track}>{panels.map(([num, title, copy]) => <article className="flex min-h-svh w-[88vw] flex-col justify-center border-r border-black/15 p-[max(24px,7vw)]" key={num}><span className="font-serif text-8xl text-gold">{num}</span><h2 className="m-0 font-display text-[clamp(4rem,11vw,12rem)] tracking-[-0.09em]">{title}</h2><p className="max-w-[460px] text-xl leading-[1.6]">{copy}</p></article>)}</div></section>
}
