import { useRef } from 'react'
import { gsap } from '../../utils/gsap'

export default function WorkCard({ title, type, tone, large }) {
  const card = useRef(null)
  const tween = useRef(null)

  const move = (event) => {
    const rect = card.current.getBoundingClientRect()
    const localX = event.clientX - rect.left
    const localY = event.clientY - rect.top
    const x = localX / rect.width - 0.5
    const y = localY / rect.height - 0.5

    tween.current?.kill()
    tween.current = gsap.to(card.current, {
      '--spot-x': `${localX}px`,
      '--spot-y': `${localY}px`,
      rotateX: -y * 5,
      rotateY: x * 5,
      z: 18,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  const enter = () => {
    gsap.to(card.current, { '--spot-opacity': 1, duration: 0.3, ease: 'power2.out' })
  }

  const reset = () => {
    tween.current?.kill()
    gsap.to(card.current, {
      '--spot-opacity': 0,
      rotateX: 0,
      rotateY: 0,
      z: 0,
      duration: 0.75,
      ease: 'elastic.out(1, 0.55)',
      overwrite: true,
    })
  }

  return (
    <article ref={card} onMouseEnter={enter} onMouseMove={move} onMouseLeave={reset} className={`${large ? 'row-span-2 min-h-[680px] max-[820px]:min-h-[480px]' : 'min-h-[420px]'} group relative flex transform-gpu flex-col justify-end overflow-hidden rounded-[30px] border border-line p-6 [--spot-opacity:0] [--spot-x:50%] [--spot-y:50%] [transform-style:preserve-3d] will-change-transform before:pointer-events-none before:absolute before:inset-0 before:-z-[1] before:bg-gradient-to-b before:from-transparent before:from-[35%] before:to-black/40 motion-reduce:!transform-none`} data-work-card>
      <div className="absolute -inset-px -z-[2] transition-[transform,filter] duration-1000 ease-expo group-hover:scale-[1.075] group-hover:saturate-[1.08] group-hover:contrast-[1.05] motion-reduce:!transform-none motion-reduce:!transition-none" style={{ background: tone }} />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(420px_circle_at_var(--spot-x)_var(--spot-y),rgba(255,234,184,0.32),rgba(201,169,110,0.13)_34%,transparent_66%)] opacity-[var(--spot-opacity)] mix-blend-screen transition-opacity duration-200 ease-expo" aria-hidden="true" />
      <div className="relative z-[1] transition-transform duration-500 ease-expo [transform:translateZ(42px)] group-hover:[transform:translate3d(0,-8px,58px)] motion-reduce:!transform-none motion-reduce:!transition-none">
        <span className="text-xs uppercase tracking-[0.2em] text-gold-light">{type}</span>
        <h3 className="mt-1 font-display text-[clamp(2rem,4vw,4rem)] tracking-[-0.06em]">{title}</h3>
      </div>
      <b className="absolute right-5 top-5 z-[2] grid h-12 w-12 translate-x-[-10px] translate-y-[10px] scale-[0.82] place-items-center rounded-full border border-off-white/30 text-[1.35rem] opacity-0 transition-[opacity,transform,background] duration-300 ease-expo group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:bg-off-white/10 group-hover:opacity-100 motion-reduce:!transform-none motion-reduce:!transition-none" aria-hidden="true">↗</b>
    </article>
  )
}
