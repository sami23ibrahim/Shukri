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

const SWIPE_THRESHOLD = 50;

function FanCardsMobile() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const sectionRef = useRef(null);
  const touchStartX = useRef(0);

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
      setActiveIndex((prev) => Math.min(prev + 1, 2));
    } else {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const cardW = 280;
  const cardH = 380;
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
      z: 2 - index,
      opacity: 0.95,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FAF9F6] min-h-[70vh] flex flex-col items-center justify-center overflow-hidden px-4 md:hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h2 className="text-[#2A2B2F] text-2xl font-bold text-center mb-12">
        Get started in three ways
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
              className="absolute rounded-2xl overflow-hidden shadow-2xl"
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
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex flex-col justify-end p-3 text-white">
                <h3 className="text-base font-bold mb-1">{card.title}</h3>
                <ul className="text-xs space-y-0.5 opacity-90 list-disc list-inside">
                  {card.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
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
