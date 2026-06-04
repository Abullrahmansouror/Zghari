import { Suspense, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import ParticleField from '../3d/ParticleField'
import MouseTrail from '../ui/MouseTrail'
import { useMousePosition } from '../../hooks/useMousePosition'
import { useScrollTo } from '../layout/SmoothScrollProvider'

const lineReveal = {
  hidden: { y: '110%' },
  show: (i) => ({
    y: '0%',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.09 },
  }),
}

export default function Hero() {
  const { t } = useTranslation()
  const heroRef = useRef(null)
  const pointer = useMousePosition({ ref: heroRef, normalized: true })
  const scrollTo = useScrollTo()

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative isolate min-h-[100dvh] w-full overflow-hidden"
    >
      {/* 3D particle atmosphere — scoped to the Hero only */}
      <div className="absolute inset-0">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 6], fov: 55 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <ParticleField pointer={pointer} />
          </Suspense>
        </Canvas>
      </div>

      {/* Mouse photo-trail (own pointer handling, no state) */}
      <MouseTrail />

      {/* Atmospheric gradients for depth + legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_15%_10%,transparent,rgba(10,10,10,0.55)_55%,#0a0a0a_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent"
      />

      {/* Left-aligned hero content (anti-center bias) */}
      <div className="container-x pointer-events-none relative flex min-h-[100dvh] flex-col justify-center pt-24 pb-28">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="eyebrow pointer-events-auto mb-6 flex items-center gap-3"
          >
            <span className="inline-block h-px w-10 bg-gold/60" />
            {t('hero.eyebrow')}
          </motion.p>

          <h1 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] font-medium leading-[1.08] tracking-tight text-primary rtl:tracking-normal">
            {[
              [{ txt: t('hero.titleA') }],
              [{ txt: t('hero.titleB'), gold: true }],
              [{ txt: t('hero.titleC') }, { txt: t('hero.titleD'), gold: true }],
            ].map((segments, i) => (
              <span key={i} className="mask-clip">
                <motion.span
                  custom={i}
                  variants={lineReveal}
                  initial="hidden"
                  animate="show"
                  className="inline-block"
                >
                  {segments.map((seg, j) => (
                    <span key={j} className={seg.gold ? 'italic text-gold' : undefined}>
                      {j > 0 ? ' ' : ''}
                      {seg.txt}
                    </span>
                  ))}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="pointer-events-auto mt-8 max-w-md font-sans text-base leading-relaxed text-muted"
          >
            {t('hero.body')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4"
          >
            <button type="button" onClick={() => scrollTo('#work')} className="btn-fill">
              {t('hero.ctaPortfolio')}
              <ArrowRight size={16} weight="light" />
            </button>
            <button type="button" onClick={() => scrollTo('#book')} className="btn-outline">
              {t('hero.ctaBook')}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — thin line + sliding dot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">
          {t('hero.scroll')}
        </span>
        <span className="relative block h-16 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 block h-1/2 w-px animate-scroll-dot bg-gold" />
        </span>
      </motion.div>
    </section>
  )
}
