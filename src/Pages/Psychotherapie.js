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
  const recognizeAnim = useScrollFadeIn();
  const missingAnim = useScrollFadeIn();
  const approachAnim = useScrollFadeIn();
  const methodsAnim = useScrollFadeIn();
  const ketaminAnim = useScrollFadeIn();
  const processAnim = useScrollFadeIn();
  const fitAnim = useScrollFadeIn();
  const faqAnim = useScrollFadeIn();
  const ctaAnim = useScrollFadeIn();

  return (
    <div className="bg-white min-h-screen">

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
            href="/extras"
            className="inline-flex items-center bg-[#43a9ab] text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#389193] transition-colors duration-200 no-underline shadow-lg shadow-[#43a9ab]/25"
          >
            Mehr &uuml;ber Ketamin erfahren
          </a>
        </div>
      </HeroBanner>

      {/* Ketamin Experience */}
      <section ref={ketaminAnim.ref} style={ketaminAnim.style} id="ketamin" className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-8 sm:p-12"
            style={{ background: "linear-gradient(135deg, rgba(67,169,171,0.06) 0%, rgba(67,169,171,0.02) 100%)" }}
          >
            <div className="text-[10px] font-light tracking-[3px] uppercase text-[#43a9ab]/60 mb-4">
              Erfahrung mit ketamin-gest&uuml;tzter Therapie
            </div>
            <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed mb-4">
              Ich habe bereits mehrere hundert Ketamin-Infusionen durchgef&uuml;hrt und begleite diese Form der Behandlung mit entsprechender Erfahrung und Sorgfalt.
            </p>
            <p className="text-[#515757] text-base sm:text-lg leading-relaxed font-medium">
              Vor jeder Anwendung erfolgt eine sorgf&auml;ltige Sicherheits- und Indikationskl&auml;rung.
            </p>
          </div>
        </div>
      </section>

      {/* Vielleicht erkennst du dich hier wieder */}
      <section ref={recognizeAnim.ref} style={recognizeAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-10 tracking-tight">
            Vielleicht erkennst du dich hier wieder:
          </h2>

          <div className="mb-12">
            <p className="text-[#515757]/50 text-xs tracking-[2px] uppercase mb-5">Noch keine Therapie gemacht</p>
            <div className="space-y-4">
              {noTherapyYet.map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="mt-2 w-2 h-2 rounded-full bg-[#43a9ab]/30 group-hover:bg-[#43a9ab] transition-colors flex-shrink-0" />
                  <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <p className="text-[#515757]/50 text-xs tracking-[2px] uppercase mb-5">Schon eine Therapie gemacht</p>
            <div className="space-y-4">
              {hadTherapy.map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="mt-2 w-2 h-2 rounded-full bg-[#43a9ab]/30 group-hover:bg-[#43a9ab] transition-colors flex-shrink-0" />
                  <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative pl-6 border-l-2 border-[#43a9ab]/20">
            <p className="text-[#515757] text-lg sm:text-xl font-medium leading-relaxed">
              In beiden F&auml;llen f&uuml;hlst du noch nicht ganz, dass du bei dir angekommen bist.
            </p>
          </div>
        </div>
      </section>

      {/* Was oft fehlt */}
      <section ref={missingAnim.ref} style={missingAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-6 tracking-tight">
            Was oft fehlt
          </h2>
          <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed mb-4">
            Viele Ans&auml;tze besch&auml;ftigen sich nur mit einer Bewusstseinsebene. Zum Beispiel beim Denken (Gespr&auml;chstherapie) oder beim Verhalten (Verhaltenstherapie). Andere arbeiten st&auml;rker mit dem K&ouml;rper oder mit Gef&uuml;hlen.
          </p>
          <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed mb-4">
            Jede dieser Methoden kann wirksam sein und wertvolle Ergebnisse liefern. F&uuml;r viele Menschen reicht es jedoch nicht aus, sich nur auf eine Ebene zu beschr&auml;nken.
          </p>
          <p className="text-[#515757] text-base sm:text-lg leading-relaxed font-medium mb-6">
            Meine Erfahrung zeigt deutlich: Ver&auml;nderung gelingt oft schneller, wenn alle Formen miteinander in Einklang gebracht werden. Denken, F&uuml;hlen, K&ouml;rper und Handeln wirken zusammen.
          </p>
          <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed mb-4">
            So entsteht Ver&auml;nderung nicht durch Druck oder strikte Disziplin, sondern aus deinem inneren Verst&auml;ndnis heraus. Du sp&uuml;rst, verstehst und erlebst, warum sich etwas ver&auml;ndern darf. Dein Verhalten folgt dann fast von selbst.
          </p>
          <p className="text-[#43a9ab] text-base sm:text-lg leading-relaxed font-medium">
            Du ver&auml;nderst dich also nicht, weil du dich zwingst, sondern weil du innerlich an einem anderen Punkt angekommen bist.
          </p>
        </div>
      </section>

      {/* So arbeite ich */}
      <section ref={approachAnim.ref} style={approachAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-10 tracking-tight">
            So arbeite ich
          </h2>
          <div className="space-y-6 mb-12">
            {[
              { title: "\u00DCber den Kopf hinaus", desc: "Empfindung und Gef\u00FChl kommen wieder ins Zentrum" },
              { title: "Verstehen mit Erleben verbinden", desc: "Ver\u00E4nderung wird nicht nur gedacht, sondern gesp\u00FCrt" },
              { title: "Integration in den Alltag", desc: "Damit es nicht Theorie bleibt" },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 items-start group">
                <div className="w-10 h-10 rounded-full border-2 border-[#43a9ab]/25 flex items-center justify-center flex-shrink-0 group-hover:bg-[#43a9ab]/10 group-hover:border-[#43a9ab]/50 transition-all">
                  <span className="text-[#43a9ab] text-sm font-bold">{i + 1}</span>
                </div>
                <div>
                  <h4 className="text-[#515757] text-lg font-semibold mb-1">{item.title}</h4>
                  <p className="text-[#515757]/60 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methoden */}
      <section ref={methodsAnim.ref} style={methodsAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-8 tracking-tight">Methoden</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { title: "Biodynamische Psychotherapie", icon: "M12 2a5 5 0 00-4.9 4A4 4 0 004 10a4 4 0 001 7.9A5 5 0 0012 22a5 5 0 006.9-4.1A4 4 0 0020 10a4 4 0 00-3.1-3.9A5 5 0 0012 2z" },
              { title: "Verhaltenstherapeutische Tools", icon: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" },
              { title: "Ketamin-gest\u00FCtzte Arbeit", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
            ].map((method, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#43a9ab]/15 p-6 sm:p-8 hover:border-[#43a9ab]/40 hover:shadow-lg transition-all duration-300"
                style={{ background: "rgba(67,169,171,0.03)" }}
              >
                <div className="w-12 h-12 rounded-full bg-[#43a9ab]/10 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-[#43a9ab]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={method.icon} />
                  </svg>
                </div>
                <h4 className="text-[#515757] text-base font-semibold leading-snug">{method.title}</h4>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#43a9ab]/15 p-6 sm:p-8" style={{ background: "rgba(67,169,171,0.03)" }}>
            <div className="text-[10px] font-light tracking-[3px] uppercase text-[#43a9ab]/60 mb-3">
              Was hier wichtig ist
            </div>
            <p className="text-[#515757]/70 text-base leading-relaxed mb-4">
              Alle Entscheidungen basieren auf einer medizinischen Indikations- und Sicherheitspr&uuml;fung. Es geht nicht um Esoterik oder Trends, sondern um eine fundierte Herangehensweise.
            </p>
            <div className="flex flex-wrap gap-4">
              {["Klare Zieldefinition", "Abkl\u00E4rung von Sicherheit & Indikation", "Gemeinsame Entscheidung \u00FCber den Weg"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#43a9ab]" />
                  <span className="text-[#515757]/60 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prozess */}
      <section ref={processAnim.ref} style={processAnim.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] mb-12 tracking-tight">So starten wir</h2>
          <div className="space-y-8">
            {[
              { num: "01", title: "Orientierungsgespr\u00E4ch (15 Minuten)", desc: "Ein erstes Kennenlernen, um zu kl\u00E4ren, ob und wie ich dich unterst\u00FCtzen kann." },
              { num: "02", title: "Anamnese", desc: "Wir erfassen deine Ausgangssituation, deine Ziele und deinen bisherigen Verlauf." },
              { num: "03", title: "Entscheidung", desc: "Gemeinsam definieren wir, welche Ans\u00E4tze und Therapien f\u00FCr dich sinnvoll sind." },
              { num: "04", title: "Umsetzung", desc: "Die Therapie erfolgt strukturiert und begleitet - mit regelm\u00E4\u00DFigen Sitzungen und Anpassungen." },
            ].map((step) => (
              <div key={step.num} className="flex gap-6 items-start">
                <div className="text-4xl font-black text-[#43a9ab]/15 flex-shrink-0 w-14">{step.num}</div>
                <div>
                  <h4 className="text-[#515757] text-lg font-semibold mb-1">{step.title}</h4>
                  <p className="text-[#515757]/60 text-sm sm:text-base leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://www.doctolib.de/arzt/berlin/shukri-jarmoukli/booking/new-patient?specialityId=1286&speciality_ids%5B%5D=1286&source=profile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#43a9ab] text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#389193] transition-colors duration-200 no-underline shadow-sm"
            >
              Kostenloses Orientierungsgespr&auml;ch (15 Min)
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
