import { useMemo, useRef, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Ambient drifting particle field — abstract atmosphere for the Hero.
 * Pure leaf component: owns its own geometry, never re-renders from parents.
 * Geometry/material are disposed automatically by R3F on unmount.
 */
function ParticleFieldInner({ count = 1600, pointer }) {
  const pointsRef = useRef()
  const materialRef = useRef()

  // Build positions + per-particle drift seeds once.
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // Spread across a wide, shallow volume so it reads as a field.
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
      seeds[i] = Math.random() * Math.PI * 2
    }
    return { positions, seeds }
  }, [count])

  // Soft round sprite so particles aren't hard squares.
  const sprite = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 64
    const ctx = c.getContext('2d')
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(242,237,228,0.9)')
    g.addColorStop(0.4, 'rgba(201,168,76,0.5)')
    g.addColorStop(1, 'rgba(201,168,76,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 64)
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])

  useFrame((state, delta) => {
    const pts = pointsRef.current
    if (!pts) return
    const t = state.clock.elapsedTime

    // Slow ambient rotation of the whole field.
    pts.rotation.y += delta * 0.025
    pts.rotation.x = Math.sin(t * 0.05) * 0.08

    // Gentle parallax toward the (smoothed) pointer.
    const px = pointer?.x?.get?.() ?? 0
    const py = pointer?.y?.get?.() ?? 0
    pts.position.x += (px * 0.6 - pts.position.x) * 0.04
    pts.position.y += (-py * 0.4 - pts.position.y) * 0.04

    // Breathing opacity for a living atmosphere.
    if (materialRef.current) {
      materialRef.current.opacity = 0.5 + Math.sin(t * 0.6) * 0.12
    }
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSeed"
          count={count}
          array={seeds}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        map={sprite}
        size={0.055}
        sizeAttenuation
        transparent
        depthWrite={false}
        opacity={0.55}
        color="#C9A84C"
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

const ParticleField = memo(ParticleFieldInner)
export default ParticleField
