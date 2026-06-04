import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const CATEGORIES = ['all', 'street', 'portrait', 'events', 'editorial']

export default function GalleryFilter({ value, onChange }) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {CATEGORIES.map((cat) => {
        const active = value === cat
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            className={`relative rounded-full border px-5 py-2 font-sans text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${
              active
                ? 'border-gold text-bg'
                : 'border-line text-muted hover:border-gold/40 hover:text-primary'
            }`}
          >
            {active && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-gold"
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              />
            )}
            <span className="relative">{t(`gallery.filters.${cat}`)}</span>
          </button>
        )
      })}
    </div>
  )
}

export { CATEGORIES }
