import { useState, useRef, useEffect, useCallback } from "react";
import FanCards from "../Components/FanCards";
import FanCardsMobile from "../Components/FanCardsMobile";
import useIsMobile from "../hooks/useIsMobile";
import Seo from "../Components/Seo";
import { Helmet } from "react-helmet-async";

const soArbeiteIchCards = [
  {
    image: "/Assets/so arbeit ich/%C3%9CberdenKopfhinaus.png",
    label: "Über den Kopf hinaus",
    title: "Über den Kopf hinaus",
    desc: "Empfindung und Gefühl kommen wieder ins Zentrum",
    path: "",
  },
  {
    image: "/Assets/so arbeit ich/Verstehen mit Erleben Verbinden.png",
    label: "Verstehen mit Erleben verbinden",
    title: "Verstehen mit Erleben verbinden",
    desc: "Veränderung wird nicht nur gedacht, sondern gespürt",
    path: "",
  },
  {
    image: "/Assets/so arbeit ich/Integration In den Alltag.png",
    label: "Integration in den Alltag",
    title: "Integration in den Alltag",
    desc: "Damit es nicht Theorie bleibt",
    path: "",
  },
];

const psyStartIcons = {
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  scan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34M5 19l2-2M3 7c3.6-1.4 8-1 11 2 3 3 3.4 7.4 2 11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

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

function HeroBanner({ image, badge, title, subtitle, children, ctaHref, trustItems }) {
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
          {children}
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

const noTherapyYet = [
  "Du hast bisher noch keine Psychotherapie gemacht, sp\u00FCrst aber, dass du tiefer gehen m\u00F6chtest als reine Selbstreflexion.",
  "Du erlebst k\u00F6rperliche Symptome wie Unruhe, Enge, Schwindel oder ein diffuses Gef\u00FChl im K\u00F6rper. Woher dies kommt, kannst du dir nicht erkl\u00E4ren.",
  "Du f\u00FChlst dich deinen Gedanken oder Emotionen teilweise ausgeliefert und w\u00FCnschst dir mehr Stabilit\u00E4t und Kontrolle.",
];

const hadTherapy = [
  "Du verstehst deine Muster, aber kriegst es nicht richtig hin, dein Verhalten wirklich zu \u00E4ndern.",
  "Du kannst Dinge einordnen, aber nicht richtig f\u00FChlen.",
  "Du bist stabiler, also du funktionierst, aber nicht lebendig.",
  "Du wei\u00DFt, was du tun solltest, aber es passiert nicht wirklich.",
];

const RECOGNIZE_TABLE_CSS = `
.vk-table {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px;
  color: #1a1f24;
}
.vk-table h2 {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  color: #43A9AB;
  margin: 0 0 14px 0;
  letter-spacing: -0.015em;
  line-height: 1.2;
}
.vk-intro {
  font-size: 16px;
  line-height: 1.65;
  color: #6b7378;
  max-width: 620px;
  margin: 0 0 48px 0;
}
.vk-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #43A9AB;
  font-weight: 600;
  margin-bottom: 20px;
  padding: 7px 14px;
  background: rgba(67, 169, 171, 0.08);
  border-radius: 100px;
}
.vk-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #43A9AB;
}
.vk-container {
  background: #ffffff;
  border: 1px solid rgba(67, 169, 171, 0.2);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 40px;
  box-shadow: 0 4px 20px rgba(67, 169, 171, 0.04);
}
.vk-head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: linear-gradient(180deg, #f7fbfb 0%, #ffffff 100%);
  border-bottom: 1px solid rgba(67, 169, 171, 0.18);
  position: relative;
}
.vk-head::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 24px;
  bottom: 24px;
  width: 1px;
  background: rgba(67, 169, 171, 0.18);
}
@media (max-width: 780px) {
  .vk-head { grid-template-columns: 1fr; }
  .vk-head::before { display: none; }
}
.vk-head-col { padding: 32px 36px 28px; }
@media (max-width: 780px) {
  .vk-head-col { padding: 24px 24px 20px; }
  .vk-head-col:first-child { border-bottom: 1px solid rgba(67, 169, 171, 0.18); }
}
.vk-head-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}
.vk-head-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 700;
}
.vk-head-col.col-a .vk-head-letter {
  background: #ffffff;
  border: 1.5px solid #43A9AB;
  color: #43A9AB;
}
.vk-head-col.col-b .vk-head-letter {
  background: #43A9AB;
  color: #ffffff;
}
.vk-head-eyebrow {
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #9aa2a7;
  font-weight: 600;
}
.vk-head-title {
  font-size: clamp(19px, 2vw, 22px);
  font-weight: 700;
  color: #1a1f24;
  margin: 0 0 6px 0;
  letter-spacing: -0.01em;
  line-height: 1.3;
}
.vk-head-sub {
  font-size: 14px;
  color: #6b7378;
  margin: 0;
  line-height: 1.55;
  font-style: italic;
}
.vk-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
}
.vk-body::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 16px;
  bottom: 16px;
  width: 1px;
  background: rgba(67, 169, 171, 0.12);
}
@media (max-width: 780px) {
  .vk-body { grid-template-columns: 1fr; }
  .vk-body::before { display: none; }
}
.vk-col-body { display: flex; flex-direction: column; }
@media (max-width: 780px) {
  .vk-col-body.col-a { border-bottom: 1px solid rgba(67, 169, 171, 0.18); }
}
.vk-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px 36px;
  cursor: pointer;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(67, 169, 171, 0.08);
  font-family: inherit;
  text-align: left;
  width: 100%;
  transition: background 0.25s ease;
  position: relative;
}
.vk-row:last-child { border-bottom: none; }
.vk-row:hover { background: rgba(67, 169, 171, 0.035); }
.vk-row.is-marked { background: rgba(67, 169, 171, 0.06); }
.vk-row.is-marked::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #43A9AB;
}
@media (max-width: 780px) {
  .vk-row { padding: 16px 24px; }
}
.vk-row-index {
  font-size: 11px;
  color: #9aa2a7;
  font-weight: 600;
  letter-spacing: 0.12em;
  font-variant-numeric: tabular-nums;
  padding-top: 4px;
  min-width: 32px;
  flex-shrink: 0;
  transition: color 0.25s ease;
}
.vk-row.is-marked .vk-row-index { color: #43A9AB; }
.vk-row-check {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1.5px solid rgba(67, 169, 171, 0.5);
  background: #ffffff;
  flex-shrink: 0;
  margin-top: 2px;
  position: relative;
  transition: all 0.3s ease;
}
.vk-row:hover .vk-row-check { border-color: #43A9AB; }
.vk-row-check svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: #ffffff;
  opacity: 0;
  transform: scale(0.4);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.vk-row.is-marked .vk-row-check {
  background: #43A9AB;
  border-color: #43A9AB;
}
.vk-row.is-marked .vk-row-check svg {
  opacity: 1;
  transform: scale(1);
}
.vk-row-text {
  flex: 1;
  font-size: 15px;
  line-height: 1.6;
  color: #4a5258;
  transition: color 0.25s ease;
}
.vk-row.is-marked .vk-row-text { color: #1a1f24; }
.vk-footer {
  border-top: 1px solid rgba(67, 169, 171, 0.18);
  background: linear-gradient(180deg, #ffffff 0%, #f7fbfb 100%);
  padding: 44px 48px;
  text-align: center;
  position: relative;
}
@media (max-width: 780px) {
  .vk-footer { padding: 36px 24px; }
}
.vk-footer-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.vk-footer-line {
  width: 36px;
  height: 1px;
  background: rgba(67, 169, 171, 0.4);
}
.vk-footer-label {
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #43A9AB;
  font-weight: 600;
}
.vk-footer-quote {
  font-size: clamp(19px, 2.2vw, 24px);
  line-height: 1.4;
  color: #1a1f24;
  font-weight: 600;
  margin: 0 auto 14px;
  max-width: 720px;
  letter-spacing: -0.01em;
}
.vk-footer-sub {
  font-size: 15px;
  line-height: 1.6;
  color: #6b7378;
  max-width: 560px;
  margin: 0 auto;
}
.vk-counter-wrap {
  display: flex;
  justify-content: center;
  padding: 0 0 8px;
  min-height: 32px;
}
.vk-counter {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 9px 18px;
  background: #ffffff;
  border: 1px solid rgba(67, 169, 171, 0.25);
  border-radius: 100px;
  font-size: 13.5px;
  color: #2d7a7b;
  font-weight: 500;
  opacity: 0;
  transform: translateY(6px);
  transition: all 0.35s ease;
  pointer-events: none;
}
.vk-counter.is-visible {
  opacity: 1;
  transform: translateY(0);
  background: #43A9AB;
  color: #ffffff;
  border-color: #43A9AB;
}
.vk-counter-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  background: rgba(255, 255, 255, 0.22);
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
}
`;

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="5 10 8.5 13.5 15 7" />
  </svg>
);

function RecognizeRow({ id, index, text, marked, onToggle }) {
  return (
    <button
      type="button"
      className={`vk-row ${marked ? "is-marked" : ""}`}
      onClick={() => onToggle(id)}
    >
      <span className="vk-row-index">{index}</span>
      <span className="vk-row-check"><CheckIcon /></span>
      <span className="vk-row-text">{text}</span>
    </button>
  );
}

function RecognizeTable() {
  const [marked, setMarked] = useState(() => new Set());
  const toggle = (id) => {
    setMarked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const count = marked.size;

  return (
    <section className="vk-table">
      <style>{RECOGNIZE_TABLE_CSS}</style>
      <span className="vk-badge"><span className="vk-badge-dot" />Gegenüberstellung</span>
      <h2>Vielleicht erkennst du dich hier wieder</h2>
      <p className="vk-intro">
        Zwei Ausgangspunkte, ein gemeinsamer Wunsch. Klick die Punkte an, in denen du dich wiederfindest.
      </p>

      <div className="vk-container">
        <div className="vk-head">
          <div className="vk-head-col col-a">
            <div className="vk-head-tag">
              <span className="vk-head-letter">A</span>
              <span className="vk-head-eyebrow">Ausgangspunkt</span>
            </div>
            <h3 className="vk-head-title">Noch keine Therapie gemacht</h3>
            <p className="vk-head-sub">Du spürst, dass da etwas ist, aber du weißt nicht so genau, wo anfangen.</p>
          </div>
          <div className="vk-head-col col-b">
            <div className="vk-head-tag">
              <span className="vk-head-letter">B</span>
              <span className="vk-head-eyebrow">Ausgangspunkt</span>
            </div>
            <h3 className="vk-head-title">Schon eine Therapie gemacht</h3>
            <p className="vk-head-sub">Du hast schon vieles verstanden, aber es hat sich noch nicht ganz gesetzt.</p>
          </div>
        </div>

        <div className="vk-body">
          <div className="vk-col-body col-a">
            {noTherapyYet.map((text, i) => {
              const id = `A.${String(i + 1).padStart(2, "0")}`;
              return (
                <RecognizeRow
                  key={id}
                  id={id}
                  index={id}
                  text={text}
                  marked={marked.has(id)}
                  onToggle={toggle}
                />
              );
            })}
          </div>
          <div className="vk-col-body col-b">
            {hadTherapy.map((text, i) => {
              const id = `B.${String(i + 1).padStart(2, "0")}`;
              return (
                <RecognizeRow
                  key={id}
                  id={id}
                  index={id}
                  text={text}
                  marked={marked.has(id)}
                  onToggle={toggle}
                />
              );
            })}
          </div>
        </div>

        <div className="vk-footer">
          <div className="vk-footer-tag">
            <span className="vk-footer-line" />
            <span className="vk-footer-label">In beiden Fällen</span>
            <span className="vk-footer-line" />
          </div>
          <p className="vk-footer-quote">
            Du fühlst noch nicht ganz, dass du bei dir angekommen bist.
          </p>
          <p className="vk-footer-sub">
            Das ist kein Versagen und kein Zufall. Es zeigt nur, dass der bisherige Zugang an seine Grenze kommt, und dass ein anderer Weg möglich ist.
          </p>
        </div>
      </div>

      <div className="vk-counter-wrap">
        <div className={`vk-counter ${count > 0 ? "is-visible" : ""}`}>
          <span className="vk-counter-num">{count}</span>
          <span>
            {count === 1
              ? "Punkt erkannt, du bist nicht allein damit"
              : "Punkte erkannt, du bist nicht allein damit"}
          </span>
        </div>
      </div>
    </section>
  );
}

const MISSING_WAVES_CSS = `
.wof2 {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 24px;
  color: #1a1f24;
}
.wof2 h2 {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  color: #43A9AB;
  margin: 0 0 14px 0;
  letter-spacing: -0.015em;
}
.wof2-intro {
  font-size: 16px;
  line-height: 1.65;
  color: #6b7378;
  max-width: 640px;
  margin: 0 0 56px 0;
}
.wof2-toggle {
  display: inline-flex;
  align-items: center;
  background: #f0f7f7;
  border-radius: 100px;
  padding: 4px;
  gap: 2px;
  margin-bottom: 40px;
}
.wof2-btn {
  padding: 10px 26px;
  border-radius: 100px;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.35s ease;
  color: #6b7378;
}
.wof2-btn.is-active {
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  color: #1a1f24;
}
.wof2-btn.is-active.btn-assoz { color: #43A9AB; }
.wof2-stage {
  background: #ffffff;
  border: 1px solid rgba(67, 169, 171, 0.18);
  border-radius: 22px;
  overflow: hidden;
  margin-bottom: 56px;
  position: relative;
}
.wof2-canvas-wrap {
  display: grid;
  grid-template-columns: 160px 1fr;
  align-items: stretch;
}
@media (max-width: 640px) {
  .wof2-canvas-wrap { grid-template-columns: 110px 1fr; }
}
.wof2-labels {
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(67, 169, 171, 0.1);
  background: #fafcfc;
}
.wof2-label-row {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 18px;
  gap: 12px;
  border-bottom: 1px solid rgba(67, 169, 171, 0.08);
  min-height: 88px;
  transition: background 0.4s ease;
}
.wof2-label-row:last-child { border-bottom: none; }
.wof2-label-row.is-synced { background: rgba(67, 169, 171, 0.04); }
.wof2-label-num {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgba(67, 169, 171, 0.5);
  flex-shrink: 0;
}
.wof2-label-text { line-height: 1.25; }
.wof2-label-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1f24;
  display: block;
  margin-bottom: 3px;
  transition: color 0.4s ease;
}
.wof2-label-row.is-synced .wof2-label-name { color: #43A9AB; }
.wof2-label-sub {
  font-size: 11.5px;
  color: #9aa2a7;
  display: block;
  line-height: 1.4;
}
.wof2-canvas {
  display: block;
  width: 100%;
  height: 352px;
  background: #ffffff;
}
.wof2-status {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 28px;
  border-top: 1px solid rgba(67, 169, 171, 0.1);
  background: #fafcfc;
  transition: all 0.4s ease;
}
.wof2-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9aa2a7;
  transition: background 0.4s ease;
  flex-shrink: 0;
}
.wof2-status.is-assoz .wof2-status-dot {
  background: #43A9AB;
  box-shadow: 0 0 8px rgba(67,169,171,0.5);
}
.wof2-status-text {
  font-size: 13px;
  color: #6b7378;
  transition: color 0.4s ease;
}
.wof2-status.is-assoz .wof2-status-text { color: #43A9AB; font-weight: 500; }
.wof2-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: start;
}
@media (max-width: 860px) {
  .wof2-body { grid-template-columns: 1fr; gap: 28px; }
}
.wof2-body p {
  font-size: 16px;
  line-height: 1.75;
  color: #4a5258;
  margin: 0 0 18px 0;
}
.wof2-body p:last-child { margin: 0; }
.wof2-pullquote {
  border-left: 3px solid #43A9AB;
  padding: 6px 0 6px 22px;
}
.wof2-pullquote strong {
  font-size: 17px;
  line-height: 1.55;
  color: #1a1f24;
  font-weight: 600;
  display: block;
  margin-bottom: 12px;
}
.wof2-closing {
  font-size: 16px;
  color: #43A9AB !important;
  font-style: italic;
  font-weight: 500;
}
`;

const WAVE_CONFIGS = [
  { freq: 0.018, amp: 28, phase: 0,   chaosFreq: 0.031, chaosAmp: 18, color: "rgba(67,169,171,1)" },
  { freq: 0.022, amp: 22, phase: 1.8, chaosFreq: 0.019, chaosAmp: 22, color: "rgba(67,169,171,0.75)" },
  { freq: 0.015, amp: 32, phase: 3.4, chaosFreq: 0.027, chaosAmp: 14, color: "rgba(67,169,171,0.5)" },
  { freq: 0.026, amp: 20, phase: 5.1, chaosFreq: 0.014, chaosAmp: 26, color: "rgba(67,169,171,0.32)" },
];

const WAVE_LABELS = [
  { num: "01", name: "Empfindungen", sub: "Körper · Spüren" },
  { num: "02", name: "Gefühle", sub: "Emotion · Erleben" },
  { num: "03", name: "Gedanken", sub: "Kognition · Bedeutung" },
  { num: "04", name: "Handlungen", sub: "Verhalten · Ausdruck" },
];

function MissingWaves() {
  const [mode, setMode] = useState("dissoz");
  const [synced, setSynced] = useState(false);
  const canvasRef = useRef(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let t = 0;
    let syncProgress = 0;
    let frame;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const drawWave = (w, centerY, progress, displayW) => {
      ctx.beginPath();
      ctx.strokeStyle = w.color;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      for (let x = 0; x <= displayW; x += 2) {
        const baseY = Math.sin(x * w.freq + t * 0.6 + w.phase) * w.amp;
        const chaosY = Math.sin(x * w.chaosFreq + t * 0.9 + w.phase * 1.7) * w.chaosAmp;
        const y = centerY + baseY + chaosY * (1 - progress);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const drawGlow = (w, centerY, progress, displayW) => {
      if (progress < 0.3) return;
      ctx.beginPath();
      ctx.strokeStyle = w.color
        .replace("1)", `${0.18 * progress})`)
        .replace("0.75)", `${0.14 * progress})`)
        .replace("0.5)", `${0.1 * progress})`)
        .replace("0.32)", `${0.08 * progress})`);
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      for (let x = 0; x <= displayW; x += 2) {
        const baseY = Math.sin(x * w.freq + t * 0.6 + w.phase) * w.amp;
        const y = centerY + baseY;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const dw = canvas.width / dpr;
      const dh = canvas.height / dpr;
      ctx.clearRect(0, 0, dw, dh);

      const rowH = dh / 4;
      ctx.strokeStyle = "rgba(67,169,171,0.06)";
      ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(0, rowH * i);
        ctx.lineTo(dw, rowH * i);
        ctx.stroke();
      }

      WAVE_CONFIGS.forEach((w, i) => {
        const centerY = rowH * i + rowH / 2;
        drawGlow(w, centerY, syncProgress, dw);
        drawWave(w, centerY, syncProgress, dw);
      });

      const target = modeRef.current === "assoz" ? 1 : 0;
      syncProgress += (target - syncProgress) * 0.035;
      setSynced(syncProgress > 0.55);

      t += 1;
      frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const isAssoz = mode === "assoz";

  return (
    <section className="wof2">
      <style>{MISSING_WAVES_CSS}</style>
      <h2>Was oft fehlt</h2>
      <p className="wof2-intro">
        Viele Ansätze arbeiten nur auf einer Bewusstseinsebene. Echte Veränderung entsteht, wenn alle vier gleichzeitig in Kontakt sind.
      </p>

      <div className="wof2-toggle" role="group">
        <button
          type="button"
          className={`wof2-btn btn-dissoz ${!isAssoz ? "is-active" : ""}`}
          onClick={() => setMode("dissoz")}
        >
          Dissoziation
        </button>
        <button
          type="button"
          className={`wof2-btn btn-assoz ${isAssoz ? "is-active" : ""}`}
          onClick={() => setMode("assoz")}
        >
          Assoziation
        </button>
      </div>

      <div className="wof2-stage">
        <div className="wof2-canvas-wrap">
          <div className="wof2-labels">
            {WAVE_LABELS.map((l) => (
              <div key={l.num} className={`wof2-label-row ${synced ? "is-synced" : ""}`}>
                <span className="wof2-label-num">{l.num}</span>
                <span className="wof2-label-text">
                  <span className="wof2-label-name">{l.name}</span>
                  <span className="wof2-label-sub">{l.sub}</span>
                </span>
              </div>
            ))}
          </div>
          <canvas ref={canvasRef} className="wof2-canvas" />
        </div>

        <div className={`wof2-status ${isAssoz ? "is-assoz" : ""}`}>
          <span className="wof2-status-dot" />
          <span className="wof2-status-text">
            {isAssoz
              ? "Ebenen synchronisiert — alle fließen im selben Rhythmus"
              : "Ebenen isoliert — jede folgt ihrem eigenen Rhythmus"}
          </span>
        </div>
      </div>

      <div className="wof2-body">
        <div>
          <p>
            Viele Ansätze beschäftigen sich nur mit einer Bewusstseinsebene. Zum Beispiel beim Denken (Gesprächstherapie) oder beim Verhalten (Verhaltenstherapie). Andere arbeiten stärker mit dem Körper oder mit Gefühlen.
          </p>
          <p>
            Jede dieser Methoden kann wirksam sein. Für viele Menschen reicht es jedoch nicht aus, sich nur auf eine Ebene zu beschränken.
          </p>
        </div>
        <div>
          <div className="wof2-pullquote">
            <strong>
              Veränderung gelingt oft schneller, wenn alle Formen miteinander in Einklang gebracht werden. Denken, Fühlen, Körper und Handeln wirken zusammen.
            </strong>
            <p className="wof2-closing">
              Du veränderst dich nicht, weil du dich zwingst, sondern weil du innerlich an einem anderen Punkt angekommen bist.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const METHODEN_CSS = `
.methoden {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 24px;
  color: #1a1f24;
}
.methoden h2 {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  color: #43A9AB;
  margin: 0 0 14px 0;
  letter-spacing: -0.015em;
}
.methoden-intro {
  font-size: 16px;
  line-height: 1.65;
  color: #6b7378;
  max-width: 620px;
  margin: 0 0 72px 0;
}
.methoden-stage {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 48px;
  padding: 40px 20px;
}
.methoden-circles {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 700px;
}
.methoden-row-top { display: flex; justify-content: center; }
.methoden-row-bottom { display: flex; justify-content: center; gap: 100px; }
@media (max-width: 600px) {
  .methoden-row-bottom { gap: 40px; }
}
.methoden-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
@media (max-width: 720px) {
  .methoden-lines { display: none; }
}
.methoden-lines path {
  fill: none;
  stroke: rgba(67, 169, 171, 0.2);
  stroke-width: 1.2;
  stroke-dasharray: 4 6;
}
.methode-circle {
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding: 0;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.methode-circle:hover { transform: translateY(-6px); }
.methode-ring {
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ffffff 0%, #f4faf9 100%);
  border: 1.5px solid rgba(67, 169, 171, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
@media (max-width: 720px) {
  .methode-ring { width: 140px; height: 140px; }
}
.methode-ring::before {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 1px solid rgba(67, 169, 171, 0.2);
  opacity: 0;
  transition: all 0.4s ease;
}
.methode-circle:hover .methode-ring {
  border-color: #43A9AB;
  border-width: 2px;
  box-shadow: 0 12px 36px rgba(67, 169, 171, 0.14);
}
.methode-circle:hover .methode-ring::before { opacity: 1; inset: -14px; }
.methode-circle.is-active .methode-ring {
  background: radial-gradient(circle at 30% 30%, #43A9AB 0%, #3a9293 100%);
  border-color: #43A9AB;
  border-width: 2px;
  box-shadow: 0 16px 40px rgba(67, 169, 171, 0.28);
}
.methode-circle.is-active .methode-ring::before {
  opacity: 1;
  inset: -12px;
  border-color: rgba(67, 169, 171, 0.35);
  animation: methodePulse 2.4s ease-in-out infinite;
}
@keyframes methodePulse {
  0%, 100% { transform: scale(1); opacity: 0.35; }
  50% { transform: scale(1.04); opacity: 0.7; }
}
.methode-icon {
  width: 60px;
  height: 60px;
  color: #43A9AB;
  transition: color 0.4s ease;
  stroke-width: 1.4;
}
@media (max-width: 720px) {
  .methode-icon { width: 48px; height: 48px; }
}
.methode-circle.is-active .methode-icon { color: #ffffff; }
.methode-label {
  font-size: 16.5px;
  font-weight: 600;
  color: #1a1f24;
  text-align: center;
  line-height: 1.3;
  max-width: 180px;
  transition: color 0.3s ease;
}
.methode-circle.is-active .methode-label { color: #43A9AB; }
.methode-hint {
  font-size: 12px;
  color: #9aa2a7;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 500;
  opacity: 0;
  transform: translateY(-4px);
  transition: all 0.3s ease;
}
.methode-circle:hover .methode-hint {
  opacity: 0.8;
  transform: translateY(0);
  color: #43A9AB;
}
.methode-circle.is-active .methode-hint {
  opacity: 1;
  transform: translateY(0);
  color: #43A9AB;
}
.methode-detail {
  background: linear-gradient(160deg, #f7fbfb 0%, #ffffff 70%);
  border: 1px solid rgba(67, 169, 171, 0.2);
  border-radius: 22px;
  padding: 48px 44px;
  min-height: 260px;
  position: relative;
  overflow: hidden;
}
@media (max-width: 720px) {
  .methode-detail { padding: 36px 28px; }
}
.methode-detail::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 280px;
  height: 280px;
  background: radial-gradient(circle, rgba(67, 169, 171, 0.08), transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}
.methode-content {
  display: none;
  animation: contentFade 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}
.methode-content.is-active { display: block; }
@keyframes contentFade {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.methode-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #43A9AB;
  font-weight: 600;
  margin-bottom: 18px;
}
.methode-eyebrow-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #43A9AB;
}
.methode-title {
  font-size: clamp(24px, 2.8vw, 30px);
  font-weight: 700;
  color: #1a1f24;
  margin: 0 0 16px 0;
  letter-spacing: -0.015em;
  line-height: 1.25;
}
.methode-lead {
  font-size: 16.5px;
  line-height: 1.55;
  color: #43A9AB;
  font-style: italic;
  font-weight: 500;
  margin: 0 0 22px 0;
}
.methode-text {
  font-size: 15.5px;
  line-height: 1.75;
  color: #4a5258;
  margin: 0 0 14px 0;
  max-width: 680px;
}
.methode-text:last-of-type { margin-bottom: 0; }
`;

const methodenData = [
  {
    num: 1,
    eyebrow: "Methode 01",
    label: "Biodynamische Psychotherapie",
    title: "Biodynamische Psychotherapie",
    lead: "Der Körper erinnert sich, auch wenn der Kopf schon weitergezogen ist.",
    paragraphs: [
      "In der biodynamischen Arbeit wird dein Körper zum Mitsprecher. Wir arbeiten mit Atem, Spürbewegung und feinen Impulsen, um dort anzusetzen, wo Worte allein nicht mehr weiterkommen. Alte Spannungsmuster dürfen sich lösen, ohne dass du sie erst verstehen oder erklären musst.",
      "Besonders geeignet, wenn du dich kopflastig fühlst, körperliche Symptome hast oder spürst, dass klassische Gesprächsarbeit an ihre Grenze kommt.",
    ],
    icon: (
      <svg className="methode-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 32 14 C 22 14 18 22 20 30 C 22 36 18 40 18 46 C 18 52 24 54 32 54 C 40 54 46 52 46 46 C 46 40 42 36 44 30 C 46 22 42 14 32 14 Z" />
        <circle cx="32" cy="26" r="3" />
        <path d="M 26 38 Q 32 44 38 38" />
      </svg>
    ),
  },
  {
    num: 2,
    eyebrow: "Methode 02",
    label: "Verhaltenstherapeutische Tools",
    title: "Verhaltenstherapeutische Tools",
    lead: "Konkrete Werkzeuge für konkrete Alltagssituationen.",
    paragraphs: [
      "Wenn du wissen willst, was du morgen früh anders machen kannst, helfen klar strukturierte Methoden der Verhaltenstherapie. Kognitive Neubewertung, Expositionsarbeit, Verankerung neuer Muster und praktische Strategien für akute Situationen.",
      "Diese Werkzeuge sind besonders wertvoll, wenn du bereits verstanden hast, was dich belastet, aber noch nicht weißt, wie du es im Alltag anders machst.",
    ],
    icon: (
      <svg className="methode-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <rect x="14" y="22" width="36" height="26" rx="3" />
        <path d="M 24 22 L 24 16 L 40 16 L 40 22" />
        <line x1="14" y1="32" x2="50" y2="32" />
        <circle cx="22" cy="40" r="1.5" fill="currentColor" />
        <circle cx="32" cy="40" r="1.5" fill="currentColor" />
        <circle cx="42" cy="40" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: 3,
    eyebrow: "Methode 03",
    label: "Ketamin-gestützte Arbeit",
    title: "Ketamin-gestützte Arbeit",
    lead: "Ein Fenster, durch das neue Sichtweisen spürbar werden können.",
    paragraphs: [
      "Ketamin kann festgefahrene Denk- und Gefühlsmuster vorübergehend lockern und einen Raum öffnen, in dem Themen nicht nur verstanden, sondern wirklich erlebt werden. Die eigentliche Arbeit passiert dann in der therapeutischen Begleitung davor und danach.",
      "Indiziert besonders bei therapieresistenten Depressionen, schweren Blockaden oder wenn das Gefühl bleibt, an der eigenen Oberfläche zu stehen und nicht weiter zu kommen.",
    ],
    icon: (
      <svg className="methode-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="6" />
        <path d="M 32 14 L 32 20" />
        <path d="M 32 44 L 32 50" />
        <path d="M 14 32 L 20 32" />
        <path d="M 44 32 L 50 32" />
        <path d="M 19 19 L 23 23" />
        <path d="M 41 41 L 45 45" />
        <path d="M 45 19 L 41 23" />
        <path d="M 23 41 L 19 45" />
      </svg>
    ),
  },
];

function MethodenKreise() {
  const [activeNum, setActiveNum] = useState(1);

  const renderCircle = (m) => (
    <button
      key={m.num}
      type="button"
      className={`methode-circle ${activeNum === m.num ? "is-active" : ""}`}
      onClick={() => setActiveNum(m.num)}
      role="tab"
    >
      <span className="methode-ring">{m.icon}</span>
      <span className="methode-label">{m.label}</span>
      <span className="methode-hint">Ansehen</span>
    </button>
  );

  return (
    <section className="methoden">
      <style>{METHODEN_CSS}</style>
      <h2>Methoden</h2>
      <p className="methoden-intro">
        Drei Zug&auml;nge, die ineinandergreifen. Klick einen Kreis an, um mehr dar&uuml;ber zu erfahren.
      </p>

      <div className="methoden-stage">
        <svg className="methoden-lines" viewBox="0 0 700 340" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 350 90 L 200 270" />
          <path d="M 350 90 L 500 270" />
          <path d="M 200 270 L 500 270" />
        </svg>

        <div className="methoden-circles" role="tablist">
          <div className="methoden-row-top">
            {renderCircle(methodenData[0])}
          </div>
          <div className="methoden-row-bottom">
            {methodenData.slice(1).map(renderCircle)}
          </div>
        </div>
      </div>

      <div className="methode-detail">
        {methodenData.map((m) => (
          <div key={m.num} className={`methode-content ${activeNum === m.num ? "is-active" : ""}`}>
            <div className="methode-eyebrow">
              <span className="methode-eyebrow-dot" />
              {m.eyebrow}
            </div>
            <h3 className="methode-title">{m.title}</h3>
            <p className="methode-lead">{m.lead}</p>
            {m.paragraphs.map((p, i) => (
              <p key={i} className="methode-text">{p}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

const faqData = [
  { q: "Was unterscheidet deinen Ansatz von klassischer Psychotherapie?", a: "Wir arbeiten nicht nur \u00FCber Gespr\u00E4che, sondern beziehen deinen K\u00F6rper und das direkte Erleben mit ein." },
  { q: "Ich habe schon mal eine Therapie gemacht. Wieso sollte ich nochmal anfangen?", a: "Viele Therapien arbeiten nur auf einzelnen Ebenen. Bei mir geht es darum, Empfindung, Gef\u00FChl und Denken miteinander zu verbinden. Denn genau dort entsteht oft die Ver\u00E4nderung, die vorher gefehlt hat." },
  { q: "Muss ich mich bei dir mit Ketamin behandeln lassen?", a: "Nein. Ketamin ist eine Option, aber nicht der Kern meiner Arbeit. Entscheidend ist der Gesamtansatz und was f\u00FCr dich individuell sinnvoll ist." },
  { q: "Wie l\u00E4uft eine Sitzung ab?", a: "Es gibt keinen starren Ablauf. Wir arbeiten situativ miteinander. Gespr\u00E4che, K\u00F6rperwahrnehmung und Integration greifen dabei ineinander." },
  { q: "Was bedeutet Integration?", a: "Erlebnisse aus der Sitzung werden in konkrete Schritte \u00FCbersetzt. Damit deine Ver\u00E4nderung nicht nur im Raum bleibt, sondern auch in deinem Alltag wirkt." },
  { q: "Wie lange dauert das?", a: "Das ist ganz individuell. Viele Patient:innen sp\u00FCren relativ fr\u00FCh Verbesserungen in ihrem Erleben, ihrer Regulation oder Klarheit. Entscheidend ist, dass sich etwas langfristig und nachhaltig verschiebt. Nicht nur kurzfristig." },
];

function Psychotherapie() {
  const [openFaq, setOpenFaq] = useState(null);
  const isMobile = useIsMobile();
  const recognizeAnim = useScrollFadeIn();
  const missingAnim = useScrollFadeIn();
  const approachAnim = useScrollFadeIn();
  const methodsAnim = useScrollFadeIn();
  const processAnim = useScrollFadeIn();
  const fitAnim = useScrollFadeIn();
  const faqAnim = useScrollFadeIn();
  const ctaAnim = useScrollFadeIn();

  return (
    <div className="bg-white min-h-screen">
      <Seo
        path="/psychotherapie"
        title="Psychotherapie & Ketamin-assistierte Therapie Berlin"
        description="Psychotherapeutische Begleitung und Ketamin-assistierte Verfahren in Berlin – integrativer Ansatz für Depression, Trauma und chronischen Stress."
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          })}
        </script>
      </Helmet>

      {/* Hero Image Banner */}
      <HeroBanner
        image="/Assets/Psychotherapie.png"
        badge="Psychotherapie"
        title={<>Ganzheitliche <em className="italic">Psychotherapie</em></>}
        subtitle={"Mein Ansatz ist, Empfindungen, Gef\u00FChle, Gedanken und Handlungen mit dir zu synchronisieren. Mit dem Ziel, dich schnellstm\u00F6glich auf dem Weg zu deinem besseren Selbst zu begleiten."}
      >
        <div className="flex flex-wrap gap-3 mb-6">
          {["Ketamin-assistierte Therapie", "Somatic Experiencing", "Verhaltenstherapie"].map((method) => (
            <span key={method} className="text-xs sm:text-sm text-[#43a9ab] border border-[#43a9ab]/20 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              {method}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          <a
            href="/ketamin"
            className="inline-flex items-center bg-[#43a9ab] text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#389193] transition-colors duration-200 no-underline shadow-lg shadow-[#43a9ab]/25"
          >
            Mehr &uuml;ber Ketamin erfahren
          </a>
        </div>
      </HeroBanner>

      {/* Vielleicht erkennst du dich hier wieder */}
      <section ref={recognizeAnim.ref} style={recognizeAnim.style}>
        <RecognizeTable />
      </section>

      {/* Was oft fehlt */}
      <section ref={missingAnim.ref} style={missingAnim.style}>
        <MissingWaves />
      </section>

      {/* So arbeite ich */}
      <section ref={approachAnim.ref} style={approachAnim.style}>
        {isMobile ? (
          <FanCardsMobile cards={soArbeiteIchCards} title="So arbeite ich" />
        ) : (
          <FanCards cards={soArbeiteIchCards} title="So arbeite ich" />
        )}
      </section>

      {/* Methoden */}
      <section ref={methodsAnim.ref} style={methodsAnim.style}>
        <MethodenKreise />
      </section>

      {/* Prozess */}
      <section ref={processAnim.ref} style={processAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #d4ece1 0%, #e0f4f5 30%, #d9f0e4 60%, #c8e6d8 100%)" }}>
            <div className="px-8 sm:px-14 py-12 sm:py-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-10 text-center">So starten wir</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: psyStartIcons.heart, title: "Orientierungsgespräch (15 Minuten)", desc: "Ein erstes Kennenlernen, um zu klären, ob und wie ich dich unterstützen kann." },
                  { icon: psyStartIcons.scan, title: "Anamnese", desc: "Wir erfassen deine Ausgangssituation, deine Ziele und deinen bisherigen Verlauf." },
                  { icon: psyStartIcons.leaf, title: "Entscheidung", desc: "Gemeinsam definieren wir, welche Ansätze und Therapien für dich sinnvoll sind." },
                  { icon: psyStartIcons.sparkle, title: "Umsetzung", desc: "Die Therapie erfolgt strukturiert und begleitet - mit regelmäßigen Sitzungen und Anpassungen." },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-white/80 text-[#43a9ab] flex items-center justify-center mx-auto mb-4 shadow-sm">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-bold text-[#515757] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#515757]/60 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.doctolib.de/arzt/berlin/shukri-jarmoukli/booking/new-patient?specialityId=1286&speciality_ids%5B%5D=1286&source=profile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#43a9ab] text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#389193] transition-colors duration-200 no-underline shadow-sm"
            >
              Kostenloses Orientierungsgespräch (15 Min)
            </a>
            <a
              href="https://www.doctolib.de/arzt/berlin/shukri-jarmoukli/booking/new-patient?specialityId=1286&speciality_ids%5B%5D=1286&source=profile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-[#43a9ab]/30 text-[#43a9ab] px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#43a9ab]/5 transition-colors duration-200 no-underline"
            >
              Therapie anfragen
            </a>
          </div>
        </div>
      </section>

      {/* Fuer wen */}
      <section ref={fitAnim.ref} style={fitAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-8 tracking-tight">F&uuml;r wen das passt:</h2>
          <div className="space-y-4 mb-8">
            {[
              "Du hast schon viel verstanden",
              "Dir fehlt die Tiefe im Erleben",
              "Du willst echte Ver\u00E4nderung",
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
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-amber-800/70 text-sm leading-relaxed">
              Bei akuten Krisen bitte die lokalen Notfallstellen nutzen.
            </p>
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
            Vielleicht ist das DEIN MISSING PIECE.
          </h2>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <a
              href="https://www.doctolib.de/arzt/berlin/shukri-jarmoukli/booking/new-patient?specialityId=1286&speciality_ids%5B%5D=1286&source=profile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#43a9ab] text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#389193] transition-colors duration-200 no-underline shadow-lg shadow-[#43a9ab]/20"
            >
              Kostenloses Orientierungsgespr&auml;ch (15 Min)
            </a>
            <a
              href="https://www.doctolib.de/arzt/berlin/shukri-jarmoukli/booking/new-patient?specialityId=1286&speciality_ids%5B%5D=1286&source=profile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-[#43a9ab]/30 text-[#43a9ab] px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#43a9ab]/5 transition-colors duration-200 no-underline"
            >
              Therapie anfragen
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Psychotherapie;
