import { useState, useEffect } from "react";

function CrossedWord({ word, strikeDelay = "1s" }) {
  return (
    <span className="relative inline-block">
      {word}
      <svg
        className="pointer-events-none absolute left-0 top-1/2 w-full -translate-y-1/2 overflow-visible"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 6 Q 50 5 100 6"
          fill="none"
          stroke="#ef4444"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="120"
          strokeDashoffset="120"
          className="animate-strike-curve"
          style={{ animationDelay: strikeDelay }}
        />
      </svg>
    </span>
  );
}

export default function HeroLine() {
  const [showUrsachen, setShowUrsachen] = useState(false);
  const [showKlarerPlan, setShowKlarerPlan] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowUrsachen(true), 5500);
    const t2 = setTimeout(() => setShowKlarerPlan(true), 9000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen py-8 gap-8 px-4 lg:px-12 items-center">
      {/* Left: Text content */}
      <div className="flex-1 flex flex-col justify-center gap-8 lg:items-start lg:max-w-[50%]">
        {/* First block - appears first */}
        <div
          className="text-xl md:text-3xl font-semibold font-serif text-[#2A2B2F] opacity-0 animate-fade-in-up max-w-3xl leading-relaxed text-center lg:text-left"
          style={{ animationDelay: "0s", animationFillMode: "forwards" }}
        >
        <p>Wir begleiten dich auf deiner Reise:</p>
        <p className="mt-2">
          von chronischen <CrossedWord word="Beschwerden" strikeDelay="1.2s" />{" "}
          hin zu chronischer Gesundheit!
        </p>
      </div>

        {/* Second block - appears, then swaps to "Suche die Ursachen." */}
        <div className="relative min-h-[4rem] flex items-center justify-center lg:justify-start w-full">
        <p
          className={`text-2xl md:text-4xl font-semibold font-serif text-center text-[#2A2B2F] absolute transition-opacity duration-500 ${
            showUrsachen ? "opacity-0 pointer-events-none" : "opacity-0 animate-fade-in-up"
          }`}
          style={{
            animationDelay: "2.5s",
            animationFillMode: "forwards",
          }}
        >
          Bekämpfe nicht nur <CrossedWord word="Symptome." strikeDelay="3.5s" />
        </p>
        <p
          className={`text-2xl md:text-4xl font-semibold font-serif text-center text-[#2A2B2F] transition-opacity duration-500 ${
            showUrsachen ? "opacity-100 animate-fade-in-up" : "opacity-0"
          }`}
          style={showUrsachen ? { animationDelay: "0s", animationFillMode: "forwards" } : {}}
        >
          Suche die <span className="border-b-2 border-[#2A2B2F] border-solid">Ursachen</span>.
        </p>
        </div>

        {/* Third block - appears, then swaps to "Erhalte einen klaren Plan." */}
        <div className="relative min-h-[4rem] flex items-center justify-center lg:justify-start w-full">
        <p
          className={`text-2xl md:text-4xl font-semibold font-serif text-center text-[#2A2B2F] absolute transition-opacity duration-500 ${
            showKlarerPlan ? "opacity-0 pointer-events-none" : "opacity-0 animate-fade-in-up"
          }`}
          style={{
            animationDelay: "6.5s",
            animationFillMode: "forwards",
          }}
        >
          Keine weiterer <CrossedWord word="eigenen Versuche." strikeDelay="7.5s" />
        </p>
        <p
          className={`text-2xl md:text-4xl font-semibold font-serif text-center text-[#2A2B2F] transition-opacity duration-500 ${
            showKlarerPlan ? "opacity-100 animate-fade-in-up" : "opacity-0"
          }`}
          style={showKlarerPlan ? { animationDelay: "0s", animationFillMode: "forwards" } : {}}
        >
          Erhalte einen <span className="border-b-2 border-[#2A2B2F] border-solid">klaren Plan</span>.
        </p>
        </div>
      </div>

      {/* Right: Shukr image */}
      <div
        className="flex-1 w-full lg:max-w-[50%] min-h-[40vh] lg:min-h-[80vh] rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat shadow-lg"
        style={{
          backgroundImage: "url(/Assets/Shukr.jpg)",
          backgroundPosition: "center right",
        }}
      />
    </div>
  );
}
