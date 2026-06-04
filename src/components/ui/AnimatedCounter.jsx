import { useEffect, useRef } from 'react'
import { useInView, animate } from 'framer-motion'

/**
 * Tweens a number from 0 → value when it scrolls into view. Writes directly to
 * the DOM node on each frame (no React state) to avoid per-frame re-renders.
 *
 * @param {{ value: number, suffix?: string, duration?: number,
 *           locale?: string, className?: string }} props
 */
export default function AnimatedCounter({
  value,
  suffix = '',
  duration = 2,
  locale = 'en',
  className = '',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  useEffect(() => {
    if (!inView) return
    const node = ref.current
    // i18n may hand us the value as a string — coerce defensively.
    const num = Number(value) || 0
    // For "70K+" style: show whole thousands as the K value.
    const display = num >= 1000 ? num / 1000 : num
    const controls = animate(0, display, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        if (!node) return
        const n = Math.round(v)
        node.firstChild.textContent = new Intl.NumberFormat(
          locale === 'ar' ? 'ar-EG' : 'en-US'
        ).format(n)
      },
    })
    return () => controls.stop()
  }, [inView, value, duration, locale])

  return (
    <span ref={ref} className={className}>
      <span>0</span>
      {suffix}
    </span>
  )
}
