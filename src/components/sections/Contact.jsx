import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { InstagramLogo, WhatsappLogo, ArrowUpRight } from '@phosphor-icons/react'
import Magnetic from '../ui/Magnetic'
import { INSTAGRAM_URL, whatsappLink } from '../../data/site'

function SocialLink({ icon: Icon, label, href }) {
  return (
    <Magnetic strength={0.5}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 rounded-full border border-line px-7 py-4 font-sans text-sm text-primary transition-colors hover:border-gold"
      >
        <Icon size={22} weight="light" className="text-gold" />
        {label}
        <ArrowUpRight
          size={15}
          weight="light"
          className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
        />
      </a>
    </Magnetic>
  )
}

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="relative py-28 md:py-48">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          {/* Left — get in touch */}
          <div>
            <p className="eyebrow mb-5">{t('contact.eyebrow')}</p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl leading-[0.95] text-primary md:text-8xl"
            >
              {t('contact.title')}
            </motion.h2>

            <p className="mt-8 max-w-md font-sans text-base leading-relaxed text-muted">
              {t('contact.intro')}
            </p>

            <div className="mt-12 space-y-8">
              <div>
                <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted">
                  {t('contact.emailLabel')}
                </p>
                <a
                  href={`mailto:${t('contact.email')}`}
                  className="font-display text-3xl text-primary transition-colors hover:text-gold md:text-4xl"
                >
                  {t('contact.email')}
                </a>
              </div>
              <div>
                <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted">
                  {t('contact.whatsappLabel')}
                </p>
                <a
                  href={whatsappLink(t('contact.whatsappNumber'), t('contact.whatsappText'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-3xl text-primary transition-colors hover:text-gold md:text-4xl"
                  dir="ltr"
                >
                  {t('contact.whatsappDisplay')}
                </a>
              </div>
            </div>
          </div>

          {/* Right — socials with magnetic hover */}
          <div className="flex flex-col items-start gap-5 lg:items-end lg:justify-center">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted">
              {t('contact.followLabel')}
            </p>
            <SocialLink
              icon={InstagramLogo}
              label={t('contact.instagram')}
              href={INSTAGRAM_URL}
            />
            <SocialLink
              icon={WhatsappLogo}
              label={t('contact.whatsappLabel')}
              href={whatsappLink(t('contact.whatsappNumber'), t('contact.whatsappText'))}
            />
            <p className="mt-6 max-w-xs font-sans text-xs leading-relaxed text-muted lg:text-end">
              {t('contact.based')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
