import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const companies = [
  "Netflix",
  "Apple",
  "Nike",
  "Spotify",
  "Adobe",
  "Red Bull",
  "Sony",
  "Warner Bros",
];

const CompaniesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Infinite marquee animation
      const marquee = marqueeRef.current;
      if (marquee) {
        gsap.to(marquee, {
          xPercent: -50,
          ease: "none",
          duration: 20,
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden">
      <div className="section-padding">
        <h2 ref={titleRef} className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-16">
          Companies I've Worked With
        </h2>
      </div>

      {/* Marquee container */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {[...companies, ...companies].map((company, i) => (
            <div
              key={i}
              className="flex items-center mx-8 md:mx-12"
            >
              <span className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-muted-foreground/30 hover:text-foreground transition-colors duration-500 cursor-default">
                {company}
              </span>
              <span className="ml-8 md:ml-12 text-primary text-2xl">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="section-padding mt-16">
        <div className="glow-line mb-8" />
        <p className="text-center text-muted-foreground text-sm">
          Trusted by <span className="text-foreground font-semibold">industry leaders</span> across film, advertising, and digital media
        </p>
      </div>
    </section>
  );
};

export default CompaniesSection;
