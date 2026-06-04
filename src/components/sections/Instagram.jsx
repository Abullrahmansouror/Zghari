import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { InstagramLogo, Heart, ChatCircle, ArrowUpRight, Hand } from '@phosphor-icons/react'
import { instagram as feed } from '../../data/images'
import { INSTAGRAM_URL } from '../../data/site'

// Mock engagement per post.
const STATS = [
  { likes: 2431, comments: 84 },
  { likes: 5120, comments: 212 },
  { likes: 1870, comments: 47 },
  { likes: 3604, comments: 129 },
  { likes: 9210, comments: 341 },
  { likes: 2755, comments: 96 },
]

export default function Instagram() {
  const { t, i18n } = useTranslation()
  const constraints = useRef(null)
  const fmt = new Intl.NumberFormat(i18n.language === 'ar' ? 'ar-EG' : 'en-US')

  return (
    <section className="relative py-28 md:py-40">
      <div className="container-x">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-2">
              <InstagramLogo size={16} weight="light" />
              {t('instagram.handle')}
            </p>
            <h2 className="font-display text-5xl text-primary md:text-7xl">
              {t('instagram.title')}
            </h2>
            <p className="mt-4 max-w-md font-sans text-base text-muted">
              {t('instagram.subtitle')}
            </p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-primary transition-colors hover:text-gold"
          >
            {t('instagram.follow')}
            <ArrowUpRight
              size={14}
              weight="light"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* Drag hint */}
        <p className="mt-8 flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-muted">
          <Hand size={14} weight="light" />
          {t('instagram.drag')}
        </p>
      </div>

      {/* Draggable strip */}
      <div ref={constraints} className="mt-5 cursor-grab overflow-hidden active:cursor-grabbing">
        <motion.div
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.08}
          className="flex w-max gap-4 px-4 md:gap-6 md:px-[8vw]"
        >
          {feed.map((post, i) => (
            <motion.a
              key={post.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.preventDefault()}
              whileHover={{ y: -6 }}
              className="group relative aspect-square w-64 shrink-0 overflow-hidden rounded-md border border-line md:w-72"
            >
              <img
                src={post.src}
                alt=""
                draggable={false}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundColor: '#161616' }}
              />
              {/* Engagement overlay */}
              <div className="absolute inset-0 flex items-center justify-center gap-6 bg-bg/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-2 font-sans text-sm text-primary">
                  <Heart size={18} weight="fill" className="text-gold" />
                  {fmt.format(STATS[i % STATS.length].likes)}
                </span>
                <span className="flex items-center gap-2 font-sans text-sm text-primary">
                  <ChatCircle size={18} weight="fill" className="text-gold" />
                  {fmt.format(STATS[i % STATS.length].comments)}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
