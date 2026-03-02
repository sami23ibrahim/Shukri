import { useState, useEffect, useRef } from "react";
import Shukr from "../Assets/Shukr.jpg";

const cardData = [
  { image: Shukr, label: "Card 1" },
  { image: Shukr, label: "Card 2" },
  { image: Shukr, label: "Card 3" },
];

function FanCards() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setOpen(entry.isIntersecting),
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const cardW = isMobile ? 180 : 280;
  const cardH = isMobile ? 250 : 380;

  const positions = [
    { x: -(cardW * 1), rotate: 0, z: 0, scale: 0.88 },
    { x: 0, rotate: 0, z: 10, scale: 1 },
    { x: cardW * 1, rotate: 0, z: 0, scale: 0.88 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-black min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
    >
      <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-20">
        Unsere Leistungen
      </h2>

      <div
        className="relative"
        style={{
          width: isMobile ? "340px" : "700px",
          height: `${cardH + 40}px`,
        }}
      >
        {cardData.map((card, i) => {
          const pos = positions[i];
          return (
            <div
              key={i}
              className="absolute rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: `${cardW}px`,
                height: `${cardH}px`,
                left: "50%",
                top: "50%",
                marginLeft: `${-cardW / 2}px`,
                marginTop: `${-cardH / 2}px`,
                transform: open
                  ? `translateX(${pos.x}px) rotate(${pos.rotate}deg) scale(${hovered === i ? 1.08 : pos.scale})`
                  : "translateX(0px) rotate(0deg) scale(1)",
                zIndex: hovered === i ? 20 : pos.z,
                transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0s",
              }}
            >
              <img
                src={card.image}
                alt={card.label}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FanCards;
