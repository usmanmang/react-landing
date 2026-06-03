import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../utils/gsap";

const steps = [
  { title: "Discover", description: "Find the edge worth owning." },
  { title: "Strategise", description: "Shape the strategic route." },
  { title: "Create", description: "Design and engineer the experience." },
  { title: "Launch", description: "Refine, deploy, and measure." },
];

export default function Process() {
  const root = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-process-card]", {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section id="process" className="px-[max(24px,7vw)] py-32" ref={root}>
      <p className="section-kicker">Process</p>
      <h2 className="display-title">
        From first signal
        <br />
        to finished system
      </h2>
      <div className="mt-12 grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
        {steps.map(({ title, description }, index) => (
          <article
            className="group relative min-h-[300px] overflow-hidden rounded-[26px] border border-line p-[1.4rem] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gold after:transition-[width] after:duration-300 after:ease-expo hover:after:w-full"
            data-process-card
            key={title}
          >
            <b className="font-display text-7xl text-white/[0.06] transition-colors duration-300 group-hover:text-gold">
              {String(index + 1).padStart(2, "0")}
            </b>
            <h3 className="font-display text-[1.8rem] tracking-[-0.04em]">
              {title}
            </h3>
            <p className="leading-[1.6] text-muted">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
