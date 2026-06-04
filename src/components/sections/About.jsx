import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { InstagramLogo, ArrowUpRight } from '@phosphor-icons/react'
import AnimatedCounter from '../ui/AnimatedCounter'
import { aboutPortraits } from '../../data/images'
import { INSTAGRAM_URL } from '../../data/site'

const lineVariants = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  const { t, i18n } = useTranslation()
  const lines = t('about.lines', { returnObjects: true })
  const lineList = Array.isArray(lines) ? lines : []

  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Sticky text column */}
        <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
          <p className="eyebrow mb-5">{t('about.eyebrow')}</p>

          {/* Line-by-line mask reveal */}
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-20% 0px' }}
            transition={{ staggerChildren: 0.1 }}
            className="font-display text-[2.6rem] leading-[1.04] text-primary md:text-6xl md:leading-[1.02]"
          >
            {lineList.map((line, i) => (
              <span key={i} className="mask-clip">
                <motion.span variants={lineVariants} className="inline-block">
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          {/* Pull quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="my-12 border-s-2 border-gold ps-6 font-display text-2xl italic leading-snug text-primary/90 md:text-3xl"
          >
            {t('about.quote')}
          </motion.blockquote>

          <p className="max-w-md font-sans text-base leading-relaxed text-muted">
            {t('about.body')}
          </p>

          {/* Counter + CTA */}
          <div className="mt-12 flex flex-wrap items-end gap-x-12 gap-y-8">
            <div>
              <AnimatedCounter
                value={t('about.statValue')}
                suffix={t('about.statSuffix')}
                locale={i18n.language}
                className="font-display text-6xl text-gold md:text-7xl"
              />
              <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-muted">
                {t('about.statLabel')}
              </p>
            </div>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-primary transition-colors hover:text-gold"
            >
              <InstagramLogo size={18} weight="light" />
              {t('about.instaCta')}
              <ArrowUpRight
                size={14}
                weight="light"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {/* Scrolling portrait sequence */}
        <div className="flex flex-col gap-6 md:gap-10">
          {aboutPortraits.map((photo, i) => (
            <motion.figure
              key={photo.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={`overflow-hidden rounded-md border border-line ${
                i % 2 === 1 ? 'lg:ms-16' : 'lg:me-16'
              }`}
            >
              <img
                src={photo.src}
                alt=""
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
                style={{ backgroundColor: '#161616' }}
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
