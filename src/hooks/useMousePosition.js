import { useEffect } from 'react'
import { useMotionValue } from 'framer-motion'

/**
 * Tracks pointer position as Framer MotionValues (never React state, so it
 * never triggers re-renders). Optionally scoped to a target element via ref.
 *
 * @param {{ ref?: React.RefObject<HTMLElement>, normalized?: boolean }} [opts]
 * @returns {{ x: import('framer-motion').MotionValue<number>,
 *             y: import('framer-motion').MotionValue<number> }}
 */
export function useMousePosition({ ref, normalized = false } = {}) {
  // Start off-screen so trailing effects don't flash at origin.
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)

  useEffect(() => {
    const target = ref?.current ?? window

    const handle = (e) => {
      if (ref?.current) {
        const rect = ref.current.getBoundingClientRect()
        const localX = e.clientX - rect.left
        const localY = e.clientY - rect.top
        if (normalized) {
          x.set(rect.width ? (localX / rect.width) * 2 - 1 : 0)
          y.set(rect.height ? (localY / rect.height) * 2 - 1 : 0)
        } else {
          x.set(localX)
          y.set(localY)
        }
      } else {
        x.set(e.clientX)
        y.set(e.clientY)
      }
    }

    target.addEventListener('pointermove', handle, { passive: true })
    return () => target.removeEventListener('pointermove', handle)
  }, [ref, normalized, x, y])

  return { x, y }
}
