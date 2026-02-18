import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tools = [
  { name: "After Effects", category: "Motion Graphics" },
  { name: "Premiere Pro", category: "Video Editing" },
  { name: "DaVinci Resolve", category: "Color Grading" },
  { name: "Canva", category: "All Designs" },
  { name: "Photoshop", category: "Compositing" },
  { name: "Audition", category: "Audio Editing" },
];

const ToolsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      const items = sectionRef.current?.querySelectorAll(".tool-item");
      items?.forEach((item, i) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 90%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 section-padding">
      <h2 ref={titleRef} className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-16">
        Tools I Work With
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {tools.map((tool, i) => (
          <div
            key={i}
            className="tool-item group glass-panel rounded-xl p-6 text-center hover:border-primary/30 transition-all duration-500"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-500">
              <span className="text-2xl font-bold text-primary">{tool.name.charAt(0)}</span>
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{tool.name}</h3>
            <p className="text-xs text-muted-foreground">{tool.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ToolsSection;
