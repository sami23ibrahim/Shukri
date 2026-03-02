import { useEffect, useRef, useState } from "react";

const defaultLines = [
  "Ganzheitlich denken & Individuell handeln.",
  "Mit der Vision:",
  "“CHRONISCH GESUND SEIN“",
  "meow meow meow.",
];

function ScrolledLines({ lines = defaultLines }) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateActiveLine = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const stickyRange = rect.height - viewportHeight;

      // Keep first line highlighted until the sticky block is fully in place.
      if (rect.top > 0 || stickyRange <= 0) {
        setActiveIndex(0);
        return;
      }

      // Progress starts only after the section reaches the top (sticky engaged).
      const progress = -rect.top / stickyRange;
      const clamped = Math.min(1, Math.max(0, progress));
      const nextIndex = Math.round(clamped * (lines.length - 1));
      setActiveIndex(nextIndex);
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveLine);
    };

    updateActiveLine();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [lines]);

  const sectionHeight = `${100 + (lines.length - 1) * 60}vh`;

  return (
    <section ref={sectionRef} className="relative bg-black" style={{ height: sectionHeight }}>
      <div className="sticky top-0 flex h-screen items-center justify-center px-4">
        <div className="w-full max-w-5xl text-center">
          {lines.map((line, index) => {
            const isActive = index === activeIndex;
            return (
              <p
                key={`${line}-${index}`}
                className={`transition-all duration-500 ease-out font-semibold tracking-tight ${
                  isActive
                    ? "text-white opacity-100 text-3xl sm:text-4xl md:text-5xl"
                    : "text-white/10 opacity-90 text-3xl sm:text-4xl md:text-5xl"
                }`}
              >
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ScrolledLines;
