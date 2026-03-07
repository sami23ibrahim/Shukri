import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Shukr from "../Assets/Shukr.jpg";
import vid from "../Assets/vid.mp4";

const NewGridHoverEffectMobile = () => {
  const { i18n } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const data = [
    {
      label: "Beratung",
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
      label: "Mentoring",
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
            <div
              className={`absolute inset-0 flex flex-col px-6 ${
                isExpanded ? "justify-start pt-5" : "justify-center"
              }`}
            >
              <h3
                className="text-white font-bold uppercase"
                style={{
                  fontSize: isExpanded ? "1.6rem" : "1.4rem",
                }}
              >
                {item.label}
              </h3>
              {isExpanded && (
                <div className="mt-3 text-white">
                  <p className="text-sm opacity-90">{item.subtitle}</p>
                  {item.bullets && (
                    <ul className="text-sm opacity-90 list-disc list-inside mt-1">
                      {item.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {item.location && (
                    <p className="text-sm font-semibold mt-4">{item.location}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewGridHoverEffectMobile;
