import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../../utils/gsap'

export default function Preloader({ onContentReady, onComplete }) {
  const root = useRef(null)
  const onContentReadyRef = useRef(onContentReady)
  const onCompleteRef = useRef(onComplete)
  const [count, setCount] = useState(0)

  useEffect(() => {
    onContentReadyRef.current = onContentReady
    onCompleteRef.current = onComplete
  }, [onComplete, onContentReady])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { value: 0 }
      gsap.timeline({ defaults: { overwrite: true }, onComplete: () => onCompleteRef.current?.() })
        .set(root.current, { autoAlpha: 1, yPercent: 0 })
        .to(counter, { value: 100, duration: 1.8, ease: 'power2.out', onUpdate: () => setCount(Math.round(counter.value)) })
        .to('[data-preload-bar]', { scaleX: 1, duration: 1.8, ease: 'power2.out' }, 0)
        .from('[data-preload-char]', { yPercent: 110, stagger: 0.04, duration: 0.7, ease: 'power4.out' }, 0.15)
        .add(() => onContentReadyRef.current?.())
        .to({}, { duration: 0.18 })
        .to(root.current, { yPercent: -100, duration: 1, ease: 'power4.inOut' })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div className="fixed inset-0 z-[130] grid place-items-center bg-black text-off-white [backface-visibility:hidden] [will-change:transform]" ref={root} role="status" aria-label="Loading landing page">
      <div className="flex gap-[0.03em] overflow-hidden font-display text-[clamp(3rem,9vw,9rem)] font-extrabold tracking-[-0.08em]" aria-hidden="true">
        {'MAISON'.split('').map((char) => <span className="inline-block" key={char} data-preload-char>{char}</span>)}
      </div>
      <div className="absolute bottom-[12vh] h-0.5 w-[min(460px,70vw)] bg-off-white/15"><span className="block h-full origin-left scale-x-0 bg-gold" data-preload-bar /></div>
      <p className="absolute bottom-[10vh] right-[8vw] text-gold">{count}%</p>
    </div>
  )
}
