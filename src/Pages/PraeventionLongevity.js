import { useState, useRef, useEffect, useCallback } from "react";
import FanCards from "../Components/FanCards";
import FanCardsMobile from "../Components/FanCardsMobile";
import useIsMobile from "../hooks/useIsMobile";

const mentoringCards = [
  {
    image: "/Assets/Images%20Umsetzung%2011%20Mentoring/Stoffwechsel%20stabilisieren.png",
    label: "Stoffwechsel stabilisieren",
    title: "Stoffwechsel stabilisieren",
    desc: "Der Stoffwechsel ist das Fundament deiner Energie. Wenn er im Gleichgewicht arbeitet, kann dein Körper Nährstoffe optimal verwerten, Blutzucker halten und Zellen erneuern.",
    path: "",
    textAlign: "top",
  },
  {
    image: "/Assets/Images%20Umsetzung%2011%20Mentoring/Nervensystem%20regulieren.png",
    label: "Nervensystem regulieren",
    title: "Nervensystem regulieren",
    desc: "Dein Nervensystem entscheidet, ob du im Dauerstress lebst oder wirklich regenerieren kannst. Wir stärken deinen Vagustonus, lösen alte Stressmuster und bringen Sicherheit zurück in deinen Körper.",
    path: "",
    textAlign: "top",
  },
  {
    image: "/Assets/Images%20Umsetzung%2011%20Mentoring/Immunsystem%20entlasten.png",
    label: "Immunsystem entlasten",
    title: "Immunsystem entlasten",
    desc: "Ein überfordertes Immunsystem ist oft die stille Ursache chronischer Beschwerden. Durch das Auflösen stiller Entzündungen, Umweltbelastungen und Darmthemen kann dein Immunsystem wieder das tun, wofür es gemacht ist.",
    path: "",
    textAlign: "top",
  },
];

function useScrollFadeIn(threshold = 0.1) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, style: { opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(40px)", transition: "opacity 1.2s ease-out, transform 1.2s ease-out" } };
}

const ChevronDown = ({ isOpen }) => (
  <svg className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

function AccordionItem({ title, children, isOpen, onToggle }) {
  return (
    <div className="border-b border-[#43a9ab]/10">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-6 px-1 text-left focus:outline-none group">
        <span className="text-base sm:text-lg font-medium text-[#515757] group-hover:text-[#43a9ab] transition-colors pr-4">{title}</span>
        <span className="text-[#43a9ab]"><ChevronDown isOpen={isOpen} /></span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[600px] opacity-100 pb-6" : "max-h-0 opacity-0"}`}>
        <div className="px-1 text-[#515757]/70 text-sm sm:text-base leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function HeroBanner({ image, badge, title, subtitle, ctaText, ctaHref, trustItems }) {
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = useCallback(() => setScrollY(window.scrollY), []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "85vh" }}>
      <div
        className="absolute inset-0 w-full h-full"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover"
          style={{ minHeight: "110%" }}
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.40) 75%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,1) 100%)",
        }} />
      </div>

      <div className="relative z-10 flex flex-col justify-end px-5 sm:px-8 pt-24 pb-12 sm:pb-16" style={{ minHeight: "85vh" }}>
        <div className="max-w-4xl mx-auto w-full">
          <div
            className="inline-block text-[10px] sm:text-xs font-medium tracking-[3px] uppercase mb-5 px-4 py-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)", color: "#fff", backdropFilter: "blur(8px)" }}
          >
            {badge}
          </div>
          <h1
            className="text-white font-black leading-[0.92] tracking-tighter mb-6"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)" }}
          >
            {title}
          </h1>
          <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
            {subtitle}
          </p>

          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#43a9ab] text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#389193] transition-colors duration-200 no-underline shadow-lg shadow-[#43a9ab]/25"
          >
            {ctaText}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          {trustItems && (
            <div className="mt-10 flex flex-wrap gap-4 sm:gap-8">
              {trustItems.map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="text-xs sm:text-sm text-white tracking-wide">{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  { title: "Genetik", description: "Wie du geboren bist: Deine genetische Grundlage wird getestet und \u00E4rztlich eingeordnet." },
  { title: "Ist-Zustand", description: "Wir erfassen deinen aktuellen Zustand umfassend, \u00FCber erweiterte Blutanalysen, Bio-Impedanz und fortgeschrittene Herzuntersuchungen." },
  { title: "Umsetzung", description: "Gezielter Einsatz von Biohacking-Tools und Methoden, ganz individuell auf dich abgestimmt." },
  { title: "Reaktion des K\u00F6rpers", description: "Wir messen wie dein K\u00F6rper auf Ver\u00E4nderungen reagiert, z.B. \u00FCber Biofeedback wie HRV oder CGM." },
  { title: "Therapeutische Unterst\u00FCtzung", description: "Bei Bedarf erg\u00E4nzen wir mit Infusionen und modernen Longevity-Substanzen wie NAD+ oder Spermidin." },
];

const longevityChapters = [
  {
    video: "/Assets/Longevity%20Videos/Genetik%20Quer.mp4",
    videoMob: "/Assets/Longevity%20Videos/Genetik%20Hoch.mp4",
  },
  {
    video: "/Assets/Longevity%20Videos/Ist-Zustand%20Quer.mp4",
    videoMob: "/Assets/Longevity%20Videos/Ist%20Zustand%20Hoch.mp4",
  },
  {
    video: "/Assets/Longevity%20Videos/Umsetzung%20Quer.mp4",
    videoMob: "/Assets/Longevity%20Videos/Umsetzung%20Hoch.mp4",
  },
  {
    video: "/Assets/Longevity%20Videos/Reaktion%20des%20K%C3%B6rpers%20Quer.mp4",
    videoMob: "/Assets/Longevity%20Videos/Reaktion%20des%20K%C3%B6rpers%20Hoch.mp4",
  },
  {
    video: "/Assets/Longevity%20Videos/Therapeutische%20Unterst%C3%BCtzung%20Quer.mp4",
    videoMob: "/Assets/Longevity%20Videos/Therapeutische%20Unterst%C3%BCtzung%20hoch.mp4",
  },
];

function ScrollVideoExperience({ steps, chapters, isMobile }) {
  const sectionRef = useRef(null);
  const videoRefs = useRef([]);
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapterCount = steps.length;
  const sliceSize = 1 / chapterCount;

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = sectionHeight - viewportHeight;
    if (scrollableDistance <= 0) return;
    const rawProgress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
    setProgress(rawProgress);
    const chapterIndex = Math.min(chapterCount - 1, Math.floor(rawProgress * chapterCount));
    setActiveChapter(chapterIndex);
  }, [chapterCount]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeChapter) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeChapter]);

  const clipExpand = Math.min(1, progress / 0.12);
  const insetVal = (1 - clipExpand) * 18;
  const radiusVal = (1 - clipExpand) * 24;
  const clipPath = `inset(${insetVal}% round ${radiusVal}px)`;

  const getChapterStyle = (index) => {
    const chapterStart = index * sliceSize;
    const chapterEnd = (index + 1) * sliceSize;
    const chapterMid = chapterStart + sliceSize * 0.5;
    const startY = 25;
    const endY = -25;
    let opacity = 0;
    let translateY = startY;
    if (progress < chapterStart) {
      opacity = 0;
      translateY = startY;
    } else if (progress >= chapterStart && progress < chapterMid) {
      const t = (progress - chapterStart) / (chapterMid - chapterStart);
      opacity = t;
      translateY = startY * (1 - t);
    } else if (progress >= chapterMid && progress < chapterEnd) {
      if (index === chapterCount - 1) {
        opacity = 1;
        translateY = 0;
      } else {
        const t = (progress - chapterMid) / (chapterEnd - chapterMid);
        opacity = 1 - t;
        translateY = endY * t;
      }
    } else {
      opacity = 0;
      translateY = endY;
    }
    return { opacity, transform: `translateY(${translateY}vh)` };
  };

  return (
    <>
      <div style={{ height: "4vh" }} />
      <div
        ref={sectionRef}
        style={{ height: `${chapterCount * 150 + 30}vh` }}
        className="relative"
      >
        <div
          className="sticky top-0 h-screen w-full overflow-hidden bg-[#1a1a1a]"
          style={{ clipPath }}
        >
          {chapters.map((chapter, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{ opacity: i === activeChapter ? 1 : 0, transition: "opacity 0.8s ease" }}
            >
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                src={isMobile ? chapter.videoMob : chapter.video}
                muted
                playsInline
                preload="auto"
                loop
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-black/40 pointer-events-none" />

          {steps.map((step, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center px-8 pointer-events-none"
              style={getChapterStyle(i)}
            >
              <div className="text-center max-w-2xl">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                  {step.title}
                </h2>
                {step.description && (
                  <p className="text-white/60 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mx-auto">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          ))}

          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            style={{ opacity: 1, pointerEvents: "none" }}
          >
            <style>{`
              @keyframes glimmerDownLong {
                0%, 100% { opacity: 0; transform: translateY(-4px); }
                50% { opacity: 1; transform: translateY(4px); }
              }
              .scroll-glimmer-long { animation: glimmerDownLong 2.5s ease-in-out infinite; }
            `}</style>
            <svg className="w-6 h-6 text-white/50 scroll-glimmer-long" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

const _ignore_below_DELETE_ZZZ = "X";
const _block_to_delete = ["\u00E4hrung mit Feedback",
  "Training & Regeneration",
  "Stressregulation",
  "Gezielter Einsatz von Supplementen",
  "Sinnvolle Infusionen (individuell f\u00FCr dich bestimmt)",
];

const faqData = [
  { q: "Was bedeutet Longevity in deinem Ansatz?", a: "Longevity ist kein einzelnes Tool oder ein Trend, sondern ein umfangreiches System. Es geht darum, deinen K\u00F6rper so zu verstehen und steuern zu k\u00F6nnen, dass Gesundheit, Energie und Leistungsf\u00E4higkeit langfristig stabil bleiben." },
  { q: "Ist das nicht einfach Biohacking?", a: "Nein. Biohacking arbeitet oft mit einzelnen Tools. Der Unterschied ist also, dass Longevity diese Tools einordnet und in ein funktionierendes Gesamtsystem integriert." },
  { q: "Was bringt mir das konkret im Alltag?", a: 'Mehr stabile Energie, besserer Schlaf, klareres Denken und ein K\u00F6rper, der sich nicht permanent "gegen dich" anf\u00FChlt.' },
  { q: "Brauche ich daf\u00FCr viele Supplemente?", a: "Nein. Supplements sind nur ein Teil und werden bei mir sehr gezielt eingesetzt. Nicht nach Trend, sondern nach Bedarf." },
  { q: "Sind Infusionen wie NAD+ entscheidend?", a: "Nein. Sie k\u00F6nnen zwar unterst\u00FCtzen, ersetzen aber keine ganzheitliche Struktur. Ohne ein funktionierendes Gesamtkonzept funktionieren auch die besten Substanzen nicht." },
  { q: "Muss ich mein Leben komplett umstellen?", a: "Es geht darum, die richtigen Stellschrauben zu identifizieren, nicht alles zu ver\u00E4ndern. Sich einfach gesund zu ern\u00E4hren und Sport zu machen reicht nicht aus, da jeder K\u00F6rper anders funktioniert. Zwei Menschen k\u00F6nnen das Gleiche tun, aber komplett unterschiedlich darauf reagieren." },
  { q: "Wie werden meine Fortschritte gemessen?", a: "Durch Feedback aus deinem K\u00F6rper und gezielte Daten: Blutwerte, Biofeedback (z.B. HRV, CGM) und deine tats\u00E4chliche Entwicklung im Alltag." },
  { q: "Wie schnell werde ich Ergebnisse bemerken?", a: "Oft zeigen sich erste Ver\u00E4nderungen bei Fokus, Schlaf und deinem Energielevel innerhalb nur weniger Wochen. Der eigentliche Effekt ist jedoch langfristig." },
];

const hebelData = [
  {
    num: 1,
    label: "Schlaf & Rhythmus",
    short: "Schlaf & Rhythmus",
    title: "Schlaf & Rhythmus",
    lead: "Alles beginnt mit dem Takt, in dem dein Körper regeneriert.",
    paragraphs: [
      "Im Tiefschlaf repariert sich dein Nervensystem, im REM-Schlaf verarbeitest du Emotionen, und dein zirkadianer Rhythmus steuert Hormone, Stoffwechsel und Zellalterung.",
      "Wir schauen auf deine Schlafqualität, dein Licht- und Bewegungsmuster und bringen deinen Tagesrhythmus wieder in den Takt, in dem dein Körper wirklich altern kann wie er soll.",
    ],
    related: [2, 3, 4],
  },
  {
    num: 2,
    label: "Ernährung mit Feedback",
    short: "Ernährung",
    title: "Ernährung mit Feedback",
    lead: "Was gesund ist, zeigt dir dein eigener Körper.",
    paragraphs: [
      "Statt allgemeiner Empfehlungen arbeiten wir mit echten Daten aus deinem Körper: Blutzuckerverläufe über ein CGM, Labormarker, Mikronährstoffstatus und deine subjektiven Signale.",
      "So wird aus Ernährung kein Dogma, sondern ein Werkzeug, das du verstehst und das messbar zu dir passt.",
    ],
    related: [1, 3, 5, 6],
  },
  {
    num: 3,
    label: "Training & Regeneration",
    short: "Training",
    title: "Training & Regeneration",
    lead: "Muskeln sind das Organ des Alterns.",
    paragraphs: [
      "Wer Muskelmasse, Kraft und mitochondriale Kapazität erhält, bleibt länger gesund, belastbar und mental klar.",
      "Genauso wichtig ist die Regeneration dazwischen. Wir bringen Training und Erholung so in Balance, dass dein Körper stärker wird, statt sich weiter zu erschöpfen.",
    ],
    related: [1, 2, 4],
  },
  {
    num: 4,
    label: "Stressregulation",
    short: "Stressregulation",
    title: "Stressregulation",
    lead: "Im Alarm kann dein Körper nicht heilen.",
    paragraphs: [
      "Chronischer Stress ist einer der stärksten Beschleuniger biologischer Alterung. Er hält dein Nervensystem im Alarmzustand, stört Schlaf, Hormone und Verdauung und zehrt still an deinen Reserven.",
      "Über HRV-Messung, Atemarbeit, somatische Methoden und gezielte Regulation lernt dein System wieder, zwischen Anspannung und echter Erholung zu wechseln.",
    ],
    related: [1, 3],
  },
  {
    num: 5,
    label: "Supplemente",
    short: "Supplemente",
    title: "Gezielter Einsatz von Supplementen",
    lead: "Nur was dein Labor zeigt und dein Alltag braucht.",
    paragraphs: [
      "Nahrungsergänzung ersetzt keinen Lebensstil, kann aber gezielte Lücken schließen, die sonst bremsen. Nur was sich im Labor zeigt und in deinem Alltag Sinn ergibt, wird auch eingesetzt.",
      "Das Ziel ist nicht möglichst viel, sondern genau das, was dein Körper gerade braucht, in passender Form und Dosierung.",
    ],
    related: [2, 6],
  },
  {
    num: 6,
    label: "Infusionen",
    short: "Infusionen",
    title: "Sinnvolle Infusionen",
    lead: "Direkt ins Blut, dorthin wo sie wirken.",
    paragraphs: [
      "Wenn dein Körper über den Darm nicht mehr gut aufnehmen kann oder schnell spürbare Effekte entscheidend sind, sind Infusionen ein starkes Werkzeug. Nährstoffe, Aminosäuren oder Moleküle wie NAD+ gehen direkt ins Blut und damit dorthin, wo sie wirken.",
      "Wir setzen Infusionen nur dort ein, wo sie zu deinem Bild passen, zielgerichtet, dosiert und eingebettet in dein Gesamtkonzept.",
    ],
    related: [2, 5],
  },
];

function HebelFlow() {
  const [activeNum, setActiveNum] = useState(1);
  const active = hebelData.find((h) => h.num === activeNum) || hebelData[0];
  const connectedSet = new Set(active.related);

  return (
    <div className="hebel-side">
      <style>{`
        .hebel-side { font-family: inherit; max-width: 1200px; margin: 0 auto; padding: 80px 24px; color: #1a1f24; }
        .hebel-side h2 { font-size: clamp(30px, 4vw, 42px); font-weight: 700; color: #43A9AB; margin: 0 0 18px 0; letter-spacing: -0.015em; }
        .hebel-side .intro { font-size: 17px; line-height: 1.65; color: #6b7378; max-width: 640px; margin: 0 0 64px 0; }
        .hebel-split { display: grid; grid-template-columns: 360px 1fr; gap: 72px; align-items: start; }
        @media (max-width: 960px) { .hebel-split { grid-template-columns: 1fr; gap: 48px; } }
        .flow-list { position: relative; padding: 8px 0; }
        .flow-list::before {
          content: ''; position: absolute; left: 25px; top: 34px; bottom: 34px; width: 1.5px;
          background: linear-gradient(to bottom, rgba(67,169,171,0.1) 0%, rgba(67,169,171,0.3) 50%, rgba(67,169,171,0.1) 100%);
        }
        .flow-item {
          display: flex; align-items: center; gap: 18px; background: transparent; border: none;
          cursor: pointer; font-family: inherit; padding: 14px 0; width: 100%; text-align: left;
          position: relative; transition: transform 0.25s ease;
        }
        .flow-item:hover { transform: translateX(3px); }
        .flow-dot {
          width: 52px; height: 52px; flex-shrink: 0; border-radius: 50%; background: #ffffff;
          border: 1.5px solid rgba(67,169,171,0.35); display: flex; align-items: center; justify-content: center;
          font-size: 15px; font-weight: 600; color: #43A9AB;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1); position: relative; z-index: 1;
        }
        .flow-item:hover .flow-dot { border-color: #43A9AB; }
        .flow-item.is-active .flow-dot {
          background: #43A9AB; color: #ffffff; border-color: #43A9AB; border-width: 2px;
          box-shadow: 0 0 0 6px rgba(67,169,171,0.12);
        }
        .flow-item.is-connected .flow-dot { background: #e8f5f5; border-color: #43A9AB; }
        .flow-label { font-size: 16px; font-weight: 500; color: #4a5258; line-height: 1.35; transition: color 0.3s ease, font-weight 0.3s ease; }
        .flow-item.is-active .flow-label { color: #1a1f24; font-weight: 600; }
        .flow-detail-wrap { min-height: 480px; padding-top: 4px; }
        .flow-content { animation: contentFade 0.45s ease; }
        @keyframes contentFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .flow-big-num {
          font-size: clamp(56px, 7vw, 88px); font-weight: 300; color: #43A9AB; line-height: 0.9;
          letter-spacing: -0.03em; font-variant-numeric: tabular-nums; margin-bottom: 28px; display: block;
        }
        .flow-big-num sup { font-size: 0.32em; font-weight: 500; color: #9aa2a7; margin-left: 6px; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: 10px; }
        .flow-title { font-size: clamp(26px, 3vw, 34px); font-weight: 700; color: #1a1f24; margin: 0 0 22px 0; letter-spacing: -0.01em; line-height: 1.15; }
        .flow-lead { font-size: 18px; line-height: 1.5; color: #43A9AB; font-weight: 500; margin: 0 0 22px 0; font-style: italic; }
        .flow-text { font-size: 16px; line-height: 1.75; color: #4a5258; margin: 0 0 14px 0; max-width: 620px; }
        .flow-text:last-of-type { margin-bottom: 36px; }
        .flow-related { display: flex; align-items: center; gap: 14px; padding-top: 24px; border-top: 1px solid #eef5f5; flex-wrap: wrap; }
        .flow-related-label { font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #9aa2a7; font-weight: 600; }
        .flow-related-list { display: flex; gap: 8px; flex-wrap: wrap; }
        .flow-related-item {
          display: inline-flex; align-items: center; gap: 8px; background: transparent; color: #2d7a7b;
          padding: 6px 14px 6px 8px; border: 1px solid rgba(67,169,171,0.25); border-radius: 100px;
          font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s ease;
        }
        .flow-related-item:hover { background: #43A9AB; color: #ffffff; border-color: #43A9AB; }
        .flow-related-num {
          display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px;
          background: rgba(67,169,171,0.12); border-radius: 50%; font-size: 11px; font-weight: 600;
          color: #43A9AB; transition: all 0.2s ease;
        }
        .flow-related-item:hover .flow-related-num { background: rgba(255,255,255,0.25); color: #ffffff; }
      `}</style>

      <h2>Die Hebel</h2>
      <p className="intro">
        Die einzelnen Methoden sind kein Geheimnis. Entscheidend ist das Gesamtkonzept dahinter, also wie alle Schritte sinnvoll miteinander verbunden werden.
      </p>

      <div className="hebel-split">
        <aside className="flow-list" role="tablist">
          {hebelData.map((h) => {
            const classes = [
              "flow-item",
              h.num === activeNum ? "is-active" : "",
              h.num !== activeNum && connectedSet.has(h.num) ? "is-connected" : "",
            ].filter(Boolean).join(" ");
            return (
              <button
                key={h.num}
                type="button"
                role="tab"
                className={classes}
                aria-selected={h.num === activeNum}
                onClick={() => setActiveNum(h.num)}
              >
                <span className="flow-dot">{h.num}</span>
                <span className="flow-label">{h.label}</span>
              </button>
            );
          })}
        </aside>

        <div className="flow-detail-wrap">
          <div className="flow-content" key={active.num}>
            <span className="flow-big-num">
              {String(active.num).padStart(2, "0")}<sup>/06</sup>
            </span>
            <h3 className="flow-title">{active.title}</h3>
            <p className="flow-lead">{active.lead}</p>
            {active.paragraphs.map((p, idx) => (
              <p key={idx} className="flow-text">{p}</p>
            ))}
            <div className="flow-related">
              <span className="flow-related-label">Verbunden mit</span>
              <div className="flow-related-list">
                {active.related.map((r) => {
                  const rel = hebelData.find((h) => h.num === r);
                  if (!rel) return null;
                  return (
                    <button
                      key={r}
                      type="button"
                      className="flow-related-item"
                      onClick={() => setActiveNum(r)}
                    >
                      <span className="flow-related-num">{r}</span>
                      {rel.short}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PraeventionLongevity() {
  const [openFaq, setOpenFaq] = useState(null);
  const [openDiagnostik, setOpenDiagnostik] = useState(null);
  const isMobile = useIsMobile();
  const chaosAnim = useScrollFadeIn();
  const biofeedbackAnim = useScrollFadeIn();
  const processAnim = useScrollFadeIn();
  const systemAnim = useScrollFadeIn();
  const diagnostikAnim = useScrollFadeIn();
  const leversAnim = useScrollFadeIn();
  const startAnim = useScrollFadeIn();
  const fitAnim = useScrollFadeIn();
  const faqAnim = useScrollFadeIn();
  const ctaAnim = useScrollFadeIn();

  return (
    <div className="bg-white min-h-screen">

      {/* Hero Image Banner */}
      <HeroBanner
        image="/Assets/PraeventionLongevity.png"
        badge={"Pr\u00E4vention & Longevity"}
        title={<>Raus aus dem Funktionieren-Modus. Rein in die <em className="italic">Lebendigkeit.</em></>}
        subtitle="Mehr Energie. Mehr Klarheit. Mehr Lebendigkeit. Durch Strategien, die individuell zu dir passen."
        ctaText="Termin vereinbaren"
        ctaHref="https://www.doctolib.de/arzt/berlin/shukri-jarmoukli/booking/new-patient?specialityId=1286&speciality_ids%5B%5D=1286&source=profile"
        trustItems={["Klare Schritte", "Diagnostik & Biofeedback", "Transparente Entscheidungen"]}
      />

      {/* Das Longevity-Chaos */}
      <section ref={chaosAnim.ref} style={chaosAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-6 tracking-tight">
            Das Longevity-Chaos
          </h2>
          <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed mb-4">
            Du probierst Dinge aus; Supplemente, Di&auml;ten, Routinen. Kurzfristig wirkt etwas - aber dann auf einmal nicht mehr. Du suchst nach neuen Ans&auml;tzen.
          </p>
        </div>
      </section>

      {/* Was oft uebersehen wird + Biofeedback */}
      <section ref={biofeedbackAnim.ref} style={biofeedbackAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-6 tracking-tight">
            Was oft &uuml;bersehen wird
          </h2>
          <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed mb-4">
            Ich will nicht der n&auml;chste Experte sein, der dir sagt was {'"'}richtig{'"'} oder {'"'}falsch{'"'} ist. Ich will, dass du verstehst, was f&uuml;r dich funktioniert.
          </p>
          <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed mb-8">
            Deshalb arbeite ich nicht mit Vermutungen, sondern mit Feedback aus deinem K&ouml;rper.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#43a9ab]/15 p-6 sm:p-8" style={{ background: "rgba(67,169,171,0.03)" }}>
              <div className="w-12 h-12 rounded-full bg-[#43a9ab]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#43a9ab]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h4 className="text-[#515757] text-lg font-semibold mb-2">HRV</h4>
              <p className="text-[#515757]/60 text-sm leading-relaxed">Zeigt dir, wie dein Nervensystem reagiert</p>
            </div>
            <div className="rounded-2xl border border-[#43a9ab]/15 p-6 sm:p-8" style={{ background: "rgba(67,169,171,0.03)" }}>
              <div className="w-12 h-12 rounded-full bg-[#43a9ab]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#43a9ab]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h4 className="text-[#515757] text-lg font-semibold mb-2">CGM</h4>
              <p className="text-[#515757]/60 text-sm leading-relaxed">Zeigt dir, wie dein Stoffwechsel auf deine Lebensumst&auml;nde reagiert</p>
            </div>
          </div>

          <p className="text-[#43a9ab] text-base sm:text-lg font-medium mt-8">
            Du musst nicht mehr raten. Du kannst sehen, was wirkt.
          </p>
        </div>
      </section>

      {/* So arbeiten wir - Intro */}
      <section ref={processAnim.ref} style={processAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-6 tracking-tight">
            All das mit Systemlogik dahinter
          </h2>
          <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed">
            Ich arbeite mit umfassender Genom- bzw. genetischer Testung, um deine Individualit&auml;t zu verstehen. Nicht oberfl&auml;chlich, sondern fundiert und medizinisch eingeordnet. Im Gegensatz zu vielen Coaching-Ans&auml;tzen basiert meine Arbeit nicht nur auf Theorie. Ich habe vieles selbst durchlaufen und bringe diese Erfahrung bewusst mit ein.
          </p>
        </div>
      </section>

      {/* So arbeiten wir - Scroll-driven video experience */}
      <section className="pt-4 sm:pt-8">
        <ScrollVideoExperience
          steps={processSteps}
          chapters={longevityChapters}
          isMobile={typeof window !== "undefined" && window.innerWidth < 768}
        />
      </section>

      {/* Systemlogik */}
      <section ref={systemAnim.ref} style={systemAnim.style} className="pt-16 sm:pt-24 px-5 sm:px-10">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-[#43A9AB] font-black leading-[0.85] tracking-tighter text-left mb-6" style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}>
            Umsetzung durch 1:1 Mentoring
          </h2>
          <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed max-w-3xl">
            Wichtig dabei ist zu verstehen: Nicht jeder kann so arbeiten. Es geht nicht nur um Wissen, sondern um die F&auml;higkeit, Zusammenh&auml;nge zu erkennen und im System zu denken. Daf&uuml;r braucht es weitaus mehr als einzelne Informationen. N&auml;mlich eine fundierte Ausbildung, Erfahrung und die konsequente Umsetzung in der Praxis.
          </p>
        </div>
        {isMobile ? (
          <FanCardsMobile cards={mentoringCards} title="" />
        ) : (
          <FanCards cards={mentoringCards} title="" />
        )}
      </section>

      {/* Diagnostik mit Sinn */}
      <section ref={diagnostikAnim.ref} style={diagnostikAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-3 tracking-tight">
            Diagnostik mit Sinn
          </h2>
          <p className="text-[#515757]/60 text-base sm:text-lg leading-relaxed mb-8">
            Du brauchst keine 20 Tests. Du brauchst die richtigen.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                trigger: "Dauerstress",
                tool: "HRV als Orientierung",
                detail: "Dein System läuft ständig auf Hochtouren, auch wenn du längst zur Ruhe kommen willst. Deine HRV zeigt uns, wie tief du wirklich unter Strom stehst und wo Regeneration wieder möglich wird.",
              },
              {
                trigger: "Energie-Crash",
                tool: "CGM als Feedback",
                detail: "Morgens motiviert, nachmittags leer, abends wieder wach. Ein CGM macht sichtbar, wie dein Blutzucker deine Energie steuert und wo kleine Anpassungen den größten Unterschied machen.",
              },
              {
                trigger: 'Stillstand trotz "alles richtig"',
                tool: "Gezielte Labordiagnostik",
                detail: "Du isst clean, bewegst dich, schläfst und trotzdem bleibt das Ergebnis aus. Eine gezielte Labordiagnostik zeigt, was sich unter der Oberfläche wirklich abspielt und wo dein Körper gerade blockiert ist.",
              },
            ].map((item, i) => {
              const isOpen = openDiagnostik === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setOpenDiagnostik(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="text-left rounded-2xl border p-6 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#43a9ab]/40"
                  style={{
                    background: isOpen ? "rgba(67,169,171,0.08)" : "rgba(67,169,171,0.03)",
                    borderColor: isOpen ? "rgba(67,169,171,0.4)" : "rgba(67,169,171,0.15)",
                  }}
                >
                  <p className="text-[#515757] text-sm font-semibold mb-2">{item.trigger}</p>
                  <div className="flex items-center gap-2">
                    <svg
                      className={`w-3 h-3 text-[#43a9ab] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span className="text-[#43a9ab] text-sm">{item.tool}</span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}`}
                  >
                    <p className="text-[#515757]/70 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-[#515757]/70 text-base leading-relaxed mb-4">
            Diagnostik ist kein Selbstzweck. Sie dient einer Entscheidung. Wir sammeln so viele relevante Informationen, dass wir dich ganzheitlich verstehen k&ouml;nnen. Du bekommst ein klares Bild davon, wo du herkommst (Genetik), wo du aktuell stehst (Ist-Zustand) und welche konkreten M&ouml;glichkeiten es gibt, dich zu verbessern.
          </p>
          <p className="text-[#515757]/70 text-base leading-relaxed">
            Alle Ergebnisse werden verst&auml;ndlich erkl&auml;rt, von der Genetik-Testung &uuml;ber Blutwerte bis hin zu allen weiteren Untersuchungen. Auf dieser Grundlage erarbeiten wir einen strukturierten, individuellen Plan.
          </p>
        </div>
      </section>

      {/* Die Hebel */}
      <section ref={leversAnim.ref} style={leversAnim.style}>
        <HebelFlow />
      </section>

      {/* So starten wir */}
      <section ref={startAnim.ref} style={startAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-12 tracking-tight">So starten wir</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Erstgespr\u00E4ch", desc: "Ziele, Kontext, Ausgangspunkt" },
              { num: "02", title: "Entscheidung", desc: "Was messen wir - und was nicht in deinem Fall individuell?" },
              { num: "03", title: "Umsetzung", desc: "Klare Schritte, Feedback und Anpassung" },
            ].map((step) => (
              <div key={step.num} className="relative">
                <div className="text-5xl font-black text-[#43a9ab]/10 mb-3">{step.num}</div>
                <h4 className="text-[#515757] text-lg font-semibold mb-2">{step.title}</h4>
                <p className="text-[#515757]/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <a
              href="https://www.doctolib.de/arzt/berlin/shukri-jarmoukli/booking/new-patient?specialityId=1286&speciality_ids%5B%5D=1286&source=profile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#43a9ab] text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#389193] transition-colors duration-200 no-underline shadow-sm"
            >
              Termin vereinbaren
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Fuer wen */}
      <section ref={fitAnim.ref} style={fitAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-8 tracking-tight">F&uuml;r wen das passt:</h2>
          <div className="space-y-4">
            {[
              "Du willst echte Ver\u00E4nderung",
              "Du bist bereit umzusetzen",
              "Du suchst Klarheit statt Trends",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-5 h-5 rounded-full bg-[#43a9ab]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-[#43a9ab]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[#515757]/70 text-base sm:text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqAnim.ref} style={faqAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-10 tracking-tight">H&auml;ufige Fragen</h2>
          <div className="border-t border-[#43a9ab]/10">
            {faqData.map((faq, i) => (
              <AccordionItem
                key={i}
                title={faq.q}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <p>{faq.a}</p>
              </AccordionItem>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaAnim.ref} style={ctaAnim.style} className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-[#43A9AB] font-black leading-[0.92] tracking-tighter mb-6"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
          >
            READY F&Uuml;R NEXT LEVEL GESUND-SEIN?
          </h2>
          <p className="text-[#515757]/60 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Dann buche jetzt deinen Termin oder erhalte deinen kostenlosen Start Guide.
          </p>
          <a
            href="https://www.doctolib.de/arzt/berlin/shukri-jarmoukli/booking/new-patient?specialityId=1286&speciality_ids%5B%5D=1286&source=profile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#43a9ab] text-white px-10 py-4 rounded-xl text-base font-semibold hover:bg-[#389193] transition-colors duration-200 no-underline shadow-lg shadow-[#43a9ab]/20"
          >
            Termin vereinbaren
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}

export default PraeventionLongevity;
