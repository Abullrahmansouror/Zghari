import { useTranslation } from 'react-i18next'

function Row({ label, value, none }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-line py-3 last:border-b-0">
      <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
      <span className="text-end font-display text-lg text-primary">
        {value || none}
      </span>
    </div>
  )
}

/** Shimmer skeleton shown over the summary while submitting. */
function ShimmerCard() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="relative h-5 overflow-hidden rounded bg-surface2"
          style={{ width: `${90 - i * 8}%` }}
        >
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      ))}
    </div>
  )
}

export default function BookingStep4({ summary, submitting }) {
  const { t } = useTranslation()
  const none = t('booking.step4.none')

  return (
    <div>
      <h3 className="font-display text-3xl text-primary md:text-4xl">
        {t('booking.step4.title')}
      </h3>
      <p className="mt-2 font-sans text-sm text-muted">
        {t('booking.step4.subtitle')}
      </p>

      <div className="mt-8 rounded-xl border border-line bg-surface1 p-6 md:p-8">
        {submitting ? (
          <ShimmerCard />
        ) : (
          <>
            <Row label={t('booking.step4.experienceLabel')} value={summary.experience} none={none} />
            <Row label={t('booking.step4.dateLabel')} value={summary.date} none={none} />
            <Row label={t('booking.step4.timeLabel')} value={summary.time} none={none} />
            <Row label={t('booking.step4.nameLabel')} value={summary.name} none={none} />
            <Row label={t('booking.step4.phoneLabel')} value={summary.phone} none={none} />
            <Row label={t('booking.step4.instagramLabel')} value={summary.instagram} none={none} />
            <Row label={t('booking.step4.messageLabel')} value={summary.message} none={none} />
          </>
        )}
      </div>
    </div>
  )
}
