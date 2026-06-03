import { useEffect } from 'react'
import { gsap } from '../utils/gsap'

export function useCursor() {
  useEffect(() => {
    const dot = document.querySelector('[data-cursor-dot]')
    const ring = document.querySelector('[data-cursor-ring]')
    if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) return undefined

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let frame = 0

    const move = (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
      gsap.set(dot, { x: mouseX, y: mouseY })
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      gsap.set(ring, { x: ringX, y: ringY })
      frame = requestAnimationFrame(animate)
    }

    const enter = () => gsap.to([dot, ring], { scale: 1.5, borderColor: '#C9A96E', duration: 0.3 })
    const leave = () => gsap.to([dot, ring], { scale: 1, borderColor: 'rgba(240,237,230,0.7)', duration: 0.3 })
    const down = () => gsap.to([dot, ring], { scale: 0.75, duration: 0.15 })
    const up = () => gsap.to([dot, ring], { scale: 1, duration: 0.2 })

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })
    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])
}
