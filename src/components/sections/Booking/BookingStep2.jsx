import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import CalendarPicker from './CalendarPicker'

export default function BookingStep2({ date, slot, onDate, onSlot, error }) {
  const { t, i18n } = useTranslation()
  const slots = t('booking.step2.slots', { returnObjects: true })

  return (
    <div>
      <h3 className="font-display text-3xl text-primary md:text-4xl">
        {t('booking.step2.title')}
      </h3>
      <p className="mt-2 font-sans text-sm text-muted">
        {t('booking.step2.subtitle')}
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <CalendarPicker value={date} onChange={onDate} locale={i18n.language} />

        <div>
          <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.2em] text-muted">
            {t('booking.step2.slotsLabel')}
          </p>
          <div className="flex flex-col gap-3">
            {slots.map((s) => {
              const active = slot === s.id
              return (
                <motion.button
                  key={s.id}
                  type="button"
                  onClick={() => onSlot(s.id)}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-between rounded-lg border px-5 py-4 text-start transition-colors ${
                    active
                      ? 'border-gold bg-gold/10'
                      : 'border-line bg-surface1 hover:border-gold/40'
                  }`}
                >
                  <span
                    className={`font-display text-xl ${
                      active ? 'text-gold' : 'text-primary'
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="font-sans text-xs tracking-[0.05em] text-muted">
                    {s.hint}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {error && (
            <p className="mt-4 font-sans text-xs text-gold">
              {!date
                ? t('booking.validation.date')
                : t('booking.validation.slot')}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
