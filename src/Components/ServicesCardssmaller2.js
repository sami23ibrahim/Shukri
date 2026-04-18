import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const ServicesCardssmaller2 = () => {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const expandedCardRef = useRef(null);
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Close expanded card on outside click only
  useEffect(() => {
    if (expandedIndex === null) return;
    const handleClose = (e) => {
      if (
        expandedCardRef.current &&
        !expandedCardRef.current.contains(e.target)
      ) {
        setExpandedIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [expandedIndex]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (expandedIndex !== null) {
      // Store original overflow value
      const originalOverflow = document.body.style.overflow;
      // Disable scrolling
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore original overflow when modal closes
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [expandedIndex]);

  // Scroll-based animation logic — relative to the component's position
  useEffect(() => {
    if (expandedIndex !== null) return;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Animation starts when section is still well below the viewport,
      // completes when section top reaches upper third
      const isMobileView = window.innerWidth < 768;
      const start = windowHeight * 0.7;
      const end = windowHeight * 0.5;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [expandedIndex]);

  const cards = [
    { title: "Eisen", bg: "bg-white", img: "/Assets/infusions-pics/Eisen.png", duration: "45 min", price: "142–176 €", popupDesc: "Unsere Eisen-Infusion liefert bioverfügbares Eisen direkt in die Blutbahn, für eine schnelle und schonende Auffüllung der Speicher. Sie ist ideal, wenn orale Eisenpräparate nicht vertragen werden oder nicht ausreichend wirken. Besonders geeignet bei Eisenmangelanämie, funktioneller Eisenmangel ohne Anämie (Ferritinwerte <70), chronischer Erschöpfung oder nach Blutverlust.", tags: ["Eisenmangel", "Innere Wärme", "Energie"], ingredients: "Eisen", whyTitle: "Warum Eisen intravenös?", whyText: "Eisentabletten arbeiten langsam. Es dauert Monate, bis sich wirklich etwas verändert. Eine Infusion kann die Speicher in einer einzigen Sitzung spürbar auffüllen. Kein Warten, kein Raten ob es ankommt. Viele Patienten berichten bereits nach 1–2 Infusionen von mehr Energie, klareren Gedanken und besserem Schlaf. Was oral 6–9 Monate dauern kann, ist intravenös oft in 2–3 Terminen erledigt; direkt ins Blut, höchste Bioverfügbarkeit, sofort wirksam.", targetX: -60, targetY: 120, rotate: -8 },
    { title: "Anti-Schmerz", bg: "bg-white", img: "/Assets/infusions-pics/Anti Schmerz.png", duration: "45 min", price: "150 €", popupDesc: "Diese Infusion kombiniert muskelentspannende, nervenstabilisierende und schmerzmodulierende Wirkstoffe für schnelle, gezielte Linderung. Sie wirkt direkt im Gewebe, ohne die Belastung des Magen-Darm-Trakts durch orale Schmerzmittel. Geeignet bei akuten und chronischen Schmerzen, Verspannungen oder Migräne.", tags: ["Schmerzlinderung", "Muskelentspannung", "Nervenunterstützung"], ingredients: "Procain, Natriumhydrogencarbonat, Glutathion, Trauma-Heel", whyTitle: "Warum diese Kombination?", whyText: "Schmerz entsteht oft dort, wo Gewebe übersäuert und entzündet ist. Procain kann genau dort ansetzen. Es wurde 1905 entdeckt und kann weit mehr als betäuben: Es kann Schmerzschwellen anheben, Entzündungen hemmen und die Durchblutung verbessern. Das Bicarbonat kann die Gewebsübersäuerung direkt reduzieren, denn Übersäuerung aktiviert Schmerzrezeptoren. Glutathion schützt dabei die Zellen vor oxidativem Stress, Trauma-Heel kann die natürliche Gewebsheilung unterstützen.", targetX: -30, targetY: 100, rotate: 10 },
    { title: "Anti-Entz\u00FCndung", bg: "bg-white", img: "/Assets/infusions-pics/Anti Entzundung.png", duration: "60 min", price: "190 €", popupDesc: "Unsere Anti-Entzündungs-Infusion versorgt den Körper mit hochdosiertem Vitamin C, Glutathion und entzündungshemmenden Mikronährstoffen direkt ins Blut. Sie kann oxidativen Stress reduzieren und chronisch-entzündliche Prozesse an der Wurzel dämpfen. Für alle mit chronischen Beschwerden, Autoimmunerkrankungen oder erhöhten Entzündungsmarkern.", tags: ["Entzündungshemmung", "Oxidativer Stress", "Immunbalance"], ingredients: "Vitamin C, Glutathion 1200mg, Carnosin, Aminosäuren, B-Komplex, Magnesium, Zink, Selen", whyTitle: "Warum diese Kombination?", whyText: "Chronische Entzündung ist kein einzelnes Problem - sie ist ein Systemversagen. Glutathion und Carnosin sind dabei die echten Feuerlöscher: Glutathion kann jede einzelne Zelle und ihre Mitochondrien vor oxidativem Stress schützen, Vitamin C und A recyceln und direkt an der zelleignen Entgiftung beteiligt sein. Carnosin kann die Immunantwort auf Makrophagenebene regulieren und Zellmembranen vor weiteren Schäden bewahren. Vitamin C kann beide verstärken und Zink, Selen sowie B-Vitamine können dafür sorgen, dass das Immunsystem nicht im Leerlauf dreht, sondern gezielt moduliert.", targetX: 70, targetY: 130, rotate: -6 },
    { title: "Detox", bg: "bg-white", img: "/Assets/infusions-pics/Detox.png", duration: "45 min", price: "172 €", popupDesc: "Unsere Detox-Infusion unterstützt Leber und Nieren bei der Ausleitung von unterschiedlichen Umweltgiften und Stoffwechselabbauprodukten (Schwermetallen, Mikroplastik, Schimmel, Xenoöstrogene). Hochdosierte Antioxidantien, Vitamine und leberschützende Wirkstoffe entlasten deinen Organismus auf zellulärer Ebene. Ideal für alle, die chronische Belastungen oder einen trägen Stoffwechsel spüren.", tags: ["Entgiftung", "Leberunterstützung", "Zellreparatur"], ingredients: "ALA, Vitamin C, Magnesium, Hepatodoron, B-Komplex, Aminosäure", whyTitle: "Warum diese Kombination?", whyText: "Entgiftung braucht zwei Dinge gleichzeitig: Schutz und Baustoffe. Hepatodoron kann die Leber unterstützen, ALA und Vitamin C können Giftstoffe neutralisieren – und B-Komplex, Aminosäuren und Magnesium können dem Körper die nötigen Bausteine für den Entgiftungsprozess liefern, direkt ins Blut ohne Umweg über den Darm.", targetX: 40, targetY: 150, rotate: 5 },
    { title: "Regeneration", bg: "bg-white", img: "/Assets/infusions-pics/Regeneration.png", duration: "45 min", price: "auf Anfrage", popupDesc: "Diese Infusion kann Muskulatur, Bindegewebe und Nervensystem mit essenziellen Aminosäuren, B-Vitaminen und Spurenelementen auf direktem Weg versorgen, für beschleunigte Erholung auf zellulärer Ebene. Sie kann den Aufbau nach körperlichen oder mentalen Belastungsphasen gezielt unterstützen. Ideal nach intensivem Training, Wettkampf, Operationen oder langen Stressphasen.", tags: ["Erholung", "Muskelregeneration", "Zellaufbau"], ingredients: "Glycin, Prolin, Vitamin C, ATP-Konzentrat, Magnesium, B-Komplex, weitere Aminosäuren", whyTitle: "Warum diese Kombination?", whyText: "Muskeln erholen sich schnell. Sehnen, Bänder und Knorpel aber nicht. Genau da liegt der Engpass bei Leistungssportlern. Glycin und Prolin sind die beiden Hauptbausteine von Kollagen, ohne sie kann der Körper beschädigtes Gewebe schlicht nicht reparieren. Vitamin C ist dabei kein optionales Extra, sondern ein unverzichtbarer Kofaktor: ohne Vitamin C läuft die Kollagensynthese biochemisch nicht. ATP-Konzentrat kann die Zellen mit Direktenergie versorgen wenn die Speicher nach dem Training leer sind, Magnesium kann Muskelspannung lösen und das Nervensystem runterfahren. B-Komplex und Aminosäuren können den gesamten Reparaturprozess auf Hochtouren bringen.", targetX: 55, targetY: 110, rotate: -9 },
    { title: "Vegan Boost", bg: "bg-white", img: "/Assets/infusions-pics/Vegan boost.png", duration: "45 min", price: "190 €", popupDesc: "Wer sich pflanzlich ernährt, hat einen erhöhten Bedarf an B12, Eisen, Zink und Omega-Fettsäuren. Nährstoffe, die rein über die Ernährung schwer ausreichend aufzunehmen sind. Unsere Vegan-Boost-Infusion schließt diese Lücken direkt und effektiv. Für alle, die vegan oder vegetarisch leben und ihre Versorgung optimieren möchten.", tags: ["B12", "Nährstoffversorgung", "Pflanzliche Ernährung"], ingredients: "2X ATP-Konzentrat (L-Arginin, Glycin, Taurin, L-Carnosin, L-Lysin, Magnesium, Kalium, B1, B2, B3, B5, B6, B12), L-Carnitin hochdosiert, Q10", whyTitle: "Warum diese Kombination?", whyText: "Alle denken, Veganer brauchen nur B12. Die Wahrheit ist jedoch weitaus komplexer. L-Carnitin kommt fast ausschließlich in Fleisch vor und ohne es kann der Körper Fett kaum als Energie nutzen, Muskeln ermüden schneller, die Konzentration leidet. Taurin, Glycin, L-Arginin und L-Carnosin sind Aminosäuren, die der Körper zwar theoretisch selbst bilden kann, aber bei veganer Ernährung oft nicht in ausreichender Menge. Q10 kann als zentraler Energieträger in den Mitochondrien wirken und ist in pflanzlicher Kost kaum enthalten. Das ATP-Konzentrat kann dabei alles liefern, was die Zelle braucht; ein komplettes biochemisches Fundament in einer einzigen Ampulle.", targetX: 45, targetY: 130, rotate: -10 },
    { title: "NAD+", bg: "bg-white", img: "/Assets/infusions-pics/NAD+.png", duration: "2–3 Stunden", price: "ab 362 €", popupDesc: "NAD+ ist ein zentrales Coenzym in jeder Körperzelle; zuständig für Energieproduktion, DNA-Reparatur und zelluläre Langlebigkeit. Mit zunehmendem Alter sinkt der NAD+-Spiegel deutlich; unsere Infusion stellt ihn direkt und effektiv wieder her. Für alle, die kognitive Leistung, Vitalität und Anti-Aging gezielt fördern möchten.", tags: ["Longevity", "DNA-Reparatur", "Kognition"], ingredients: "NAD+ (250mg oder 500mg)", whyTitle: "Warum intravenös?", whyText: "NAD+ kann oral kaum die Zellen erreichen, da der Darm es abbaut, bevor es überhaupt ankommt. Intravenös kann es direkt in die Blutbahn und von dort in jede Zelle gelangen. NAD+ kann als zentraler Schalter im Energiestoffwechsel wirken: es kann Mitochondrien reaktivieren, DNA-Reparaturenzyme (Sirtuine) anschalten und den zellulären Alterungsprozess verlangsamen. Was Tabletten über Monate kaum erreichen können, kann eine einzige Infusion direkt spürbar machen. Das bedeutet: mehr Klarheit, mehr Energie und schnellere Erholung.", targetX: -45, targetY: 125, rotate: 8 },
    { title: "Immun Boost", bg: "bg-white", img: "/Assets/infusions-pics/Anti Grippe.png", duration: "45 min", price: "180 €", popupDesc: "Diese Infusion kann das Immunsystem mit hochdosiertem Vitamin C, Zink und immunaktiven Mikronährstoffen auf direktem Weg stärken. Die intravenöse Gabe kann Wirkstoffspiegel erreichen, die oral schlicht nicht erreichbar sind – Vitamin C kann intravenös eine bis zu 70-fach höhere Blutkonzentration erreichen als über Tabletten. Empfehlenswert bei häufigen Infekten, geschwächter Abwehr oder als gezielte Prävention in der Erkältungssaison.", tags: ["Immunstärkung", "Infektschutz", "Prävention"], ingredients: "Vitamin C, Lysin, Glutathion, L-Carnitin, B-Komplex, Elektrolyte, Mineralstoffe, Zink, Selen", whyTitle: "Warum diese Kombination?", whyText: "Prävention funktioniert nur, wenn das Immunsystem wirklich ausgestattet ist, nicht nur halbwegs. Vitamin C und Zink können die Immunabwehr direkt hochfahren, Lysin und L-Carnitin können den Zellen die Energie liefern, die sie im Ernstfall brauchen. B-Vitamine können als stiller Motor dahinter wirken, ohne sie laufen Immunreaktionen auf Sparflamme. Selen kann als antiviraler Mikronährstoff wirken, der im Alltag oft unterschätzt und zu wenig aufgenommen wird. Alles intravenös. Kann sofort verfügbar sein, bevor der Körper überhaupt merkt, dass er angegriffen wird.", targetX: -50, targetY: 140, rotate: 7 },
    { title: "Burnout Fix", bg: "bg-white", img: "/Assets/infusions-pics/Burnout Fix.png", duration: "45 min", price: "187 €", popupDesc: "Diese Infusion kann an der biochemischen Grundlage von Burnout ansetzen, nicht nur an den Symptomen. ATP-Konzentrat kann mit einem kompletten Spektrum an Aminosäuren und B-Vitaminen die Energieproduktion in den Mitochondrien wieder hochfahren.", tags: ["Erschöpfung", "Nervensystem", "Mentale Kraft"], ingredients: "ATP-Konzentrat (L-Arginin, Glycin, Taurin, L-Carnosin, L-Lysin, Magnesium, Kalium, B1, B2, B3, B5, B6, B12), Serotonin-Injeel, Neuro-Injeel", whyTitle: "Warum diese Kombination?", whyText: "Burnout ist kein Willensproblem, es ist ein Zellenergie-Problem. ATP-Konzentrat kann die Zellen mit allem versorgen, was sie für Energie und Nervenregeneration brauchen. Aminosäuren wie Glycin, Taurin und L-Carnosin können das Nervensystem stabilisieren, B-Vitamine können als unverzichtbare Kofaktoren im Energiestoffwechsel wirken.", targetX: 65, targetY: 135, rotate: -7 },
    { title: "Burnout Fix+", bg: "bg-white", img: "/Assets/infusions-pics/Burnout Fix+.png", duration: "60 min", price: "350 €", popupDesc: "Diese Infusion kann an der biochemischen Grundlage von Burnout ansetzen, nicht nur an den Symptomen. ATP-Konzentrat kann mit einem kompletten Spektrum an Aminosäuren und B-Vitaminen die Energieproduktion in den Mitochondrien wieder hochfahren. In der Premium-Variante kann NAD+ zusätzlich wie ein Defibrillator für das erschöpfte Nervensystem wirken – es kann Zellen, die scheinbar auf Reserve laufen, direkt reaktivieren.", tags: ["Erschöpfung", "Nervensystem", "Mentale Kraft"], ingredients: "NAD+, ATP-Konzentrat (L-Arginin, Glycin, Taurin, L-Carnosin, L-Lysin, Magnesium, Kalium, B1, B2, B3, B5, B6, B12), Serotonin-Injeel, Neuro-Injeel", whyTitle: "Warum diese Kombination?", whyText: "Burnout ist kein Willensproblem, es ist ein Zellenergie-Problem. ATP-Konzentrat kann die Zellen mit allem versorgen, was sie für Energie und Nervenregeneration brauchen. Aminosäuren wie Glycin, Taurin und L-Carnosin können das Nervensystem stabilisieren, B-Vitamine können als unverzichtbare Kofaktoren im Energiestoffwechsel wirken. In der Premium-Variante kann NAD+ zusätzlich wie ein Defibrillator wirken: es kann ein erschöpftes Nervensystem auf biochemischer Ebene direkt reaktivieren und Mitochondrien wieder anschalten – dort wo Schlaf und Urlaub allein nicht mehr reichen.", targetX: -35, targetY: 115, rotate: 6 },
    { title: "Anti-Stress", bg: "bg-white", img: "/Assets/infusions-pics/Anti Stress.png", duration: "45 min", price: "175 €", popupDesc: "Unsere Anti-Stress-Infusion reguliert das Nervensystem mit hochdosiertem Magnesium, B-Vitaminen und entspannenden Aminosäuren wie L-Theanin. Sie wirkt ausgleichend auf die Cortisol-Achse und fördert innere Ruhe ohne Benommenheit. Geeignet bei dauerhaftem Stress, Schlafproblemen oder innerer Unruhe.", tags: ["Stressreduktion", "Cortisol", "Innere Balance"], ingredients: "Vagusfit N Forte (L-Arginin, Taurin, Glycin, L-Carnitin, Magnesium, Glutathion, Cholin, NAC, Tryptophan, Kalium, Procain), B-Komplex (B1, B2, B3, B6, B9, B12), Serotonin-Injeel, Neuro-Injeel", whyTitle: "Warum diese Kombination?", whyText: "Dauerstress bedeutet: der Sympathikus läuft auf Hochtouren, der Vagusnerv – unser wichtigster Erholungsnerv – wird systematisch unterdrückt. Cholin kann die Bildung von Acetylcholin anregen, dem zentralen Neurotransmitter des Parasympathikus – dem System, das für Ruhe, Verdauung und tiefes Durchatmen zuständig ist. Tryptophan kann als direkte Vorstufe von Serotonin wirken und kann Stimmung, Schmerzempfinden und Schlaf-Wach-Rhythmus positiv beeinflussen. Glutathion, NAC und Glycin können das Nervensystem zusätzlich vor oxidativem Stress schützen, Procain kann die Gewebsübersäuerung reduzieren und beruhigend auf das Nervensystem wirken.", targetX: 50, targetY: 145, rotate: -5 },
    { title: "Individuelle Mischung", bg: "bg-white", img: "/Assets/infusions-pics/Individuelle Mischung.png", duration: "nach Absprache", price: "ab 150 €", popupDesc: "Kein Körper ist wie der andere. Deshalb gibt es bei uns auch die Möglichkeit, eine Infusion ganz nach deinen individuellen Bedürfnissen zusammenzustellen. Auf Basis deiner Laborwerte, Symptome und Ziele wählen wir gemeinsam die optimale Wirkstoffkombination. Für alle, die gezielt und präzise, statt nach Schema F, behandelt werden möchten.", tags: ["Personalisiert", "Laborbasiert", "Präzisionsmedizin"], ingredients: "Individuell nach Laborwerten und Symptomen", whyTitle: "", whyText: "", targetX: -50, targetY: 110, rotate: 7 },
    { title: "Anti-Grippe", bg: "bg-white", img: "/Assets/infusions-pics/Anti Grippe.png", duration: "45 min", price: "183 €", popupDesc: "Bei ersten Krankheitszeichen kann diese Infusion mit hochdosiertem Vitamin C, Zink und antiviralen Mikronährstoffen direkt ansetzen. Die intravenöse Gabe kann die Immunantwort beschleunigen und den Krankheitsverlauf spürbar verkürzen. Ideal beim ersten Kratzen im Hals, als gezielte Unterstützung mitten im Infekt und als Abhilfe bei Infekten, die lange nicht ausheilen.", tags: ["Akutschutz", "Antiviraler Boost", "Schnelle Genesung"], ingredients: "Vitamin C, Glutathion, Lysin, L-Carnitin, B-Komplex, Elektrolyte (Zink, Selen, Magnesium), Zink, Selen", whyTitle: "Warum diese Kombination?", whyText: "Wenn der Körper kämpft, braucht er vor allem eins: Nachschub. Vitamin C und Zink sind klassische Immunbooster, aber ohne Lysin, Carnitin und B-Vitamine fehlt den Zellen schlicht die Energie, um die Abwehr auch wirklich hochzufahren. Glutathion kann dabei als körpereigenes Masterantioxidans wirken und die Immunzellen vor oxidativem Stress schützen. Selen rundet das Ganze ab, weil es antiviral wirken kann und oft der stille Engpass im Infekt ist.", targetX: -55, targetY: 105, rotate: 9 },
    { title: "Fat Burner", bg: "bg-white", img: "/Assets/infusions-pics/Fat Burner.png", duration: "45 min", price: "170 €", popupDesc: "Diese Infusion kann den Fettstoffwechsel auf zellulärer Ebene direkt ankurbeln. Gezielt, effizient und spürbar. Sie kann besonders für alle sinnvoll sein, die trotz Diät und Sport nicht vorankommen, oder deren Körper schlicht nicht genug Carnitin und B-Vitamine hat, um Fett als Energiequelle zu nutzen.", tags: ["Fettstoffwechsel", "Energie", "Leistungsfähigkeit"], ingredients: "L-Carnitin, ATP-Konzentrat, Vitamin B1 hochdosiert, B-Komplex, Aminosäuren, Elektrolyte", whyTitle: "Warum diese Kombination?", whyText: "Fettverbrennung ist kein Willensproblem, es ist oft ein Transportproblem. Fette können nur dann als Energie genutzt werden, wenn sie in die Mitochondrien gelangen. L-Carnitin kann dabei als Schubkarre wirken: es kann aktivierte Fettsäuren direkt in die Zelle transportieren, wo sie verbrannt werden. Vitamin B1 kann dabei die Räder dieser Schubkarre am Laufen halten – ohne ausreichend B1 stockt der gesamte Energiestoffwechsel. ATP-Konzentrat kann die Zellen zusätzlich mit Direktenergie versorgen, Aminosäuren und B-Komplex können den Rest des Stoffwechsels unterstützen.", targetX: -40, targetY: 120, rotate: 6 },
    { title: "Energy Kick", bg: "bg-white", img: "/Assets/infusions-pics/Energy Kick.png", duration: "60 min", price: "200 €", popupDesc: "Echte Energie beginnt in den Mitochondrien, den Kraftwerken der Zelle. Jede einzelne Zelle des Körpers produziert dort ihre Energie, und wenn dieser Prozess ins Stocken gerät, hilft kein Aufputschmittel der Welt. Diese Infusion kann direkt in den Zellkern wirken: Mito Energy kann die Mitochondrien mit allem versorgen, was sie für maximale Energieproduktion brauchen.", tags: ["Zellenergie", "Mitochondrien", "Leistungsfähigkeit"], ingredients: "Vitamin C 5000mg, Glutathion 1200mg, Taurin, Glycin, L-Lysin, L-Carnitin je 1000mg, Magnesium, Kalium, B1, B2, B3, B5, B6, B12, Alphaliponsäure (ALA)", whyTitle: "Warum diese Kombination?", whyText: "Das vollständige Spektrum an Aminosäuren, B-Vitaminen und Antioxidantien befeuert die mitochondriale Maschinerie direkt: L-Carnitin kann Fettsäuren in die Zelle transportieren, Taurin und Glycin können die Zellmembranen stabilisieren, Glutathion kann die Mitochondrien vor oxidativem Schaden schützen. ALA kann dabei als universeller Radikalfänger wirken, fettlöslich und wasserlöslich gleichzeitig, kann es überall im Körper ansetzen wo andere Antioxidantien nicht hinkommen.", targetX: 60, targetY: 140, rotate: -8 },
  ];

  return (
    <div ref={sectionRef} className="relative flex flex-col justify-center items-center bg-white max-w-screen min-h-[60vh] pt-0 pb-16" style={{ overflowX: 'clip', overflowY: 'visible' }}>
      {/* Blurred overlay when expanded */}
      {expandedIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-40 transition-opacity duration-200 ease-out will-change-opacity" />
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl px-4 relative z-50">
        {cards.map((card, index) => {
          // Expanded card logic
          if (expandedIndex === index) {
            return null; // Hide the original card in the grid when expanded
          }
          // Normal card with scroll-based animation
          // Calculate animation transform
          const gridCol = index % 4;
          const gridRow = Math.floor(index / 4);
          // Final position: no transform
          // Initial: stacked in center, with offset and rotation
          const translateX = (1 - scrollProgress) * card.targetX;
          const translateY = (1 - scrollProgress) * card.targetY;
          const rotate = (1 - scrollProgress) * card.rotate;
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setExpandedIndex(index)}
              className={`w-full h-[280px] rounded-2xl shadow-lg flex flex-col cursor-pointer transition-transform duration-500 relative ${card.bg}`}
              style={{
                zIndex: hoveredIndex === index ? 70 : 10,
                transform:
                  `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)` +
                  (hoveredIndex === index ? " scale(1.07)" : " scale(1)"),
                filter: expandedIndex !== null ? "blur(2px)" : "none",
                pointerEvents: expandedIndex !== null ? "none" : "auto",
              }}
            >
              <div
                className={`absolute inset-0 ${card.bg} rounded-3xl transition-transform duration-500`}
                style={{
                  transform: hoveredIndex === index ? "scale(1.03)" : "scale(1)",
                  transitionTimingFunction: "cubic-bezier(0.3, 2.5, 0.6, 1.8)",
                  transitionDuration: "500ms",
                }}
              />
              <div className="relative z-10 flex flex-col w-full h-full">
                <div className="w-full h-40 overflow-hidden rounded-t-2xl">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 px-4 pt-3 pb-4">
                  <h2 className="font-semibold text-base md:text-lg text-[#515757] text-left">{card.title}</h2>
                  <div className="flex items-center gap-1.5 mt-1 text-[#515757]/50 text-xs md:text-sm">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{card.duration}</span>
                  </div>
                  <div className="flex items-end justify-between mt-auto">
                    <span className="text-lg font-bold text-[#515757]">{card.price}</span>
                    <button className="w-10 h-10 rounded-full bg-[#43a9ab] flex items-center justify-center hover:bg-[#389193] transition-colors">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Expanded card overlay */}
      {expandedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 transition-opacity duration-200 ease-out" />
          <div
            ref={expandedCardRef}
            className="relative bg-white rounded-3xl popup-animate flex flex-col overflow-hidden"
            style={{
              width: "min(500px, 92vw)",
              maxHeight: "90vh",
              boxShadow: "0 8px 40px 0 rgba(0,0,0,0.18)",
            }}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpandedIndex(null);
              }}
              className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:scale-110 transition-transform"
            >
              <svg className="w-4 h-4 text-[#515757]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1">
              {/* Image */}
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={cards[expandedIndex].img}
                  alt={cards[expandedIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description + Tags */}
              <div className="px-6 pt-5 pb-4">
                <h2 className="font-bold text-xl text-[#515757]">{cards[expandedIndex].title}</h2>
                <p className="mt-3 text-sm text-[#515757]/70 leading-relaxed">{cards[expandedIndex].popupDesc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {cards[expandedIndex].tags.map((tag, i) => (
                    <span key={i} className="text-xs font-medium text-[#43a9ab] bg-[#43a9ab]/10 px-3 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-[#515757]/10 mt-6 mb-5" />

                {/* Ingredients */}
                <div className="mb-5">
                  <h3 className="text-sm font-bold text-[#515757] mb-1">Inhaltsstoffe</h3>
                  <p className="text-sm text-[#515757]/60 leading-relaxed">{cards[expandedIndex].ingredients}</p>
                </div>

                {/* Why section */}
                {cards[expandedIndex].whyTitle && (
                  <div>
                    <h3 className="text-sm font-bold text-[#515757] mb-2">{cards[expandedIndex].whyTitle}</h3>
                    <p className="text-sm text-[#515757]/60 leading-relaxed">{cards[expandedIndex].whyText}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="px-6 py-4 border-t border-[#515757]/10 flex items-center gap-3">
              <span className="text-xl font-bold text-[#515757]">{cards[expandedIndex].price}</span>
              <div className="flex-1 flex items-center gap-2 justify-end">
                <button className="px-5 py-2.5 rounded-full bg-[#43a9ab] text-sm font-medium text-white hover:bg-[#389193] transition-colors">
                  Jetzt buchen
                </button>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes popupFadeIn {
              0% { opacity: 0; transform: scale3d(0.85, 0.85, 1); }
              100% { opacity: 1; transform: scale3d(1, 1, 1); }
            }
            .popup-animate {
              animation: popupFadeIn 0.25s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default ServicesCardssmaller2;
