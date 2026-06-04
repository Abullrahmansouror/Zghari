> **CLAUDE CODE INSTRUCTION:** Re-read this entire file before starting each new section. This is your single source of truth for the entire build. Never deviate from it.

---

# ZGHARI PHOTOGRAPHER — FULL-STACK WEBSITE BUILD

## SKILL DIRECTIVE

Read and strictly follow `/mnt/skills/user/design-taste-frontend-v1/SKILL.md` before writing a single line of code. All design and engineering decisions must align with that skill's directives. Set the following active dials for this project:

- **DESIGN_VARIANCE: 8** — Asymmetric, intentional chaos: masonry layouts, fractional grids, massive negative space
- **MOTION_INTENSITY: 7** — Cinematic, spring physics, magnetic interactions, perpetual micro-animations
- **VISUAL_DENSITY: 3** — Airy, gallery-like — let the photography breathe

---

## PROJECT OVERVIEW

Build a world-class, production-ready photographer portfolio website for **Zghari**, a street photographer based in the UAE with 70K+ Instagram followers. He photographs people on the streets of the Emirates with their permission, and also offers commercial photography services.

The website must feel like stepping into an editorial photography magazine — dark, moody, cinematic, and deeply immersive. This is **NOT** a generic portfolio site. Every scroll, hover, and transition must feel intentional and premium.

---

## TECH STACK (NON-NEGOTIABLE)

| Layer | Choice |
|---|---|
| Framework | React + Vite (SPA) |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion (primary) + GSAP ScrollTrigger (scroll sequences) |
| 3D | React Three Fiber (`@react-three/fiber`) + `@react-three/drei` |
| Smooth Scroll | Lenis (`@studio-freight/lenis`) |
| Internationalization | `react-i18next` — English + Arabic, full RTL support |
| Icons | `@phosphor-icons/react` — strokeWidth: 1.5, **zero emojis ever** |
| Forms | `react-hook-form` |
| Display Font | "Cormorant Garamond" — editorial, luxury serif for all headlines |
| Body Font EN | "DM Sans" — clean, modern |
| Body Font AR | "Cairo" — Arabic, modern, readable |

**Before writing any code:** Check `package.json` first. Output ALL install commands grouped at the very top before any component code.

---

## MANDATORY DEPENDENCY INSTALLS

Output these first, before any component:

```bash
npm install framer-motion @studio-freight/lenis gsap @gsap/react react-i18next i18next react-hook-form @phosphor-icons/react @react-three/fiber @react-three/drei three
npm install -D @types/three
```

---

## DESIGN IDENTITY

### Color Palette (STRICT — do not deviate)

| Token | Value | Usage |
|---|---|---|
| Background | `#0a0a0a` | Page background |
| Surface 1 | `#111111` | Cards, elevated surfaces |
| Surface 2 | `#161616` | Nested surfaces |
| Primary Text | `#F2EDE4` | Warm off-white, all headings |
| Muted Text | `#6B6560` | Body copy, captions |
| **Gold Accent** | `#C9A84C` | **ONE accent only — CTAs, highlights, borders** |
| Border | `rgba(242,237,228,0.07)` | Subtle separators |

**THE LILA BAN IS IN EFFECT:** No purple gradients, no neon glows, no AI-aesthetic blues. Gold is the singular accent color — nowhere else introduces a second accent.

### Typography Rules

- **H1 / Display:** Cormorant Garamond, `text-6xl md:text-[9vw] tracking-tight leading-[0.9]`, use italic variant for key emotional phrases
- **H2 / Section Titles:** Cormorant Garamond, `text-4xl md:text-6xl`
- **Body:** DM Sans (EN) / Cairo (AR), `text-base leading-relaxed text-[#6B6560]`
- **Accent Labels:** DM Sans, `text-xs tracking-[0.2em] uppercase text-[#C9A84C]`
- **BANNED fonts:** Inter, Roboto, system-ui, Arial — any of these is a failure

### Visual Texture

- Add a **fixed** `pointer-events-none` grain/noise overlay (CSS `feTurbulence` SVG filter or background noise) to Hero sections
- `position: fixed; inset: 0; pointer-events: none; z-[999]` — **NEVER on scrolling containers** (causes GPU repaint)
- Use `mix-blend-mode: overlay` sparingly on image overlays for depth

### Layout Rules (DESIGN_VARIANCE: 8)

- **ANTI-CENTER BIAS:** No centered hero text — force left-aligned content + right-side visual, or asymmetric split
- Use CSS Grid with fractional columns: `grid-cols-[1fr_2fr]`, `grid-cols-[3fr_1fr_1fr]`
- Allow text to intentionally overlap or underlap image boundaries
- Generous vertical rhythm: sections breathe with `py-32 md:py-48`

---

## BILINGUAL SYSTEM (AR / EN)

- Language toggle in navbar: `EN | عربي`
- When Arabic is active: apply `dir="rtl"` to `<html>`, switch to "Cairo" font, mirror flex/grid layouts
- Store language preference in `localStorage`
- **All user-facing strings** must use `t('key')` — zero hardcoded English or Arabic text in components
- Create `src/i18n/locales/en.json` and `src/i18n/locales/ar.json` with ALL strings
- Use `ms-` and `me-` (margin-start/end) instead of `ml-`/`mr-` for RTL-safe spacing

---

## SMOOTH SCROLL SETUP

Initialize Lenis in a `SmoothScrollProvider`:

```js
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
```

Connect Lenis RAF to GSAP's ticker for `ScrollTrigger` synchronization:

```js
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

---

## SECTIONS — BUILD ALL OF THESE (in order)

---

### 1. NAVBAR

- Fixed, transparent on load → `backdrop-blur-sm bg-black/30` on scroll
- Logo: **"ZGHARI"** in Cormorant Garamond, `tracking-[0.3em]` uppercase
- Nav links: DM Sans, `text-xs tracking-[0.15em] uppercase`
- Right side: Language toggle `(EN | عربي)` + **"Book a Session"** gold border button
- Mobile: hamburger → full-screen overlay with staggered link reveals (`staggerChildren: 0.07`)
- `z-index` is used **only** here as the sticky layer — no arbitrary z-index spam elsewhere

---

### 2. HERO — 3D CINEMATIC OPENER

- **`min-h-[100dvh]`** — NEVER use `h-screen`
- Background: a `<Canvas>` (React Three Fiber) rendering a 3D particle field using `@react-three/drei`'s `<Points>` with slow ambient drift. Abstract atmosphere — not a gimmick
- Layered on top: **left-aligned** hero text block:
  - Eyebrow: `STREET PHOTOGRAPHY · UAE` (gold, `tracking-[0.25em]`, `text-xs`)
  - H1: *"Through the Lens of the Street"* — Cormorant Garamond, massive, some words in italic
  - Body: 2-line description in DM Sans
  - CTAs: **"View Portfolio"** (gold filled) + **"Book a Session"** (outline)
- **Mouse Image Trail Effect:** cursor movement across Hero spawns small fading photo thumbnails trailing the mouse. Use Framer `useMotionValue` for x/y position — **NEVER `useState` for this**
- Animated scroll indicator: thin vertical line + sliding dot, infinite loop

---

### 3. MARQUEE STRIP

- Between Hero and Gallery
- Kinetic text band: `STREET · PORTRAIT · UAE · EDITORIAL · زغاري · شوارع الإمارات ·` repeating infinitely
- Reverses direction on hover
- **Pure CSS infinite scroll animation** — no JavaScript, no library (performance)

---

### 4. PORTFOLIO GALLERY

#### A. Masonry Grid (default view)

- CSS Grid masonry layout (`grid-template-rows: masonry` or JS fallback with varying `row-span`)
- `grid-cols-2 md:grid-cols-3` — organic rhythm through mixed heights
- Each image: hover triggers **Parallax Tilt Card** (mouse tracking via Framer `useMotionValue`)
- On hover: scale `1.02`, gold overlay with photo title fades in
- On click: **Morphing Modal** — image expands from its grid position to full-screen lightbox using Framer `layoutId` shared element transition
- Staggered entrance: `staggerChildren: 0.04` on `whileInView`

#### B. Horizontal Scroll Strip (featured works)

- Below masonry: vertical scroll is hijacked to pan a wide horizontal strip of oversized images
- Built with GSAP ScrollTrigger: `gsap.to(container, { x: '-=totalWidth' })`
- Wide panoramic aspect ratios, images overflow the viewport
- Small caption below each: location + year

#### Gallery Filter

- Category pills: **All / Street / Portrait / Events / Editorial**
- Click filters with `AnimatePresence` + `layout` prop for smooth grid reordering

---

### 5. SERVICES SECTION

- Section title: `"What I Offer"` / `"خدماتي"` (via i18n)
- Layout: `grid-cols-[1fr_1fr_1fr]` desktop, `grid-cols-1` mobile
- **4 Services:**
  1. Street Photography Sessions
  2. Portrait Sessions
  3. Event Coverage
  4. Brand & Commercial
- Each service card:
  - Dark surface `#111`, `1px border rgba(255,255,255,0.07)`
  - Large faint number (01, 02...) in Cormorant Garamond, muted gold
  - Service name in display font
  - 2-line description
  - `"From AED ___"` pricing hint
  - Hover: **Spotlight Border Card** — border illuminates along cursor position with gold glow
  - Link: `"Book This →"`
- **Scroll Progress Path:** SVG line drawing itself between cards as user scrolls down

---

### 6. ABOUT / STORY SECTION

- Layout: Left = sticky text block, Right = scrolling sequence of 3–4 portrait photos
- Sticky text **reveals line by line** as user scrolls — GSAP-style word mask animation (`y: 100% → 0`, clipped by `overflow: hidden` parent)
- Pull quote: large Cormorant Garamond italic, gold `|` left border, lots of negative space
- **Animated counter:** `70K+` stat uses Framer `useInView` + number tween on scroll enter
- CTA: `"Follow on Instagram"` → Instagram link

---

### 7. BOOKING SECTION — CINEMATIC MULTI-STEP FORM

This is the most important section. It must be unlike any standard booking form.

**Step progress:** animated gold line at the top traces progress across 4 steps.

**Step 1 — "Choose Your Experience"**
- 4 large full-bleed image cards representing: Street / Portrait / Events / Commercial
- Click to select → selected card gets gold ring + scale pop animation (Framer spring)

**Step 2 — "Pick Your Date & Time"**
- **Custom-built** minimal dark calendar grid in React (no external calendar library)
- Time slot pills below the calendar (morning / afternoon / evening options)

**Step 3 — "Tell Me About Your Vision"**
- Fields: Name, Phone, Instagram handle (optional), Message/Vision textarea, "How did you hear about me?" dropdown
- **Label above input, error below input** — `gap-2` between label/input/error blocks (Rule 6)
- Inline error states via react-hook-form, no generic spinners

**Step 4 — "Confirm & Send"**
- Summary card of all selections
- Submit CTA: **Particle Explosion Button** — on click, button fragments into gold particles using Framer Motion animated `span` elements, then resolves

**Step transitions:** each step slides in with `x: 100vw → 0` + fade. Background image shifts subtly between steps (blurred, different photo per step). Back = small arrow icon, no label text.

**Loading state:** Skeleton Shimmer across the summary card while submitting.

**Success state:** Full-screen overlay — large Cormorant Garamond italic: *"شكراً · Thank You"* — confetti burst animation, `"We'll be in touch within 24 hours."`

---

### 8. INSTAGRAM FEED STRIP

- Section title: `"@zghari"` with Phosphor Instagram icon
- Draggable/scrollable strip of 6 IG thumbnail cards (square aspect ratio)
- Hover: reveals engagement stats overlay (mock likes/comments count)
- CTA: `"Follow for More"` → opens Instagram link

---

### 9. TESTIMONIALS

- Layout: **Sticky Scroll Stack** — cards physically layer over each other as user scrolls
- Each card: dark surface, Cormorant italic quote, DM Sans client name + service type
- 5 gold stars (Phosphor `Star`, weight `fill`, `#C9A84C`)
- 4–5 testimonials with realistic mock content in both English and Arabic

---

### 10. CONTACT & FOOTER

- Minimal — dark, very generous spacing
- Left column: `"Get in Touch"` + email address + WhatsApp link (UAE `+971` format)
- Right column: Instagram + WhatsApp social links with **Magnetic Hover** (Framer `useMotionValue` pull effect)
- Footer bar: `© 2025 Zghari · All Rights Reserved` | Privacy — bilingual

---

## PERFORMANCE GUARDRAILS (MANDATORY — NO EXCEPTIONS)

- **NEVER animate** `top`, `left`, `width`, `height` — animate exclusively via `transform` and `opacity`
- Grain overlay: `position: fixed; inset: 0; pointer-events: none` — **never on scroll containers**
- Three.js `<Canvas>`: scoped to Hero only, call `dispose()` on unmount
- All perpetual animations (marquee, particles): isolated in `React.memo` leaf components, zero parent re-renders
- All images: `loading="lazy"`, `object-fit: cover`
- **Every `useEffect` with animation**: must return a cleanup function
- **Never use `useState`** for magnetic hover or continuous animations — use Framer `useMotionValue`
- `z-index` used only for: Sticky Navbar, Modals, Grain Overlay — nowhere else

---

## PROJECT FILE STRUCTURE

```
src/
  components/
    layout/
      Navbar.jsx
      Footer.jsx
      SmoothScrollProvider.jsx
    sections/
      Hero.jsx
      Marquee.jsx
      Gallery/
        Gallery.jsx
        GalleryFilter.jsx
        ImageModal.jsx
        HorizontalScroll.jsx
      Services.jsx
      About.jsx
      Booking/
        Booking.jsx
        BookingStep1.jsx
        BookingStep2.jsx
        BookingStep3.jsx
        BookingStep4.jsx
        CalendarPicker.jsx
        ParticleButton.jsx
      Instagram.jsx
      Testimonials.jsx
      Contact.jsx
    ui/
      SpotlightCard.jsx
      ParallaxTiltCard.jsx
      MorphingModal.jsx
      MouseTrail.jsx
      AnimatedCounter.jsx
      ScrollProgressPath.jsx
    3d/
      ParticleField.jsx
  i18n/
    index.js
    locales/
      en.json
      ar.json
  hooks/
    useLenis.js
    useMousePosition.js
  styles/
    globals.css
  App.jsx
  main.jsx
```

---

## BUILD OUTPUT ORDER

Build files strictly in this sequence to avoid import errors:

1. All `npm install` commands (grouped, output first)
2. `src/styles/globals.css` — Tailwind directives, CSS vars, `@import` for Google Fonts
3. `src/i18n/` — i18next setup + both `en.json` and `ar.json` locale files (all strings)
4. `src/hooks/` — `useLenis.js`, `useMousePosition.js`
5. `src/components/3d/ParticleField.jsx`
6. `src/components/ui/` — all reusable primitive components
7. `src/components/layout/` — Navbar, Footer, SmoothScrollProvider
8. Each section in order: Hero → Marquee → Gallery → Services → About → Booking → Instagram → Testimonials → Contact
9. `App.jsx` and `main.jsx` last

**Do NOT skip any section. Do NOT summarize with placeholders. Output complete, working code for every file.**

---

## FINAL PREFLIGHT CHECKLIST

Verify every item before outputting each component:

- [ ] `min-h-[100dvh]` used for all full-height sections — NOT `h-screen`
- [ ] All perpetual animations isolated in their own `React.memo` leaf components
- [ ] Every `useEffect` with animation has a cleanup `return () => { ... }`
- [ ] `dir="rtl"` applied to `<html>` when Arabic is active + Cairo font loaded
- [ ] **Zero purple gradients, zero neon, zero AI-slop aesthetics**
- [ ] Gold (`#C9A84C`) is the ONE and ONLY accent color
- [ ] `@phosphor-icons/react` used with `strokeWidth={1.5}` — zero emojis anywhere
- [ ] Forms: label above input, error below, `gap-2` spacing (Rule 6)
- [ ] Empty + loading + error states implemented for Booking section
- [ ] Three.js canvas properly disposed on unmount
- [ ] Lenis connected to GSAP ScrollTrigger ticker
- [ ] All text via `t('key')` from i18next — zero hardcoded strings in components
- [ ] Mobile collapse guaranteed: `w-full px-4 max-w-7xl mx-auto` on all sections
- [ ] No arbitrary `z-index` spam — only Navbar, Modals, and Grain Overlay use z-index
