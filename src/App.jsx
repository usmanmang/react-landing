import { lazy, Suspense, useEffect, useState } from 'react'
import { ScrollTrigger } from './utils/gsap'
import { useCursor } from './hooks/useCursor'
import { useScrollProgress } from './hooks/useScrollProgress'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Preloader from './components/Preloader/Preloader'
import Cursor from './components/Cursor/Cursor'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'

const Marquee = lazy(() => import('./components/Marquee/Marquee'))
const Work = lazy(() => import('./components/Work/Work'))
const About = lazy(() => import('./components/About/About'))
const HorizontalScroll = lazy(() => import('./components/HorizontalScroll/HorizontalScroll'))
const Process = lazy(() => import('./components/Process/Process'))
const Testimonial = lazy(() => import('./components/Testimonial/Testimonial'))
const CTA = lazy(() => import('./components/CTA/CTA'))
const Footer = lazy(() => import('./components/Footer/Footer'))

export default function App() {
  const [contentReady, setContentReady] = useState(false)
  const [loaderVisible, setLoaderVisible] = useState(true)

  useSmoothScroll()
  useCursor()
  useScrollProgress()

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  useEffect(() => {
    if (!contentReady) return undefined
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [contentReady])

  return (
    <>
      {loaderVisible && <Preloader onContentReady={() => setContentReady(true)} onComplete={() => setLoaderVisible(false)} />}
      <Cursor />
      <div className="fixed left-0 top-0 z-[120] h-0.5 w-full origin-left scale-x-0 bg-gold" data-scroll-progress />
      <div
        className="pointer-events-none fixed inset-0 z-[110] opacity-[0.035]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        aria-hidden="true"
      />
      <div className={contentReady ? 'block' : 'hidden'}>
        <Nav />
        <main>
          <Hero ready={contentReady} />
          <Suspense fallback={null}>
            <Marquee />
            <Work />
            <About />
            <HorizontalScroll />
            <Process />
            <Testimonial />
            <CTA />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  )
}
