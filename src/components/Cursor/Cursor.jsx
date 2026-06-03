export default function Cursor() {
  return (
    <div className="pointer-events-none [@media(pointer:coarse)]:hidden" aria-hidden="true">
      <span className="pointer-events-none fixed left-0 top-0 z-[140] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" data-cursor-dot />
      <span className="pointer-events-none fixed left-0 top-0 z-[140] h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border border-off-white/70 mix-blend-difference" data-cursor-ring />
    </div>
  )
}
