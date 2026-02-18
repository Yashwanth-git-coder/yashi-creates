import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reels = [
  {
    title: "Color Grade Magic",
    category: "Tutorial",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=700&fit=crop",
    color: "from-blue-500/20",
    youtubeId: "Hxv14yGfFIU",
  },
  {
    title: "Night City Vibes",
    category: "Cinematic",
    thumbnail: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=400&h=700&fit=crop",
    color: "from-purple-500/20",
    youtubeId: "tiNSBbr_CWY",
  },
  {
    title: "Raw to Final",
    category: "Before & After",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=700&fit=crop",
    color: "from-rose-500/20",
    youtubeId: "YOUR_SHORTS_ID_4",
  },
  {
    title: "Drone Shots",
    category: "Aerial",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=700&fit=crop",
    color: "from-emerald-500/20",
    youtubeId: "YOUR_SHORTS_ID_5",
  },
  {
    title: "Slow Mo Edit",
    category: "Effects",
    thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=700&fit=crop",
    color: "from-orange-500/20",
    youtubeId: "YOUR_SHORTS_ID_6",
  },
];

const ReelsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeReel, setActiveReel] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      const cards = sectionRef.current?.querySelectorAll(".reel-card");
      cards?.forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="reels" ref={sectionRef} className="py-32 section-padding">
      <div className="flex items-center justify-between mb-12">
        <h2 ref={titleRef} className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Short-Form / Reels
        </h2>
        <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">
          Scroll →
        </span>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {reels.map((reel, i) => (
          <div
            key={i}
            className="reel-card group relative flex-shrink-0 w-[220px] md:w-[260px] aspect-[9/16] rounded-2xl overflow-hidden cursor-none snap-start"
            onClick={() => setActiveReel(i)}
            role="button"
          >
            <img
              src={reel.thumbnail}
              alt={reel.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${reel.color} via-transparent to-transparent opacity-60`} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Play icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="w-14 h-14 rounded-full glass-panel flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                <Play className="w-5 h-5 text-primary ml-0.5" />
              </div>
            </div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="text-[10px] uppercase tracking-widest text-primary block mb-1">
                {reel.category}
              </span>
              <h3 className="text-sm font-semibold text-foreground tracking-tight leading-tight">
                {reel.title}
              </h3>
            </div>

            {/* Top-right reel indicator */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full glass-panel flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-primary">
                <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Video modal */}
      {activeReel !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-sm"
          onClick={() => setActiveReel(null)}
        >
          <button
            onClick={() => setActiveReel(null)}
            className="absolute top-8 right-8 text-foreground hover:text-primary transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${reels[activeReel].youtubeId}?autoplay=1&rel=0`}
              title={reels[activeReel].title}
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

export default ReelsSection;
