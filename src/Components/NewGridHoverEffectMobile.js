import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Shukr from "../Assets/Shukr.jpg";
import vid from "../Assets/vid.mp4";

const NewGridHoverEffectMobile = () => {
  const { i18n } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const data = [
    {
      label: "Ganzheitliche Beratung",
      subtitle: "Ganzheitliche Anamnese & Behandlungsplan",
      location: "Online & in Berlin",
      image: Shukr,
      video: vid,
    },
    {
      label: "Diagnostik",
      subtitle: 'Die Mehrwert bringt "Weit über Standardlabore"',
      location: "Berlin",
      image: Shukr,
      video: vid,
    },
    {
      label: "Infusion",
      subtitle: "individuelle Mischungen & extra speziell bei uns:",
      bullets: ["Ketamin Therapie", "Schimmel Therapie"],
      location: "Berlin",
      image: Shukr,
      video: vid,
    },
    {
      label: "Ärztliches Mentoring",
      subtitle: "Behandlungsplan mit Leichtigkeit umsetzen (Ernährung, Bewegung, Stressmanagement, Detox)",
      location: "Online & in Berlin",
      image: Shukr,
      video: vid,
    },
  ];

  return (
    <div
      className="flex flex-col gap-2 w-full px-4 py-6"
      style={{ backgroundColor: "#000" }}
    >
      <h2 className="text-white text-2xl font-bold text-center mb-6">
        Unsere Leistungen
      </h2>
      {data.map((item, index) => {
        const isExpanded = expandedIndex === index;
        return (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl transition-all duration-500 ease-in-out cursor-pointer"
            style={{
              height: isExpanded ? "280px" : "120px",
            }}
            onClick={() =>
              setExpandedIndex(isExpanded ? null : index)
            }
          >
            {isExpanded ? (
              <video
                src={item.video}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                loop
                autoPlay
                playsInline
              />
            ) : (
              <img
                src={item.image}
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {isExpanded ? (
              <>
                <div className="absolute top-5 left-6 right-4">
                  <h3 className="text-white font-bold uppercase text-2xl">
                    {item.label}
                  </h3>
                </div>
                <div className="absolute left-6 right-4" style={{ top: "160px" }}>
                  <p className="text-white text-sm">{item.subtitle}</p>
                  {item.bullets && (
                    <ul className="text-white text-sm list-disc list-inside mt-1">
                      {item.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
                {item.location && (
                  <div className="absolute right-4 bottom-4">
                    <p className="text-white text-sm font-semibold text-right">{item.location}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center px-6">
                <h3 className="text-white font-bold uppercase text-xl">
                  {item.label}
                </h3>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NewGridHoverEffectMobile;
