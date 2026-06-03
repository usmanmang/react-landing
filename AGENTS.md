# AGENTS.md

## Commands
- Install with `npm install`; this repo uses `package-lock.json`, not yarn/pnpm lockfiles.
- Run locally with `npm run dev` and preview production output with `npm run preview`.
- Verify changes with `npm run build`; there are no repo-defined lint, test, formatter, or typecheck scripts.

## App Shape
- Vite entrypoints are `index.html` -> `src/main.jsx` -> `src/App.jsx`.
- `src/App.jsx` wires the page order and global effects: preloader, custom cursor, scroll progress, Lenis smooth scroll, and section components.
- Styling uses Tailwind CSS utilities in JSX; theme tokens live in `tailwind.config.js` and Tailwind/base component layers live in `src/styles/globals.css`.
- `dist/` is build output; avoid editing it directly unless intentionally updating generated production assets.

## Motion And 3D
- Import GSAP from `src/utils/gsap.js` so `ScrollTrigger` registration stays centralized.
- Put GSAP DOM animations in `useLayoutEffect` with `gsap.context(..., ref)` and return `ctx.revert()` for cleanup.
- Lenis is connected to the GSAP ticker in `src/hooks/useSmoothScroll.js`; refresh `ScrollTrigger` after layout/font-sensitive changes when needed.
- Decorative Three.js canvases should remain `aria-hidden="true"`, cap DPR with `Math.min(...)`, and reduce heavy particle/scene work on mobile.
- The app already handles `prefers-reduced-motion` globally and skips Lenis in that mode; preserve this behavior for new motion.

## Design Constraints
- The active visual language is dark luxury editorial: near-black backgrounds, warm gold accents, Syne display type, Instrument Serif italic accents, and DM Sans body type.
- Repo-local OpenCode config (`opencode.json`) loads `opencode/skills`; for major React + Three.js + GSAP landing-page work, read `opencode/skills/react-threejs-gsap/SKILL.md` before coding.
