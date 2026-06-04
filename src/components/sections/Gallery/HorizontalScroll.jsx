import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { galleryHorizontal } from '../../../data/images'

gsap.registerPlugin(ScrollTrigger)

/**
 * Featured wide-frames strip. On desktop the section pins full-height and the
 * strip pans horizontally as you scroll (GSAP ScrollTrigger) — header + frames
 * stay vertically centred in the viewport the whole time. Under reduced-motion
 * or on small screens the pin is skipped and the strip becomes swipeable.
 */
export default function HorizontalScroll() {
  const { t, i18n } = useTranslation()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const captions = t('gallery.featured', { returnObjects: true })
  const caps = Array.isArray(captions) ? captions : []

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 768) return // skip the pin on small screens

    const ctx = gsap.context(() => {
      const track = trackRef.current
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth)

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    // Recompute after fonts/images settle.
    const id = setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      clearTimeout(id)
      ctx.revert()
    }
  }, [i18n.language])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
    >
      {/* Full-viewport stage; everything inside is vertically centred so the
          pinned strip sits in the middle of the screen, not under the navbar. */}
      <div className="flex h-[100dvh] flex-col justify-center">
        <div className="container-x mb-8 flex items-end justify-between md:mb-12">
          <div>
            <p className="eyebrow mb-3">{t('gallery.featuredEyebrow')}</p>
            <h3 className="font-display text-4xl text-primary md:text-6xl">
              {t('gallery.featuredTitle')}
            </h3>
          </div>
          <span className="hidden font-sans text-xs uppercase tracking-[0.2em] text-muted md:block">
            {t('gallery.featuredHint')}
          </span>
        </div>

        {/* GSAP-panned on desktop; native horizontal swipe on mobile. */}
        <div
          dir="ltr"
          className="no-scrollbar w-full overflow-x-auto md:overflow-x-visible"
        >
          <div
            ref={trackRef}
            className="flex w-max items-center gap-5 px-6 will-transform md:gap-10 md:px-[8vw]"
          >
            {galleryHorizontal.map((photo, i) => (
              <figure
                key={photo.id}
                className="relative w-[82vw] shrink-0 sm:w-[64vw] md:w-[50vw]"
              >
                <div className="overflow-hidden rounded-md border border-line">
                  <img
                    src={photo.src}
                    alt=""
                    loading="lazy"
                    className="aspect-[16/10] max-h-[62vh] w-full object-cover"
                    style={{ backgroundColor: '#161616' }}
                  />
                </div>
                {/* Grouped caption: location · year (kept together, left-aligned) */}
                <figcaption className="mt-4 flex items-center gap-3 font-sans text-xs uppercase tracking-[0.18em]">
                  <span className="text-primary/80">{caps[i]?.location}</span>
                  <span className="h-px w-6 bg-gold/50" />
                  <span className="text-gold">{caps[i]?.year}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
