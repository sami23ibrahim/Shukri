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

const SWIPE_THRESHOLD = 50;

function FanCardsMobile({ cards: cardData = defaultCardData, title = "Deine Themen im Fokus" }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const sectionRef = useRef(null);
  const touchStartX = useRef(0);
  const navigate = useNavigate();
  const lastIndex = cardData.length - 1;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setOpen(entry.isIntersecting),
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < SWIPE_THRESHOLD) return;
    if (diff > 0) {
      setActiveIndex((prev) => Math.min(prev + 1, lastIndex));
    } else {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const cardW = 240;
  const cardH = 320;
  const sideScale = 0.75;
  const peekWidth = 50;

  const getCardStyle = (index) => {
    const isCenter = index === activeIndex;

    if (isCenter) {
      return {
        x: 0,
        scale: 1,
        z: 10,
        opacity: 1,
      };
    }

    if (index < activeIndex) {
      return {
        x: -(cardW * 0.5 + peekWidth),
        scale: sideScale,
        z: index,
        opacity: 0.95,
      };
    }

    return {
      x: cardW * 0.5 + peekWidth,
      scale: sideScale,
      z: lastIndex - index,
      opacity: 0.95,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white flex flex-col items-center justify-center overflow-x-hidden px-4 py-10 sm:py-14 md:hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h2 className="text-[#43A9AB] font-black leading-[0.85] tracking-tighter text-left mb-10 max-w-[50%] self-start ml-4" style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}>
        {title}
      </h2>

      <div
        className="relative"
        style={{
          width: "100%",
          maxWidth: "320px",
          height: `${cardH + 60}px`,
        }}
      >
        {cardData.map((card, i) => {
          const style = getCardStyle(i);
          return (
            <div
              key={i}
              onClick={() => i === activeIndex && card.path && navigate(card.path)}
              className={`absolute rounded-2xl overflow-hidden shadow-2xl ${card.path ? "cursor-pointer" : ""}`}
              style={{
                width: `${cardW}px`,
                height: `${cardH}px`,
                left: "50%",
                top: "50%",
                marginLeft: `${-cardW / 2}px`,
                marginTop: `${-cardH / 2}px`,
                transform: open
                  ? `translateX(${style.x}px) scale(${style.scale})`
                  : "translateX(0px) scale(0.8)",
                opacity: open ? style.opacity : 0,
                zIndex: style.z,
                transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease",
              }}
            >
              <img
                src={card.image}
                alt={card.label}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-end p-3 text-white">
                <h3 className="text-base font-bold mb-1">{card.title}</h3>
                <p className="text-xs opacity-90">{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots indicator */}
      <div className="flex gap-2 mt-6">
        {cardData.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              backgroundColor: i === activeIndex ? "white" : "rgba(255,255,255,0.4)",
              transform: i === activeIndex ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default FanCardsMobile;
