import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
const defaultCardData = [
  {
    image: "/Assets/KoerperlicheBeschwerden.png",
    label: "K\u00F6rperliche Symptome",
    title: "K\u00F6rperliche Symptome",
    desc: "Analyse von Ursachen und Zusammenh\u00E4ngen als Grundlage f\u00FCr gezielte Diagnostik und Therapie.",
    path: "/koerperliche-symptome",
  },
  {
    image: "/Assets/PraeventionLongevity.png",
    label: "Pr\u00E4vention & Longevity",
    title: "Pr\u00E4vention & Longevity",
    desc: "Fr\u00FCherkennung und gezielte Ma\u00DFnahmen zur langfristigen Stabilisierung von Gesundheit und Leistungsf\u00E4higkeit.",
    path: "/praevention-longevity",
  },
  {
    image: "/Assets/Psychotherapie.png",
    label: "Psychische Beschwerden",
    title: "Psychische Beschwerden",
    desc: "Ganzheitliche Therapieans\u00E4tze zur Stabilisierung der mentalen Gesundheit und F\u00F6rderung innerer Balance.",
    path: "/psychotherapie",
  },
];

function FanCards({ cards: cardData = defaultCardData, title = "Deine Themen im Fokus" }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setOpen(entry.isIntersecting),
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const cardW = isMobile ? 220 : 280;
  const cardH = isMobile ? 300 : 380;

  const positions = [
    { x: -(cardW * 1), rotate: 0, z: 0, scale: 0.88 },
    { x: 0, rotate: 0, z: 10, scale: 1 },
    { x: cardW * 1, rotate: 0, z: 0, scale: 0.88 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-white flex flex-col items-center justify-center overflow-x-hidden px-5 sm:px-10 py-10 sm:py-14"
    >
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-[#43A9AB] font-black leading-[0.85] tracking-tighter text-left mb-12 sm:mb-16 max-w-[50%]" style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}>
          {title}
        </h2>
      </div>

      <div
        className="relative"
        style={{
          width: isMobile ? "320px" : "580px",
          height: `${cardH + 40}px`,
        }}
      >
        {cardData.map((card, i) => {
          const pos = positions[i];
          return (
            <div
              key={i}
              className={`absolute rounded-2xl overflow-hidden shadow-2xl ${card.path ? "cursor-pointer" : ""}`}
              onClick={() => { if (card.path) navigate(card.path); }}
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
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-sm opacity-90">{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FanCards;
