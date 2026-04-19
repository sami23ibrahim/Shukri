import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ServicesCardssmaller2 from "../Components/ServicesCardssmaller2";

const shots = [
  {
    title: "Vitamin D Shot",
    img: "/Assets/infusions-pics/Vitamin D Shot.png",
    duration: "15 min.",
    oldPrice: "40 €",
    price: "25 €",
    desc: "Eine einzige Spritze kann monatelange tägliche Einnahme ersetzen.",
    tags: ["Immunsystem", "Knochen", "Hormonbalance"],
    popupDesc: "Die meisten Menschen nehmen Vitamin D täglich als Tablette und hoffen, dass es ankommt. Tut es oft aber nicht. Denn D3 ist fettlöslich: ohne optimalen Gallenfluss, gesunden Darm und gleichzeitige Fettzufuhr kann ein Großteil einfach durchrauschen. Dieser Shot kann das Problem ein für alle Mal lösen: 100.000 IU direkt in den Muskel, sofort ins Depot, kann für Monate wirken.",
    ingredients: "Vitamin D3 100.000 IU (Cholecalciferol)",
    whyTitle: "Warum dieser Shot?",
    whyText: "Vitamin D ist kein normales Vitamin. Es kann als Hormon wirken und kann an über 200 Genprozessen beteiligt sein: Immunabwehr, Knochenaufbau, Muskelkraft, Stimmung, Schlaf, Testosteron, Schilddrüse. Studien zeigen, dass über 80% der Deutschen einen suboptimalen Spiegel haben, viele ohne es zu wissen.\n\nIm Vergleich: Eine 1.000 IU Tablette täglich, 3 Monate lang – 90 Tabletten, täglich daran denken, und davon kommt je nach Darmgesundheit nur ein Bruchteil wirklich an. Dieser Shot? Eine Ampulle, fünf Minuten, direkt in den Muskel – kann 100.000 IU sofort ins Körperdepot liefern, zu 100% verfügbar, ohne Umweg über Darm oder Galle. Was Tabletten in einem Vierteljahr versuchen zu erreichen, kann dieser Shot in einem einzigen Termin schaffen.",
  },
  {
    title: "Magnesium Shot",
    img: "/Assets/infusions-pics/Magnesium Shot.png",
    duration: "15 min.",
    price: "ca. 39 €",
    desc: "Eine einzige Infusion kann das erreichen, was Tabletten in Wochen kaum schaffen.",
    tags: ["Entspannung", "Durchblutung", "Fatigue"],
    popupDesc: "Wer Magnesium kennt, kennt es als Tablette. Wer es einmal intravenös bekommen hat, nimmt nie wieder nur Tabletten!",
    ingredients: "Magnesium 6mmol (i.v.)",
    whyTitle: "Warum dieser Shot – und warum als Serie?",
    whyText: "Es geht nicht darum, Speicher aufzufüllen. Es geht darum, was in dem Moment passiert, wenn Magnesium direkt ins Blut geht und was passiert, wenn man diesen Moment wiederholt.\n\nMagnesium i.v. kann die glatte Muskulatur der Blutgefäße sofort entspannen, den Blutdruck senken und die Durchblutung schlagartig steigern. Viele Patienten spüren es live: eine intensive Wärme breitet sich vom Arm über den ganzen Körper aus. Das ist echte Vasodilatation, der Körper öffnet sich buchstäblich! Muskeln können loslassen, das Nervensystem kann runterfahren, der Herzrhythmus kann sich stabilisieren.\n\nBei chronischer Erschöpfung und Fatigue kann genau dieser kurzfristige Reset entscheidend sein. Nicht weil der Körper danach dauerhaft verändert ist, sondern weil jede Wiederholung das Nervensystem trainiert, wieder in diesen Zustand zu kommen. Wie ein Reset-Knopf, der mit jeder Sitzung leichter zu drücken ist. Als Serie angewendet, kann sich diese kurze, tiefe Entspannung in nachhaltige Erholung verwandeln; messbar an HRV, Schlafqualität und Energielevel.",
  },
  {
    title: "Glutathion Shot",
    img: "/Assets/infusions-pics/Glutathion Shot.png",
    duration: "15 min.",
    price: "45 €",
    desc: "Direkt intravenös für sofortige Bioverfügbarkeit auf Zellniveau.",
    tags: ["Entgiftung", "Zellschutz", "Skin Glow-Up"],
    popupDesc:
      "Der Körper produziert Glutathion selbst, aber Stress, Toxine, Alter und Nährstoffmängel leeren die Speicher schnell. Oral aufgenommen wird es kaum resorbiert: Magensäure und Darmenzyme bauen es ab, bevor es ankommt. Dieser Shot liefert reduziertes Glutathion direkt in die Vene: sofort bioverfügbar, sofort wirksam. Die Zellen bekommen das, was sie wirklich brauchen.",
    ingredients: "Reduziertes Glutathion 1.800 mg (L-Glutathion)",
    whyTitle: "Warum dieser Shot?",
    whyText:
      "Glutathion ist das mächtigste körpereigene Antioxidans. Es neutralisiert freie Radikale, regeneriert andere Antioxidantien wie Vitamin C und E, und ist zentraler Bestandteil der Leberdetoxifikation. Gleichzeitig schützt es Mitochondrien, unterstützt das Immunsystem und kann die Haut von innen aufhellen. Wer chronisch erschöpft ist, viele Toxine ausgesetzt war oder einfach auf Zellniveau regenerieren will, für den ist das der direkteste Weg.",
  },
];

function ShotsSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [expandedShot, setExpandedShot] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (expandedShot === null) return;
    const handleClose = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) setExpandedShot(null);
    };
    document.addEventListener("mousedown", handleClose);
    return () => document.removeEventListener("mousedown", handleClose);
  }, [expandedShot]);

  useEffect(() => {
    if (expandedShot !== null) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = orig; };
    }
  }, [expandedShot]);

  return (
    <section ref={sectionRef} className="px-4 pt-24 pb-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#43A9AB] tracking-tighter mb-4">
          Shots
        </h2>
        <p className="text-[#515757]/60 text-base sm:text-lg mb-12 max-w-xl">
          Gezielte Wirkstoffe als schnelle Injektion — ohne lange Sitzung.
        </p>
        <div className="grid grid-cols-2 gap-6 max-w-2xl">
          {shots.map((shot, i) => (
            <div
              key={i}
              onClick={() => setExpandedShot(i)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col cursor-pointer hover:scale-[1.03] transition-transform duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.5s ease-out ${i * 0.1}s, transform 0.5s ease-out ${i * 0.1}s`,
              }}
            >
              <div className="w-full h-36 overflow-hidden">
                <img src={shot.img} alt={shot.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col flex-1 px-4 pt-3 pb-4">
                <h3 className="font-semibold text-base text-[#515757]">{shot.title}</h3>
                <div className="flex items-center gap-1.5 mt-1 text-[#515757]/50 text-xs">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{shot.duration}</span>
                </div>
                <p className="text-xs text-[#515757]/60 mt-2 leading-relaxed flex-1">{shot.desc}</p>
                <div className="flex items-center gap-2 mt-3">
                  {shot.oldPrice && <span className="text-sm text-[#515757]/40 line-through">{shot.oldPrice}</span>}
                  <span className="text-lg font-bold text-[#515757]">{shot.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {expandedShot !== null && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 transition-opacity duration-200 ease-out" />
          <div
            ref={popupRef}
            className="relative bg-white rounded-3xl popup-animate flex flex-col overflow-hidden"
            style={{ width: "min(500px, 92vw)", maxHeight: "90vh", boxShadow: "0 8px 40px 0 rgba(0,0,0,0.18)" }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setExpandedShot(null); }}
              className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:scale-110 transition-transform"
            >
              <svg className="w-4 h-4 text-[#515757]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="overflow-y-auto flex-1">
              <div className="w-full h-48 overflow-hidden">
                <img src={shots[expandedShot].img} alt={shots[expandedShot].title} className="w-full h-full object-cover" />
              </div>

              <div className="px-6 pt-5 pb-4">
                <h2 className="font-bold text-xl text-[#515757]">{shots[expandedShot].title}</h2>
                <p className="mt-3 text-sm text-[#515757]/70 leading-relaxed">{shots[expandedShot].popupDesc}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {shots[expandedShot].tags.map((tag, i) => (
                    <span key={i} className="text-xs font-medium text-[#43a9ab] bg-[#43a9ab]/10 px-3 py-1.5 rounded-full">{tag}</span>
                  ))}
                </div>

                <div className="h-px bg-[#515757]/10 mt-6 mb-5" />

                <div className="mb-5">
                  <h3 className="text-sm font-bold text-[#515757] mb-1">Inhaltsstoffe</h3>
                  <p className="text-sm text-[#515757]/60 leading-relaxed">{shots[expandedShot].ingredients}</p>
                </div>

                {shots[expandedShot].whyTitle && (
                  <div>
                    <h3 className="text-sm font-bold text-[#515757] mb-2">{shots[expandedShot].whyTitle}</h3>
                    <p className="text-sm text-[#515757]/60 leading-relaxed whitespace-pre-line">{shots[expandedShot].whyText}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#515757]/10 flex items-center gap-3">
              <div className="flex items-center gap-2">
                {shots[expandedShot].oldPrice && <span className="text-sm text-[#515757]/40 line-through">{shots[expandedShot].oldPrice}</span>}
                <span className="text-xl font-bold text-[#515757]">{shots[expandedShot].price}</span>
              </div>
              <div className="flex-1 flex items-center gap-2 justify-end">
                <a
                  href="https://www.doctolib.de/arzt/berlin/shukri-jarmoukli/booking/new-patient?specialityId=1286&speciality_ids%5B%5D=1286&source=profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#43a9ab] text-sm font-medium text-white hover:bg-[#389193] transition-colors no-underline"
                >
                  Jetzt buchen
                </a>
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
    </section>
  );
}

function Infusions() {
  const { t } = useTranslation();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero section to give scroll room for card animation */}
      <section className="relative z-40 flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 bg-white">
        <span className="inline-block text-[#43a9ab] text-sm tracking-[0.2em] uppercase font-medium mb-6">
          Infusionstherapie
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-[#43A9AB] tracking-tighter leading-tight max-w-3xl">
          {t("Infusions.title")}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-[#515757]/60 max-w-xl leading-relaxed">
          {t("services.vitaminC_desc")}
        </p>
        <div className="mt-12 flex items-center gap-2 text-[#515757]/30 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <ServicesCardssmaller2 />

      <ShotsSection />
    </div>
  );
}

export default Infusions;
