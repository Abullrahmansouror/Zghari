import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Check } from '@phosphor-icons/react'
import { bookingExperiences } from '../../../data/images'

export default function BookingStep1({ value, onSelect, error }) {
  const { t } = useTranslation()
  const experiences = t('booking.step1.experiences', { returnObjects: true })

  return (
    <div>
      <h3 className="font-display text-3xl text-primary md:text-4xl">
        {t('booking.step1.title')}
      </h3>
      <p className="mt-2 font-sans text-sm text-muted">
        {t('booking.step1.subtitle')}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {bookingExperiences.map((photo, i) => {
          const selected = value === i
          return (
            <motion.button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              whileTap={{ scale: 0.97 }}
              animate={{ scale: selected ? 1.03 : 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className={`group relative aspect-[3/4] overflow-hidden rounded-lg border text-start transition-colors ${
                selected ? 'border-gold' : 'border-line hover:border-gold/40'
              }`}
            >
              <img
                src={photo.src}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundColor: '#161616' }}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/30 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4">
                <span className="block font-display text-xl text-primary">
                  {experiences[i]?.name}
                </span>
                <span className="mt-1 block font-sans text-[11px] leading-snug text-muted">
                  {experiences[i]?.desc}
                </span>
              </span>

              {/* Selected ring + check */}
              <span
                className={`pointer-events-none absolute inset-0 rounded-lg ring-2 ring-inset transition-all duration-300 ${
                  selected ? 'ring-gold' : 'ring-transparent'
                }`}
              />
              {selected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="absolute end-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-gold text-bg"
                >
                  <Check size={15} weight="bold" />
                </motion.span>
              )}
            </motion.button>
          )
        })}
      </div>

      {error && (
        <p className="mt-4 font-sans text-xs text-gold">
          {t('booking.validation.experience')}
        </p>
      )}
    </div>
  )
}
