import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, X } from "lucide-react";
import showreelThumb from "@/assets/showreel-thumb.jpg";

gsap.registerPlugin(ScrollTrigger);

const SHOWREEL_YOUTUBE_ID = "QfHxIiU7szQ"; // Replace with your YouTube video ID

const ShowreelSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(thumbRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: thumbRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="showreel" ref={sectionRef} className="py-32 section-padding">
      <h2 ref={titleRef} className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-12">
        Showreel
      </h2>

      <div
        ref={thumbRef}
        onClick={() => setIsOpen(true)}
        className="relative group cursor-none overflow-hidden rounded-xl aspect-video max-w-5xl mx-auto"
        role="button"
      >
        <img
          src={showreelThumb}
          alt="Showreel thumbnail"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/40 transition-all duration-500 group-hover:bg-background/20" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full glass-panel flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <Play className="w-8 h-8 text-primary ml-1" />
          </div>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 100px hsl(36, 90%, 55%, 0.1)",
          }}
        />
      </div>

      {/* Modal overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 text-foreground hover:text-primary transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${SHOWREEL_YOUTUBE_ID}?autoplay=1&rel=0`}
              title="Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ShowreelSection;
