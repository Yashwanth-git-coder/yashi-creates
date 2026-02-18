import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 45, suffix: "", label: "Global Clients" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      const els = textRef.current?.querySelectorAll(".about-reveal");
      els?.forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Counter animations
      const counters = sectionRef.current?.querySelectorAll(".counter");
      counters?.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target") || "0");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: counter, start: "top 85%" },
          onUpdate: () => {
            counter.textContent = Math.round(obj.val).toString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 section-padding">
      <div ref={textRef} className="max-w-4xl">
        <h2 className="about-reveal text-sm uppercase tracking-[0.3em] text-muted-foreground mb-12">
          About
        </h2>
        <p className="about-reveal text-3xl md:text-4xl lg:text-5xl font-light leading-snug tracking-tight mb-6">
          I'm a <span className="text-gradient font-semibold">video editor</span> who believes every frame
          tells a story. Based in Los Angeles, I work with brands and filmmakers to bring{" "}
          <span className="text-gradient font-semibold">bold visions</span> to life.
        </p>
        <p className="about-reveal text-lg text-muted-foreground max-w-2xl mb-20">
          With expertise in DaVinci Resolve, Adobe Premiere Pro, and After Effects, I deliver cinematic
          results for commercials, short films, documentaries, and music videos.
        </p>

        <div className="glow-line about-reveal mb-20" />

        <div className="grid grid-cols-3 gap-8 md:gap-16">
          {stats.map((stat, i) => (
            <div key={i} className="about-reveal">
              <div className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
                <span className="counter" data-target={stat.value}>
                  0
                </span>
                <span className="text-primary">{stat.suffix}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
