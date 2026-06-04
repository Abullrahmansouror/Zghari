import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

const startOfDay = (d) => {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

/**
 * Custom, dependency-free dark calendar. Disables past dates, localizes month /
 * weekday labels + day numerals, and mirrors correctly under RTL.
 *
 * @param {{ value: Date|null, onChange: (d: Date) => void, locale: string }} props
 */
export default function CalendarPicker({ value, onChange, locale = 'en' }) {
  const { t } = useTranslation()
  const weekdays = t('booking.step2.weekdays', { returnObjects: true })
  const months = t('booking.step2.months', { returnObjects: true })

  const today = startOfDay(new Date())
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() })

  const fmt = useMemo(
    () => new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US'),
    [locale]
  )

  const firstWeekday = new Date(view.y, view.m, 1).getDay() // 0 = Sun
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate()

  const atFirstMonth =
    view.y === today.getFullYear() && view.m === today.getMonth()

  const shift = (delta) => {
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1)
      return { y: d.getFullYear(), m: d.getMonth() }
    })
  }

  const cells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const isSelected = (day) =>
    value &&
    value.getFullYear() === view.y &&
    value.getMonth() === view.m &&
    value.getDate() === day

  const isPast = (day) => new Date(view.y, view.m, day) < today

  return (
    <div className="rounded-xl border border-line bg-surface1 p-5 md:p-6">
      {/* Month header */}
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shift(-1)}
          disabled={atFirstMonth}
          aria-label={t('booking.step2.prevMonth')}
          className="grid h-9 w-9 place-items-center rounded-full border border-line text-primary transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
        >
          <CaretLeft size={16} weight="light" className="rtl:rotate-180" />
        </button>
        <p className="font-display text-xl text-primary">
          {months[view.m]} {fmt.format(view.y)}
        </p>
        <button
          type="button"
          onClick={() => shift(1)}
          aria-label={t('booking.step2.nextMonth')}
          className="grid h-9 w-9 place-items-center rounded-full border border-line text-primary transition-colors hover:border-gold hover:text-gold"
        >
          <CaretRight size={16} weight="light" className="rtl:rotate-180" />
        </button>
      </div>

      {/* Weekday labels */}
      <div className="mb-2 grid grid-cols-7 gap-1 text-center">
        {weekdays.map((w, i) => (
          <span
            key={i}
            className="py-1 font-sans text-[10px] uppercase tracking-[0.1em] text-muted"
          >
            {w}
          </span>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <span key={`b${i}`} />
          const past = isPast(day)
          const sel = isSelected(day)
          return (
            <button
              key={day}
              type="button"
              disabled={past}
              onClick={() => onChange(startOfDay(new Date(view.y, view.m, day)))}
              className={`aspect-square rounded-md font-sans text-sm transition-colors duration-200 ${
                sel
                  ? 'bg-gold font-medium text-bg'
                  : past
                  ? 'cursor-not-allowed text-muted/30'
                  : 'text-primary hover:bg-surface2'
              }`}
            >
              {fmt.format(day)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
