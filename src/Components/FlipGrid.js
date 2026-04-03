import { useState, useEffect, useRef } from "react";
import useIsMobile from "../hooks/useIsMobile";

const cards = [
  { number: "1", front: "banana", back: "meow meow meow." },
  { number: "2", front: "banana", back: "meow meow meow." },
  { number: "3", front: "banana", back: "meow meow meow." },
  { number: "4", front: "banana", back: "meow meow meow." },
];

function CardGrid({ cards, visible, flipped, setFlipped, slideDirections }) {
  return cards.map((card, i) => {
    const dir = slideDirections[i];
    return (
      <div
        key={i}
        className="relative cursor-pointer"
        style={{
          transform: visible
            ? "translate(0, 0)"
            : `translate(${dir.x}, ${dir.y})`,
          opacity: visible ? 1 : 0,
          transition: `transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s, opacity 0.6s ease ${i * 0.1}s`,
          perspective: "1000px",
        }}
        onMouseEnter={() => setFlipped(i)}
        onMouseLeave={() => setFlipped(null)}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped === i ? "rotateX(180deg)" : "rotateX(0deg)",
            transition: "transform 0.6s ease",
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl bg-gray-900 flex flex-col justify-between p-5"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="text-white/40 text-sm font-mono">{card.number}</span>
            <h3 className="text-white text-base md:text-lg font-bold">{card.front}</h3>
          </div>
          <div
            className="absolute inset-0 rounded-2xl bg-gray-800 flex items-center justify-center p-6"
            style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
          >
            <p className="text-white text-center text-sm md:text-base">{card.back}</p>
          </div>
        </div>
      </div>
    );
  });
}

function FlipGrid() {
  const [visible, setVisible] = useState(false);
  const [flipped, setFlipped] = useState(null);
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const slideDirections = [
    { x: "-100%", y: "-50%" },
    { x: "100%", y: "-50%" },
    { x: "-100%", y: "50%" },
    { x: "100%", y: "50%" },
  ];

  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        className="relative bg-white min-h-screen flex flex-col overflow-hidden"
        style={{ padding: "2rem 1.5rem" }}
      >
        <h2
          className="text-[#515757] font-black leading-[0.85] tracking-tighter mb-6"
          style={{ fontSize: "clamp(2.5rem, 14vw, 5rem)" }}
        >
          VIVECURA<br />Title
        </h2>

        <p className="text-[#515757] text-base font-semibold leading-snug mb-8" style={{ maxWidth: "280px" }}>
          Placeholder description text goes here, combining tools for professional presentation, visibility, connection and knowledge sharing.
        </p>

        <div
          className="grid grid-cols-2 gap-3 flex-1"
          style={{ perspective: "1000px" }}
        >
          <CardGrid
            cards={cards}
            visible={visible}
            flipped={flipped}
            setFlipped={setFlipped}
            slideDirections={slideDirections}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-white min-h-screen flex flex-row overflow-hidden"
      style={{ padding: "3rem 4rem" }}
    >
      <div className="flex flex-col justify-between" style={{ width: "45%", paddingRight: "2rem" }}>
        <h2
          className="text-[#515757] font-black leading-[0.85] tracking-tighter"
          style={{ fontSize: "clamp(2.8rem, 8.4vw, 7.7rem)" }}
        >
          VIVECURA<br />Title
        </h2>

        <p
          className="text-[#515757] text-lg md:text-xl font-semibold leading-snug"
          style={{ maxWidth: "320px", marginLeft: "55%", marginBottom: "5%" }}
        >
          Placeholder description text goes here, combining tools for professional presentation, visibility, connection and knowledge sharing.
        </p>
      </div>

      <div
        className="grid grid-cols-2 gap-4"
        style={{ width: "35%", perspective: "1000px", alignSelf: "stretch", marginLeft: "15%" }}
      >
        <CardGrid
          cards={cards}
          visible={visible}
          flipped={flipped}
          setFlipped={setFlipped}
          slideDirections={slideDirections}
        />
      </div>
    </section>
  );
}

export default FlipGrid;
