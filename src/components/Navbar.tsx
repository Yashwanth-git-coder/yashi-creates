import { useEffect, useRef } from "react";
import gsap from "gsap";

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -40,
      opacity: 0,
      duration: 1,
      delay: 3.5,
      ease: "power3.out",
    });
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 section-padding py-6 flex items-center justify-between mix-blend-difference"
    >
      <button onClick={() => scrollTo("hero")} className="text-lg font-semibold tracking-tight text-foreground">
        Yashiii Edits<span className="text-primary">.</span>
      </button>
      <div className="hidden md:flex items-center gap-8 text-sm tracking-wider text-muted-foreground">
        {["showreel", "projects", "about", "contact"].map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            className="uppercase hover:text-foreground transition-colors duration-300 relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
