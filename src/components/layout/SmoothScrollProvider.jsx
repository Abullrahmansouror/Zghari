import { createContext, useCallback, useContext } from 'react'
import { useLenis } from '../../hooks/useLenis'

const ScrollContext = createContext(() => {})

/** Smooth scroll to a target (selector string or element). */
export const useScrollTo = () => useContext(ScrollContext)

/**
 * Initializes Lenis once and exposes a smooth `scrollTo` to the whole tree.
 * Falls back to native smooth scroll when Lenis is disabled (reduced motion).
 */
export default function SmoothScrollProvider({ children }) {
  const lenisRef = useLenis()

  const scrollTo = useCallback(
    (target, opts = {}) => {
      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(target, { offset: -72, duration: 1.4, ...opts })
        return
      }
      const el =
        typeof target === 'string' ? document.querySelector(target) : target
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    [lenisRef]
  )

  return (
    <ScrollContext.Provider value={scrollTo}>{children}</ScrollContext.Provider>
  )
}
