import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../utils/gsap";

export default function Testimonial() {
  const root = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-quote]", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.to("[data-ghost]", {
        xPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section
      className="relative overflow-hidden border-y border-line px-[max(24px,12vw)] py-36 text-center"
      ref={root}
    >
      <span
        className="absolute left-0 top-[10%] whitespace-nowrap font-display text-[18vw] tracking-[-0.08em] text-white/[0.035]"
        data-ghost
      >
        Precision
      </span>
      <blockquote
        className="relative mx-auto my-0 max-w-[980px] font-serif text-[clamp(2.2rem,5vw,5.8rem)] leading-[1.05]"
        data-quote
      >
        “Maison turned a crowded brief into an experience that feels
        unmistakably ours. The launch lifted qualified enquiries within weeks.”
      </blockquote>
      <p className="text-gold">Elena Moreau, Founder at Vellum</p>
    </section>
  );
}
