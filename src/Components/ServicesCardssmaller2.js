import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const ServicesCardssmaller2 = () => {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const expandedCardRef = useRef(null);
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Close expanded card on outside click only
  useEffect(() => {
    if (expandedIndex === null) return;
    const handleClose = (e) => {
      if (
        expandedCardRef.current &&
        !expandedCardRef.current.contains(e.target)
      ) {
        setExpandedIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [expandedIndex]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (expandedIndex !== null) {
      // Store original overflow value
      const originalOverflow = document.body.style.overflow;
      // Disable scrolling
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore original overflow when modal closes
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [expandedIndex]);

  // Scroll-based animation logic — relative to the component's position
  useEffect(() => {
    if (expandedIndex !== null) return;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Animation starts when section is still well below the viewport,
      // completes when section top reaches upper third
      const start = windowHeight * 2.0;
      const end = windowHeight * 0.1;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [expandedIndex]);

  // Only use the first 8 cards for a 4x2 grid - all Vitamin C
  const cards = [
    { title: "Multivitamin", bg: "bg-white", img: "/Assets/drip_multivitamin_a53f61d2c3.avif", duration: "45 min", oldPrice: "79 €", price: "67 €", perSession: "ab 53 € / Sitzung", popupTitle: "Multivitamin Infusion", popupDesc: "Unsere Multivitamin Infusion versorgt Ihren Körper mit allen essentiellen Vitaminen und Mineralstoffen für optimale Gesundheit und Vitalität.", popupPrice: "254 €", popupOldPrice: "299 €", popupPerSession: "Ab 203 €/Sitzung", benefits: ["Energie", "Immunsystem", "Vitalität"], targetX: -280, targetY: -500, rotate: -35 },
    { title: t("services.vitaminC"), bg: "bg-white", img: "/Assets/drip_vitc_f7557cbb84.avif", duration: "45 min", oldPrice: "79 €", price: "67 €", perSession: "ab 53 € / Sitzung", popupTitle: "Vitamin C Infusion", popupDesc: "Unsere Vitamin C Infusion stärkt das Immunsystem, fördert die Kollagenbildung und schützt Ihre Zellen vor oxidativem Stress.", popupPrice: "254 €", popupOldPrice: "299 €", popupPerSession: "Ab 203 €/Sitzung", benefits: ["Immunsystem", "Hautgesundheit", "Zellschutz"], targetX: 120, targetY: -620, rotate: -12 },
    { title: "Signature Defence", bg: "bg-white", img: "/Assets/drip_signature_defence_6532db62ee.avif", duration: "45 min", oldPrice: "79 €", price: "67 €", perSession: "ab 53 € / Sitzung", popupTitle: "Signature Defence Infusion", popupDesc: "Unsere Signature Defence Infusion stärkt Ihre natürlichen Abwehrkräfte und unterstützt den Körper bei der Bekämpfung von Infektionen.", popupPrice: "254 €", popupOldPrice: "299 €", popupPerSession: "Ab 203 €/Sitzung", benefits: ["Abwehrkräfte", "Regeneration", "Wohlbefinden"], targetX: -150, targetY: -350, rotate: 55 },
    { title: "NAD+", bg: "bg-white", img: "/Assets/drip_nad_1969236622.avif", duration: "45 min", oldPrice: "79 €", price: "67 €", perSession: "ab 53 € / Sitzung", popupTitle: "NAD+ Infusion", popupDesc: "Unsere NAD+ Infusion kann die zelluläre Energieproduktion und Zellgesundheit fördern sowie zur Verbesserung der körperlichen und geistigen Leistungsfähigkeit beitragen.", popupPrice: "254 €", popupOldPrice: "299 €", popupPerSession: "Ab 203 €/Sitzung", benefits: ["Energie", "Konzentration & Gedächtnis", "Zellgesundheit"], targetX: 300, targetY: -480, rotate: -45 },
    { title: "Glutathione", bg: "bg-white", img: "/Assets/drip_glutathione_4b6de816b8.avif", duration: "45 min", oldPrice: "79 €", price: "67 €", perSession: "ab 53 € / Sitzung", popupTitle: "Glutathione Infusion", popupDesc: "Unsere Glutathion Infusion ist das stärkste körpereigene Antioxidans und unterstützt die Entgiftung sowie den Schutz Ihrer Zellen.", popupPrice: "254 €", popupOldPrice: "299 €", popupPerSession: "Ab 203 €/Sitzung", benefits: ["Entgiftung", "Zellschutz", "Anti-Aging"], targetX: -250, targetY: -520, rotate: 32 },
    { title: "VagusFit", bg: "bg-white", img: "/Assets/drip_vagusfit_8b75f8ed37.avif", duration: "45 min", oldPrice: "79 €", price: "67 €", perSession: "ab 53 € / Sitzung", popupTitle: "VagusFit Infusion", popupDesc: "Unsere VagusFit Infusion unterstützt das Nervensystem und fördert die Stressresistenz durch gezielte Nährstoffversorgung.", popupPrice: "254 €", popupOldPrice: "299 €", popupPerSession: "Ab 203 €/Sitzung", benefits: ["Stressabbau", "Nervensystem", "Entspannung"], targetX: 280, targetY: -450, rotate: -28 },
    { title: "Spermidine", bg: "bg-white", img: "/Assets/drip_spermidine_2fed94ec8b.avif", duration: "45 min", oldPrice: "79 €", price: "67 €", perSession: "ab 53 € / Sitzung", popupTitle: "Spermidine Infusion", popupDesc: "Unsere Spermidin Infusion fördert die zelluläre Autophagie und unterstützt die natürlichen Erneuerungsprozesse Ihres Körpers.", popupPrice: "254 €", popupOldPrice: "299 €", popupPerSession: "Ab 203 €/Sitzung", benefits: ["Zellerneuerung", "Langlebigkeit", "Autophagie"], targetX: -270, targetY: -470, rotate: 48 },
    { title: "Myers Cocktail", bg: "bg-white", img: "/Assets/drip_myers_5173c940cb.avif", duration: "45 min", oldPrice: "79 €", price: "67 €", perSession: "ab 53 € / Sitzung", popupTitle: "Myers Cocktail Infusion", popupDesc: "Der klassische Myers Cocktail kombiniert Vitamine und Mineralstoffe für einen umfassenden Gesundheitsboost und mehr Energie.", popupPrice: "254 €", popupOldPrice: "299 €", popupPerSession: "Ab 203 €/Sitzung", benefits: ["Energie", "Immunsystem", "Mineralstoffe"], targetX: 260, targetY: -530, rotate: -40 },
  ];

  return (
    <div ref={sectionRef} className="relative flex flex-col justify-center items-center bg-[#FAF9F6] max-w-screen min-h-[60vh] pt-0 pb-16" style={{ overflowX: 'clip', overflowY: 'visible' }}>
      {/* Blurred overlay when expanded */}
      {expandedIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-40 transition-opacity duration-200 ease-out will-change-opacity" />
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl px-4 relative z-50">
        {cards.map((card, index) => {
          // Expanded card logic
          if (expandedIndex === index) {
            return null; // Hide the original card in the grid when expanded
          }
          // Normal card with scroll-based animation
          // Calculate animation transform
          const gridCol = index % 4;
          const gridRow = Math.floor(index / 4);
          // Final position: no transform
          // Initial: stacked in center, with offset and rotation
          const translateX = (1 - scrollProgress) * card.targetX;
          const translateY = (1 - scrollProgress) * card.targetY;
          const rotate = (1 - scrollProgress) * card.rotate;
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setExpandedIndex(index)}
              className={`w-full h-[280px] rounded-2xl shadow-lg flex flex-col cursor-pointer transition-transform duration-500 relative ${card.bg}`}
              style={{
                zIndex: hoveredIndex === index ? 70 : 10,
                transform:
                  `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)` +
                  (hoveredIndex === index ? " scale(1.07)" : " scale(1)"),
                filter: expandedIndex !== null ? "blur(2px)" : "none",
                pointerEvents: expandedIndex !== null ? "none" : "auto",
              }}
            >
              <div
                className={`absolute inset-0 ${card.bg} rounded-3xl transition-transform duration-500`}
                style={{
                  transform: hoveredIndex === index ? "scale(1.03)" : "scale(1)",
                  transitionTimingFunction: "cubic-bezier(0.3, 2.5, 0.6, 1.8)",
                  transitionDuration: "500ms",
                }}
              />
              <div className="relative z-10 flex flex-col w-full h-full">
                <div className="w-full h-40 overflow-hidden rounded-t-2xl">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 px-4 pt-3 pb-4">
                  <h2 className="font-semibold text-base md:text-lg text-[#2A2B2F] text-left">{card.title}</h2>
                  <div className="flex items-center gap-1.5 mt-1 text-[#2A2B2F]/50 text-xs md:text-sm">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{card.duration}</span>
                  </div>
                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#2A2B2F]/40 line-through">{card.oldPrice}</span>
                        <span className="text-lg font-bold text-[#2A2B2F]">{card.price}</span>
                      </div>
                      <span className="text-xs text-[#2A2B2F]/50">{card.perSession}</span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-[#2e7d5b] flex items-center justify-center hover:bg-[#256b4d] transition-colors">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Expanded card overlay */}
      {expandedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 transition-opacity duration-200 ease-out" />
          <div
            ref={expandedCardRef}
            className="relative bg-white rounded-3xl popup-animate flex flex-col overflow-hidden"
            style={{
              width: "min(500px, 92vw)",
              maxHeight: "90vh",
              boxShadow: "0 8px 40px 0 rgba(0,0,0,0.18)",
            }}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpandedIndex(null);
              }}
              className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:scale-110 transition-transform"
            >
              <svg className="w-4 h-4 text-[#2A2B2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1">
              {/* Bag image */}
              <div className="flex items-center justify-center pt-8 pb-4">
                <img
                  src="/Assets/bag.png"
                  alt={cards[expandedIndex].title}
                  className="h-48 object-contain"
                />
              </div>

              {/* Content */}
              <div className="px-6 pt-5 pb-4">
                <h2 className="font-bold text-xl text-[#2A2B2F]">{cards[expandedIndex].popupTitle}</h2>
                <p className="mt-2 text-sm text-[#2A2B2F]/60 leading-relaxed">{cards[expandedIndex].popupDesc}</p>

                {/* Benefits list */}
                <div className="mt-5">
                  {cards[expandedIndex].benefits.map((benefit, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-3 py-3">
                        <span className="w-9 h-9 rounded-full bg-[#e6f4ed] flex items-center justify-center text-[#2e7d5b]">
                          {i === 0 && (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          )}
                          {i === 1 && (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          )}
                          {i === 2 && (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6" strokeLinecap="round"/><circle cx="12" cy="16" r="0.5" fill="currentColor"/></svg>
                          )}
                        </span>
                        <span className="font-medium text-[#2A2B2F]">{benefit}</span>
                      </div>
                      {i < cards[expandedIndex].benefits.length - 1 && (
                        <div className="h-px bg-[#2A2B2F]/10 ml-12" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="px-6 py-4 border-t border-[#2A2B2F]/10 flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-[#2A2B2F]">{cards[expandedIndex].popupPrice}</span>
                  <span className="text-sm text-[#2A2B2F]/40 line-through">{cards[expandedIndex].popupOldPrice}</span>
                </div>
                <span className="text-xs text-[#2A2B2F]/50">{cards[expandedIndex].popupPerSession}</span>
              </div>
              <div className="flex-1 flex items-center gap-2 justify-end">
                <button className="px-5 py-2.5 rounded-full border border-[#2A2B2F]/20 text-sm font-medium text-[#2A2B2F] hover:bg-[#2A2B2F]/5 transition-colors">
                  Mehr erfahren
                </button>
                <button className="px-5 py-2.5 rounded-full bg-[#2e7d5b] text-sm font-medium text-white hover:bg-[#256b4d] transition-colors">
                  Jetzt buchen
                </button>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes popupFadeIn {
              0% { opacity: 0; transform: scale3d(0.85, 0.85, 1); }
              100% { opacity: 1; transform: scale3d(1, 1, 1); }
            }
            .popup-animate {
              animation: popupFadeIn 0.25s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default ServicesCardssmaller2;
