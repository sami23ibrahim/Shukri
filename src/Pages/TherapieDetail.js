import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const therapies = {
  ketamin: { title: "Ketamin-Therapie", html: "/therapien-html/ketamin.html" },
  "schwermetall-ausleitung": { title: "Schwermetall-Ausleitung", html: "/therapien-html/schwermetall-ausleitung.html" },
  "schimmel-therapie": { title: "Schimmel-Therapie", html: "/therapien-html/schimmel-therapie.html" },
  "darm-reset": { title: "Darm Reset", html: "/therapien-html/darm-reset.html" },
  hormone: { title: "Hormone", html: "/therapien-html/hormone.html" },
  "burnout-fix": { title: "Burnout Fix", html: "/therapien-html/burnout-fix.html" },
};

export default function TherapieDetail() {
  const { slug } = useParams();
  const therapy = therapies[slug];
  const iframeRef = useRef(null);
  const [height, setHeight] = useState("100vh");

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const resize = () => {
      try {
        const doc = iframe.contentDocument;
        if (doc && doc.body) {
          setHeight(doc.documentElement.scrollHeight + "px");
        }
      } catch {}
    };
    iframe.addEventListener("load", resize);
    const interval = setInterval(resize, 500);
    return () => {
      iframe.removeEventListener("load", resize);
      clearInterval(interval);
    };
  }, [slug]);

  if (!therapy) {
    return (
      <div className="bg-white min-h-screen pt-32 px-6 text-center">
        <h1 className="text-3xl font-bold text-[#515757]">Therapie nicht gefunden</h1>
        <Link to="/" className="text-[#43a9ab] mt-4 inline-block">Zur Startseite</Link>
      </div>
    );
  }

  if (!therapy.html) {
    return (
      <div className="bg-white min-h-screen pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-black text-[#43A9AB] tracking-tighter mb-6">
            {therapy.title}
          </h1>
          <p className="text-[#515757]/70 text-lg leading-relaxed mb-10">
            Platzhalter — Inhalte zu dieser Therapie folgen in Kürze.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-full bg-[#43a9ab] text-white font-semibold hover:bg-[#378f91] transition-colors no-underline"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white pt-20">
      <iframe
        ref={iframeRef}
        src={therapy.html}
        title={therapy.title}
        style={{ width: "100%", border: "none", height }}
      />
    </div>
  );
}
