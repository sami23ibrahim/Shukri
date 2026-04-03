import { Link } from "react-router-dom";

const footerLinks = {
  Praxis: [
    { label: "K\u00F6rperliche Symptome", to: "/koerperliche-symptome" },
    { label: "Pr\u00E4vention & Longevity", to: "/praevention-longevity" },
    { label: "Psychotherapie", to: "/psychotherapie" },
    { label: "Spezielle Therapien", to: "/spezielle-therapien" },
  ],
  Angebot: [
    { label: "Infusionen", to: "/infusions" },
    { label: "Health Check", to: "/health-check" },
    { label: "Extras", to: "/extras" },
  ],
  Kontakt: [
    { label: "(030) 69005528", to: null, href: "tel:03069005528" },
    { label: "info@vivecura.de", to: null, href: "mailto:info@vivecura.de" },
  ],
};

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 014 0v4M11 10v7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="16" rx="4" />
        <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-10">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:w-[30%]">
            <span className="text-lg font-semibold tracking-[0.12em] uppercase text-[#43a9ab]">
              ViveCura
            </span>
            <p className="text-[#515757]/50 text-sm leading-relaxed mt-4 max-w-xs">
              Medizin, die den ganzen Menschen sieht. Funktionelle Medizin, Pr&auml;vention &amp; Psychotherapie in Berlin.
            </p>

            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-[#515757]/30 hover:text-[#43a9ab] transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-[#43a9ab] text-xs font-semibold tracking-[2px] uppercase mb-4">
                  {heading}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.to ? (
                        <Link
                          to={link.to}
                          className="text-[#515757]/50 text-sm hover:text-[#43a9ab] transition-colors duration-200 no-underline"
                        >
                          {link.label}
                        </Link>
                      ) : link.href ? (
                        <a
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-[#515757]/50 text-sm hover:text-[#43a9ab] transition-colors duration-200 no-underline"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <span className="text-[#515757]/50 text-sm">{link.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#515757]/30 text-xs">
            &copy; {new Date().getFullYear()} ViveCura. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#515757]/30 text-xs hover:text-[#515757]/60 transition-colors no-underline">
              Impressum
            </a>
            <a href="#" className="text-[#515757]/30 text-xs hover:text-[#515757]/60 transition-colors no-underline">
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
