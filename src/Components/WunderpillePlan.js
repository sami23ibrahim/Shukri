import { useState } from "react";

const PLAN_CSS = `
.plan-section {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px;
  color: #1a1f24;
}
.plan-section h2 {
  font-size: clamp(30px, 4.2vw, 46px);
  font-weight: 700;
  color: #43A9AB;
  margin: 0 0 20px 0;
  letter-spacing: -0.02em;
  line-height: 1.15;
  max-width: 900px;
}
.plan-intro {
  font-size: 17px;
  line-height: 1.65;
  color: #6b7378;
  max-width: 640px;
  margin: 0 0 72px 0;
}
.plan-split {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 56px;
  align-items: start;
  margin-bottom: 80px;
}
@media (max-width: 960px) {
  .plan-split { grid-template-columns: 1fr; gap: 40px; }
}
.plan-hebels {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.plan-hebel {
  display: flex;
  align-items: center;
  gap: 18px;
  background: #ffffff;
  border: 1px solid #e5efef;
  border-radius: 14px;
  padding: 18px 22px;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  width: 100%;
}
.plan-hebel::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #43A9AB;
  transform: scaleY(0);
  transform-origin: center;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.plan-hebel:hover {
  border-color: rgba(67, 169, 171, 0.5);
  transform: translateX(4px);
}
.plan-hebel.is-active {
  border-color: #43A9AB;
  box-shadow: 0 8px 24px rgba(67, 169, 171, 0.1);
  transform: translateX(6px);
}
.plan-hebel.is-active::before { transform: scaleY(1); }
.plan-hebel-num {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #f4faf9;
  border: 1.5px solid rgba(67, 169, 171, 0.3);
  color: #43A9AB;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 15px;
  flex-shrink: 0;
  transition: all 0.35s ease;
}
.plan-hebel.is-active .plan-hebel-num {
  background: #43A9AB;
  color: #ffffff;
  border-color: #43A9AB;
}
.plan-hebel-label {
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: #1a1f24;
  line-height: 1.4;
}
.plan-hebel.is-active .plan-hebel-label { font-weight: 600; }
.plan-hebel-arrow {
  width: 20px;
  height: 20px;
  color: rgba(67, 169, 171, 0.5);
  flex-shrink: 0;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-4px);
}
.plan-hebel:hover .plan-hebel-arrow,
.plan-hebel.is-active .plan-hebel-arrow {
  opacity: 1;
  transform: translateX(0);
  color: #43A9AB;
}
.plan-detail {
  position: sticky;
  top: 40px;
  background: linear-gradient(160deg, #f7fbfb 0%, #ffffff 70%);
  border: 1px solid rgba(67, 169, 171, 0.18);
  border-radius: 22px;
  padding: 48px 44px;
  min-height: 440px;
  overflow: hidden;
}
@media (max-width: 960px) {
  .plan-detail { position: static; padding: 36px 28px; }
}
.plan-detail::before {
  content: '';
  position: absolute;
  top: -80px;
  right: -80px;
  width: 280px;
  height: 280px;
  background: radial-gradient(circle, rgba(67, 169, 171, 0.1), transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}
.plan-detail-content {
  animation: detailFade 0.4s ease;
  position: relative;
  z-index: 1;
}
@keyframes detailFade {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.plan-detail-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #43A9AB;
  font-weight: 600;
  margin-bottom: 20px;
}
.plan-detail-eyebrow-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #43A9AB;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  letter-spacing: 0;
}
.plan-detail-title {
  font-size: clamp(26px, 3vw, 34px);
  font-weight: 700;
  color: #1a1f24;
  margin: 0 0 18px 0;
  letter-spacing: -0.015em;
  line-height: 1.2;
}
.plan-detail-lead {
  font-size: 17px;
  line-height: 1.55;
  color: #43A9AB;
  font-style: italic;
  font-weight: 500;
  margin: 0 0 24px 0;
}
.plan-detail-text {
  font-size: 15.5px;
  line-height: 1.75;
  color: #4a5258;
  margin: 0 0 32px 0;
}
.plan-detail-bullets {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 24px 0;
  border-top: 1px solid rgba(67, 169, 171, 0.18);
  border-bottom: 1px solid rgba(67, 169, 171, 0.18);
  margin-bottom: 28px;
}
.plan-detail-bullet {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  font-size: 14.5px;
  line-height: 1.55;
  color: #4a5258;
}
.plan-detail-bullet-check {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(67, 169, 171, 0.12);
  color: #43A9AB;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}
.plan-detail-bullet-check svg {
  width: 11px;
  height: 11px;
}
.plan-detail-footer {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}
.plan-detail-footer-label {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #9aa2a7;
  font-weight: 600;
}
.plan-detail-footer-list {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.plan-detail-footer-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ffffff;
  border: 1.5px solid rgba(67, 169, 171, 0.35);
  color: #43A9AB;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}
.plan-detail-footer-item:hover {
  background: #43A9AB;
  color: #ffffff;
  border-color: #43A9AB;
  transform: translateY(-2px);
}
.plan-closing {
  position: relative;
  background: #ffffff;
  border-radius: 22px;
  padding: 56px 48px;
  border: 1px solid #e5efef;
  overflow: hidden;
}
@media (max-width: 720px) {
  .plan-closing { padding: 40px 28px; }
}
.plan-closing::before {
  content: '';
  position: absolute;
  bottom: -100px;
  left: -100px;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(67, 169, 171, 0.06), transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}
.plan-closing-eyebrow {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #43A9AB;
  font-weight: 600;
  margin-bottom: 18px;
  position: relative;
  z-index: 1;
}
.plan-closing-title {
  font-size: clamp(24px, 2.8vw, 30px);
  font-weight: 700;
  color: #1a1f24;
  margin: 0 0 22px 0;
  letter-spacing: -0.01em;
  line-height: 1.25;
  position: relative;
  z-index: 1;
  max-width: 800px;
}
.plan-closing-text {
  font-size: 16px;
  line-height: 1.75;
  color: #4a5258;
  margin: 0;
  max-width: 780px;
  position: relative;
  z-index: 1;
}
.plan-closing-highlight {
  color: #1a1f24;
  font-weight: 600;
  background: linear-gradient(180deg, transparent 65%, rgba(67, 169, 171, 0.18) 65%);
  padding: 0 2px;
}
`;

const HEBELS = [
  {
    num: 1,
    label: "Lebensstil als Grundlage",
    title: "Lebensstil als Grundlage",
    lead: "Keine Therapie der Welt kann ersetzen, was dein Alltag täglich tut.",
    text: "Schlaf, Ernährung, Bewegung, Licht und Stress sind die stärksten Hebel überhaupt. Sie wirken jeden Tag, in jede Zelle hinein. Bevor wir über zusätzliche Therapien sprechen, schauen wir was dein Lebensstil bereits für dich tut, und wo er dich bremst.",
    bullets: [
      "Schlafqualität, Rhythmus und Regeneration",
      "Ernährung, die zu deinem Stoffwechsel passt",
      "Bewegung, Licht und Stressregulation im Alltag",
    ],
  },
  {
    num: 2,
    label: "Pflanzliche Therapien gezielt eingesetzt",
    title: "Pflanzliche Therapien gezielt eingesetzt",
    lead: "Pflanzen sind keine Alternative, sondern ein präzises Werkzeug.",
    text: "Richtig ausgewählt können pflanzliche Wirkstoffe genau dort ansetzen, wo dein Körper Unterstützung braucht. Bei chronischem Stress, Entzündung, hormoneller Dysbalance oder Schlafstörungen. Entscheidend ist nicht die Anzahl, sondern die Passung zu deinem individuellen Bild.",
    bullets: [
      "Adaptogene bei Stress und Erschöpfung",
      "Phytotherapie bei stiller Entzündung",
      "Unterstützung von Leber, Darm und Nervensystem",
    ],
  },
  {
    num: 3,
    label: "Hochdosis-Nährstofftherapien, wenn passend, nicht als Trend",
    title: "Hochdosis-Nährstofftherapien, wenn passend",
    lead: "Nicht als Trend. Nur wenn dein Labor und dein Körper danach rufen.",
    text: "Hochdosierte Mikronährstoffe können in bestimmten Situationen einen echten Unterschied machen. Bei nachgewiesenen Mängeln, erhöhtem Verbrauch oder gezielter Regeneration. Wir arbeiten laborbasiert und dosieren so, dass dein Körper wirklich profitiert, oral oder über Infusionen.",
    bullets: [
      "Mikronährstoffe laborbasiert und zielgerichtet",
      "Infusionen bei gestörter Aufnahme oder akutem Bedarf",
      "Keine Pauschalprotokolle, sondern individuelle Dosierung",
    ],
  },
  {
    num: 4,
    label: "Entgiftungsstrategien präzise angewendet",
    title: "Entgiftungsstrategien präzise angewendet",
    lead: "Entgiftung ist kein Wellness-Thema, sondern ein klinischer Prozess.",
    text: "Dein Körper verfügt über eigene Entgiftungssysteme, Leber, Darm, Nieren, Haut und Lymphe. Wenn sie überlastet sind, helfen gezielte Strategien, sie wieder in Funktion zu bringen. Nicht pauschal, sondern basierend auf Diagnostik und mit klarer Indikation.",
    bullets: [
      "Schwermetall- und Belastungsanalyse (z. B. DMPS-Test)",
      "Leber- und Darm-gerichtete Protokolle",
      "Gezielte Infusionen zur Entgiftungsunterstützung",
    ],
  },
  {
    num: 5,
    label: "Mentoring für echte Umsetzung im Alltag",
    title: "Mentoring für echte Umsetzung im Alltag",
    lead: "Zwischen Wissen und Veränderung liegt die eigentliche Arbeit.",
    text: "Jeder Plan scheitert oder gelingt im Alltag. Deswegen begleite ich dich nicht nur diagnostisch, sondern auch in der Umsetzung. Mit klaren Schritten, regelmäßigem Feedback und der Möglichkeit, Dinge anzupassen, wenn dein Leben es braucht.",
    bullets: [
      "Regelmäßige Check-ins und Datenbesprechung",
      "Anpassung statt starrer Protokolle",
      "Nachhaltige Integration in deinen Alltag",
    ],
  },
];

const ArrowIcon = () => (
  <svg className="plan-hebel-arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 5 10 L 15 10 M 11 6 L 15 10 L 11 14" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2 6 5 9 10 3" />
  </svg>
);

export default function WunderpillePlan() {
  const [active, setActive] = useState(1);
  const activeHebel = HEBELS.find((h) => h.num === active);
  const others = HEBELS.filter((h) => h.num !== active);

  const jumpTo = (num) => {
    setActive(num);
    if (typeof window !== "undefined" && window.innerWidth < 960) {
      const el = document.querySelector(".plan-detail");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="plan-section">
      <style>{PLAN_CSS}</style>
      <h2>Ohne Wunderpille, aber mit konkretem Plan</h2>
      <p className="plan-intro">
        Es gibt selten die eine Lösung. Aber es gibt Hebel, die viel verändern können, wenn sie richtig priorisiert sind.
      </p>

      <div className="plan-split">
        <div className="plan-hebels" role="tablist">
          {HEBELS.map((h) => (
            <button
              key={h.num}
              type="button"
              role="tab"
              className={`plan-hebel ${active === h.num ? "is-active" : ""}`}
              onClick={() => setActive(h.num)}
            >
              <span className="plan-hebel-num">{h.num}</span>
              <span className="plan-hebel-label">{h.label}</span>
              <ArrowIcon />
            </button>
          ))}
        </div>

        <div className="plan-detail">
          <div className="plan-detail-content" key={activeHebel.num}>
            <div className="plan-detail-eyebrow">
              <span className="plan-detail-eyebrow-dot">{activeHebel.num}</span>
              Hebel
            </div>
            <h3 className="plan-detail-title">{activeHebel.title}</h3>
            <p className="plan-detail-lead">{activeHebel.lead}</p>
            <p className="plan-detail-text">{activeHebel.text}</p>
            <div className="plan-detail-bullets">
              {activeHebel.bullets.map((b, i) => (
                <div key={i} className="plan-detail-bullet">
                  <span className="plan-detail-bullet-check"><CheckIcon /></span>
                  {b}
                </div>
              ))}
            </div>
            <div className="plan-detail-footer">
              <span className="plan-detail-footer-label">
                {active === 5 ? "Zurück zu" : "Weiter zu"}
              </span>
              <div className="plan-detail-footer-list">
                {others.map((o) => (
                  <button
                    key={o.num}
                    type="button"
                    className="plan-detail-footer-item"
                    onClick={() => jumpTo(o.num)}
                  >
                    {o.num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="plan-closing">
        <span className="plan-closing-eyebrow">Das Gesamtkonzept</span>
        <h3 className="plan-closing-title">
          Nachhaltige Gesundheit entsteht nicht durch einzelne Maßnahmen, sondern durch ihr bewusstes Zusammenwirken.
        </h3>
        <p className="plan-closing-text">
          Mein Ansatz verbindet verschiedene Formen der Medizin zu einem ganzheitlichen System. Statt isolierter Einzelmaßnahmen entsteht eine Kombination aus unterschiedlichen Therapieformen, um nicht nur Symptome zu behandeln, sondern <span className="plan-closing-highlight">echte Veränderung zu ermöglichen</span>. Entscheidend ist dabei das Zusammenspiel aus aktiver Eigenverantwortung und präziser Unterstützung meinerseits.
        </p>
      </div>
    </section>
  );
}
