import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowsOut } from '@phosphor-icons/react'
import { galleryMasonry } from '../../../data/images'
import ParallaxTiltCard from '../../ui/ParallaxTiltCard'
import GalleryFilter from './GalleryFilter'
import ImageModal from './ImageModal'
import HorizontalScroll from './HorizontalScroll'

function GalleryItem({ item, title, onOpen }) {
  return (
    <motion.figure
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: (item.index % 6) * 0.04,
      }}
      className="mb-4 break-inside-avoid sm:mb-6"
    >
      <ParallaxTiltCard
        className="group cursor-pointer"
        onClick={() => onOpen(item)}
      >
        <div
          className="relative overflow-hidden rounded-md border border-line"
          style={{ aspectRatio: item.ratio.replace('/', ' / ') }}
        >
          <motion.img
            layoutId={`photo-${item.id}`}
            src={item.src}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
            style={{ backgroundColor: '#161616' }}
          />
          {/* Gold overlay + title on hover */}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-bg/85 via-bg/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="flex w-full items-center justify-between p-5">
              <figcaption className="font-display text-2xl text-primary">
                {title}
              </figcaption>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/50 text-gold">
                <ArrowsOut size={16} weight="light" />
              </span>
            </div>
          </div>
          <span className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/40" />
        </div>
      </ParallaxTiltCard>
    </motion.figure>
  )
}

export default function Gallery() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? galleryMasonry
        : galleryMasonry.filter((p) => p.category === filter),
    [filter]
  )

  return (
    <section id="work" className="relative py-28 md:py-40">
      <div className="container-x">
        {/* Header — asymmetric */}
        <div className="grid items-end gap-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow mb-4">{t('gallery.eyebrow')}</p>
            <h2 className="font-display text-5xl leading-[0.95] text-primary md:text-7xl">
              {t('gallery.title')}
            </h2>
            <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-muted">
              {t('gallery.subtitle')}
            </p>
          </div>
          <div className="md:justify-self-end">
            <GalleryFilter value={filter} onChange={setFilter} />
          </div>
        </div>

        {/* Masonry */}
        <div className="mt-14 columns-2 gap-4 sm:gap-6 md:columns-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <GalleryItem
                key={item.id}
                item={item}
                title={t(`gallery.items.${item.index}.title`)}
                onOpen={setActive}
              />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center font-display text-2xl italic text-muted">
            {t('gallery.empty')}
          </p>
        )}
      </div>

      {/* Featured wide strip (GSAP horizontal pan) */}
      <HorizontalScroll />

      {/* Morphing lightbox */}
      <ImageModal item={active} onClose={() => setActive(null)} />
    </section>
  )
}
