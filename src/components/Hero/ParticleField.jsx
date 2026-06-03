import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { AdditiveBlending, MathUtils } from 'three'

function Points() {
  const ref = useRef()
  const targetMouse = useRef({ x: 0, y: 0 })
  const smoothMouse = useRef({ x: 0, y: 0 })
  const count = window.innerWidth < 700 ? 600 : 2800

  useEffect(() => {
    const handlePointerMove = (event) => {
      targetMouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
      targetMouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  const positions = useMemo(() => {
    const values = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const radius = 2 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      values[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      values[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      values[i * 3 + 2] = radius * Math.cos(phi)
    }
    return values
  }, [count])

  useFrame(({ clock }, delta) => {
    if (!ref.current) return

    const time = clock.elapsedTime
    smoothMouse.current.x = MathUtils.damp(smoothMouse.current.x, targetMouse.current.x, 2.6, delta)
    smoothMouse.current.y = MathUtils.damp(smoothMouse.current.y, targetMouse.current.y, 2.6, delta)

    ref.current.rotation.y = time * 0.035 + smoothMouse.current.x * 0.16
    ref.current.rotation.x = Math.sin(time * 0.16) * 0.035 + smoothMouse.current.y * 0.07
  })

  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} /></bufferGeometry>
      <pointsMaterial color="#e4c99a" size={0.026} transparent opacity={0.72} blending={AdditiveBlending} depthWrite={false} />
    </points>
  )
}

export default function ParticleField() {
  return (
    <Canvas aria-hidden="true" dpr={Math.min(1.5, window.devicePixelRatio)} camera={{ position: [0, 0, 7.5], fov: 65 }} gl={{ antialias: false, powerPreference: 'high-performance' }}>
      <color attach="background" args={["#080808"]} />
      <Points />
    </Canvas>
  )
}
