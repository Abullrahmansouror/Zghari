import {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
} from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { heroTrail } from '../../data/images'

/**
 * A single reusable trail thumbnail. Owns its own MotionValues and exposes an
 * imperative spawn() — so the parent can fire it without any React state or
 * re-render. Position lives entirely in MotionValues (per the brief).
 */
const TrailItem = forwardRef(function TrailItem({ src }, ref) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useMotionValue(0)
  const scale = useMotionValue(0.6)
  const rotate = useMotionValue(0)

  useImperativeHandle(ref, () => ({
    spawn(px, py) {
      x.set(px)
      y.set(py)
      rotate.set((Math.random() - 0.5) * 16)
      opacity.set(1)
      scale.set(0.7)
      animate(scale, 1.06, { duration: 0.5, ease: [0.16, 1, 0.3, 1] })
      animate(opacity, 0, { duration: 0.9, ease: 'easeOut' })
    },
  }))

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      draggable={false}
      style={{
        x,
        y,
        opacity,
        scale,
        rotate,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="pointer-events-none absolute left-0 top-0 h-28 w-20 rounded-md object-cover shadow-2xl shadow-black/60 will-transform"
    />
  )
})

/**
 * Spawns fading photo thumbnails that trail the cursor across its parent.
 * Render inside a `relative` container; it fills it and ignores pointer events.
 */
function MouseTrailInner({ count = heroTrail.length }) {
  const wrapRef = useRef(null)
  const itemRefs = useRef([])
  const indexRef = useRef(0)
  const last = useRef({ x: 0, y: 0, init: false })

  const onPointerMove = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top

    if (!last.current.init) {
      last.current = { x: px, y: py, init: true }
      return
    }
    const dx = px - last.current.x
    const dy = py - last.current.y
    // Only spawn after the cursor has travelled far enough — keeps it sparse.
    if (dx * dx + dy * dy < 70 * 70) return

    last.current = { x: px, y: py, init: true }
    const item = itemRefs.current[indexRef.current % count]
    item?.spawn(px, py)
    indexRef.current += 1
  }

  return (
    <div
      ref={wrapRef}
      onPointerMove={onPointerMove}
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {heroTrail.slice(0, count).map((src, i) => (
        <TrailItem
          key={i}
          src={src}
          ref={(el) => (itemRefs.current[i] = el)}
        />
      ))}
    </div>
  )
}

const MouseTrail = memo(MouseTrailInner)
export default MouseTrail
