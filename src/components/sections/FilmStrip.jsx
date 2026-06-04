import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { FilmStrip as FilmIcon } from '@phosphor-icons/react'
import { filmStrip } from '../../data/images'

/**
 * Cinematic 35mm film-strip reel. Replaces the text marquee between Hero and
 * Gallery: a continuous strip of frames with sprocket perforations that auto-
 * scrolls (pure CSS), runs grayscale and blooms to colour on hover, and
 * reverses direction on hover. Memoized leaf — never re-renders with the page.
 */
function FilmStripInner() {
  const { t } = useTranslation()

  const Frame = ({ frame }) => (
    <figure className="group/frame relative h-28 w-44 shrink-0 overflow-hidden rounded-[3px] bg-black md:h-32 md:w-52">
      {/* Both layers scale together via one transform (GPU-composited). */}
      <div className="absolute inset-0 transition-transform duration-700 ease-smooth group-hover/frame:scale-[1.04]">
        {/* Colour base */}
        <img
          src={frame.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ backgroundColor: '#161616' }}
        />
        {/* Static-grayscale overlay; we only fade its OPACITY (no filter
            animation), so the bloom is composited and never repaints. */}
        <img
          src={frame.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover opacity-100 grayscale brightness-110 transition-opacity duration-700 ease-smooth group-hover/frame:opacity-0"
        />
      </div>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
      <figcaption className="pointer-events-none absolute bottom-1.5 left-2 font-sans text-[9px] tracking-[0.18em] text-gold/80">
        {frame.code}
      </figcaption>
    </figure>
  )

  // One full set of frames; rendered twice for a seamless -50% loop.
  // `will-transform` keeps the moving track on its own composited layer.
  const Reel = ({ ariaHidden }) => (
    <div
      className="marquee-anim will-transform flex shrink-0 animate-marquee gap-1.5"
      aria-hidden={ariaHidden}
    >
      {filmStrip.map((frame, i) => (
        <Frame key={i} frame={frame} />
      ))}
    </div>
  )

  return (
    <section className="relative border-y border-line bg-[#0d0c0a]">
      {/* Leader label */}
      <div className="container-x flex items-center justify-between py-4">
        <p className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.25em] text-gold">
          <FilmIcon size={15} weight="light" />
          {t('reel.label')}
        </p>
        <p className="hidden font-sans text-[10px] uppercase tracking-[0.2em] text-muted sm:block">
          {t('reel.meta')}
        </p>
      </div>

      {/* The strip: sprocket holes top + bottom, scrolling frames between.
          Forced LTR — a film reel reads left-to-right regardless of language. */}
      <div className="marquee-row group relative overflow-hidden bg-[#0d0c0a] edge-fade-x" dir="ltr">
        <div className="film-sprockets h-3 w-full" aria-hidden="true" />
        <div className="flex py-2">
          <Reel ariaHidden={false} />
          <Reel ariaHidden={true} />
        </div>
        <div className="film-sprockets h-3 w-full" aria-hidden="true" />
      </div>
    </section>
  )
}

const FilmStrip = memo(FilmStripInner)
export default FilmStrip
