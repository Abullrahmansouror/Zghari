import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from '@phosphor-icons/react'

/**
 * Shared-element lightbox. The grid thumbnail and this modal image share a
 * `layoutId` so Framer morphs one into the other. Animate only transform /
 * opacity — never width/height/top/left.
 *
 * @param {{ item: object|null, title?: string, caption?: string,
 *           closeLabel?: string, onClose: () => void }} props
 */
export default function MorphingModal({
  item,
  title,
  caption,
  closeLabel = 'Close',
  onClose,
}) {
  // Close on Escape while open.
  useEffect(() => {
    if (!item) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [item, onClose])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center p-4 sm:p-8"
          style={{ zIndex: 'var(--z-modal)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Dim backdrop */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-bg/85 backdrop-blur-md"
          />

          <motion.figure
            layoutId={`photo-${item.id}`}
            className="relative z-[1] flex max-h-full max-w-5xl flex-col"
            onClick={(e) => e.stopPropagation()}
            transition={{ type: 'spring', stiffness: 200, damping: 28 }}
          >
            <img
              src={item.full || item.src}
              alt={title || ''}
              className="max-h-[78vh] w-auto rounded-md object-contain shadow-2xl shadow-black/70"
            />
            {(title || caption) && (
              <motion.figcaption
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="mt-4 flex items-baseline justify-between gap-4"
              >
                <span className="font-display text-2xl text-primary">
                  {title}
                </span>
                <span className="font-sans text-xs uppercase tracking-[0.18em] text-muted">
                  {caption}
                </span>
              </motion.figcaption>
            )}
          </motion.figure>

          <motion.button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            exit={{ opacity: 0 }}
            className="absolute end-5 top-5 z-[2] grid h-11 w-11 place-items-center rounded-full border border-line bg-surface1/70 text-primary transition-colors hover:border-gold hover:text-gold"
          >
            <X size={20} weight="light" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
