import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Neon Metropolis", category: "Commercial", year: "2025", image: project1, youtubeId: "QfHxIiU7szQ" },
  { title: "Into The Fog", category: "Short Film", year: "2024", image: project2, youtubeId: "uBWcK3KzJjY" },
  { title: "Tidal Forces", category: "Documentary", year: "2024", image: project3, youtubeId: "YOUR_PROJECT_VIDEO_3" },
  { title: "Stage Light", category: "Music Video", year: "2023", image: project4, youtubeId: "YOUR_PROJECT_VIDEO_4" },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      const cards = sectionRef.current?.querySelectorAll(".project-card");
      cards?.forEach((card, i) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-32 section-padding">
      <h2 ref={titleRef} className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-16">
        Selected Work
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project, i) => (
          <div
            key={i}
            className="project-card group relative overflow-hidden rounded-xl aspect-[4/3] cursor-none"
            onClick={() => setActiveProject(i)}
            role="button"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            {/* Project info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs uppercase tracking-widest text-primary">{project.category}</span>
                <span className="w-8 h-px bg-muted-foreground/30" />
                <span className="text-xs text-muted-foreground">{project.year}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                {project.title}
              </h3>
            </div>

            {/* Top-right arrow */}
            <div className="absolute top-6 right-6 w-10 h-10 rounded-full glass-panel flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-primary">
                <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* More button */}
      <div className="flex justify-center mt-16">
        <a
          href="https://drive.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group px-8 py-4 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 text-sm uppercase tracking-wider flex items-center gap-3"
        >
          View More Projects
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 14 14" 
            fill="none" 
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
      </div>

      {/* Video modal */}
      {activeProject !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-sm"
          onClick={() => setActiveProject(null)}
        >
          <button
            onClick={() => setActiveProject(null)}
            className="absolute top-8 right-8 text-foreground hover:text-primary transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${projects[activeProject].youtubeId}?autoplay=1&rel=0`}
              title={projects[activeProject].title}
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

export default ProjectsSection;
