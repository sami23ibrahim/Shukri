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
                Persönlich
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#43A9AB] tracking-tight leading-[1.08] mb-8">
                Über mich
              </h1>
              <div ref={heroText.ref} style={heroText.style}>
                <p className="text-xl sm:text-2xl font-medium text-[#515757] leading-relaxed">
                  Ich bin Arzt. Aber ich arbeite nicht so, wie Du es vielleicht gewohnt bist.
                </p>
              </div>
            </div>
            <div className="lg:w-[40%]">
              <div className="rounded-2xl overflow-hidden">
                <img src={Shukr} alt="Dr. Shukri" className="w-full h-auto object-cover" />
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
            Ich sehe den Menschen nicht als Summe einzelner Symptome, sondern als ein lebendiges System, in dem alles miteinander verbunden ist: Körper, Gedanken, Biochemie, Lebensstil. Mich interessiert nicht nur, was nicht funktioniert — sondern warum es aus dem Gleichgewicht geraten ist. Denn genau dort beginnt echte Veränderung.
          </p>
          <p className="text-base sm:text-lg text-[#515757]/80 leading-relaxed">
            Ich verbinde moderne Medizin mit Lebensstilmedizin, funktionellen und orthomolekularen Ansätzen, Genetik, Toxikologie sowie psychotherapeutischen und biodynamischen Verfahren. Nicht, um möglichst viel zu machen, sondern um Zusammenhänge zu verstehen, die oft übersehen werden. Meine Arbeit beginnt also dort, wo Standardlösungen aufhören.
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
            Ich bin in Syrien aufgewachsen. Das bedeutet: viel Bewegung, Sonne, ein Körper, der einfach funktioniert hat. Als ich dann mit 19 Jahren nach Deutschland kam, hat sich das aber innerhalb kürzester Zeit verändert. Plötzlich hatte ich Allergien, Unverträglichkeiten, Sodbrennen, depressive Phasen — und habe über 30 Kilo zugenommen. Mein Körper hat sich fremd angefühlt.
          </p>
          <p className="text-base sm:text-lg text-[#515757]/80 leading-relaxed">
            Ich habe verzweifelt nach Antworten gesucht — und vor allem nach Lösungen, die über reine Symptombehandlungen hinausgehen. Medikamente konnten vieles zwar kurzfristig unterdrücken, aber nichts wirklich lösen. Und ich wusste: Ich will nicht abhängig sein. Ich will nicht für immer Tabletten schlucken müssen. Ich will verstehen.
          </p>
        </div>
      </section>

      {/* Section 3 — Transformation */}
      <section ref={section3.ref} style={section3.style} className="pb-16 sm:pb-24 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#43A9AB] tracking-tight mb-2">
            Also habe ich angefangen, alles zu hinterfragen.
          </h2>
          <p className="text-base sm:text-lg text-[#515757]/80 leading-relaxed">
            Ich habe meine Ernährung umgestellt, meinen Alltag neu strukturiert, meine Bewegung und meine Atmungsgewohnheiten verändert. Schritt für Schritt hat sich so mein Zustand verbessert. Nicht sofort, nicht linear, aber definitiv spürbar.
          </p>
        </div>
      </section>

      {/* Pull Quote 2 — Cold */}
      <section ref={pullQuote2.ref} style={pullQuote2.style} className="px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl px-8 sm:px-12 py-10 sm:py-14" style={{ backgroundColor: "#43A9AB" }}>
            <p className="text-lg sm:text-xl text-white leading-relaxed">
              Doch der größte Wendepunkt auf meinem Weg war die <strong>Kälte</strong>. Eisbaden hat nicht nur meinen Körper verändert, sondern auch meinen Kopf. Meine Resilienz. Meine Fähigkeit, mit Stress umzugehen. Zum ersten Mal hatte ich das Gefühl von innerer Ruhe.
            </p>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed mt-4">
              Und gleichzeitig habe ich gemerkt, wie wenig von all dem Teil der klassischen medizinischen Ausbildung ist — obwohl es dafür wissenschaftliche Grundlagen gibt.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — Functional Medicine */}
      <section ref={section4.ref} style={section4.style} className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-base sm:text-lg text-[#515757]/80 leading-relaxed">
            Ich habe begonnen, mich intensiv mit funktioneller Medizin auseinanderzusetzen — mit der Frage: <em>Wie kann man Wissenschaft so nutzen, dass sie im echten Leben funktioniert?</em>
          </p>
          <p className="text-base sm:text-lg text-[#515757]/80 leading-relaxed">
            Heute ist genau das mein Fokus. Ich arbeite nicht mit schnellen Lösungen. Ich arbeite daran, Dein System zu verstehen. Ich übersetze komplexe Zusammenhänge in Dinge, die Du wirklich in Deinem Leben umsetzen kannst — und begleite Dich dabei Schritt für Schritt. Auch dann, wenn noch nicht alles sofort klar ist. Denn echte Gesundheit ist kein schneller Fix, sondern ein fortlaufender Prozess.
          </p>
        </div>
      </section>

      {/* Section 5 — Experience */}
      <section ref={section5.ref} style={section5.style} className="pb-16 sm:pb-24 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-base sm:text-lg text-[#515757]/80 leading-relaxed">
            Ich habe mich selbst von meinen gesundheitlichen Problemen befreit. Nicht durch ein einzelnes Wundermittel, sondern durch konsequente Veränderung. Und genau diese Erfahrung gebe ich weiter.
          </p>
        </div>
      </section>

      {/* Closing Statement */}
      <section ref={closing.ref} style={closing.style} className="pb-24 sm:pb-36 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="border-t border-[#515757]/10 pt-12">
            <p className="text-xl sm:text-2xl font-medium text-[#515757] leading-relaxed">
              Mein Ziel ist nicht nur, dass es Dir besser geht. Mein Ziel ist, dass Du verstehst, <em>warum</em> — und Deinen Körper so gut kennenlernst, dass Du langfristig unabhängig wirst.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default UeberMich;
