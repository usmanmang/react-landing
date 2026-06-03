import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../utils/gsap";
import WorkCard from "./WorkCard";

const projects = [
  [
    "Noir House",
    "Brand platform",
    "radial-gradient(circle at 25% 20%, #c9a96e, #15120d 45%, #080808)",
    true,
  ],
  [
    "Vellum Labs",
    "Web experience",
    "linear-gradient(135deg, #302415, #c9a96e 120%)",
  ],
  [
    "Astra Dining",
    "Launch system",
    "radial-gradient(circle at 70% 30%, #e4c99a, #1a1712 38%, #080808)",
  ],
];

export default function Work() {
  const root = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-work-card]", {
        y: 70,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section id="work" className="px-[max(24px,7vw)] py-32" ref={root}>
      <p className="section-kicker">Selected work</p>
      <h2 className="display-title">
        Quiet luxury,
        <br />
        <span className="serif">loud</span> outcomes
      </h2>
      <div className="mt-12 grid grid-cols-[1.15fr_0.85fr] gap-5 [perspective:1400px] max-[820px]:grid-cols-1">
        {projects.map(([title, type, tone, large]) => (
          <WorkCard
            key={title}
            title={title}
            type={type}
            tone={tone}
            large={large}
          />
        ))}
      </div>
    </section>
  );
}
