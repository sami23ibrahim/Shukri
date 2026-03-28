
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const languages = [
    { code: "en", label: "EN", flag: "/Assets/en.png" },
    { code: "de", label: "DE", flag: "/Assets/de.png" },
  ];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setMenuOpen(false);
  };

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-2 px-3.5 py-2 bg-white/70 backdrop-blur-xl rounded-full border border-[#2A2B2F]/10 shadow-sm cursor-pointer hover:bg-white hover:shadow-md transition-all duration-300"
      >
        <img src={currentLang.flag} alt={currentLang.label} className="w-5 h-5 rounded-full" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#2A2B2F]/70">{currentLang.label}</span>
      </button>

      {menuOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-white/80 backdrop-blur-xl shadow-lg rounded-xl p-1.5 flex flex-col border border-[#2A2B2F]/10">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="flex items-center gap-2 px-3 py-2 hover:bg-[#2A2B2F]/5 rounded-lg transition-colors duration-200"
              onClick={() => changeLanguage(lang.code)}
            >
              <img src={lang.flag} alt={lang.label} className="w-5 h-5 rounded-full" />
              <span className="text-[12px] font-medium tracking-[0.1em] text-[#2A2B2F]/70">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
