import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../../utils/gsap'

const links = ['Work', 'About', 'Process', 'Contact']

export default function Nav() {
  const nav = useRef(null)
  const [open, setOpen] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 80,
        onUpdate: (self) => {
          nav.current?.classList.toggle('border-line', self.scroll() > 80)
          nav.current?.classList.toggle('bg-black/55', self.scroll() > 80)
          nav.current?.classList.toggle('backdrop-blur-[20px]', self.scroll() > 80)
        },
      })
    }, nav)
    return () => ctx.revert()
  }, [])

  return (
    <nav className="fixed left-1/2 top-[18px] z-[100] grid w-[min(1120px,calc(100%_-_32px))] -translate-x-1/2 grid-cols-[1fr_auto_1fr] items-center rounded-full border border-transparent px-[18px] py-3.5 transition-[background,border-color,backdrop-filter] duration-300 max-[760px]:grid-cols-[1fr_auto] max-[760px]:rounded-3xl" ref={nav} aria-label="Main navigation">
      <a className="font-display font-extrabold uppercase tracking-[-0.06em]" href="#top">Maison</a>
      <div className="flex gap-[1.6rem] text-sm text-muted max-[760px]:hidden">
        {links.map((link) => <a className="relative after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 after:ease-expo hover:after:origin-left hover:after:scale-x-100" href={`#${link.toLowerCase()}`} key={link}>{link}</a>)}
      </div>
      <a className="btn justify-self-end max-[760px]:hidden" href="#contact">Start a Project</a>
      <button className="hidden h-11 w-11 justify-self-end rounded-full border border-line bg-transparent before:mx-auto before:my-[5px] before:block before:h-px before:w-[18px] before:bg-off-white after:mx-auto after:my-[5px] after:block after:h-px after:w-[18px] after:bg-off-white max-[760px]:block" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu"><span className="mx-auto my-[5px] block h-px w-[18px] bg-off-white" /></button>
      <div className={`${open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'} fixed inset-x-4 top-[72px] hidden gap-4 rounded-3xl border border-line bg-black/90 p-8 transition-[opacity,transform] duration-200 max-[760px]:grid`}>
        {links.map((link) => <a className="font-display text-[2rem]" onClick={() => setOpen(false)} href={`#${link.toLowerCase()}`} key={link}>{link}</a>)}
      </div>
    </nav>
  )
}
