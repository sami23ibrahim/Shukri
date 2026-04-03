import { useState, useRef, useEffect, useCallback } from "react";
import Shukr from "../Assets/Shukr.jpg";

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
  'Deine Werte sind "ok" - aber du f\u00FChlst dich nicht ok',
  "Du warst bei mehreren Spezialisten, aber niemand kann dir helfen",
  "Es wurde viel getestet, aber es gibt keinen klaren Plan",
  "Du hast vieles ausprobiert mit kurzfristigem Effekt, aber ohne Stabilit\u00E4t",
  "Symptome ver\u00E4ndern sich, aber verschwinden nicht vollst\u00E4ndig",
  "Die Ursache bleibt unklar oder wird vorschnell erkl\u00E4rt",
];

const topicClusters = [
  { title: "Ersch\u00F6pfung, Brain Fog, Akku st\u00E4ndig leer", desc: "Wenn Energie fehlt, obwohl Blutwerte ok sind" },
  { title: "Darm, Bl\u00E4hbauch, Unvertr\u00E4glichkeiten", desc: "Darm-Systemlogik: Reizung, Barriere, Mikrobiom, Trigger" },
  { title: "Schmerzen, Entz\u00FCndung, diffuse Beschwerden", desc: "Entz\u00FCndungslogik statt Symptom-Jagen" },
];

const moreTopics = [
  "Schlafst\u00F6rungen, morgens nicht erholt",
  "Kopfschmerz, Haut, Histamin-Muster",
  "Infektanf\u00E4lligkeit, immunassoziierte Muster",
];

const therapyLevers = [
  "Lebensstil als Grundlage",
  "Pflanzliche Therapien gezielt eingesetzt",
  "Hochdosis-N\u00E4hrstofftherapien - wenn passend, nicht als Trend",
  "Entgiftungsstrategien pr\u00E4zise angewendet",
  "Mentoring f\u00FCr echte Umsetzung im Alltag",
];

const processSteps = [
  { num: "01", title: "Erstgespr\u00E4ch", desc: "Struktur, Verlauf und Priorit\u00E4ten verstehen" },
  { num: "02", title: "Entscheidung", desc: "Welche Diagnostik ist wirklich sinnvoll f\u00FCr dich?" },
  { num: "03", title: "Dein individueller Plan", desc: "Klare Schritte und begleitete Handlungsumsetzung" },
];

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
  const [showMore, setShowMore] = useState(false);
  const recognizeAnim = useScrollFadeIn();
  const perspectiveAnim = useScrollFadeIn();
  const approachAnim = useScrollFadeIn();
  const clustersAnim = useScrollFadeIn();
  const diagnostikAnim = useScrollFadeIn();
  const therapyAnim = useScrollFadeIn();
  const processAnim = useScrollFadeIn();
  const fitAnim = useScrollFadeIn();
  const faqAnim = useScrollFadeIn();
  const ctaAnim = useScrollFadeIn();

  return (
    <div className="bg-white min-h-screen">

      {/* Hero Image Banner */}
      <HeroBanner
        image={Shukr}
        badge={"K\u00F6rperliche Symptome"}
        title={<>Du hast Beschwerden - aber keine klare <em className="italic">Ursache?</em></>}
        subtitle={"Unauff\u00E4llige Befunde bedeuten nicht, dass alles in Ordnung ist. Oft fehlt nur das Verst\u00E4ndnis f\u00FCr die Zusammenh\u00E4nge im System."}
        ctaText="Termin vereinbaren"
        ctaHref="https://www.doctolib.de"
        trustItems={["Systematisches Denken", "Diagnostik nach Bedarf", "Umsetzbare individuelle Therapie"]}
      />

      {/* Vielleicht kennst du das */}
      <section ref={recognizeAnim.ref} style={recognizeAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-10 tracking-tight">
            Vielleicht kennst du das:
          </h2>
          <div className="space-y-4 mb-12">
            {recognizeItems.map((item, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="mt-2 w-2 h-2 rounded-full bg-[#43a9ab]/30 group-hover:bg-[#43a9ab] transition-colors flex-shrink-0" />
                <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <div className="relative pl-6 border-l-2 border-[#43a9ab]/20">
            <p className="text-[#515757] text-lg sm:text-xl font-medium leading-relaxed mb-2">
              Du suchst eine L&ouml;sung, aber keine Wunderpille.
            </p>
            <p className="text-[#515757]/60 text-base sm:text-lg leading-relaxed mb-4">
              Die habe ich auch nicht!
            </p>
            <p className="text-[#515757]/70 text-base leading-relaxed">
              Was ich f&uuml;r dich habe: <strong className="text-[#43a9ab]">Struktur. Systemlogik.</strong> Und einen Weg, der dich und deine Beschwerden ernst nimmt.
            </p>
          </div>
        </div>
      </section>

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
      <section ref={clustersAnim.ref} style={clustersAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {topicClusters.map((topic, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-[#43a9ab]/15 p-6 sm:p-8 hover:border-[#43a9ab]/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{ background: "rgba(67,169,171,0.03)" }}
              >
                <div className="w-10 h-10 rounded-full bg-[#43a9ab]/10 flex items-center justify-center mb-5 group-hover:bg-[#43a9ab]/20 transition-colors">
                  <span className="text-[#43a9ab] text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h4 className="text-[#515757] text-base font-semibold mb-3 leading-snug">{topic.title}</h4>
                <p className="text-[#515757]/50 text-sm leading-relaxed">{topic.desc}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowMore(!showMore)}
            className="text-[#43a9ab] text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all mb-6 focus:outline-none"
          >
            {showMore ? "Weniger anzeigen" : "Mehr anzeigen"}
            <ChevronDown isOpen={showMore} />
          </button>
          <div className={`overflow-hidden transition-all duration-500 ${showMore ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="space-y-3 pb-4">
              {moreTopics.map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#43a9ab]/40" />
                  <span className="text-[#515757]/60 text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <a
            href="https://www.doctolib.de"
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
      </section>

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
      <section ref={therapyAnim.ref} style={therapyAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-3 tracking-tight">
            Ohne Wunderpille, aber mit konkretem Plan
          </h2>
          <p className="text-[#515757]/60 text-base sm:text-lg leading-relaxed mb-10">
            Es gibt selten die eine L&ouml;sung. Aber es gibt Hebel, die viel ver&auml;ndern k&ouml;nnen, wenn sie richtig priorisiert sind:
          </p>
          <div className="space-y-4 mb-10">
            {therapyLevers.map((lever, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full border border-[#43a9ab]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#43a9ab]/10 transition-colors">
                  <span className="text-[#43a9ab] text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-[#515757]/70 text-base sm:text-lg">{lever}</p>
              </div>
            ))}
          </div>
          <p className="text-[#515757]/70 text-base leading-relaxed">
            Als einzigartiges Konzept verbindet mein Ansatz verschiedene Formen der Medizin zu einem ganzheitlichen System. Statt isolierter Einzelma&szlig;nahmen entsteht eine Kombination aus unterschiedlichen Therapieformen, um nicht nur Symptome zu behandeln, sondern echte Ver&auml;nderung zu erm&ouml;glichen. Entscheidend ist dabei das Zusammenspiel aus aktiver Eigenverantwortung und pr&auml;ziser Unterst&uuml;tzung meinerseits. Denn nachhaltige Gesundheit entsteht nicht durch einzelne Ma&szlig;nahmen, sondern durch ihr bewusstes Zusammenwirken.
          </p>
        </div>
      </section>

      {/* Prozess */}
      <section ref={processAnim.ref} style={processAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-12 tracking-tight">So starten wir</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {processSteps.map((step) => (
              <div key={step.num} className="relative">
                <div className="text-5xl font-black text-[#43a9ab]/10 mb-3">{step.num}</div>
                <h4 className="text-[#515757] text-lg font-semibold mb-2">{step.title}</h4>
                <p className="text-[#515757]/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <a
              href="https://www.doctolib.de"
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
            Lass uns zusammen das fehlende Puzzlest&uuml;ck finden.
          </h2>
          <p className="text-[#515757]/60 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Und daraus einen Plan erstellen, der wirklich f&uuml;r dich und dein Leben funktioniert.
          </p>
          <a
            href="https://www.doctolib.de"
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
