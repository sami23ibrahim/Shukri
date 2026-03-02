

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next"; // Import translation hook

gsap.registerPlugin(ScrollTrigger);

const OurPhilosophy = () => {
  const { t, i18n } = useTranslation(); // Get translation function
  const quotesRef = useRef([]); // References for the quotes

  useEffect(() => {
    // Animate blur effect for each quote
    quotesRef.current.forEach((quote, index) => {
      if (quote) {
        gsap.fromTo(
          quote,
          { filter: "blur(10px)", opacity: 0.7 }, // Initial state
          {
            filter: "blur(0px)", // Final state
            opacity: 1, // Fully visible
            duration: 1.5,
            scrollTrigger: {
              trigger: quote,
              start: "top 90%", // Start animation when the quote enters the viewport
              end: "top 50%", // End animation at this point
              scrub: true, // Smooth animation
            },
          }
        );
      }
    });
  }, []);

  return (
    <div className="bg-black py-32 px-6 flex flex-col items-center" style={{ minHeight: "0px" }}>
      {/* "Our Philosophy" Title */}
      <h2
        className="text-white text-7xl font-bold text-center tracking-tighter pb-24"
        style={{
          fontSize: i18n.language === "de" ? "2.8rem" : "3.5rem", // Adjust German text size
        }}
      >
        {t("philosophy.title")}
      </h2>

      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            ref={(el) => (quotesRef.current[index] = el)}
            className="text-center flex flex-col items-center space-y-4 px-4"
          >
            <blockquote className="text-2xl lg:text-2xl font-medium text-white leading-relaxed">
              {t(`philosophy.quotes.${index + 1}`)}
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPhilosophy;
