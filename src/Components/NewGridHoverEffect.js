

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Shukr from "../Assets/Shukr.jpg";
import vid from "../Assets/vid.mp4";

const NewGridHoverEffect = () => {
  const { t, i18n } = useTranslation(); // Get translation function
  const [hoveredIndex, setHoveredIndex] = useState(null); // State for hover functionality
  const [bgColor, setBgColor] = useState("#FAF9F6"); // Initial background color

  // Define the data inside the component
  const data2 = [
    {
      title: "grid1",
      label: "Beratung",
      subtitle: "Ganzheitliche Anamnese & Behandlungsplan",
      location: "Online & in Berlin",
      image: Shukr,
      video: vid,
    },
    {
      title: "grid2",
      label: "Diagnostik",
      subtitle: 'Die Mehrwert bringt "Weit über Standardlabore"',
      location: "Berlin",
      image: Shukr,
      video: vid,
    },
    {
      title: "grid3",
      label: "Infusion",
      subtitle: "individuelle Mischungen & extra speziell bei uns:",
      bullets: ["Ketamin Therapie", "Schimmel Therapie"],
      location: "Berlin",
      image: Shukr,
      video: vid,
    },
    {
      title: "grid4",
      label: "Mentoring",
      subtitle: "Behandlungsplan mit Leichtigkeit umsetzen (Ernährung, Bewegung, Stressmanagement, Detox)",
      location: "Online & in Berlin",
      image: Shukr,
      video: vid,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const component = document.getElementById("new-grid-hover");
      const rect = component.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if the component is leaving the viewport
      if (rect.bottom < windowHeight + 10) {
        setBgColor("#FAF9F6"); // Set light background color
      } else {
        setBgColor("#FAF9F6"); // Reset to dark background color
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const rows = [data2];

  return (
    <div
      id="new-grid-hover"
      className="relative flex flex-col gap-4 p-4 w-full mt-0 pt-0 pl-10 pr-10 transition-colors"
      style={{
        backgroundColor: bgColor,
        transition: "background-color 1.2s ease",
        paddingBottom: "180px", // Keeps existing spacing
        paddingTop: "10px",
      }}
    >
      <h2 className="text-[#2A2B2F] text-3xl md:text-4xl font-bold text-center mb-8 mt-8">
        Unsere Leistungen
      </h2>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((item, index) => {
            const globalIndex = index;
            return (
              <div
                key={globalIndex}
                className={`relative overflow-hidden rounded-lg transition-all duration-700 ${
                  true
                    ? hoveredIndex === globalIndex
                      ? "flex-[1.2] z-10"
                      : hoveredIndex !== null
                      ? "flex-[0.9]"
                      : "flex-1"
                    : "flex-1"
                }`}
                style={{
                  height: "400px",
                  marginLeft: "2px",
                }}
                onMouseEnter={() => setHoveredIndex(globalIndex)} // Set the unique index
                onMouseLeave={() => setHoveredIndex(null)} // Reset hover state
              >
                {hoveredIndex === globalIndex ? (
                  <video
                    src={item.video}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={t(`grid_hover.items.${item.title}`)}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-6 left-8 right-4">
                  <h3 className="text-white font-bold uppercase text-3xl">
                    {item.label}
                  </h3>
                </div>
                <div className="absolute left-8 right-4" style={{ top: "200px" }}>
                  <p className="text-white text-base">{item.subtitle}</p>
                  {item.bullets && (
                    <ul className="text-white text-base list-disc list-inside mt-1">
                      {item.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
                {item.location && (
                  <div className="absolute right-4 bottom-6">
                    <p className="text-white text-base font-semibold text-right">{item.location}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default NewGridHoverEffect;
