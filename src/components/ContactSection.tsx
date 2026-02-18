import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll(".contact-reveal");
      els?.forEach((el, i) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 pb-20 section-padding">
      <div className="max-w-4xl">
        <h2 className="contact-reveal text-sm uppercase tracking-[0.3em] text-muted-foreground mb-12">
          Get In Touch
        </h2>

        <h3 className="contact-reveal text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-12">
          Let's create something{" "}
          <span className="text-gradient">extraordinary</span>
          <span className="text-primary">.</span>
        </h3>

        <div className="contact-reveal flex flex-wrap gap-6 mb-20">
          <a
            href="mailto:hello@editor.com"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="magnetic-btn px-8 py-4 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 text-lg"
          >
            hello@editor.com
          </a>
        </div>

        <div className="glow-line contact-reveal mb-12" />

        <div className="contact-reveal flex flex-wrap gap-8 text-sm">
          {["Instagram", "Vimeo", "Behance", "LinkedIn"].map((link) => (
            <a
              key={link}
              href="#"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="magnetic-btn text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase tracking-wider relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        <span>© 2025 Yashiii Edits. All rights reserved.</span>
        <span>Crafted with precision</span>
      </div>
    </section>
  );
};

export default ContactSection;
