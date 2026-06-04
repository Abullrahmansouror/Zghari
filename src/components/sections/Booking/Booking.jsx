import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, PaperPlaneTilt } from '@phosphor-icons/react'
import { bookingBackgrounds } from '../../../data/images'
import BookingStep1 from './BookingStep1'
import BookingStep2 from './BookingStep2'
import BookingStep3 from './BookingStep3'
import BookingStep4 from './BookingStep4'
import ParticleButton from './ParticleButton'

const TOTAL = 4

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
}

/** Gold confetti burst for the success state. */
function Confetti() {
  const bits = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        x: (Math.random() - 0.5) * 700,
        y: 200 + Math.random() * 500,
        rot: Math.random() * 540,
        delay: Math.random() * 0.3,
        size: 5 + Math.random() * 7,
        gold: Math.random() > 0.4,
        key: i,
      })),
    []
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((b) => (
        <motion.span
          key={b.key}
          className="absolute left-1/2 top-1/3 rounded-[1px]"
          style={{
            width: b.size,
            height: b.size * 0.5,
            backgroundColor: b.gold ? '#C9A84C' : '#F2EDE4',
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: b.x, y: b.y, opacity: 0, rotate: b.rot }}
          transition={{ duration: 1.8, ease: 'easeOut', delay: b.delay }}
        />
      ))}
    </div>
  )
}

export default function Booking() {
  const { t, i18n } = useTranslation()
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState(1)
  const [experience, setExperience] = useState(null)
  const [date, setDate] = useState(null)
  const [slot, setSlot] = useState(null)
  const [errExp, setErrExp] = useState(false)
  const [errDate, setErrDate] = useState(false)
  const [status, setStatus] = useState('idle') // idle | submitting | success

  const {
    register,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const goTo = (next, direction) => {
    setDir(direction)
    setStep(next)
  }

  const next1 = () => {
    if (experience === null) return setErrExp(true)
    setErrExp(false)
    goTo(2, 1)
  }
  const next2 = () => {
    if (!date || !slot) return setErrDate(true)
    setErrDate(false)
    goTo(3, 1)
  }
  // Validate step-3 fields manually (no form submit → no button type-flip).
  const next3 = async () => {
    const valid = await trigger()
    if (valid) goTo(4, 1)
  }
  const handleNext = () => {
    if (step === 1) return next1()
    if (step === 2) return next2()
    if (step === 3) return next3()
  }
  const back = () => goTo(step - 1, -1)

  const submit = () => {
    setStatus('submitting')
    // Mock network round-trip → success.
    window.setTimeout(() => setStatus('success'), 1400)
  }

  const restart = () => {
    setStatus('idle')
    setExperience(null)
    setDate(null)
    setSlot(null)
    reset()
    goTo(1, -1)
  }

  // Build the summary shown in step 4.
  const summary = useMemo(() => {
    const experiences = t('booking.step1.experiences', { returnObjects: true })
    const slots = t('booking.step2.slots', { returnObjects: true })
    const v = getValues()
    return {
      experience: experience !== null ? experiences[experience]?.name : '',
      date: date
        ? new Intl.DateTimeFormat(i18n.language === 'ar' ? 'ar-EG' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(date)
        : '',
      time: slot ? slots.find((s) => s.id === slot)?.label : '',
      name: v.name,
      phone: v.phone,
      instagram: v.instagram,
      message: v.message,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, experience, date, slot, i18n.language])

  const submitting = status === 'submitting'

  return (
    <section id="book" className="relative overflow-hidden py-28 md:py-40">
      {/* Subtle blurred background that shifts per step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bookingBackgrounds[(step - 1) % bookingBackgrounds.length]})`,
            filter: 'blur(28px)',
          }}
        />
      </AnimatePresence>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-bg/70"
      />

      <div className="container-x relative">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="eyebrow mb-3">{t('booking.eyebrow')}</p>
          <h2 className="font-display text-5xl text-primary md:text-7xl">
            {t('booking.title')}
          </h2>
        </div>

        {/* Progress line + step ticks (transform-based, not width) */}
        <div className="mx-auto mb-12 max-w-2xl">
          <div className="mb-3 flex items-center justify-between font-sans text-[11px] uppercase tracking-[0.16em] text-muted">
            <span>
              {t('booking.stepLabel')}{' '}
              {new Intl.NumberFormat(i18n.language === 'ar' ? 'ar-EG' : 'en-US').format(step)}{' '}
              {t('booking.of')}{' '}
              {new Intl.NumberFormat(i18n.language === 'ar' ? 'ar-EG' : 'en-US').format(TOTAL)}
            </span>
            <span className="text-primary">
              {t(`booking.steps.${['one', 'two', 'three', 'four'][step - 1]}`)}
            </span>
          </div>
          <div className="relative h-px w-full bg-line">
            <motion.div
              className="absolute inset-y-0 left-0 h-px w-full origin-left bg-gold rtl:origin-right"
              animate={{ scaleX: step / TOTAL }}
              transition={{ type: 'spring', stiffness: 120, damping: 22 }}
            />
          </div>
        </div>

        {/* Step viewport. Navigation is button-driven (not form submit), so
            Enter never accidentally skips a step. */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto max-w-3xl"
        >
          <div className="relative min-h-[26rem] overflow-hidden">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={step}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 1 && (
                  <BookingStep1
                    value={experience}
                    onSelect={(i) => {
                      setExperience(i)
                      setErrExp(false)
                    }}
                    error={errExp}
                  />
                )}
                {step === 2 && (
                  <BookingStep2
                    date={date}
                    slot={slot}
                    onDate={(d) => {
                      setDate(d)
                      setErrDate(false)
                    }}
                    onSlot={(s) => {
                      setSlot(s)
                      setErrDate(false)
                    }}
                    error={errDate}
                  />
                )}
                {step === 3 && <BookingStep3 register={register} errors={errors} />}
                {step === 4 && (
                  <BookingStep4 summary={summary} submitting={submitting} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer controls */}
          <div className="mt-10 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={back}
                aria-label={t('booking.back')}
                disabled={submitting}
                className="grid h-12 w-12 place-items-center rounded-full border border-line text-primary transition-colors hover:border-gold hover:text-gold disabled:opacity-40"
              >
                <ArrowLeft size={18} weight="light" className="rtl:rotate-180" />
              </button>
            ) : (
              <span />
            )}

            {step < 4 && (
              <button type="button" onClick={handleNext} className="btn-fill">
                {t('booking.next')}
                <ArrowRight size={16} weight="light" className="rtl:rotate-180" />
              </button>
            )}

            {step === 4 && (
              <ParticleButton
                onClick={submit}
                disabled={submitting}
                className="btn-fill min-w-[200px]"
              >
                {submitting
                  ? t('booking.step4.submitting')
                  : t('booking.step4.submit')}
                {!submitting && (
                  <PaperPlaneTilt size={16} weight="light" className="rtl:rotate-180" />
                )}
              </ParticleButton>
            )}
          </div>
        </form>
      </div>

      {/* Success overlay */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-bg/95 px-6 text-center backdrop-blur-md"
            style={{ zIndex: 'var(--z-modal)' }}
          >
            <Confetti />
            <motion.h2
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl italic text-primary md:text-7xl"
            >
              {t('booking.success.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 font-sans text-base text-muted"
            >
              {t('booking.success.message')}
            </motion.p>
            <motion.button
              type="button"
              onClick={restart}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="btn-outline mt-10"
            >
              {t('booking.success.again')}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
