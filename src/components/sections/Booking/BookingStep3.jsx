import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'

const inputBase =
  'w-full rounded-lg border bg-surface1 px-4 py-3.5 font-sans text-sm text-primary placeholder:text-muted/60 transition-colors focus:outline-none focus:border-gold'

function Field({ label, error, children }) {
  // Rule 6: label above, error below, gap-2 between blocks.
  return (
    <label className="flex flex-col gap-2">
      <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      {children}
      {error && <span className="font-sans text-xs text-gold">{error}</span>}
    </label>
  )
}

export default function BookingStep3({ register, errors }) {
  const { t } = useTranslation()
  const hear = t('booking.step3.hear', { returnObjects: true })
  const options = Array.isArray(hear.options) ? hear.options : []

  return (
    <div>
      <h3 className="font-display text-3xl text-primary md:text-4xl">
        {t('booking.step3.title')}
      </h3>
      <p className="mt-2 font-sans text-sm text-muted">
        {t('booking.step3.subtitle')}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Field
          label={t('booking.step3.name.label')}
          error={errors.name && t('booking.step3.name.error')}
        >
          <input
            type="text"
            autoComplete="name"
            placeholder={t('booking.step3.name.placeholder')}
            className={`${inputBase} ${errors.name ? 'border-gold' : 'border-line'}`}
            {...register('name', { required: true, minLength: 2 })}
          />
        </Field>

        <Field
          label={t('booking.step3.phone.label')}
          error={errors.phone && t('booking.step3.phone.error')}
        >
          <input
            type="tel"
            autoComplete="tel"
            placeholder={t('booking.step3.phone.placeholder')}
            className={`${inputBase} ${errors.phone ? 'border-gold' : 'border-line'}`}
            {...register('phone', { required: true, pattern: /^[+\d][\d\s-]{6,}$/ })}
          />
        </Field>

        <Field label={t('booking.step3.instagram.label')}>
          <input
            type="text"
            placeholder={t('booking.step3.instagram.placeholder')}
            className={`${inputBase} border-line`}
            {...register('instagram')}
          />
        </Field>

        <Field label={t('booking.step3.hear.label')}>
          <div className="relative">
            <select
              defaultValue=""
              className={`${inputBase} appearance-none border-line pe-10`}
              {...register('hear')}
            >
              <option value="" disabled>
                {t('booking.step3.hear.placeholder')}
              </option>
              {options.map((opt, i) => (
                <option key={i} value={opt} className="bg-surface1 text-primary">
                  {opt}
                </option>
              ))}
            </select>
            <CaretDown
              size={16}
              weight="light"
              className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-muted"
            />
          </div>
        </Field>

        <div className="md:col-span-2">
          <Field
            label={t('booking.step3.message.label')}
            error={errors.message && t('booking.step3.message.error')}
          >
            <textarea
              rows={4}
              placeholder={t('booking.step3.message.placeholder')}
              className={`${inputBase} resize-none ${
                errors.message ? 'border-gold' : 'border-line'
              }`}
              {...register('message', { required: true, minLength: 4 })}
            />
          </Field>
        </div>
      </div>
    </div>
  )
}
