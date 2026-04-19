import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ✅ FIXED reels array
const reels = [
  {
    title: "Color Grade Magic",
    category: "Tutorial",
    youtubeId: "nC0AbmFIgAU",
    color: "from-blue-500/20",
  },
  {
    title: "Night City Vibes",
    category: "Cinematic",
    youtubeId: "tiNSBbr_CWY",
    color: "from-purple-500/20",
  },
  {
    title: "Raw to Final",
    category: "Before & After",
    youtubeId: "dQw4w9WgXcQ", // replace with real ID
    color: "from-rose-500/20",
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
        <h2
          ref={titleRef}
          className="text-sm uppercase tracking-[0.3em] text-muted-foreground"
        >
          Short-Form / Reels
        </h2>
        <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">
          Scroll →
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
      >
        {reels.map((reel, i) => (
          <div
            key={i}
            className="reel-card group relative flex-shrink-0 w-[220px] md:w-[260px] aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer snap-start"
            onClick={() => setActiveReel(i)}
          >
            {/* ✅ YouTube thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${reel.youtubeId}/hqdefault.jpg`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  `https://img.youtube.com/vi/${reel.youtubeId}/default.jpg`;
              }}
              alt={reel.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            {/* Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${reel.color} via-transparent to-transparent opacity-60`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur">
                <Play className="w-5 h-5 text-white ml-1" />
              </div>
            </div>

            {/* Text */}
            <div className="absolute bottom-0 p-4">
              <span className="text-xs text-white/70 block">
                {reel.category}
              </span>
              <h3 className="text-sm font-semibold text-white">
                {reel.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeReel !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90"
          onClick={() => setActiveReel(null)}
        >
          <button className="absolute top-8 right-8 text-white">
            <X className="w-8 h-8" />
          </button>

          <div
            className="w-full max-w-sm aspect-[9/16]"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${reels[activeReel].youtubeId}?autoplay=1&mute=1`}
              className="w-full h-full rounded-xl"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ReelsSection;