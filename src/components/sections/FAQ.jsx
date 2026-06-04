import { memo, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from '@phosphor-icons/react'

const CATEGORIES = ['all', 'pricing', 'sessions', 'booking', 'delivery']

/**
 * Isolated, memoized accordion row. Receives only primitives + a stable toggle,
 * so it re-renders only when its own `isOpen` flips — never on sibling toggles.
 */
const AccordionItem = memo(function AccordionItem({
  id,
  badge,
  question,
  answer,
  isOpen,
  onToggle,
  ar,
}) {
  return (
    <div className="border-b border-line py-6">
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 text-start"
      >
        <span
          className={`shrink-0 rounded-full border border-gold/30 px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] text-gold ${
            ar ? 'font-ar' : 'font-sans'
          }`}
        >
          {badge}
        </span>

        <span
          className={`flex-1 text-xl text-primary md:text-2xl ${
            ar ? 'font-ar' : 'font-display'
          }`}
        >
          {question}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="shrink-0 text-gold"
          aria-hidden="true"
        >
          <Plus size={20} weight="light" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pe-8 pt-5">
              <div className="mb-4 h-px w-12 bg-gold/40" />
              <p
                className={`max-w-2xl text-sm leading-relaxed text-muted ${
                  ar ? 'font-ar' : 'font-sans'
                }`}
              >
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

export default function FAQ() {
  const { t, i18n } = useTranslation()
  const ar = i18n.language === 'ar'

  const items = t('faq.items', { returnObjects: true })
  const list = Array.isArray(items) ? items : []

  const [activeCategory, setActiveCategory] = useState('all')
  const [openId, setOpenId] = useState(null)

  // Stable toggle so the memoized rows don't re-render on every parent update.
  const handleToggle = useCallback(
    (id) => setOpenId((prev) => (prev === id ? null : id)),
    []
  )

  const filtered = useMemo(
    () =>
      activeCategory === 'all'
        ? list
        : list.filter((item) => item.category === activeCategory),
    [activeCategory, list]
  )

  return (
    <section id="faq" className="relative py-32 md:py-40">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className={`eyebrow mb-4 ${ar ? 'font-ar' : ''}`}>
            {t('faq.eyebrow')}
          </p>
          <h2
            className={`text-4xl text-primary md:text-5xl ${
              ar ? 'font-ar' : 'font-display'
            }`}
          >
            {t('faq.title')}
          </h2>
        </motion.div>

        {/* Category filter pills */}
        <div className="mb-10 flex flex-wrap gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`relative rounded-full px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${
                  active
                    ? 'text-bg'
                    : 'border border-[rgba(242,237,228,0.12)] text-muted hover:border-gold/50 hover:text-primary'
                } ${ar ? 'font-ar normal-case' : 'font-sans'}`}
              >
                {active && (
                  <motion.span
                    layoutId="faq-pill"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="relative">{t(`faq.categories.${cat}`)}</span>
              </button>
            )
          })}
        </div>

        {/* Accordion */}
        <div>
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 28,
                  delay: i * 0.06,
                }}
              >
                <AccordionItem
                  id={item.id}
                  badge={t(`faq.categories.${item.category}`)}
                  question={item.q}
                  answer={item.a}
                  isOpen={openId === item.id}
                  onToggle={handleToggle}
                  ar={ar}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
