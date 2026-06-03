---
name: react-threejs-gsap
description: >
  Use this skill whenever the user wants to build an award-winning,
  interactive landing page or creative website using React.js, Three.js,
  and GSAP. Triggers include: "build a landing page", "create a React
  animation site", "Three.js hero section", "GSAP scroll animations",
  "Awwwards-style site", "WebGL background", "particle animation React",
  "immersive web experience", or any request combining React + GSAP +
  Three.js. Read this SKILL.md before writing any code.
license: MIT
---

# React + Three.js + GSAP — Award-Winning Landing Page Skill

Before writing any code, read this file completely. Every section below
is mandatory. Do not skip any part.

---

## Design Direction

Aesthetic: Dark luxury editorial
- Background: near-black `#080808`
- Accent: warm gold `#C9A96E` / light gold `#e4c99a`
- Typography:
  - Display/headings: **Syne** (800 weight)
  - Italic accent: **Instrument Serif** (italic)
  - Body: **DM Sans** (300–500)
- Layout: asymmetric, grid-breaking, generous whitespace
- Target vibe: Awwwards SOTD — cinematic, intentional, refined
- NEVER use: Inter, Roboto, purple gradients, generic layouts

---

## Tech Stack

```
React 18 (Vite)
Three.js r165 + @react-three/fiber + @react-three/drei
GSAP 3.12 + ScrollTrigger + ScrollSmoother + SplitText
Lenis (smooth scroll)
Tailwind CSS utilities in JSX
No UI component libraries — fully custom
```

---

## File Structure

```
src/
├── components/
│   ├── Cursor/           Cursor.jsx
│   ├── Preloader/        Preloader.jsx
│   ├── Nav/              Nav.jsx
│   ├── Hero/             Hero.jsx + ParticleField.jsx
│   ├── Marquee/          Marquee.jsx
│   ├── Work/             Work.jsx + WorkCard.jsx
│   ├── About/            About.jsx + AbstractShape.jsx
│   ├── HorizontalScroll/ HorizontalScroll.jsx
│   ├── Process/          Process.jsx
│   ├── Testimonial/      Testimonial.jsx
│   ├── CTA/              CTA.jsx
│   └── Footer/           Footer.jsx
├── hooks/
│   ├── useSmoothScroll.js
│   ├── useCursor.js
│   └── useScrollProgress.js
├── utils/
│   ├── gsap.js           (register all plugins here)
│   └── noise.js          (simplex noise helper)
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
```

---

## Sections — Build Order & Specs

### 1. Preloader
- Full-screen black overlay
- SplitText character stagger on logo reveal
- Gold progress bar fills over ~2.5s
- Percentage counter 0 → 100%
- Exit: full-page vertical wipe via `clip-path` or `yPercent`
- On complete: trigger hero entrance GSAP timeline

### 2. Navigation (fixed)
- Logo left · links center · CTA button right
- Transparent → frosted glass on scroll > 80px
  (`backdrop-filter: blur(20px)` + semi-transparent dark bg via GSAP)
- Link hover: underline draw (`scaleX` 0 → 1)
- CTA: magnetic button effect
- Mobile: hamburger + full-screen overlay menu

### 3. Hero — Three.js WebGL Background
**ParticleField.jsx** (R3F Canvas, fullscreen):
```
- 4000 particles in BufferGeometry
- Initial positions: random sphere (normalize + scale radius 2–8)
- useFrame: simplex noise displacement per particle (time + original pos as seed)
- Mouse repulsion: normalized device coords as uniform → repel nearby particles
- Custom ShaderMaterial:
    vertexShader:   noise displacement + size attenuation
    fragmentShader: circular soft point (gl_PointCoord), lerp gold shades
- Post-processing: EffectComposer + BloomEffect
    threshold: 0.2, intensity: 1.5
- dpr: Math.min(2, devicePixelRatio)
- Mobile: reduce to 500 particles
```

**Hero Text (above canvas):**
```
- Eyebrow: slide up from clip overflow:hidden
- H1 three lines — SplitText line reveal, stagger 0.1s:
    "We craft"
    "digital"  ← Instrument Serif italic, gold
    "experiences"
- Subtext: fade + slide up
- Two CTAs: primary (filled) + secondary (ghost outline)
- Mouse parallax: text layers at different speeds (depth illusion)
- Stats row: 3 counters count up on viewport enter
- Scroll indicator: animated vertical line + "Scroll" label
```

### 4. Marquee / Ticker
- GSAP `x` tween, `repeat: -1`, `ease: 'none'`
- Services separated by gold dot separators
- Hover: `gsap.to(tl, { timeScale: 0.25 })`
- Reverse direction on scroll direction change (ScrollTrigger `onUpdate`)

### 5. Work / Projects
- 2-column asymmetric grid (first card: `grid-row: span 2`)
- Each card:
  - 3D tilt: mouse pos → `rotateX/rotateY` (perspective 800px)
  - Inner bg: `scale(1 → 1.06)` on hover
  - Arrow icon fades in top-right
  - Text slides up on hover
- ScrollTrigger stagger: `y: 60, opacity: 0 → defaults`

### 6. About / Philosophy
- Two-column: visual left, text right
- **AbstractShape.jsx** (contained R3F Canvas):
  ```
  TorusKnotGeometry(1, 0.35, 128, 32)
  MeshStandardMaterial: color #C9A96E, roughness 0.3, metalness 0.8
  Second mesh: same geometry, wireframe:true, opacity 0.15
  useFrame: slow rotation Y + X
  Scroll velocity → multiply rotation speed
  ```
- Text: SplitText line-by-line reveal per paragraph line
- ScrollTrigger: left `x:-60`, right `x:60`

### 7. Horizontal Scroll Section
```js
gsap.to(".h-track", {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".h-section",
    start: "top top",
    end: () => `+=${track.scrollWidth - window.innerWidth}`,
    pin: true,
    scrub: 1,
    anticipatePin: 1,
  }
})
```
- 4–5 full-height panels, each with number + title + description
- Panel content parallax at 0.8× scroll speed

### 8. Process
- 4 cards: Discover / Strategise / Create / Launch
- Ghost number (01–04): `color rgba(255,255,255,0.05)` → gold on hover
- Bottom border line: `width 0 → 100%` CSS transition
- ScrollTrigger stagger reveal

### 9. Testimonial
- Ghost background text scrolls horizontally (scrub)
- Quote mark: `scale(2) → scale(1)` with `back.out(1.7)`
- Quote text: fade + rise
- Full-width centered layout

### 10. CTA / Contact
- Light bg `#f0ede6`, inverted color scheme
- SplitText word reveal on heading
- Giant email address: hover → color + underline draw
- Magnetic CTA button with fill-sweep hover
- Social links row

### 11. Footer
- 4-column grid
- Bottom bar: copyright + tagline
- Link hover: color transition

---

## Global Interactions

### Custom Cursor
```
cursor: none on body
#cursor-dot  → 8px, follows mouse via gsap.set (instant)
#cursor-ring → 44px border, follows with lerp 0.12 in rAF loop
mix-blend-mode: difference on ring
Hover state  → dot grows, ring expands + turns gold
Click state  → both shrink
Mobile       → hide (pointer: coarse media query)
```

### Smooth Scroll (Lenis)
```js
// hooks/useSmoothScroll.js
const lenis = new Lenis()
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

### Scroll Progress Bar
```
position: fixed; top: 0; height: 2px; background: #C9A96E
Width driven by ScrollTrigger progress 0 → 100%
```

### Noise Overlay
```
SVG feTurbulence grain, position: fixed, pointer-events: none
opacity: 0.035
```

---

## GSAP Best Practices — Mandatory

```js
// Always register plugins in utils/gsap.js
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
gsap.registerPlugin(ScrollTrigger, SplitText)

// Always use gsap.context() in useLayoutEffect
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // all animations here
  }, containerRef)
  return () => ctx.revert()
}, [])

// Refresh after fonts load
document.fonts.ready.then(() => ScrollTrigger.refresh())
```

---

## Performance Requirements

| Concern | Rule |
|---|---|
| Three.js DPR | `Math.min(2, devicePixelRatio)` |
| Buffer attributes | Use `Float32Array`, never plain arrays |
| Mobile particles | Reduce to 500, or disable entirely |
| GSAP cleanup | Always `ctx.revert()` in useEffect return |
| Lazy 3D scenes | Only mount Canvas when section is near viewport (`IntersectionObserver`) |
| Cursor loop | rAF outside React render cycle |
| ScrollTrigger | Call `.refresh()` after DOM changes and font load |

---

## Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable all GSAP animations */
  /* Remove transform transitions */
  /* Keep layout, remove motion */
}
```

- Semantic HTML: `<section>`, `<nav>`, `<h1>`, `<article>`, `<footer>`
- Three.js canvas: `aria-hidden="true"` (decorative)
- Focus styles preserved for keyboard nav

---

## Tailwind Design Tokens

- Theme colors, fonts, easing, and keyframes live in `tailwind.config.js`.
- `src/styles/globals.css` is the Tailwind input file with `@tailwind` directives plus small base/component layers.
- Use Tailwind utilities in JSX for section and component styling; do not recreate CSS Modules.

---

## Delivery Checklist

Before finishing, verify:
- [ ] Every file in the file structure above is fully implemented
- [ ] No placeholder comments like `// add animation here`
- [ ] All GSAP animations inside `gsap.context()` with cleanup
- [ ] Lenis connected to GSAP ticker
- [ ] ScrollTrigger.refresh() called after fonts load
- [ ] Custom cursor hidden on mobile
- [ ] Three.js canvas has `aria-hidden="true"`
- [ ] `prefers-reduced-motion` query present
- [ ] `package.json` includes all dependencies with correct versions
- [ ] README with setup instructions (`npm install` → `npm run dev`)
