import { useRef } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'

/**
 * Spotlight border card — a gold glow illuminates the border + surface along
 * the cursor position. Pointer tracked via MotionValues (no state / re-render).
 *
 * @param {{ className?: string, children: React.ReactNode }} props
 */
export default function SpotlightCard({ className = '', children, ...rest }) {
  const ref = useRef(null)
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
  }

  const surface = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, rgba(201,168,76,0.10), transparent 65%)`
  const border = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, rgba(201,168,76,0.65), transparent 60%)`

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={`group relative overflow-hidden rounded-xl border border-line bg-surface1 ${className}`}
      {...rest}
    >
      {/* Illuminated border: a gold-gradient layer masked to a 1px ring. */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: border,
          padding: '1px',
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* Soft surface glow. */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: surface }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
