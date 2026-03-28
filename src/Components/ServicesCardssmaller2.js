import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const ServicesCardssmaller2 = () => {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const expandedCardRef = useRef(null);
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

  // Scroll-based animation logic
  useEffect(() => {
    if (expandedIndex !== null) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const startPoint = windowHeight * 0.6;
      const endPoint = windowHeight * 0.8;
      const progress = Math.min(1, Math.max(0, (scrollY - startPoint) / (endPoint - startPoint)));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [expandedIndex]);

  // Only use the first 8 cards for a 4x2 grid - all Vitamin C
  const cards = [
    { title: t("services.vitaminC"), bg: "bg-gray-900", img: "/Assets/c.webp", description: t("services.vitaminC_desc"), targetX: -80, targetY: -40, rotate: -8 },
    { title: t("services.vitaminC"), bg: "bg-gray-900", img: "/Assets/c.webp", description: t("services.vitaminC_desc"), targetX: 60, targetY: -60, rotate: 6 },
    { title: t("services.vitaminC"), bg: "bg-gray-900", img: "/Assets/c.webp", description: t("services.vitaminC_desc"), targetX: -60, targetY: 60, rotate: 10 },
    { title: t("services.vitaminC"), bg: "bg-gray-900", img: "/Assets/c.webp", description: t("services.vitaminC_desc"), targetX: 80, targetY: 40, rotate: -12 },
    { title: t("services.vitaminC"), bg: "bg-gray-900", img: "/Assets/c.webp", description: t("services.vitaminC_desc"), targetX: -60, targetY: -60, rotate: 8 },
    { title: t("services.vitaminC"), bg: "bg-gray-900", img: "/Assets/c.webp", description: t("services.vitaminC_desc"), targetX: 80, targetY: 60, rotate: -6 },
    { title: t("services.vitaminC"), bg: "bg-gray-900", img: "/Assets/c.webp", description: t("services.vitaminC_desc"), targetX: -80, targetY: 40, rotate: 12 },
    { title: t("services.vitaminC"), bg: "bg-gray-900", img: "/Assets/c.webp", description: t("services.vitaminC_desc"), targetX: 60, targetY: 80, rotate: -10 },
  ];

  return (
    <div className="relative flex flex-col justify-center items-center bg-[#FAF9F6] overflow-hidden max-w-screen min-h-[60vh] pt-0 pb-16">
      <h1 className="mt-0 mb-32 text-5xl font-bold text-[#2A2B2F] text-center z-5 tracking-tighter">

        {t("Infusions.title")}
      </h1>
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
              className={`w-full h-[280px] rounded-2xl shadow-lg flex flex-col items-center cursor-pointer transition-transform duration-500 relative ${card.bg}`}
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
              <div className="relative z-10 flex flex-col w-full h-full p-1">
                <div className="px-2 pt-2">
                  <h2 className="font-bold text-xs md:text-lg text-white text-left">{card.title}</h2>
                  <p className="text-white text-xs md:text-sm w-full text-left opacity-80 line-clamp-3">{card.description}</p>
                </div>
                <div className="relative w-full flex-1 flex items-end">
                  <div className="w-full h-40 overflow-hidden rounded-b-2xl">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
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
          <div className="absolute inset-0 bg-black/75 transition-opacity duration-200 ease-out will-change-opacity" />
          <div
            ref={expandedCardRef}
            className="relative flex flex-col items-center justify-center popup-animate"
            style={{
              width: "min(1050px, 95vw)",
              height: "min(500px, 80vh)",
              maxWidth: "98vw",
              maxHeight: "90vh",
              padding: 0,
            }}
          >
            <div
              className={`absolute inset-0 ${cards[expandedIndex].bg} rounded-3xl transition-transform duration-500`}
              style={{
                boxShadow: "0 8px 40px 0 rgba(0,0,0,0.18)",
              }}
            />
            <div className="relative z-10 flex flex-col w-full h-full p-0 items-stretch justify-stretch">
              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedIndex(null);
                }}
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-40 hover:scale-110 rounded-full transition-all duration-150 ease-out shadow-lg will-change-transform"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Title on top */}
              <h2 className="font-bold text-3xl md:text-4xl text-white px-6 pt-6 pb-2 w-full text-left pr-16">{cards[expandedIndex].title}</h2>
              
              {/* Image and description side by side */}
              <div className="flex flex-row flex-1 w-full h-full gap-5 items-start justify-center px-6 pb-6">
                {/* Image on the left - medium size */}
                <div className="w-2/5 flex items-start justify-center h-full">
                  <div className="w-full h-[320px] flex items-center justify-center overflow-hidden rounded-2xl">
                    <img
                      src={cards[expandedIndex].img}
                      alt={cards[expandedIndex].title}
                      className="object-cover h-full w-full"
                    />
                  </div>
                </div>
                
                {/* Description on the right with scroll - more space */}
                <div className="w-3/5 flex flex-col justify-start h-full">
                  <div className="overflow-y-auto h-full pr-2" style={{ maxHeight: '320px' }}>
                    {false ? (
                      // Oral Surgery detailed content
                      <div className="text-white space-y-4">
                        <p className="text-base md:text-lg opacity-90 leading-relaxed">
                          From a simple wisdom tooth removal to a precise <span className="font-semibold">apicoectomy (WSR)</span>, oral surgery at <em>die drei zahnärzte</em> is designed to be as gentle as possible. We combine high-resolution 3-D imaging with minimally invasive techniques, so we remove only what's necessary and leave healthy tissue untouched.
                        </p>
                        
                        <div>
                          <h3 className="text-lg md:text-xl font-bold mb-3">What to expect</h3>
                          <ol className="space-y-3 text-sm md:text-base">
                            <li className="flex">
                              <span className="font-semibold mr-2">1.</span>
                              <div>
                                <span className="font-semibold text-yellow-300">Digital planning</span>: Cone-beam images show nerves, bone density and root shape before we start.
                              </div>
                            </li>
                            <li className="flex">
                              <span className="font-semibold mr-2">2.</span>
                              <div>
                                <span className="font-semibold text-yellow-300">Comfort first</span>: Local anesthetic keeps you relaxed throughout the procedure.
                              </div>
                            </li>
                            <li className="flex">
                              <span className="font-semibold mr-2">3.</span>
                              <div>
                                <span className="font-semibold text-yellow-300">PRGF® healing boost</span>: We place a small membrane of plasma rich in growth factors (made from your own blood sample) into the surgical site. This bioactive layer encourages faster bone regeneration, reduces swelling and cuts recovery time.
                              </div>
                            </li>
                            <li className="flex">
                              <span className="font-semibold mr-2">4.</span>
                              <div>
                                <span className="font-semibold text-yellow-300">Precise closure</span>: Fine sutures and, when needed, a laser finish promote clean, predictable healing.
                              </div>
                            </li>
                          </ol>
                        </div>
                        
                        <p className="text-sm md:text-base opacity-90 leading-relaxed">
                          We also perform <span className="font-semibold">aesthetic soft-tissue work</span> such as <span className="font-semibold">gingivectomy</span> or gum recontouring, often paired with <span className="font-semibold">aesthetic dentistry</span> and <span className="font-semibold">implantology</span> to complete your smile makeover.
                        </p>
                        
                        <p className="text-sm md:text-base opacity-90 leading-relaxed">
                          Wondering whether you need a surgical extraction or if a <span className="font-semibold text-yellow-300">microscope root-canal therapy</span> could save the tooth? Click through the links or book a consultation at our Kottbusser Tor clinic to explore every option in one visit.
                        </p>
                      </div>
                    ) : (
                      // Default content for other cards
                      <p className="text-white text-lg md:text-xl opacity-90 leading-relaxed">{cards[expandedIndex].description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes popupFadeIn {
              0% { 
                opacity: 0; 
                transform: translate3d(0, 0, 0) scale3d(0.85, 0.85, 1);
              }
              100% { 
                opacity: 1; 
                transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
              }
            }
            
            .popup-animate {
              animation: popupFadeIn 0.25s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
              will-change: transform, opacity;
              backface-visibility: hidden;
              transform-style: preserve-3d;
            }
            
            /* Custom scrollbar styling */
            .overflow-y-auto {
              scrollbar-width: thin;
              scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
            }
            
            .overflow-y-auto::-webkit-scrollbar {
              width: 6px;
            }
            
            .overflow-y-auto::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.1);
              border-radius: 3px;
            }
            
            .overflow-y-auto::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.3);
              border-radius: 3px;
              transition: background 0.2s ease;
            }
            
            .overflow-y-auto::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.5);
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default ServicesCardssmaller2;
