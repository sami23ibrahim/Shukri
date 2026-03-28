import { useTranslation } from "react-i18next";
import ServicesCardssmaller2 from "../Components/ServicesCardssmaller2";

function Infusions() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* Hero section to give scroll room for card animation */}
      <section className="relative z-40 flex flex-col items-center justify-center text-center px-6 pt-28 pb-56 bg-[#FAF9F6]">
        <span className="inline-block text-[#2e7d5b] text-sm tracking-[0.2em] uppercase font-medium mb-6">
          Infusionstherapie
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-[#2A2B2F] tracking-tighter leading-tight max-w-3xl">
          {t("Infusions.title")}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-[#2A2B2F]/60 max-w-xl leading-relaxed">
          {t("services.vitaminC_desc")}
        </p>
        <div className="mt-12 flex items-center gap-2 text-[#2A2B2F]/30 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <ServicesCardssmaller2 />
    </div>
  );
}

export default Infusions;
