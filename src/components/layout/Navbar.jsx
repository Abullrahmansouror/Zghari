import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { useScrollTo } from './SmoothScrollProvider'

const LINKS = [
  { key: 'work', href: '#work' },
  { key: 'services', href: '#services' },
  { key: 'about', href: '#about' },
  { key: 'contact', href: '#contact' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const scrollTo = useScrollTo()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Discrete state flip on scroll threshold (not a continuous animation).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (href) => {
    setOpen(false)
    scrollTo(href)
  }

  const setLang = (lng) => i18n.changeLanguage(lng)
  const isAr = i18n.language === 'ar'

  return (
    <header
      className="fixed inset-x-0 top-0"
      style={{ zIndex: 'var(--z-nav)' }}
    >
      <nav
        className={`transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled || open
            ? 'border-b border-line bg-black/40 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => go('#top')}
            className="font-display text-xl uppercase tracking-[0.3em] text-primary transition-colors hover:text-gold"
          >
            Zghari
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <li key={l.key}>
                <button
                  type="button"
                  onClick={() => go(l.href)}
                  className="group relative font-sans text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-primary"
                >
                  {t(`nav.${l.key}`)}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 font-sans text-xs tracking-[0.1em] sm:flex">
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={!isAr}
                className={!isAr ? 'text-gold' : 'text-muted hover:text-primary'}
              >
                EN
              </button>
              <span className="text-line">|</span>
              <button
                type="button"
                onClick={() => setLang('ar')}
                aria-pressed={isAr}
                className={`font-ar ${isAr ? 'text-gold' : 'text-muted hover:text-primary'}`}
              >
                عربي
              </button>
            </div>

            <button
              type="button"
              onClick={() => go('#book')}
              className="btn-outline hidden md:inline-flex"
            >
              {t('nav.book')}
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t('nav.close') : t('nav.menu')}
              className="grid h-10 w-10 place-items-center text-primary md:hidden"
            >
              {open ? <X size={24} weight="light" /> : <List size={24} weight="light" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 flex flex-col bg-bg/95 backdrop-blur-xl md:hidden"
            style={{ zIndex: -1 }}
          >
            <motion.ul
              className="flex flex-1 flex-col justify-center gap-2 px-8"
              initial="hidden"
              animate="show"
              variants={{
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
            >
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.key}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <button
                    type="button"
                    onClick={() => go(l.href)}
                    className="flex items-baseline gap-4 py-2 font-display text-5xl text-primary"
                  >
                    <span className="font-sans text-xs text-gold">0{i + 1}</span>
                    {t(`nav.${l.key}`)}
                  </button>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
              className="flex items-center justify-between border-t border-line px-8 py-7"
            >
              <div className="flex items-center gap-3 font-sans text-sm">
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={!isAr ? 'text-gold' : 'text-muted'}
                >
                  EN
                </button>
                <span className="text-line">|</span>
                <button
                  type="button"
                  onClick={() => setLang('ar')}
                  className={`font-ar ${isAr ? 'text-gold' : 'text-muted'}`}
                >
                  عربي
                </button>
              </div>
              <button type="button" onClick={() => go('#book')} className="btn-fill">
                {t('nav.book')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
