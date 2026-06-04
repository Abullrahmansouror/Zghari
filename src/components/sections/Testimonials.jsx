import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Star, Quotes } from '@phosphor-icons/react'
import { testimonialAvatars } from '../../data/images'

function TestimonialCard({ item, index, total, avatar }) {
  const ref = useRef(null)
  // Scale down + dim as the card gets buried by the next one.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 18%', 'end 18%'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.35])
  const isLast = index === total - 1

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `calc(7rem + ${index * 1.5}rem)` }}
    >
      <motion.article
        style={{ scale: isLast ? 1 : scale, opacity: isLast ? 1 : opacity }}
        className="rounded-2xl border border-line bg-surface1 p-8 shadow-2xl shadow-black/40 md:p-14"
      >
        <Quotes size={40} weight="fill" className="text-gold/30" />

        <div className="mt-5 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} weight="fill" className="text-gold" />
          ))}
        </div>

        <blockquote className="mt-6 font-display text-2xl italic leading-snug text-primary md:text-4xl md:leading-tight">
          “{item.quote}”
        </blockquote>

        <div className="mt-8 flex items-center gap-4">
          <img
            src={avatar}
            alt=""
            loading="lazy"
            className="h-12 w-12 rounded-full object-cover"
            style={{ backgroundColor: '#161616' }}
          />
          <div>
            <p className="font-sans text-sm text-primary">{item.name}</p>
            <p className="font-sans text-xs uppercase tracking-[0.15em] text-gold">
              {item.service}
            </p>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default function Testimonials() {
  const { t } = useTranslation()
  const items = t('testimonials.items', { returnObjects: true })
  const list = Array.isArray(items) ? items : []

  return (
    <section className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow mb-4">{t('testimonials.eyebrow')}</p>
          <h2 className="font-display text-5xl text-primary md:text-7xl">
            {t('testimonials.title')}
          </h2>
        </div>

        {/* Sticky scroll stack */}
        <div className="mx-auto flex max-w-3xl flex-col gap-8 pb-[30vh]">
          {list.map((item, i) => (
            <TestimonialCard
              key={i}
              item={item}
              index={i}
              total={list.length}
              avatar={testimonialAvatars[i % testimonialAvatars.length]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
