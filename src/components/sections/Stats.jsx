import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp'

function StatCell({ item, index, inView, ar, locale }) {
  // Each counter staggers its start by 200ms per the spec.
  const count = useCountUp(item.value, 2200, inView, index * 200)
  const formatted = new Intl.NumberFormat(
    locale === 'ar' ? 'ar-EG' : 'en-US'
  ).format(count)

  return (
    <div
      className="border-[rgba(242,237,228,0.07)] px-4 py-8 text-center md:px-8 md:py-12
        [&:nth-child(2n)]:border-s
        [&:nth-child(n+3)]:border-t
        md:[&:nth-child(n+2)]:border-s
        md:[&:nth-child(n+3)]:border-t-0"
    >
      {/* Number + suffix, baseline-aligned */}
      <div className="flex items-baseline justify-center font-display text-gold">
        <span className="text-5xl leading-none md:text-7xl">{formatted}</span>
        {item.suffix && (
          <span className="text-3xl leading-none md:text-4xl">{item.suffix}</span>
        )}
      </div>

      {/* Label (active language) */}
      <p
        className={`mt-4 text-xs uppercase tracking-[0.18em] text-muted ${
          ar ? 'font-ar normal-case' : 'font-sans'
        }`}
      >
        {item.label}
      </p>
    </div>
  )
}

/**
 * Stats — a numbers-first social-proof declaration. Four counters animate from
 * zero (staggered) when the section enters view, framed by hairline rules.
 * Purely presentational: no API, no state beyond the counters.
 */
export default function Stats() {
  const { t, i18n } = useTranslation()
  const ar = i18n.language === 'ar'
  const items = t('stats.items', { returnObjects: true })
  const list = Array.isArray(items) ? items : []

  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, margin: '-80px' })

  return (
    <section className="relative bg-bg py-24 md:py-32">
      <div className="container-x">
        {/* Eyebrow — numbers speak, no title */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`mb-12 text-center text-xs uppercase tracking-[0.25em] text-gold md:mb-16 ${
            ar ? 'font-ar normal-case' : 'font-sans'
          }`}
        >
          {t('stats.eyebrow')}
        </motion.p>

        {/* Framed grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 border-y border-[rgba(242,237,228,0.06)] md:grid-cols-4"
        >
          {list.map((item, i) => (
            <StatCell
              key={i}
              item={item}
              index={i}
              inView={inView}
              ar={ar}
              locale={i18n.language}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
