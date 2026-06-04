import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * A vertical SVG line that draws itself as the target section scrolls through
 * the viewport. Optional node dots light up gold near the draw head.
 *
 * @param {{ targetRef: React.RefObject<HTMLElement>, nodes?: number,
 *           className?: string }} props
 */
export default function ScrollProgressPath({
  targetRef,
  nodes = 4,
  className = '',
}) {
  const wrapRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 70%', 'end 60%'],
  })
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  })

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        width="2"
        height="100%"
        viewBox="0 0 2 100"
        preserveAspectRatio="none"
        className="h-full w-[2px] overflow-visible"
      >
        {/* Track */}
        <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(242,237,228,0.08)" strokeWidth="2" />
        {/* Drawn progress */}
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="100"
          stroke="#C9A84C"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength, scaleY: 1 }}
        />
        {Array.from({ length: nodes }).map((_, i) => {
          const at = nodes === 1 ? 0 : i / (nodes - 1)
          return <Node key={i} at={at} progress={scrollYProgress} />
        })}
      </svg>
    </div>
  )
}

function Node({ at, progress }) {
  const lit = useTransform(progress, [at - 0.02, at + 0.02], [0, 1])
  const r = useTransform(lit, [0, 1], [2.2, 4])
  const opacity = useTransform(lit, [0, 1], [0.25, 1])
  return (
    <motion.circle
      cx="1"
      cy={at * 100}
      r={r}
      fill="#C9A84C"
      style={{ opacity }}
    />
  )
}
