import { useState, useRef, useEffect, useCallback } from "react";
import ScrolledLines from "../Components/ScrolledLines";
import SchwerpunkteGrid from "../Components/SchwerpunkteGrid";
import WunderpillePlan from "../Components/WunderpillePlan";
import Seo from "../Components/Seo";

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

const recognizeItems = [
  'Deine Werte sind "ok" - aber du fühlst dich nicht ok',
  "Du warst bei mehreren Spezialisten, aber niemand kann dir helfen",
  "Du hast vieles ausprobiert mit kurzfristigem Effekt, aber ohne Stabilität",
  "Die Ursache bleibt unklar oder wird vorschnell erklärt",
];

const processSteps = [
  { num: "01", title: "Erstgespr\u00E4ch", desc: "Struktur, Verlauf und Priorit\u00E4ten verstehen" },
  { num: "02", title: "Entscheidung", desc: "Welche Diagnostik ist wirklich sinnvoll f\u00FCr dich?" },
  { num: "03", title: "Dein individueller Plan", desc: "Klare Schritte und begleitete Handlungsumsetzung" },
];

const includesIcons = {
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

const includesItems = [
  { icon: "heart", title: "Beratung", desc: "Bevor wir dir irgendetwas empfehlen, verstehen wir deinen Körper, deine Geschichte und deine Ziele." },
  { icon: "scan", title: "Diagnostik", desc: "Gezielte Laboranalysen, funktionelle Tests und klinische Befundung. Individuell abgestimmt auf deine Beschwerden." },
  { icon: "leaf", title: "Gesundheitsplan", desc: "Du bekommst keinen allgemeinen Rat, sondern einen konkreten Plan. Genau auf dich abgestimmt, mit klaren nächsten Schritten." },
  { icon: "sparkle", title: "Mentoring", desc: "Wir begleiten dich langfristig, passen deinen Plan an und bleiben an deiner Seite, bis du wirklich dort ankommst, wo du hinwillst." },
];

const ZITAT_WUNDERPILLE_CSS = `
.quote-wrap {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  max-width: 900px;
  margin: 15vh auto 0;
  padding: 0 24px 24px;
}
.quote-box {
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(67, 169, 171, 0.25);
  border-radius: 24px;
  padding: 64px 72px;
  overflow: hidden;
}
@media (max-width: 680px) {
  .quote-box { padding: 48px 36px; }
}
.quote-box::before {
  content: '';
  position: absolute;
  left: 0;
  top: 40px;
  bottom: 40px;
  width: 4px;
  background: linear-gradient(to bottom, transparent, #43A9AB 20%, #43A9AB 80%, transparent);
  border-radius: 0 4px 4px 0;
}
.quote-box::after {
  content: '';
  position: absolute;
  top: -120px;
  right: -120px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(67,169,171,0.06), transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}
.quote-mark {
  font-size: 140px;
  line-height: 1;
  color: rgba(67, 169, 171, 0.12);
  font-family: Georgia, serif;
  position: absolute;
  top: 20px;
  left: 56px;
  pointer-events: none;
  user-select: none;
}
@media (max-width: 680px) {
  .quote-mark { font-size: 90px; left: 28px; }
}
.quote-text {
  font-size: clamp(20px, 2.6vw, 28px);
  font-weight: 600;
  line-height: 1.5;
  color: #1a1f24;
  letter-spacing: -0.015em;
  margin: 0 0 32px 0;
  position: relative;
  z-index: 1;
}
.quote-text em {
  font-style: normal;
  color: #43A9AB;
}
.quote-attr {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 1;
}
.quote-attr-line {
  width: 32px;
  height: 1.5px;
  background: rgba(67, 169, 171, 0.5);
  flex-shrink: 0;
}
.quote-attr-name {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #43A9AB;
}
.quote-attr-role {
  font-size: 13px;
  color: #9aa2a7;
  margin-left: 4px;
}
`;

function ZitatWunderpille() {
  return (
    <div className="quote-wrap">
      <style>{ZITAT_WUNDERPILLE_CSS}</style>
      <figure className="quote-box">
        <span className="quote-mark">&ldquo;</span>
        <blockquote className="quote-text">
          Du suchst eine L&ouml;sung, aber keine Wunderpille. Die habe ich auch nicht. Was ich f&uuml;r dich habe: <em>Struktur. Systemlogik.</em> Und einen Weg, der dich und deine Beschwerden ernst nimmt.
        </blockquote>
      </figure>
    </div>
  );
}

const faqData = [
  { q: "Warum wurde bei mir bisher nichts gefunden?", a: "Weil oft nur nach Standardursachen gesucht wird und nicht nach funktionellen Zusammenh\u00E4ngen." },
  { q: "Machst du viele Tests?", a: "Ja. Ich arbeite mit Diagnostik, aber sehr gezielt. Mir geht es nicht darum, endlos viele Tests zu machen, sondern nur genau das, was wirklich f\u00FCr dich sinnvoll ist. So vermeiden wir unn\u00F6tige Kosten und bekommen trotzdem die Informationen, die wir brauchen." },
  { q: "Bekomme ich einfach Supplemente?", a: "Supplemente bekommst du bei deinem Coach oder AI-Coach. Bei mir werden sie gezielt im Rahmen der orthomolekularen Medizin eingesetzt, also medizinisch und individuell auf dich abgestimmt. Das kann auch h\u00F6here Dosierungen beinhalten, um einen therapeutischen Effekt zu erreichen. Supplements sind bei mir Teil einer Therapie und weitaus mehr als nur klassische Nahrungserg\u00E4nzung." },
  { q: "Kannst du mir garantieren, dass sich meine Beschwerden verbessern werden?", a: "Nein. Aber wir gehen strukturiert vor und geben nicht vorschnell auf. Mir ist wichtig, dich aktiv im Prozess zu begleiten und dich auch mental zu st\u00E4rken. Denn echte Ver\u00E4nderung braucht oft beides: einen klaren Plan und die Motivation, ihn umzusetzen." },
  { q: "Wie schnell merke ich eine Ver\u00E4nderung?", a: "Das ist sehr individuell. Erfahrungsgem\u00E4\u00DF sp\u00FCren viele Patient:innen bereits nach 2-4 Wochen erste Ver\u00E4nderungen. Wenn der gew\u00FCnschte Effekt ausbleibt, passen wir die Therapie gezielt an und justieren nach." },
  { q: 'Was ist, wenn alles "psychosomatisch" genannt wird?', a: 'Wir betrachten das differenziert. Psyche und K\u00F6rper sind miteinander verbunden, das stimmt. Aber "psychisch" ist nicht automatisch die Erkl\u00E4rung f\u00FCr unauff\u00E4llige Standardwerte. Deshalb untersuchen wir immer beides. Und wir beziehen auch beides in die Behandlung ein. Du wirst bei mir nicht einfach weitergeschickt. Stattdessen schauen wir gemeinsam, welche Faktoren bei dir wirklich eine Rolle spielen und wie sie zusammenwirken.' },
];

function KoerperlicheSymptome() {
  const [openFaq, setOpenFaq] = useState(null);
  const perspectiveAnim = useScrollFadeIn();
  const approachAnim = useScrollFadeIn();
  const diagnostikAnim = useScrollFadeIn();
  const processAnim = useScrollFadeIn();
  const fitAnim = useScrollFadeIn();
  const faqAnim = useScrollFadeIn();
  const ctaAnim = useScrollFadeIn();

  return (
    <div className="bg-white min-h-screen">
      <Seo
        path="/koerperliche-symptome"
        title="Körperliche Symptome verstehen – Ursachenmedizin Berlin"
        description="Wenn Standardmedizin keine Antworten findet: ursachenorientierte Diagnostik in Berlin für unspezifische und chronische körperliche Symptome."
      />

      {/* Hero Image Banner */}
      <HeroBanner
        image="/Assets/KoerperlicheBeschwerden.png"
        badge={"K\u00F6rperliche Symptome"}
        title={<>Du hast Beschwerden - aber keine klare <em className="italic">Ursache?</em></>}
        subtitle={"Unauff\u00E4llige Befunde bedeuten nicht, dass alles in Ordnung ist. Oft fehlt nur das Verst\u00E4ndnis f\u00FCr die Zusammenh\u00E4nge im System."}
        ctaText="Termin vereinbaren"
        ctaHref="https://www.doctolib.de/arzt/berlin/shukri-jarmoukli/booking/new-patient?specialityId=1286&speciality_ids%5B%5D=1286&source=profile"
        trustItems={["Systematisches Denken", "Diagnostik nach Bedarf", "Umsetzbare individuelle Therapie"]}
      />

      {/* Vielleicht kennst du das */}
      <ScrolledLines lines={recognizeItems} title="Vielleicht kennst du das:" />
      <ZitatWunderpille />

      {/* Perspektivwechsel */}
      <section ref={perspectiveAnim.ref} style={perspectiveAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-8 sm:p-12"
            style={{ background: "linear-gradient(135deg, rgba(67,169,171,0.06) 0%, rgba(67,169,171,0.02) 100%)" }}
          >
            <div className="text-[10px] font-light tracking-[3px] uppercase text-[#43a9ab]/60 mb-4">
              Perspektivwechsel
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#43A9AB] mb-6">Was oft &uuml;bersehen wird</h3>
            <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed mb-4">
              {'"'}Unauff&auml;llige Befunde{'"'} bedeuten nicht unbedingt, dass nichts da ist.
            </p>
            <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed mb-4">
              Oft wird nur nach Dingen gesucht, die nur im Standard sichtbar sind.
            </p>
            <p className="text-[#515757] text-base sm:text-lg leading-relaxed font-medium">
              Manchmal fehlt einfach ein entscheidendes Puzzlest&uuml;ck.
            </p>
          </div>
        </div>
      </section>

      {/* So arbeite ich anders */}
      <section ref={approachAnim.ref} style={approachAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-6 tracking-tight">
            So arbeite ich anders
          </h2>
          <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed mb-4">
            Ich betrachte dich als Ganzes - nicht als einzelne Diagnose. Durch die Brille der klinischen Psychoneuroimmunologie, anthroposophischen Medizin, funktionellen Medizin, Genetik und Toxikologie.
          </p>
          <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed">
            Und ich bleibe dran. Denn ich bin der Arzt, der nicht abhaut, wenn etwas noch unklar ist. Ich gehe mit dir weiter, bis wir immer mehr Erkenntnisse gewinnen.
          </p>
        </div>
      </section>

      {/* Themen-Cluster */}
      <SchwerpunkteGrid
        title=""
        therapies={[
          { title: "Erschöpfung", desc: "Brain Fog, Akku ständig leer", image: "/Assets/Bilder%206%20Kacheln/Ersch%C3%B6pfung.png" },
          { title: "Darm", desc: "Blähbauch, Unverträglichkeiten", image: "/Assets/Bilder%206%20Kacheln/Darm.png" },
          { title: "Schmerzen", desc: "Entzündung, diffuse Beschwerden", image: "/Assets/Bilder%206%20Kacheln/Schmerzen.png" },
          { title: "Schlafstörungen", desc: "Morgens nicht erholt", image: "/Assets/Bilder%206%20Kacheln/Schlafprobleme.png" },
          { title: "Kopfschmerz", desc: "Haut, Histamin-Muster", image: "/Assets/Bilder%206%20Kacheln/Kopfschmerz.png" },
          { title: "Infektanfälligkeit", desc: "Immunassoziierte Muster", image: "/Assets/Bilder%206%20Kacheln/Infektanf%C3%A4lligkeit.png" },
        ]}
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-10 pb-16 sm:pb-20">
        <a
          href="https://www.doctolib.de/arzt/berlin/shukri-jarmoukli/booking/new-patient?specialityId=1286&speciality_ids%5B%5D=1286&source=profile"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-[#43a9ab] text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#389193] transition-colors duration-200 no-underline shadow-sm"
        >
          Hier zur Verbesserung der Beschwerden
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      {/* Diagnostik */}
      <section ref={diagnostikAnim.ref} style={diagnostikAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-[10px] font-light tracking-[3px] uppercase text-[#43a9ab]/60 mb-4">
            Diagnostik nach Bedarf
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-6 tracking-tight">
            Passend zu deiner Geschichte, nicht {'"'}viel hilft viel{'"'}
          </h2>
          <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed mb-6">
            Du willst verstanden und geh&ouml;rt werden, nicht einfach mehr Tests. Deshalb gilt bei mir: Zusammenh&auml;nge verstehen steht im Mittelpunkt. Ich arbeite mit einem der gr&ouml;&szlig;ten Labore Deutschlands und nutze gezielte Blutanalysen, um genau die Informationen zu gewinnen, die wirklich f&uuml;r dich relevant sind. Nicht im Sinne von {'"'}viel hilft viel{'"'}, sondern als Grundlage f&uuml;r klare, fundierte Entscheidungen.
          </p>

          <div className="rounded-2xl border border-[#43a9ab]/15 p-6 sm:p-8 mt-8" style={{ background: "rgba(67,169,171,0.03)" }}>
            <div className="text-[10px] font-light tracking-[3px] uppercase text-[#43a9ab]/60 mb-3">Beispiel</div>
            <p className="text-[#515757]/70 text-base leading-relaxed mb-3">
              Ein Mangel ist selten die eigentliche Ursache.
            </p>
            <p className="text-[#515757]/70 text-base leading-relaxed">
              Wenn dir z.B. Omega-3 fehlt, frage ich nicht nur <em>was</em> fehlt, sondern <em>warum</em> es fehlt. Und was das genau f&uuml;r dich bedeutet. Entz&uuml;ndung, Stress, Regeneration, Darm, Stoffwechsel? So wird Supplementierung logisch.
            </p>
          </div>
        </div>
      </section>

      {/* Therapiehebel */}
      {/* <WunderpillePlan /> */}

      {/* Alles was du brauchst in einem Termin */}
      <section ref={processAnim.ref} style={processAnim.style} className="pt-16 sm:pt-24 pb-20 sm:pb-28 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #d4ece1 0%, #e0f4f5 30%, #d9f0e4 60%, #c8e6d8 100%)" }}>
            <div className="px-8 sm:px-14 py-12 sm:py-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-10 text-center">
                Alles was du brauchst in einem Termin!
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {includesItems.map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-white/80 text-[#43a9ab] flex items-center justify-center mx-auto mb-4 shadow-sm">
                      {includesIcons[item.icon]}
                    </div>
                    <h3 className="text-base font-bold text-[#515757] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#515757]/60 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* F&uuml;r wen */}
      <section ref={fitAnim.ref} style={fitAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-8 tracking-tight">F&uuml;r wen das passt:</h2>
          <div className="space-y-4">
            {[
              "Du willst verstehen, was wirklich los ist",
              "Du bist bereit, Dinge umzusetzen und in deinen Alltag zu integrieren",
              "Du suchst eine L\u00F6sung - keine blo\u00DFe Illusion",
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
            Lass uns zusammen das fehlende Puzzlest&uuml;ck suchen.
          </h2>
          <p className="text-[#515757]/60 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Und daraus einen Plan erstellen, der wirklich f&uuml;r dich und dein Leben funktioniert.
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

export default KoerperlicheSymptome;
