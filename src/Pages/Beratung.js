import FlipGrid from "../Components/FlipGrid";
import UnifiedBottomCta from "../Components/UnifiedBottomCta";

const beratungCards = [
  {
    number: "1",
    front: "Aktives Zuhören",
    image: "/Assets/Images_Beratung/Aktives Zuhören.png",
    back: "20 Min Gespräch mit Raum für deine Beschwerden, Geschichte & Biografie. Deine subjektive Empfindung wird immer ernst genommen.",
  },
  {
    number: "2",
    front: "Mehrblick statt Tunnelblick",
    image: "/Assets/Images_Beratung/Mehrblick statt Tunnelblick.png",
    back: "Mehrere Disziplinen in der Medizin. Ein roter Faden.",
  },
  {
    number: "3",
    front: "Sinnvolle Diagnostik-Empfehlungen",
    image: "/Assets/Images_Beratung/Diagnostik.png",
    back: "Nur Tests, die deine nächsten Schritte ändern.",
  },
  {
    number: "4",
    front: "Erste Roadmap",
    image: "/Assets/Images_Beratung/Roadmap.png",
    back: "Lebensstilveränderungen (Ernährung, Schlaf, Stress, Bewegung, Entgiftung) mit pflanzlichen Heilmitteln & Nährstoff-Therapie (ggf. Infusion).",
  },
];

function Beratung() {
  return (
    <div className="bg-white min-h-screen pt-20">
      <FlipGrid
        title="Deine ärztliche Beratung"
        subtitle={`Ich höre zu, sortiere Komplexität und denke interdisziplinär.
(Schulmedizin × Lebensstilmedizin × Anthroposophische & funktionelle Medizin × Toxikologie × Genetik).
Du gehst mit klaren Empfehlungen für Diagnostik & Handlungsplan nach dem VIVECURA-Konzept raus.
Also mit einem Plan für Lebensstil, pflanzliche Heilmittel und Nährstofftherapie.`}
        textLayout="stacked"
        stackedSubtitleMarginLeft="18%"
        showBottomButton={false}
        cards={beratungCards}
      />
      <UnifiedBottomCta className="pt-8 sm:pt-12 pb-20 sm:pb-28 px-5 sm:px-8" />
    </div>
  );
}

export default Beratung;
