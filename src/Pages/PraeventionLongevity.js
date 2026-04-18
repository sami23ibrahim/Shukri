import { useState, useRef, useEffect, useCallback } from "react";

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
  { letter: "A", title: "Genetik", desc: "Wie du geboren bist: Deine genetische Grundlage wird getestet und \u00E4rztlich eingeordnet." },
  { letter: "B", title: "Ist-Zustand", desc: "Wir erfassen deinen aktuellen Zustand umfassend, \u00FCber erweiterte Blutanalysen, Bio-Impedanz und fortgeschrittene Herzuntersuchungen." },
  { letter: "C", title: "Umsetzung", desc: "Gezielter Einsatz von Biohacking-Tools und Methoden, ganz individuell auf dich abgestimmt." },
  { letter: "D", title: "Reaktion des K\u00F6rpers", desc: "Wir messen wie dein K\u00F6rper auf Ver\u00E4nderungen reagiert, z.B. \u00FCber Biofeedback wie HRV oder CGM." },
  { letter: "E", title: "Therapeutische Unterst\u00FCtzung", desc: "Bei Bedarf erg\u00E4nzen wir mit Infusionen und modernen Longevity-Substanzen wie NAD+ oder Spermidin." },
];

const levers = [
  "Schlaf & Rhythmus",
  "Ern\u00E4hrung mit Feedback",
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

function PraeventionLongevity() {
  const [openFaq, setOpenFaq] = useState(null);
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

      {/* So arbeiten wir - Process */}
      <section ref={processAnim.ref} style={processAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-6 tracking-tight">
            So arbeiten wir
          </h2>
          <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed mb-10">
            Ich arbeite mit umfassender Genom- bzw. genetischer Testung, um deine Individualit&auml;t zu verstehen. Nicht oberfl&auml;chlich, sondern fundiert und medizinisch eingeordnet. Im Gegensatz zu vielen Coaching-Ans&auml;tzen basiert meine Arbeit nicht nur auf Theorie. Ich habe vieles selbst durchlaufen und bringe diese Erfahrung bewusst mit ein.
          </p>

          <div className="space-y-6">
            {processSteps.map((step) => (
              <div key={step.letter} className="flex gap-5 items-start group">
                <div className="w-12 h-12 rounded-full border-2 border-[#43a9ab]/25 flex items-center justify-center flex-shrink-0 group-hover:bg-[#43a9ab]/10 group-hover:border-[#43a9ab]/50 transition-all">
                  <span className="text-[#43a9ab] text-lg font-bold">{step.letter}</span>
                </div>
                <div>
                  <h4 className="text-[#515757] text-lg font-semibold mb-1">{step.title}</h4>
                  <p className="text-[#515757]/60 text-sm sm:text-base leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Systemlogik */}
      <section ref={systemAnim.ref} style={systemAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-8 sm:p-12"
            style={{ background: "linear-gradient(135deg, rgba(67,169,171,0.06) 0%, rgba(67,169,171,0.02) 100%)" }}
          >
            <div className="text-[10px] font-light tracking-[3px] uppercase text-[#43a9ab]/60 mb-4">
              All das mit Systemlogik dahinter
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {["Stoffwechsel stabilisieren", "Nervensystem regulieren", "Immunsystem entlasten"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#43a9ab]" />
                  <span className="text-[#515757] text-base font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[#515757]/60 text-sm sm:text-base leading-relaxed mt-8">
              Wichtig ist dabei zu verstehen: Nicht jeder kann so arbeiten. Es geht nicht nur um Wissen, sondern um die F&auml;higkeit, Zusammenh&auml;nge zu erkennen und im System zu denken. Daf&uuml;r braucht es weitaus mehr als einzelne Informationen - n&auml;mlich eine fundierte Ausbildung, Erfahrung und die konsequente Umsetzung in der Praxis.
            </p>
          </div>
        </div>
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
              { trigger: "Dauerstress", tool: "HRV als Orientierung" },
              { trigger: "Energie-Crash", tool: "CGM als Feedback" },
              { trigger: 'Stillstand trotz "alles richtig"', tool: "Gezielte Labordiagnostik" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-[#43a9ab]/15 p-6" style={{ background: "rgba(67,169,171,0.03)" }}>
                <p className="text-[#515757] text-sm font-semibold mb-2">{item.trigger}</p>
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3 text-[#43a9ab] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <span className="text-[#43a9ab] text-sm">{item.tool}</span>
                </div>
              </div>
            ))}
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
      <section ref={leversAnim.ref} style={leversAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-3 tracking-tight">Die Hebel</h2>
          <p className="text-[#515757]/60 text-base sm:text-lg leading-relaxed mb-10">
            Die einzelnen Methoden sind kein Geheimnis. Entscheidend ist das Gesamtkonzept dahinter - also wie alle Schritte sinnvoll miteinander verbunden werden.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {levers.map((lever, i) => (
              <div key={i} className="flex items-center gap-4 group rounded-xl border border-[#43a9ab]/10 p-4 hover:border-[#43a9ab]/30 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#43a9ab]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#43a9ab]/20 transition-colors">
                  <span className="text-[#43a9ab] text-xs font-bold">{i + 1}</span>
                </div>
                <span className="text-[#515757]/70 text-sm sm:text-base">{lever}</span>
              </div>
            ))}
          </div>
        </div>
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
