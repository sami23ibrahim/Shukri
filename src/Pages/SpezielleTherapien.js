import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

function useScrollFadeIn() {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    style: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 1.4s ease-out, transform 1.4s ease-out",
    },
  };
}

const ChevronDown = ({ isOpen }) => (
  <svg
    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const CircleArrow = () => (
  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover:bg-white group-hover:scale-110 transition-all duration-300">
    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2A2B2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </div>
);

function AccordionItem({ title, children, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-1 text-left focus:outline-none group"
      >
        <span className="text-base sm:text-lg font-medium text-[#2A2B2F] group-hover:text-[#422f40] transition-colors">
          {title}
        </span>
        <ChevronDown isOpen={isOpen} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-1 text-gray-600 text-sm sm:text-base leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

function TherapyCard({ title, image, bgColor }) {
  return (
    <div className="group cursor-pointer">
      <div
        className="relative rounded-2xl overflow-hidden aspect-[2/1.1] sm:aspect-[5/2.2]"
        style={{ backgroundColor: bgColor || "#d5cec6" }}
      >
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {/* Text label bottom-left */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <h3 className="text-white text-base sm:text-lg font-bold leading-tight drop-shadow-md max-w-[70%]">
            {title}
          </h3>
          <CircleArrow />
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, name }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-[260px] sm:w-[300px] aspect-square flex-shrink-0 p-6 flex flex-col justify-between select-none">
      <div>
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed italic">"{quote}"</p>
      </div>
      <p className="text-[#2A2B2F] font-semibold text-sm">{name}</p>
    </div>
  );
}

const focusIcons = [
  // Person/body
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-5 h-5">
    <path d="M12 2a3 3 0 100 6 3 3 0 000-6zM12 10c-4 0-6 2-6 4v2h12v-2c0-2-2-4-6-4z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 18v4M10 22h4" strokeLinecap="round" />
  </svg>,
  // Leaf/nature
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-5 h-5">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34M5 19l2-2M3 7c3.6-1.4 8-1 11 2 3 3 3.4 7.4 2 11" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Layers/stack
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-5 h-5">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Brain/neural
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-5 h-5">
    <path d="M12 2a5 5 0 00-4.9 4A4 4 0 004 10a4 4 0 001 7.9A5 5 0 0012 22a5 5 0 006.9-4.1A4 4 0 0020 10a4 4 0 00-3.1-3.9A5 5 0 0012 2z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 8v8M9 12h6" strokeLinecap="round" />
  </svg>,
  // Energy/lightning
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-5 h-5">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Heart/wellness
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-5 h-5">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Shield/protection
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-5 h-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

function FocusCarousel({ t }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      label: "Fokus",
      title: t("spezielleTherapien.focus.s1.title"),
      description: t("spezielleTherapien.focus.s1.desc"),
      activeIcon: 0,
    },
    {
      label: "Fokus",
      title: t("spezielleTherapien.focus.s2.title"),
      description: t("spezielleTherapien.focus.s2.desc"),
      activeIcon: 1,
    },
    {
      label: "Fokus",
      title: t("spezielleTherapien.focus.s3.title"),
      description: t("spezielleTherapien.focus.s3.desc"),
      activeIcon: 2,
    },
    {
      label: "Fokus",
      title: t("spezielleTherapien.focus.s4.title"),
      description: t("spezielleTherapien.focus.s4.desc"),
      activeIcon: 3,
    },
    {
      label: "Fokus",
      title: t("spezielleTherapien.focus.s5.title"),
      description: t("spezielleTherapien.focus.s5.desc"),
      activeIcon: 4,
    },
    {
      label: "Fokus",
      title: t("spezielleTherapien.focus.s6.title"),
      description: t("spezielleTherapien.focus.s6.desc"),
      activeIcon: 5,
    },
    {
      label: "Fokus",
      title: t("spezielleTherapien.focus.s7.title"),
      description: t("spezielleTherapien.focus.s7.desc"),
      activeIcon: 6,
    },
  ];

  const current = slides[activeSlide];

  const prev = () => setActiveSlide((s) => (s === 0 ? slides.length - 1 : s - 1));
  const next = () => setActiveSlide((s) => (s === slides.length - 1 ? 0 : s + 1));

  return (
    <section className="pb-16 sm:pb-20 flex justify-center">
      <div className="w-[90%] sm:w-[80%]">
        <div className="relative rounded-3xl overflow-hidden px-6 sm:px-12 py-8 sm:py-10 text-center min-h-[60vh] sm:min-h-[90vh] flex flex-col justify-center"
          style={{
            background: "linear-gradient(135deg, #d4ece1 0%, #e6f4ed 30%, #d9f0e4 60%, #c8e6d8 100%)",
          }}
        >

          <div className="relative z-10">
            {/* Label */}
            <p className="text-[#2e7d5b]/70 text-xs sm:text-sm tracking-widest uppercase mb-2">
              {current.label}
            </p>

            {/* Title — fixed height to prevent layout shift */}
            <div className="h-16 sm:h-20 flex items-center justify-center mb-5 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A2B2F] italic">
                {current.title}
              </h2>
            </div>

            {/* Icon cluster — 7 icons in circular layout, clickable */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-5 sm:mb-6">
              {focusIcons.map((icon, i) => {
                const angle = (i * 360) / 7 - 90;
                const rad = (angle * Math.PI) / 180;
                const radius = 42;
                const x = 50 + radius * Math.cos(rad);
                const y = 50 + radius * Math.sin(rad);
                return (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`absolute w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center transition-colors duration-300 cursor-pointer focus:outline-none ${
                      current.activeIcon === i
                        ? "bg-white border-white text-[#2e7d5b] shadow-lg"
                        : "border-[#2e7d5b]/30 text-[#2e7d5b]/60 hover:border-[#2e7d5b]/60 hover:text-[#2e7d5b]"
                    }`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <span className="text-sm sm:text-base font-bold">{i + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Description — fixed height to prevent layout shift */}
            <div className="h-20 sm:h-16 flex items-start justify-center mb-5 sm:mb-6">
              <p className="text-[#2A2B2F]/70 text-sm sm:text-base leading-relaxed max-w-lg mx-auto italic">
                {current.description}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-[#2e7d5b]/30 flex items-center justify-center text-[#2e7d5b]/70 hover:bg-[#2e7d5b]/10 hover:text-[#2e7d5b] transition-colors focus:outline-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-[#2e7d5b]/30 flex items-center justify-center text-[#2e7d5b]/70 hover:bg-[#2e7d5b]/10 hover:text-[#2e7d5b] transition-colors focus:outline-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpezielleTherapien() {
  const { t } = useTranslation();
  const [openAccordion, setOpenAccordion] = useState(null);
  const testimonialsRef = useRef(null);

  const scrollTestimonials = (direction) => {
    if (testimonialsRef.current) {
      const scrollAmount = 320;
      testimonialsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const gridAnim = useScrollFadeIn();
  const focusAnim = useScrollFadeIn();
  const testimonialsAnim = useScrollFadeIn();

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const therapies = [
    {
      title: t("spezielleTherapien.therapies.prophylaxe.title"),
      image: "/Assets/stress.jfif",
    },
    {
      title: t("spezielleTherapien.therapies.implantologie.title"),
      image: "/Assets/stress.jfif",
    },
    {
      title: t("spezielleTherapien.therapies.aesthetik.title"),
      image: "/Assets/stress.jfif",
    },
    {
      title: t("spezielleTherapien.therapies.parodontologie.title"),
      image: "/Assets/stress.jfif",
    },
    {
      title: t("spezielleTherapien.therapies.endodontie.title"),
      image: "/Assets/stress.jfif",
    },
    {
      title: t("spezielleTherapien.therapies.kieferorthopaedie.title"),
      image: "/Assets/stress.jfif",
    },
  ];

  const testimonials = [
    { quote: t("spezielleTherapien.testimonials.t1.quote"), name: t("spezielleTherapien.testimonials.t1.name") },
    { quote: t("spezielleTherapien.testimonials.t2.quote"), name: t("spezielleTherapien.testimonials.t2.name") },
    { quote: t("spezielleTherapien.testimonials.t3.quote"), name: t("spezielleTherapien.testimonials.t3.name") },
    { quote: t("spezielleTherapien.testimonials.t4.quote"), name: t("spezielleTherapien.testimonials.t4.name") },
    { quote: t("spezielleTherapien.testimonials.t5.quote"), name: t("spezielleTherapien.testimonials.t5.name") },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* Hero Section — two-column layout */}
      <section className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left — Image */}
            <div className="lg:w-[60%] lg:-ml-8 flex-shrink-0">
              <div
                className="w-full aspect-[4/4.5] rounded-2xl overflow-hidden"
                style={{ backgroundColor: "#c4b8a8" }}
              >
                <img src="/Assets/Shukr.jpg" alt="Beratung" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Right — Content + Accordions */}
            <div className="lg:w-[45%] lg:-mr-[5%] flex flex-col justify-start">
              {/* Badge */}
              <span className="inline-block self-start text-xs font-semibold text-[#2e7d5b] bg-[#e6f4ed] px-3 py-1 rounded-full mb-5">
                45 Minuten
              </span>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A2B2F] mb-5 tracking-tight">
                {t("spezielleTherapien.hero.title")}
              </h1>

              {/* Location selector */}
              <div className="flex items-center gap-3 mb-5 text-sm text-gray-500">
                <span>{t("spezielleTherapien.hero.locationLabel")}</span>
                <a
                  href="https://www.doctolib.de/zahnarztpraxis/berlin/die-drei-zahnaerzte/booking/specialities?bookingFunnelSource=profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2e7d5b] font-semibold no-underline hover:underline flex items-center gap-1"
                >
                  {t("spezielleTherapien.hero.locationCta")}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                {t("spezielleTherapien.hero.description")}
              </p>

              {/* Accordions */}
              <div className="border-t border-gray-200">
                <AccordionItem
                  title={t("spezielleTherapien.accordion.a1.title")}
                  isOpen={openAccordion === 0}
                  onToggle={() => toggleAccordion(0)}
                >
                  <p>{t("spezielleTherapien.accordion.a1.content")}</p>
                </AccordionItem>
                <AccordionItem
                  title={t("spezielleTherapien.accordion.a2.title")}
                  isOpen={openAccordion === 1}
                  onToggle={() => toggleAccordion(1)}
                >
                  <p>{t("spezielleTherapien.accordion.a2.content")}</p>
                </AccordionItem>
                <AccordionItem
                  title={t("spezielleTherapien.accordion.a3.title")}
                  isOpen={openAccordion === 2}
                  onToggle={() => toggleAccordion(2)}
                >
                  <p>{t("spezielleTherapien.accordion.a3.content")}</p>
                </AccordionItem>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Therapy Cards Grid */}
      <section ref={gridAnim.ref} style={gridAnim.style} className="px-5 sm:px-8 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A2B2F] mb-8 sm:mb-10">
            {t("spezielleTherapien.grid.title")}.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
            {therapies.map((therapy, index) => (
              <TherapyCard key={index} {...therapy} />
            ))}
          </div>
        </div>
      </section>

      {/* Focus Carousel Section */}
      <div ref={focusAnim.ref} style={focusAnim.style}>
        <FocusCarousel t={t} />
      </div>

      {/* Testimonials Section */}
      <section ref={testimonialsAnim.ref} style={testimonialsAnim.style} className="pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2A2B2F]">
              {t("spezielleTherapien.testimonials.title")}
            </h2>
            <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1.5 shadow-sm border border-gray-100">
              <span className="text-sm font-bold text-[#2A2B2F]">4.9</span>
              <StarIcon />
              <span className="text-xs text-gray-400 ml-1">180+</span>
            </div>
          </div>
        </div>
        <div ref={testimonialsRef} className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 px-5 sm:px-8 pb-4" style={{ paddingLeft: "max(1.25rem, calc((100vw - 56rem) / 2 + 1.25rem))" }}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => scrollTestimonials("left")}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4 text-[#2A2B2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scrollTestimonials("right")}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4 text-[#2A2B2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 sm:px-8 pb-16 sm:pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2A2B2F] mb-4">
            {t("spezielleTherapien.bottomCta.title")}
          </h2>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">
            {t("spezielleTherapien.bottomCta.description")}
          </p>
          <a
            href="https://www.doctolib.de/zahnarztpraxis/berlin/die-drei-zahnaerzte/booking/specialities?bookingFunnelSource=profile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#422f40] text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#5a3d54] transition-colors duration-200 no-underline hover:no-underline shadow-sm"
          >
            {t("spezielleTherapien.hero.cta")}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}

export default SpezielleTherapien;
