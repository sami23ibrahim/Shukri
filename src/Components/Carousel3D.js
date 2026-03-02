import { useState, useEffect } from "react";
import Shukr from "../Assets/Shukr.jpg";

const cards = [
  { image: Shukr, label: "Review 1" },
  { image: Shukr, label: "Review 2" },
  { image: Shukr, label: "Review 3" },
  { image: Shukr, label: "Review 4" },
  { image: Shukr, label: "Review 5" },
  { image: Shukr, label: "Review 6" },
  { image: Shukr, label: "Review 7" },
];

function Carousel3D() {
  const [angle, setAngle] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = cards.length;
  const sliceAngle = 360 / count;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setAngle((a) => a - 0.1), 16);
    return () => clearInterval(id);
  }, [paused]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const radius = isMobile ? 180 : 320;
  const cardWidth = isMobile ? "160px" : "240px";
  const cardHeight = isMobile ? "220px" : "320px";

  return (
    <section className="relative bg-black min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-16">
        Was unsere Patienten sagen
      </h2>

      <div
        className="mx-auto"
        style={{
          perspective: "1200px",
          height: isMobile ? "280px" : "400px",
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${angle}deg)`,
            transition: paused ? "transform 0.3s ease" : "none",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {cards.map((card, i) => {
            const rot = sliceAngle * i;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 rounded-xl overflow-hidden"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  marginLeft: `calc(-${cardWidth} / 2)`,
                  marginTop: `calc(-${cardHeight} / 2)`,
                  transform: `rotateY(${rot}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
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
      </div>
    </section>
  );
}

export default Carousel3D;
