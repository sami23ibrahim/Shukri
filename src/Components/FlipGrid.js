import { useState, useEffect, useRef } from "react";
import useIsMobile from "../hooks/useIsMobile";

const defaultCards = [
  {
    number: "1",
    front: "Ern\u00E4hrungsplan & Sportmuster",
    image: "/Assets/\u00C4rztliches Mentoring/ernaehrung-sport.png",
    back: "Dein individueller Plan auf Basis deiner Laborwerte und K\u00F6rperkomposition. Nachhaltige Muster statt starrer Di\u00E4ten: f\u00FCr Energie, Leistung und Regeneration.",
  },
  {
    number: "2",
    front: "Schlafoptimierung",
    image: "/Assets/\u00C4rztliches Mentoring/schlafoptimierung.png",
    back: "Wir analysieren deine Schlafarchitektur und St\u00F6rfaktoren wie Licht, Cortisol und Mikron\u00E4hrstoffe. Ziel: tieferer Schlaf und bessere Regeneration.",
  },
  {
    number: "3",
    front: "Stressmanagement",
    image: "/Assets/\u00C4rztliches Mentoring/stressmanagement.png",
    back: "Messbare Marker wie HRV und Cortisol-Tagesprofil zeigen deine Belastungslage. Daraus folgen gezielte Tools: Atemtechniken, Nervensystem-Regulation und Coaching.",
  },
  {
    number: "4",
    front: "Supplementplan & Infusionen",
    image: "/Assets/\u00C4rztliches Mentoring/supplements-infusionen.png",
    back: "Gezielte Mikron\u00E4hrstoffe und Wirkstoffe, abgestimmt auf Labor und Anamnese. Oral oder per IV-Infusion f\u00FCr schnelle, sp\u00FCrbare Effekte.",
  },
];

function CardGrid({ cards, visible, flipped, setFlipped, slideDirections }) {
  return cards.map((card, i) => {
    const dir = slideDirections[i];
    return (
      <div
        key={i}
        className="relative cursor-pointer"
        style={{
          transform: visible
            ? "translate(0, 0)"
            : `translate(${dir.x}, ${dir.y})`,
          opacity: visible ? 1 : 0,
          transition: `transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s, opacity 0.6s ease ${i * 0.1}s`,
          perspective: "1000px",
        }}
        onMouseEnter={() => setFlipped(i)}
        onMouseLeave={() => setFlipped(null)}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped === i ? "rotateX(180deg)" : "rotateX(0deg)",
            transition: "transform 0.6s ease",
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col justify-between p-5"
            style={{
              backfaceVisibility: "hidden",
              backgroundImage: `url("${card.image}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 85%)" }}
            />
            <span className="relative text-white/70 text-sm font-mono">{card.number}</span>
            <h3 className="relative text-white text-base md:text-lg font-bold drop-shadow">{card.front}</h3>
          </div>
          <div
            className="absolute inset-0 rounded-2xl flex flex-col justify-center p-5 md:p-6"
            style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)", backgroundColor: "#43A9AB" }}
          >
            <h3 className="text-white text-base md:text-lg font-bold mb-3 leading-tight">{card.front}</h3>
            <p className="text-white/90 text-xs md:text-sm leading-relaxed">{card.back}</p>
          </div>
        </div>
      </div>
    );
  });
}

function FlipGrid({
  title = "Ärztliches Mentoring",
  subtitle = "Mein Mentoring Ansatz unterteilt sich in vier verschiedene Teilbereiche, die dir umfangreich dabei helfen, deine individuellen Ziele zu erreichen.",
  textLayout = "offset",
  cards = defaultCards,
  showBottomButton = true,
  stackedSubtitleMarginLeft = "12%",
}) {
  const [visible, setVisible] = useState(false);
  const [flipped, setFlipped] = useState(null);
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const slideDirections = [
    { x: "-100%", y: "-50%" },
    { x: "100%", y: "-50%" },
    { x: "-100%", y: "50%" },
    { x: "100%", y: "50%" },
  ];

  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        className="relative bg-white min-h-screen flex flex-col overflow-hidden"
        style={{ padding: "2rem 1.5rem" }}
      >
        <h2
          className="text-[#43A9AB] font-black leading-[0.85] tracking-tighter mb-6"
          style={{ fontSize: "clamp(1.8rem, 10vw, 3.5rem)" }}
        >
          {title}
        </h2>

        <p className="text-[#515757] text-base font-semibold leading-snug mb-8 whitespace-pre-line" style={{ maxWidth: "280px" }}>
          {subtitle}
        </p>

        <div
          className="grid grid-cols-2 gap-3 flex-1"
          style={{ perspective: "1000px" }}
        >
          <CardGrid
            cards={cards}
            visible={visible}
            flipped={flipped}
            setFlipped={setFlipped}
            slideDirections={slideDirections}
          />
        </div>

        {showBottomButton && (
          <div className="flex justify-center mt-8">
            <a
              href="https://www.doctolib.de/arzt/berlin/shukri-jarmoukli/booking/new-patient?specialityId=1286&speciality_ids%5B%5D=1286&source=profile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 text-base font-semibold bg-[#43A9AB] text-white rounded-full hover:bg-[#378f91] transition-colors"
            >
              Termin vereinbaren
            </a>
          </div>
        )}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-white min-h-screen flex flex-row overflow-hidden"
      style={{ padding: "3rem 4rem 8rem" }}
    >
      <div className="flex flex-col justify-between" style={{ width: "45%", paddingRight: "2rem" }}>
        <h2
          className="text-[#43A9AB] font-black leading-[0.85] tracking-tighter"
          style={{
            fontSize: "clamp(2rem, 5.5vw, 5rem)",
            marginLeft: textLayout === "stacked" ? "12%" : "15%",
          }}
        >
          {title}
        </h2>

        <p
          className="text-[#515757] text-lg md:text-xl font-semibold leading-snug whitespace-pre-line"
          style={
            textLayout === "stacked"
              ? { maxWidth: "460px", marginLeft: stackedSubtitleMarginLeft, marginBottom: "5%" }
              : { maxWidth: "320px", marginLeft: "55%", marginBottom: "5%" }
          }
        >
          {subtitle}
        </p>
      </div>

      <div
        className="flex flex-col"
        style={{ width: "35%", alignSelf: "stretch", marginLeft: "15%", transform: "translateY(8%)" }}
      >
        <div
          className="grid grid-cols-2 gap-4 flex-1"
          style={{ perspective: "1000px" }}
        >
          <CardGrid
            cards={cards}
            visible={visible}
            flipped={flipped}
            setFlipped={setFlipped}
            slideDirections={slideDirections}
          />
        </div>

        {showBottomButton && (
          <div className="flex justify-center mt-8">
            <a
              href="https://www.doctolib.de/arzt/berlin/shukri-jarmoukli/booking/new-patient?specialityId=1286&speciality_ids%5B%5D=1286&source=profile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 text-base md:text-lg font-semibold bg-[#43A9AB] text-white rounded-full hover:bg-[#378f91] transition-colors"
            >
              Termin vereinbaren
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default FlipGrid;
