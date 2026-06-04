import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Magnetic hover — the element is gently pulled toward the cursor while it
 * hovers, then springs back on leave. Position lives in MotionValues (no
 * state / re-renders). Renders a <span> wrapper by default.
 *
 * @param {{ strength?: number, className?: string, children: React.ReactNode }} props
 */
export default function Magnetic({ strength = 0.4, className = '', children, ...rest }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      className={className}
      {...rest}
    >
      {children}
    </motion.span>
  )
}
