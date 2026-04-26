import FlipGrid from "../Components/FlipGrid";
import FanCards from "../Components/FanCards";
import FanCardsMobile from "../Components/FanCardsMobile";
import UnifiedBottomCta from "../Components/UnifiedBottomCta";
import ProcessTimeline from "../Components/ProcessTimeline";
import useIsMobile from "../hooks/useIsMobile";
import Seo from "../Components/Seo";

const mentoringFocusCards = [
  {
    image: "/Assets/Deine Themen im Fokus2/OnlineMentoring.png",
    label: "1:1-Mentoring \u2013 online oder vor Ort",
    title: "1:1-Mentoring \u2013 online oder vor Ort",
    desc: "Regelm\u00E4\u00DFige Sessions, dazwischen kurze Impulse/Check-ins f\u00FCr Momentum.",
    path: "",
  },
  {
    image: "/Assets/Deine Themen im Fokus2/Biofeedback.png",
    label: "Biofeedback als Kompass",
    title: "Biofeedback als Kompass",
    desc: "HRV, BIA, CGM & Schlaf/Energie-Signale zeigen, was wirkt: wir kalibrieren Dosis, Timing, Reihenfolge.",
    path: "",
  },
  {
    image: "/Assets/Deine Themen im Fokus2/Selflove.png",
    label: "Selbstwirksamkeit als Ziel",
    title: "Selbstwirksamkeit als Ziel",
    desc: "Du wirst lernen, deine eigenen Signale zu deuten. Mit zunehmender Zeit, wirst du mich dabei immer weniger brauchen.",
    path: "",
  },
];

const processSteps = [
  {
    title: "Kostenloses Kennenlerngespr\u00E4ch",
    lines: [
      "Wir sprechen pers\u00F6nlich (online), und finden gemeinsam heraus, ob wir zusammenpassen.",
      "Wenn es stimmig ist, dann erfolgt eine medizinische Beratung.",
    ],
  },
  {
    title: "\u00C4rztlicher Starttermin",
    lines: [
      "Medizinische Beratung mit Anamnese & Empfehlung f\u00FCr Diagnostik ist ein Muss; rote Flaggen ausschlie\u00DFen.",
    ],
  },
  {
    title: "Pr\u00E4zise Diagnostik \u2013 weit \u00FCber das typische Labor hinaus:",
    lines: [
      "Blut, Urin, Stuhl & Genetik-Analysen f\u00FCr maximale Personalisierung.",
      "Untersuchung auf N\u00E4hrstoffmangel, stille Entz\u00FCndungen, Umweltgifte, Mikrobiom, Parasiten & Schimmel und viel mehr!",
    ],
  },
  {
    title: "Dein Plan basierend auf deinen Ergebnissen:",
    lines: [
      "Kein 08/15-Plan, sondern passgenaue Strategien f\u00FCr deinen Alltag.",
      "Optimierung von Ern\u00E4hrung, Schlaf, Bewegung, Entgiftung & Stress nach wissenschaftlichen Daten und Laborergebnissen.",
    ],
  },
  {
    title: "W\u00F6chentliche 1:1 Calls zur erfolgreichen Umsetzung des Plans:",
    lines: [
      "Du wirst durch Ver\u00E4nderung Schritt f\u00FCr Schritt begleitet.",
      "Mit Tipps, Tricks und Hilfe wirst du mit Leichtigkeit durch gro\u00DFe Ver\u00E4nderungen gef\u00FChrt.",
    ],
  },
  {
    title: "Biofeedback-Begleitung:",
    lines: [
      "Wir arbeiten nicht nach Vermutungen, sondern nach Daten.",
      "Sensoren zur Echtzeit-Analyse deiner K\u00F6rperreaktionen.",
      "Sie messen z.\u00A0B. deine HRV & Blutzucker, um deine Ern\u00E4hrung, Schlafqualit\u00E4t & Stressresistenz zu optimieren.",
    ],
  },
  {
    title: "Ankern bis zur Selbstwirksamkeit",
    lines: [
      "Wir bleiben dran, bis der Plan so umgesetzt wurde, dass er zur Selbstverst\u00E4ndlichkeit wird und du so viel gelernt hast, dass du es in der Unabh\u00E4ngigkeit schaffst.",
    ],
  },
];

function Mentoring() {
  const isMobile = useIsMobile();
  return (
    <div className="bg-white min-h-screen pt-20">
      <Seo
        path="/mentoring"
        title="1:1 Mentoring – Longevity & Gesundheit Berlin"
        description="Persönliches 1:1 Mentoring zur Umsetzung individueller Longevity- und Gesundheitsstrategien – ärztlich begleitet, alltagstauglich und messbar."
      />
      <FlipGrid />
      {isMobile ? (
        <FanCardsMobile cards={mentoringFocusCards} />
      ) : (
        <FanCards cards={mentoringFocusCards} />
      )}
      <ProcessTimeline
        title="Individuell statt Schublade!"
        subtitle="So läuft das Mentoring ab:"
        steps={processSteps}
      />
      <UnifiedBottomCta className="pt-8 sm:pt-12 pb-20 sm:pb-28 px-5 sm:px-8" />
    </div>
  );
}

export default Mentoring;
