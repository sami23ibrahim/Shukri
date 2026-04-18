import { useEffect, useRef, useState } from "react";
import ScrolledLines from "../Components/ScrolledLines";
import ScrollVideoExperience from "../Components/ScrollVideoExperience";
import { Link } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";

const ketaminLines = [
  "So hat es einer meiner Patienten formuliert:",
  "Gesprächstherapie ist, als gehe man zu Fuß.",
  "Verhaltenstherapie ist, als fahre man Fahrrad.",
  "Ketamin assistierte Therapie ist, als führe man Ferrari.\u201C",
];

const sublines = [
  "Wenn klassische Wege nicht reichen.",
  "Kann ein anderer Weg in die Tiefe sein.",
  "Nicht nur durch Verstehen, sondern durch inneres Erleben.",
  "Dann kann Veränderung kinderleicht sein.",
];

const whyUs = [
  "MEDIZINISCH GEPRÜFT",
  "ÄRZTLICH 1:1 BEGLEITET",
  "PSYCHOTHERAPEUTISCH INTEGRIERT",
  "Mit einem ganzheitlichen Behandlungsplan ergänzt.",
];

function KetaminHero() {
  const isMobile = useIsMobile();
  const heroImage = isMobile
    ? "/Assets/Ketamin%20Bild%20Jonas%20Hochkant%20AI.png"
    : "/Assets/Ketamin%20Infusion%20Bild%20Jonas%20AI%20.png";
  return (
    <section className="-mt-[25vh] px-5 sm:px-8 lg:px-16 pb-10 sm:pb-16 relative z-10">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 lg:items-stretch">
          <div className="lg:w-[55%]">
            <div className="lg:sticky lg:top-28">
              <div className={`w-full ${isMobile ? "aspect-[3/4]" : "aspect-[10/9]"} rounded-2xl overflow-hidden bg-[#c4b8a8]`}>
                <img
                  src={heroImage}
                  alt="Ketamin-Therapie"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:w-[40%] flex flex-col">
            <div className="pb-10 sm:pb-14">
              <span className="inline-block text-xs font-semibold text-[#43a9ab] bg-[#e0f4f5] px-3 py-1 rounded-full mb-5 tracking-wide">
                Therapie
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#43A9AB] mb-5 tracking-tight leading-[1.1]">
                Ketamin-assistierte Therapie
              </h2>
              <ul className="space-y-2.5 mb-8">
                {sublines.map((line, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[#515757]/80 text-base leading-relaxed">
                    <span className="text-[#43a9ab] mt-1">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://www.doctolib.de/arzt/berlin/shukri-jarmoukli/booking/new-patient?specialityId=1286&speciality_ids%5B%5D=1286&source=profile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#43a9ab] text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#389193] transition-colors duration-200 no-underline shadow-sm"
              >
                Jetzt buchen
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            <div className="border-t border-gray-200 py-8 sm:py-10">
              <h3 className="text-lg font-bold text-[#515757] mb-5">Warum VIVECURA?</h3>
              <div className="space-y-4">
                {whyUs.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#43a9ab] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-semibold text-[#515757]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqItems = [
  {
    q: "Ist Ketamin-Therapie in Deutschland legal?",
    a: "Ja. Ketamin ist als Medikament seit Jahrzehnten in Deutschland zugelassen, bisher vor allem für die Narkose und Schmerztherapie. Die Anwendung bei Depression, Trauma und verwandten Indikationen erfolgt off label. Das bedeutet, ein zugelassenes Medikament wird außerhalb seiner ursprünglichen Zulassung eingesetzt, auf ärztliche Verantwortung und nach sorgfältiger individueller Abwägung. Dieses Vorgehen ist in der Fachwelt etabliert, wissenschaftlich gut untersucht und in spezialisierten Zentren weltweit Standard.",
  },
  {
    q: "Wird das von der Krankenkasse übernommen?",
    a: "Nein, nicht regelhaft. Ketamin-assistierte Therapie ist eine Selbstzahlerleistung. Kosten besprechen wir transparent im Erstgespräch.",
  },
  {
    q: "Werde ich süchtig?",
    a: "Nein, nicht im therapeutischen Setting. Ein Abhängigkeitsrisiko entsteht bei unkontrolliertem, häufigem Konsum, nicht bei ärztlich begleiteten Sitzungen in definierten Abständen.",
  },
  {
    q: "Was, wenn es mir während der Sitzung schlecht geht?",
    a: "Sie sind durchgehend 1:1 ärztlich begleitet. Monitoring, Sicherheitstools und sofortige Intervention sind jederzeit verfügbar. Ein wichtiger Vorteil der intravenösen Gabe: Ketamin flutet in Minuten an und wird ebenso schnell wieder abgebaut. Die Wirkung lässt sich im Verlauf der Sitzung präzise steuern, sanft ausleiten oder bei Bedarf vertiefen. Jederzeit, unter ärztlicher Kontrolle.",
  },
  {
    q: "Für wen kann dieser Weg nicht geeignet sein?",
    a: "Bei aktiver Psychose, unkontrollierter Herzerkrankung, Schizophrenie, Schwangerschaft oder akuter Suchterkrankung ist Ketamin nicht die richtige Wahl. Das klären wir im Vorgespräch.",
  },
];

function KetaminCTA() {
  return (
    <section className="py-16 sm:py-24 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block text-xs font-semibold text-[#43a9ab] bg-[#e0f4f5] px-3 py-1 rounded-full mb-5 tracking-[0.2em] uppercase">
          Nächster Schritt
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#43A9AB] tracking-tight mb-5">
          Bereit für ein erstes Gespräch?
        </h2>
        <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          Kein Druck. Keine Vorentscheidung. Ein offenes Gespräch darüber, was bisher versucht wurde, und ob dieser Weg für Sie passen könnte.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://www.doctolib.de/arzt/berlin/shukri-jarmoukli/booking/new-patient?specialityId=1286&speciality_ids%5B%5D=1286&source=profile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#43a9ab] text-white px-7 py-3.5 rounded-xl text-sm sm:text-base font-semibold hover:bg-[#389193] transition-colors duration-200 no-underline shadow-sm"
          >
            Termin buchen
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <Link
            to="/blog/ketamin-therapie"
            className="inline-flex items-center justify-center gap-2 border border-[#43a9ab] text-[#43a9ab] px-7 py-3.5 rounded-xl text-sm sm:text-base font-semibold hover:bg-[#43a9ab]/5 transition-colors duration-200 no-underline"
          >
            Zum Blog-Artikel
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        <p className="text-[#515757]/50 text-sm mt-8 max-w-lg mx-auto leading-relaxed">
          Tiefer einsteigen, alle Details, Studien und Mechanismen — mehr über Ketamin und die Wissenschaft dahinter im Blog.
        </p>
      </div>
    </section>
  );
}

function KetaminFAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="py-16 sm:py-20 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#43A9AB] tracking-tight mb-10 sm:mb-12">
          Häufige Fragen
        </h2>
        <div className="border-t border-gray-200">
          {faqItems.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 sm:py-6 text-left focus:outline-none group"
                >
                  <span className="text-base sm:text-lg font-semibold text-[#515757] group-hover:text-[#43a9ab] transition-colors pr-4">
                    {item.q}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[#43a9ab] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[800px] opacity-100 pb-5 sm:pb-6" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm sm:text-base text-[#515757]/80 leading-relaxed pr-10">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const warumChapters = [
  {
    title: "1:1 ärztliche Begleitung",
    description: "Während der gesamten Sitzung persönlich begleitet.",
    video: "/Assets/videos/aerztliche-beratung.mp4",
  },
  {
    title: "Klare Struktur",
    description: "Vorbereitung, Sitzung, Integration. Nichts dem Zufall überlassen.",
    video: "/Assets/videos/stoffwechselanalyse.mp4",
  },
  {
    title: "Sicherer medizinischer Rahmen",
    description: "Mit Monitoring, Aufklärung und Nachbegleitung.",
    video: "/Assets/videos/hrv-stressanalyse.mp4",
  },
  {
    title: "Kuratiertes Programm",
    description: "Individuell geplant und mit Psychotherapie verzahnt.",
    video: "/Assets/videos/naehrstoffanalyse.mp4",
  },
  {
    title: "Ganzheitlich behandelt",
    description: "Psyche und Körper zusammen. Ernährung, Mikronährstoffe, Bewegung und Schlaf fließen in den Behandlungsplan ein. Weil nachhaltige Veränderung selten auf einer Ebene allein gelingt.",
    video: "/Assets/videos/blutproben.mp4",
  },
];

function IframeSection({ mobileSrc, desktopSrc, title }) {
  const isMobile = useIsMobile();
  const iframeRef = useRef(null);
  const [height, setHeight] = useState("600px");
  const src = isMobile ? mobileSrc : desktopSrc;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const resize = () => {
      try {
        const doc = iframe.contentDocument;
        if (doc && doc.body) setHeight(doc.documentElement.scrollHeight + "px");
      } catch {}
    };
    iframe.addEventListener("load", resize);
    const interval = setInterval(resize, 500);
    return () => {
      iframe.removeEventListener("load", resize);
      clearInterval(interval);
    };
  }, [src]);

  return (
    <section className="bg-white">
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        style={{ width: "100%", border: "none", height }}
      />
    </section>
  );
}

function Extras() {
  const isMobile = useIsMobile();
  return (
    <div className="bg-white min-h-screen pt-20">
      <ScrolledLines lines={ketaminLines} title="Ketamin-Erfahrung" />
      <KetaminHero />
      <IframeSection
        title="Drei Räume, in denen Ketamin wirkt"
        mobileSrc="/html/drei_raeume_mobile.html"
        desktopSrc="/html/drei_raeume_desktop.html"
      />
      <IframeSection
        title="Verstehen vs. Erleben"
        mobileSrc="/html/verstehen_vs_erleben_mobile.html"
        desktopSrc="/html/verstehen_vs_erleben_desktop.html"
      />
      <IframeSection
        title="Typische Indikationen für Ketamin im Off-Label-Use"
        mobileSrc="/html/indikationen_mobile.html"
        desktopSrc="/html/indikationen_desktop.html"
      />
      <IframeSection
        title="Ablauf der Ketamin-assistierten Therapie"
        mobileSrc="/html/ablauf_mobile.html"
        desktopSrc="/html/ablauf_desktop.html"
      />
      <section className="pt-20 sm:pt-28">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#43A9AB]">
            Warum Vivecura
          </h2>
        </div>
        <ScrollVideoExperience chapters={warumChapters} isMobile={isMobile} />
      </section>
      <KetaminFAQ />
      <KetaminCTA />
    </div>
  );
}

export default Extras;
