import { useState, useEffect, useRef } from 'react'

/**
 * Animates a number from 0 → `end` over `duration` ms once `inView` is true.
 * Uses requestAnimationFrame only (never setInterval/setTimeout loops) and
 * cancels the frame on cleanup. An optional `delay` (ms) staggers the start.
 *
 * @param {number} end       target value
 * @param {number} duration  tween length in ms
 * @param {boolean} inView    start when this becomes true
 * @param {number} delay      ms to wait after inView before counting
 */
export function useCountUp(end, duration = 2000, inView = false, delay = 0) {
  const [count, setCount] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!inView) return

    // Honor reduced-motion: jump straight to the final value.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(end)
      return
    }

    let startTime = null
    const step = (timestamp) => {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime - delay
      if (elapsed < 0) {
        // Still inside the stagger delay — hold at 0, keep the loop alive.
        frameRef.current = requestAnimationFrame(step)
        return
      }
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * end))
      if (progress < 1) frameRef.current = requestAnimationFrame(step)
    }

    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
  }, [inView, end, duration, delay])

  return count
}
