import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * 3D parallax tilt on hover. Mouse position is tracked via MotionValues and
 * smoothed with springs — no React state, so no re-renders while moving.
 *
 * @param {{ max?: number, scale?: number, className?: string, children: React.ReactNode }} props
 */
export default function ParallaxTiltCard({
  max = 9,
  scale = 1.02,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)

  // Normalized pointer offset from card center, range [-0.5, 0.5].
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const sx = useSpring(px, { stiffness: 220, damping: 22, mass: 0.4 })
  const sy = useSpring(py, { stiffness: 220, damping: 22, mass: 0.4 })

  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max])
  // Gold glare position that follows the cursor.
  const glareX = useTransform(sx, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(sy, [-0.5, 0.5], ['0%', '100%'])
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(220px circle at ${gx} ${gy}, rgba(201,168,76,0.18), transparent 60%)`
  )

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((e.clientX - rect.left) / rect.width - 0.5)
    py.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const reset = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      className={`relative [perspective:1000px] will-transform ${className}`}
      {...rest}
    >
      {children}
      {/* Gold glare following the cursor for tactile depth. */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glareBackground }}
      />
    </motion.div>
  )
}
