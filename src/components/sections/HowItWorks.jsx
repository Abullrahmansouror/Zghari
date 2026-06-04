import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CalendarCheck, MapPin, Camera, Images } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const ICONS = [CalendarCheck, MapPin, Camera, Images]

/**
 * "How a Session Works" — cinematic 4-step process. Renders in the active
 * language only (EN or AR), with fonts switched accordingly. Desktop: a gold
 * dashed connector (left) whose dot scrubs down via GSAP ScrollTrigger; the
 * steps stack on the right.
 */
export default function HowItWorks() {
  const { t, i18n } = useTranslation()
  const ar = i18n.language === 'ar'
  const steps = t('howItWorks.steps', { returnObjects: true })
  const list = Array.isArray(steps) ? steps : []

  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const dotRef = useRef(null)

  // Gold dot scrubs down the connector as the section scrolls through view.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 768) return

    const ctx = gsap.context(() => {
      const line = lineRef.current
      const dot = dotRef.current
      if (!line || !dot) return
      gsap.set(dot, { xPercent: -50, y: 0 })
      gsap.to(dot, {
        y: () => line.offsetHeight - dot.offsetHeight,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 75%',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    const id = setTimeout(() => ScrollTrigger.refresh(), 300)
    // Scoped cleanup — reverts only this section's tween + trigger.
    return () => {
      clearTimeout(id)
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative bg-bg py-32 md:py-48"
    >
      <div className="container-x">
        {/* Heading */}
        <div className="mb-20 md:mb-28">
          <p className={`eyebrow ${ar ? 'font-ar' : ''}`}>
            {t('howItWorks.eyebrow')}
          </p>
          <h2
            className={`mt-5 text-4xl leading-[1.05] text-primary md:text-6xl ${
              ar ? 'font-ar' : 'font-display'
            }`}
          >
            {t('howItWorks.title')}
          </h2>
        </div>

        {/* Connector rail + steps */}
        <div className="grid gap-y-24 md:grid-cols-[5rem_1fr] md:gap-x-8 lg:grid-cols-[7rem_1fr]">
          {/* Decorative gold connector (desktop only) */}
          <div className="relative hidden md:block" aria-hidden="true">
            <div
              ref={lineRef}
              className="absolute inset-y-2 left-1/2 w-[2px] -translate-x-1/2"
            >
              <svg
                className="h-full w-full overflow-visible"
                preserveAspectRatio="none"
              >
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="100%"
                  stroke="rgba(201,168,76,0.2)"
                  strokeWidth="1"
                  strokeDasharray="2 7"
                />
              </svg>
              <span
                ref={dotRef}
                className="absolute left-1/2 top-0 h-3 w-3 rounded-full bg-gold shadow-[0_0_14px_rgba(201,168,76,0.55)]"
              />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-28 md:space-y-44">
            {list.map((step, i) => {
              const Icon = ICONS[i] || CalendarCheck
              return (
                <div key={i} className="relative">
                  {/* Faint decorative number behind the card */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.04 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, delay: Math.max(0, i * 0.15 - 0.05) }}
                    className="pointer-events-none absolute -top-16 end-0 select-none font-display leading-none text-primary"
                    style={{ fontSize: '140px' }}
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </motion.span>

                  {/* Card content */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ type: 'spring', stiffness: 60, damping: 20, delay: i * 0.15 }}
                    className="relative max-w-2xl"
                  >
                    <Icon size={32} weight="light" className="text-gold" />

                    <p
                      className={`mt-5 text-xs uppercase tracking-[0.2em] text-gold ${
                        ar ? 'font-ar' : 'font-sans'
                      }`}
                    >
                      {step.badge}
                    </p>

                    <h3
                      className={`mt-4 text-3xl text-primary md:text-4xl ${
                        ar ? 'font-ar' : 'font-display'
                      }`}
                    >
                      {step.title}
                    </h3>

                    <div className="my-5 h-px w-16 bg-gold/40" />

                    <p
                      className={`max-w-[52ch] text-sm leading-relaxed text-muted ${
                        ar ? 'font-ar' : 'font-sans'
                      }`}
                    >
                      {step.body}
                    </p>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
