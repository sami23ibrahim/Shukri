import { useRef, useState, useEffect } from "react";
import Shukr from "../Assets/Shukr.jpg";

function useScrollFadeIn(delay = 0) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return {
    ref,
    style: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.9s ease-out ${delay}s, transform 0.9s ease-out ${delay}s`,
    },
  };
}

function UeberMich() {
  const heroText = useScrollFadeIn(0.1);
  const section1 = useScrollFadeIn(0);
  const pullQuote1 = useScrollFadeIn(0);
  const section2 = useScrollFadeIn(0);
  const section3 = useScrollFadeIn(0);
  const pullQuote2 = useScrollFadeIn(0);
  const section4 = useScrollFadeIn(0);
  const section5 = useScrollFadeIn(0);
  const closing = useScrollFadeIn(0);

  return (
    <div className="bg-white min-h-screen">

      {/* Hero — Text + Portrait side by side */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-24 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 lg:items-center">
            <div className="lg:w-[55%]">
              <span className="inline-block text-xs font-semibold text-white bg-[#43A9AB] px-3 py-1 rounded-full mb-6 tracking-wide">
                Über mich
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#43A9AB] tracking-tight leading-[1.08] mb-8">
                Shukri Jarmoukli
              </h1>
              <div ref={heroText.ref} style={heroText.style}>
                <p className="text-xl sm:text-2xl font-medium text-[#515757] leading-relaxed">
                  Ich bin Arzt. Aber ich arbeite nicht so, wie Du es vielleicht gewohnt bist.
                </p>
              </div>
            </div>
            <div className="lg:w-[40%]">
              <div className="rounded-2xl overflow-hidden">
                <img src="/Assets/%C3%9Cber%20mich.png" alt="Dr. Shukri" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="h-px bg-[#515757]/10" />
      </div>

      {/* Section 1 — Philosophy */}
      <section ref={section1.ref} style={section1.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-base sm:text-lg text-[#515757]/80 leading-relaxed">
            Ich sehe den Menschen nicht als Summe einzelner Symptome, sondern als ein lebendiges System, in dem alles miteinander verbunden ist: Körper, Gedanken, Biochemie, Lebensstil. Mich interessiert nicht nur, was nicht funktioniert, sondern warum es aus dem Gleichgewicht geraten ist. Denn genau dort kann eine nachhaltige Veränderung beginnen. Indem man an den Ursachen arbeitet, nicht nur an einzelnen Symptomen.
          </p>
        </div>
      </section>

      {/* Pull Quote */}
      <section ref={pullQuote1.ref} style={pullQuote1.style} className="px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="border-l-4 border-[#43a9ab] pl-6 sm:pl-8 py-4">
            <p className="text-xl sm:text-2xl font-medium text-[#515757] leading-relaxed italic">
              Was mich antreibt, ist nicht nur Wissen — sondern meine eigene Erfahrung.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — Personal Story */}
      <section ref={section2.ref} style={section2.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-base sm:text-lg text-[#515757]/80 leading-relaxed">
            Getrieben von meiner eigenen Leidensgeschichte und der meiner liebsten Personen, habe ich zahlreiche Methoden ausprobiert. Vieles hat funktioniert, vieles aber eben auch nicht. Das was funktionierte, war nicht Teil meines Humanmedizin-Studiums. Ich konnte nicht verstehen, wieso dies nie thematisiert wurde. Aus diesem Grund habe ich viele Weiterbildungen gemacht, viel recherchiert und viel wertvolles Wissen gefunden, das im klassischen Studium nicht vorkommt, aber dennoch mein Leben und das Leben vieler anderer Menschen verändert hat.
          </p>
        </div>
      </section>

      {/* Section 3 — Transformation */}
      <section ref={section3.ref} style={section3.style} className="pb-16 sm:pb-24 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] tracking-tight mb-2">
            Der größte Wendepunkt für mich war die Kälte.
          </h2>
        </div>
      </section>

      {/* Pull Quote 2 — Cold */}
      <section ref={pullQuote2.ref} style={pullQuote2.style} className="px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl px-8 sm:px-12 py-10 sm:py-14" style={{ backgroundColor: "#43A9AB" }}>
            <p className="text-lg sm:text-xl text-white leading-relaxed">
              <strong>Eisbaden</strong> hat nicht nur meinen Körper verändert, sondern auch meinen Kopf. Meine Resilienz. Meine Fähigkeit, mit Stress umzugehen. Ich habe mich von meinen depressiven Beschwerden befreit.
            </p>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed mt-4">
              Gleichzeitig wurde mir bewusst, wie wenig auch dies Teil der klassischen medizinischen Ausbildung ist, obwohl es dazu über 1.300 Studien gibt und dennoch null Lehrinhalt.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — Integrative Approach */}
      <section ref={section4.ref} style={section4.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-base sm:text-lg text-[#515757]/80 leading-relaxed">
            Meine Auseinandersetzung mit alternativen Ansätzen begann also nicht aus einer esoterischen Motivation heraus, sondern aus dem Wunsch, wissenschaftliche Erkenntnisse in eine tatsächlich umsetzbare Praxis zu übersetzen. Oft wird angenommen, dass alles außerhalb der klassischen Schulmedizin per se unwissenschaftlich sei. Diese Sicht greift jedoch zu kurz. Viele Ansätze sind wissenschaftlich fundiert, finden jedoch bislang keinen festen Platz in etablierten Therapiekonzepten.
          </p>
          <p className="text-base sm:text-lg text-[#515757]/80 leading-relaxed">
            Durch meine kontinuierliche Weiterbildung sowie die praktische Arbeit mit Patient:innen in unterschiedlichen medizinischen Disziplinen, darunter Lebensstilmedizin, funktionelle und anthroposophische Medizin, orthomolekulare Medizin, Genetik und Epigenetik, Toxikologie und Umweltmedizin sowie psychotherapeutische und biodynamische Verfahren, einschließlich ketaminassistierter Therapie, habe ich ein integratives Behandlungssystem entwickelt.
          </p>
          <p className="text-base sm:text-lg text-[#515757]/80 leading-relaxed">
            Dieses System verbindet die jeweiligen Stärken der einzelnen Ansätze zu einem klar strukturierten Gesamtkonzept. Ziel ist es nicht, Methoden isoliert nebeneinander anzuwenden, sondern sie so aufeinander abzustimmen, dass sinnvolle Synergien entstehen und sich die einzelnen Maßnahmen gegenseitig verstärken, anstatt sich zu widersprechen.
          </p>
          <p className="text-base sm:text-lg text-[#515757]/80 leading-relaxed">
            Ein derart breit aufgestellter und zugleich systematisch integrierter Ansatz ist selten. Er ermöglicht es, Patient:innen nicht eindimensional, sondern in ihrer gesamten Komplexität zu betrachten und individuell abgestimmte, ganzheitliche Therapien anzubieten.
          </p>
          <p className="text-base sm:text-lg text-[#515757]/80 leading-relaxed">
            Nicht, um möglichst viel zu machen, sondern um Zusammenhänge zu verstehen, die oft übersehen werden. Nicht als willkürliche Kombination verschiedener Medizinformen, sondern als strukturiertes Konzept, in dem jeder Ansatz seinen klaren Platz hat, mit dem Ziel, einen wirklich ganzheitlichen Blick und eine integrierte Behandlung zu ermöglichen. Meine Arbeit beginnt dort, wo Standardlösungen aufhören.
          </p>
          <p className="text-base sm:text-lg text-[#515757]/80 leading-relaxed">
            Dabei begleite ich Dich als Mentor. Denn Lebensstiloptimierung ist häufig die Basis jeder nachhaltigen Verbesserung und genau hier scheitern viele nicht am Wissen, sondern an der Umsetzung. Die beste Therapie kann nichts bewirken, wenn sie nicht gelebt wird. Deshalb braucht es mehr als einen Behandlungsplan: Es braucht Begleitung, Feintuning und echte Unterstützung durch den gesamten Prozess der Veränderung.
          </p>
        </div>
      </section>

      {/* Section 5 — Experience */}
      <section ref={section5.ref} style={section5.style} className="pb-16 sm:pb-24 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-base sm:text-lg text-[#515757]/80 leading-relaxed">
            Ich habe mich selbst von gesundheitlichen Problemen befreit und vielen weiteren Menschen geholfen. Nicht durch ein einzelnes Wundermittel, sondern durch konsequente Veränderung mit einem klaren Plan und Struktur. Genau diese Erfahrung gebe ich nun weiter.
          </p>
        </div>
      </section>

      {/* Closing Statement */}
      <section ref={closing.ref} style={closing.style} className="pb-24 sm:pb-36 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="border-t border-[#515757]/10 pt-12 space-y-6">
            <p className="text-xl sm:text-2xl font-medium text-[#515757] leading-relaxed">
              Mein Ziel ist nicht nur, dass es Dir besser geht. Mein Ziel ist, dass Du verstehst, <em>warum</em> — und Deinen Körper so gut kennenlernst, dass Du langfristig unabhängig wirst. Ich weiß, dass ich meine Arbeit gut gemacht habe, wenn meine Patienten mich irgendwann weniger brauchen.
            </p>
            <p className="text-base sm:text-lg text-[#515757]/80 leading-relaxed">
              Du möchtest mehr über meine persönliche Story erfahren? Dann klick einfach auf den Button unten oder schau auf meinen Socials vorbei!
            </p>
            <div className="pt-2">
              <a
                href="/ueber-mich_Vivecura_v4.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#43a9ab] text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#389193] transition-colors duration-200 no-underline shadow-sm"
              >
                Mehr erfahren
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            <div className="pt-6">
              <p className="text-sm font-semibold tracking-[2px] uppercase text-[#43a9ab] mb-4">
                Folge mir auf
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="https://www.instagram.com/vivecura/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-[#515757]/50 hover:text-[#43a9ab] transition-colors duration-200"
                >
                  <svg className="w-11 h-11" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/shukri-jarmoukli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-[#515757]/50 hover:text-[#43a9ab] transition-colors duration-200"
                >
                  <svg className="w-11 h-11" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="3" />
                    <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 014 0v4M11 10v7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@shukri.jarmoukli"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="text-[#515757]/50 hover:text-[#43a9ab] transition-colors duration-200"
                >
                  <svg className="w-11 h-11" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@shukrijarmoukli"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-[#515757]/50 hover:text-[#43a9ab] transition-colors duration-200"
                >
                  <svg className="w-11 h-11" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="4" />
                    <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default UeberMich;
