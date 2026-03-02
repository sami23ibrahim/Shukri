

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Shukr from "../Assets/Shukr.jpg";

const NewGridHoverEffect = () => {
  const { t, i18n } = useTranslation(); // Get translation function
  const [hoveredIndex, setHoveredIndex] = useState(null); // State for hover functionality
  const [bgColor, setBgColor] = useState("#e8e2d4"); // Initial background color

  // Define the data inside the component
  const data2 = [
    { title: "grid1", image: Shukr, video: "/Assets/vid.mp4" },
    { title: "grid2", image: Shukr, video: "/Assets/vid.mp4" },
    { title: "grid3", image: Shukr, video: "/Assets/vid.mp4" },
    { title: "grid4", image: Shukr, video: "/Assets/vid.mp4" },
    { title: "grid5", image: Shukr, video: "/Assets/vid.mp4" },
    { title: "grid6", image: Shukr, video: "/Assets/vid.mp4" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const component = document.getElementById("new-grid-hover");
      const rect = component.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if the component is leaving the viewport
      if (rect.bottom < windowHeight + 10) {
        setBgColor("#000"); // Set light background color
      } else {
        setBgColor("#000"); // Reset to dark background color
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Split the data into chunks of 3 for each row
  const rows = [];
  for (let i = 0; i < data2.length; i += 3) {
    rows.push(data2.slice(i, i + 3));
  }

  return (
    <div
      id="new-grid-hover"
      className="relative flex flex-col gap-4 p-4 w-full mt-0 pt-0 pl-10 pr-10 transition-colors"
      style={{
        backgroundColor: bgColor,
        transition: "background-color 1.2s ease",
        paddingBottom: "180px", // Keeps existing spacing
        paddingTop: "10px", // Keeps existing spacing
      }}
    >
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap gap-1">
          {row.map((item, index) => {
            const globalIndex = index + rowIndex * 3; // Unique index across all rows
            return (
              <div
                key={globalIndex}
                className={`relative overflow-hidden rounded-lg transition-all duration-700 ${
                  Math.floor(globalIndex / 3) === Math.floor(hoveredIndex / 3)
                    ? hoveredIndex === globalIndex
                      ? "flex-[1.2] z-10"
                      : hoveredIndex !== null
                      ? "flex-[0.9]"
                      : "flex-1"
                    : "flex-1"
                }`}
                style={{
                  height: "270px",
                  marginLeft: "10px",
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
                {/* Overlay */}
                <div className="absolute inset-0 flex items-start justify-start mt-4 ml-8">
                  <h3
                    className="text-[white] text-2xl font-bold"
                    style={{
                      fontSize: i18n.language === "de" ? "1.7rem" : "2rem", // Adjust German text size
                    }}
                  >
                    {t(`grid_hover.items.${item.title}`)}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default NewGridHoverEffect;
