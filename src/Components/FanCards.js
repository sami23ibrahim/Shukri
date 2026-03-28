import { useState, useEffect, useRef } from "react";
import Shukr from "../Assets/Shukr.jpg";

const cardData = [
  {
    image: Shukr,
    label: "Körperliche Symptome",
    title: "Körperliche Symptome",
    items: ["Ursachen & Zusammenhänge", "Diagnostik", "Plan + Umsetzung"],
  },
  {
    image: Shukr,
    label: "Prävention & Longevity",
    title: "Prävention & Longevity",
    items: [
      "Genetik: dein persönlicher Blueprint",
      "Biofeedback: HRV & CGM",
      "Longevity-Plan: Ernährung · Biohacking · Infusionen",
    ],
  },
  {
    image: Shukr,
    label: "Psychische Beschwerden",
    title: "Psychische Beschwerden",
    items: [
      "Ketamin-assistierte Therapie",
      "Biodynamische Psychotherapie",
      "Verhaltenstherapie",
    ],
  },
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
  const cardW = isMobile ? 240 : 360;
  const cardH = isMobile ? 340 : 460;

  const positions = [
    { x: -(cardW * 1), rotate: 0, z: 0, scale: 0.88 },
    { x: 0, rotate: 0, z: 10, scale: 1 },
    { x: cardW * 1, rotate: 0, z: 0, scale: 0.88 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FAF9F6] min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
    >
      <h2 className="text-[#2A2B2F] font-black leading-[0.85] tracking-tighter text-left mb-28 max-w-[50%] self-start ml-10" style={{ fontSize: "clamp(2.2rem, 7vw, 6rem)" }}>
        Get started in three ways
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
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <ul className="text-sm space-y-1 opacity-90 list-disc list-inside">
                  {card.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FanCards;
