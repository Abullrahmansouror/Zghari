import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Submit button that fragments into gold particles on click, then resolves by
 * calling onClick (used to kick off the mock submit). Particles are animated
 * <span> elements via Framer Motion.
 */
export default function ParticleButton({
  children,
  onClick,
  disabled = false,
  className = '',
}) {
  const [exploding, setExploding] = useState(false)

  // Pre-compute particle vectors once.
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, () => {
        const angle = Math.random() * Math.PI * 2
        const dist = 50 + Math.random() * 90
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          size: 4 + Math.random() * 6,
          delay: Math.random() * 0.06,
          gold: Math.random() > 0.35,
        }
      }),
    []
  )

  const handleClick = () => {
    if (exploding || disabled) return
    setExploding(true)
    // Let the burst play, then trigger the actual submit.
    window.setTimeout(() => onClick?.(), 620)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || exploding}
      className={`relative overflow-visible ${className}`}
    >
      <motion.span
        className="relative flex items-center justify-center gap-2"
        animate={exploding ? { opacity: 0, scale: 0.7 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.span>

      {exploding &&
        particles.map((p, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.gold ? '#C9A84C' : '#F2EDE4',
            }}
            initial={{ x: '-50%', y: '-50%', opacity: 1, scale: 1 }}
            animate={{
              x: `calc(-50% + ${p.x}px)`,
              y: `calc(-50% + ${p.y}px)`,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: p.delay }}
          />
        ))}
    </button>
  )
}
