import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import SpotlightCard from '../ui/SpotlightCard'
import ScrollProgressPath from '../ui/ScrollProgressPath'
import { useScrollTo } from '../layout/SmoothScrollProvider'

function ServiceCard({ index, name, desc, price, fromLabel, currency, bookLabel, onBook }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <SpotlightCard className="px-7 py-9 md:px-12 md:py-12">
        <div className="grid items-center gap-7 md:grid-cols-[auto_1fr_auto] md:gap-12">
          <span className="font-display text-6xl leading-none text-gold/25 md:text-8xl">
            0{index + 1}
          </span>

          <div>
            <h3 className="font-display text-3xl text-primary md:text-4xl">
              {name}
            </h3>
            <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-muted">
              {desc}
            </p>
          </div>

          <div className="flex items-center justify-between gap-6 md:flex-col md:items-end md:justify-self-end">
            <div className="text-start md:text-end">
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted">
                {fromLabel}
              </p>
              <p className="font-display text-2xl text-primary">
                {currency}&nbsp;{price}
              </p>
            </div>
            <button
              type="button"
              onClick={onBook}
              className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-gold"
            >
              {bookLabel}
              <ArrowRight
                size={15}
                weight="light"
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </button>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const scrollTo = useScrollTo()
  const listRef = useRef(null)
  const items = t('services.items', { returnObjects: true })
  const list = Array.isArray(items) ? items : []

  return (
    <section id="services" className="relative py-28 md:py-40">
      <div className="container-x">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">{t('services.eyebrow')}</p>
          <h2 className="font-display text-5xl leading-[0.95] text-primary md:text-7xl">
            {t('services.title')}
          </h2>
          <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-muted">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Path rail + cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[24px_1fr] lg:gap-x-10">
          <div className="relative hidden lg:block">
            <ScrollProgressPath
              targetRef={listRef}
              nodes={list.length}
              className="absolute inset-y-2 left-1/2 -translate-x-1/2"
            />
          </div>

          <div ref={listRef} className="flex flex-col gap-6">
            {list.map((s, i) => (
              <ServiceCard
                key={i}
                index={i}
                name={s.name}
                desc={s.desc}
                price={s.price}
                fromLabel={t('services.from')}
                currency={t('services.currency')}
                bookLabel={t('services.book')}
                onBook={() => scrollTo('#book')}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
