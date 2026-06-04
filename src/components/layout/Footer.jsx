import { useTranslation } from 'react-i18next'
import { ArrowUp } from '@phosphor-icons/react'
import { useScrollTo } from './SmoothScrollProvider'

export default function Footer() {
  const { t } = useTranslation()
  const scrollTo = useScrollTo()

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      {/* Oversized wordmark, bleeding off the baseline */}
      <div className="container-x pt-20 md:pt-28">
        <button
          type="button"
          onClick={() => scrollTo('#top')}
          aria-label={t('footer.backToTop')}
          className="block w-full select-none text-center font-display uppercase leading-[0.8] tracking-[0.08em] text-primary/90 transition-colors hover:text-gold"
          style={{ fontSize: 'clamp(3.5rem, 18vw, 16rem)' }}
        >
          Zghari
        </button>
      </div>

      <div className="container-x flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-xs tracking-[0.1em] text-muted">
          {t('footer.rights')}
        </p>
        <div className="flex items-center gap-6 font-sans text-xs tracking-[0.1em] text-muted">
          <a href="#" className="transition-colors hover:text-primary">
            {t('footer.privacy')}
          </a>
          <a href="#" className="transition-colors hover:text-primary">
            {t('footer.terms')}
          </a>
          <button
            type="button"
            onClick={() => scrollTo('#top')}
            className="inline-flex items-center gap-2 transition-colors hover:text-gold"
          >
            {t('footer.backToTop')}
            <ArrowUp size={14} weight="light" />
          </button>
        </div>
      </div>
    </footer>
  )
}
