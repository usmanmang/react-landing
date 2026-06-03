import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { MathUtils } from 'three'

function Sculpture() {
  const group = useRef(null)
  const core = useRef(null)
  const orbit = useRef(null)
  const pointer = useRef({ x: 0, y: 0 })

  useFrame(({ mouse }, delta) => {
    pointer.current.x = MathUtils.damp(pointer.current.x, mouse.x, 3, delta)
    pointer.current.y = MathUtils.damp(pointer.current.y, mouse.y, 3, delta)

    group.current.rotation.y += delta * 0.18
    group.current.rotation.x = 0.22 + pointer.current.y * 0.18
    group.current.rotation.z = -0.12 - pointer.current.x * 0.1
    group.current.position.x = pointer.current.x * 0.18
    group.current.position.y = pointer.current.y * 0.12
    core.current.rotation.x += delta * 0.16
    orbit.current.rotation.z -= delta * 0.13
  })

  return (
    <group ref={group} scale={0.92} rotation={[0.22, -0.45, -0.12]}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.12, 4]} />
        <meshStandardMaterial color="#c9a96e" roughness={0.34} metalness={0.74} flatShading />
      </mesh>
      <mesh ref={orbit} scale={1.46} rotation={[0.8, 0.2, 0.45]}>
        <torusGeometry args={[1.05, 0.015, 16, 180]} />
        <meshBasicMaterial color="#e4c99a" transparent opacity={0.46} />
      </mesh>
      <mesh scale={1.62} rotation={[0.2, -0.4, 0.8]}>
        <torusKnotGeometry args={[0.86, 0.16, 160, 12]} />
        <meshBasicMaterial color="#f0ede6" wireframe transparent opacity={0.16} />
      </mesh>
    </group>
  )
}

export default function AbstractShape() {
  return (
    <Canvas aria-hidden="true" dpr={Math.min(1.5, window.devicePixelRatio)} camera={{ position: [0, 0, 5.8], fov: 38 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={0.58} />
      <pointLight position={[2.6, 3.2, 3.8]} intensity={4.2} color="#e4c99a" />
      <pointLight position={[-3, -2, 2]} intensity={1.4} color="#ffffff" />
      <Sculpture />
    </Canvas>
  )
}
