import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const obj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          onComplete,
        });
      },
    });

    // Animate counter
    tl.to(obj, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(obj.val)),
    });

    // Animate line
    tl.to(lineRef.current, { scaleX: 1, duration: 2.5, ease: "power2.inOut" }, 0);

    // Brief pause at 100
    tl.to({}, { duration: 0.4 });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <span
        ref={counterRef}
        className="text-8xl md:text-9xl font-light tracking-tighter text-foreground tabular-nums"
      >
        {count}
      </span>
      <div className="w-48 md:w-64 h-px bg-secondary mt-8 overflow-hidden">
        <div
          ref={lineRef}
          className="h-full origin-left scale-x-0"
          style={{ backgroundColor: "hsl(36, 90%, 55%)" }}
        />
      </div>
    </div>
  );
};

export default Loader;
