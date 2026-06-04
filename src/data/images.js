/* ============================================================
   ZGHARI — image manifest
   ------------------------------------------------------------
   Single source of truth for all imagery. Every URL below was
   verified to resolve (HTTP 200) against images.unsplash.com.

   To swap in Zghari's real photos later, replace the IDs / URLs
   here ONLY — no component needs to change.

   Titles / locations that are user-facing live in i18n
   (gallery.items[i], booking.experiences[i], etc.); this file
   carries structure (id, category, aspect) + URL building only.
   ============================================================ */

const BASE = 'https://images.unsplash.com/photo-'

/**
 * Build an Unsplash URL with sizing + crop.
 * @param {string} id  photo id (without the `photo-` prefix)
 * @param {{w?:number,h?:number,q?:number}} opts
 */
export const img = (id, { w = 1200, h, q = 70 } = {}) => {
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    crop: 'entropy',
    q: String(q),
    w: String(w),
  })
  if (h) params.set('h', String(h))
  return `${BASE}${id}?${params.toString()}`
}

/** Tiny low-quality blur placeholder for a given id. */
export const blur = (id) => img(id, { w: 40, q: 20 })

/* ------------------------------------------------------------------ */
/* Hero — small trailing thumbnails that follow the cursor             */
/* ------------------------------------------------------------------ */
export const heroTrail = [
  '1500648767791-00dcc994a43e',
  '1506794778202-cad84cf45f1d',
  '1449034446853-66c86144b0ad',
  '1496769336828-c522a3a7e33c',
  '1531123897727-8f129e1688ce',
  '1502920917128-1aa500764cbd',
  '1518837695005-2083093ee35b',
  '1539571696357-5a69c17a67c6',
].map((id) => img(id, { w: 320, h: 400, q: 60 }))

/* ------------------------------------------------------------------ */
/* Gallery — masonry. category ∈ street | portrait | events | editorial */
/* Order is fixed; i18n gallery.items[i] supplies title + location.     */
/* ------------------------------------------------------------------ */
export const galleryMasonry = [
  { id: '1449034446853-66c86144b0ad', category: 'street', ratio: '3/4' },
  { id: '1500648767791-00dcc994a43e', category: 'portrait', ratio: '4/5' },
  { id: '1480714378408-67cf0d13bc1b', category: 'street', ratio: '1/1' },
  { id: '1506794778202-cad84cf45f1d', category: 'portrait', ratio: '3/4' },
  { id: '1518837695005-2083093ee35b', category: 'editorial', ratio: '4/5' },
  { id: '1496769336828-c522a3a7e33c', category: 'street', ratio: '1/1' },
  { id: '1531123897727-8f129e1688ce', category: 'portrait', ratio: '4/5' },
  { id: '1469854523086-cc02fe5d8800', category: 'editorial', ratio: '3/4' },
  { id: '1534528741775-53994a69daeb', category: 'events', ratio: '4/5' },
  { id: '1502920917128-1aa500764cbd', category: 'street', ratio: '3/4' },
  { id: '1539571696357-5a69c17a67c6', category: 'portrait', ratio: '1/1' },
  { id: '1493863641943-9b68992a8d07', category: 'events', ratio: '4/5' },
  { id: '1547036967-23d11aacaee0', category: 'editorial', ratio: '3/4' },
  { id: '1524504388940-b1c1722653e1', category: 'portrait', ratio: '4/5' },
  { id: '1512632578888-169bbbc64f33', category: 'street', ratio: '1/1' },
].map((item, i) => ({
  ...item,
  index: i,
  src: img(item.id, { w: 900, q: 72 }),
  full: img(item.id, { w: 1800, q: 82 }),
  placeholder: blur(item.id),
}))

/* ------------------------------------------------------------------ */
/* Gallery — wide panoramic horizontal strip (featured works)          */
/* i18n gallery.featured[i] supplies location + year captions.         */
/* ------------------------------------------------------------------ */
export const galleryHorizontal = [
  '1512453979798-5ea266f8880c',
  '1518684079-3c830dcef090',
  '1485095329183-d0797cdc5676',
  '1469594292607-7bd90f8d3ba4',
  '1444723121867-7a241cacace9',
].map((id, i) => ({
  id,
  index: i,
  src: img(id, { w: 1600, h: 1000, q: 78 }),
  placeholder: blur(id),
}))

/* ------------------------------------------------------------------ */
/* About — scrolling sequence of portrait photos                       */
/* ------------------------------------------------------------------ */
export const aboutPortraits = [
  '1507003211169-0a1dd7228f2d',
  '1488161628813-04466f872be2',
  '1504257432389-52343af06ae3',
  '1519345182560-3f2917c472ef',
].map((id) => ({ id, src: img(id, { w: 1000, h: 1300, q: 76 }), placeholder: blur(id) }))

/* ------------------------------------------------------------------ */
/* Booking step 1 — "Choose Your Experience" full-bleed cards          */
/* Order maps to i18n booking.experiences[i]: street/portrait/events/commercial */
/* ------------------------------------------------------------------ */
export const bookingExperiences = [
  '1502920917128-1aa500764cbd', // street
  '1463453091185-61582044d556', // portrait
  '1493863641943-9b68992a8d07', // events
  '1517841905240-472988babdf9', // commercial
].map((id) => ({ id, src: img(id, { w: 900, h: 1100, q: 74 }), placeholder: blur(id) }))

/* Per-step blurred background imagery (subtle atmosphere) */
export const bookingBackgrounds = [
  '1449034446853-66c86144b0ad',
  '1518837695005-2083093ee35b',
  '1485095329183-d0797cdc5676',
  '1512453979798-5ea266f8880c',
].map((id) => img(id, { w: 1400, q: 55 }))

/* ------------------------------------------------------------------ */
/* Instagram strip — square thumbnails                                 */
/* ------------------------------------------------------------------ */
export const instagram = [
  '1469854523086-cc02fe5d8800',
  '1529626455594-4ff0802cfb7e',
  '1488426862026-3ee34a7d66df',
  '1473625247510-8ceb1760943f',
  '1529139574466-a303027c1d8b',
  '1524863479829-916d8e77f114',
].map((id, i) => ({
  id,
  index: i,
  src: img(id, { w: 700, h: 700, q: 72 }),
  placeholder: blur(id),
}))

/* ------------------------------------------------------------------ */
/* Film strip reel — small 35mm-style frames (between Hero and Gallery) */
/* ------------------------------------------------------------------ */
export const filmStrip = [
  '1449034446853-66c86144b0ad',
  '1496769336828-c522a3a7e33c',
  '1502920917128-1aa500764cbd',
  '1518837695005-2083093ee35b',
  '1469854523086-cc02fe5d8800',
  '1485095329183-d0797cdc5676',
  '1512453979798-5ea266f8880c',
  '1493863641943-9b68992a8d07',
  '1469594292607-7bd90f8d3ba4',
  '1444723121867-7a241cacace9',
  '1488426862026-3ee34a7d66df',
  '1484417894907-623942c8ee29',
].map((id, i) => ({
  id,
  // 3:2 frame code like a contact sheet ("ZGH·004")
  code: `ZGH·${String((i + 1) * 4).padStart(3, '0')}`,
  src: img(id, { w: 520, h: 350, q: 68 }),
}))

/* ------------------------------------------------------------------ */
/* Testimonials — client avatars                                       */
/* ------------------------------------------------------------------ */
export const testimonialAvatars = [
  '1564564321837-a57b7070ac4f',
  '1438761681033-6461ffad8d80',
  '1547721064-da6cfb341d50',
  '1531746020798-e6953c6e8e04',
  '1500648767791-00dcc994a43e',
].map((id) => img(id, { w: 160, h: 160, q: 70 }))
