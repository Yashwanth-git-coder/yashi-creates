import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Split headline words
    const words = headlineRef.current?.querySelectorAll(".word");
    if (words) {
      gsap.set(words, { yPercent: 120, opacity: 0 });
      tl.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.08,
        ease: "power4.out",
      });
    }

    tl.from(subRef.current, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");
    tl.from(imgRef.current, { scale: 1.1, opacity: 0, duration: 1.5, ease: "power3.out" }, "-=1");

    // Parallax on scroll
    gsap.to(imgRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => { tl.kill(); };
  }, []);

  const headline = "I craft Real-life stories through motion.";
  const words = headline.split(" ");

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end pb-20 md:pb-32 section-padding overflow-hidden"
    >
      {/* Background image with overlay */}
      <div ref={imgRef} className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: "hsl(36, 90%, 55%)" }} />
      <div className="absolute bottom-1/3 left-1/6 w-48 h-48 rounded-full opacity-5 blur-3xl" style={{ backgroundColor: "hsl(36, 90%, 55%)" }} />

      <div className="relative z-10 max-w-5xl">
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tighter mb-8"
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
              <span className="word inline-block">
                {word === "Real-life" || word === "motion." ? (
                  <span className="text-gradient">{word}</span>
                ) : (
                  word
                )}
              </span>
            </span>
          ))}
        </h1>
        <p ref={subRef} className="text-lg md:text-xl text-muted-foreground max-w-lg">
          Professional video editor specializing in narrative storytelling, color grading, and visual effects.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs tracking-widest text-muted-foreground uppercase">Scroll</span>
        <div className="w-px h-12 bg-muted-foreground/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
