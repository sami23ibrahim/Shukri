import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

const StarIcon = () => (
  <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

function TestimonialCard({ quote, name }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-[280px] sm:w-[320px] flex-shrink-0 p-6 sm:p-7 flex flex-col justify-between select-none min-h-[220px]">
      <div>
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">"{quote}"</p>
      </div>
      <p className="text-[#2A2B2F] font-semibold text-sm mt-4">{name}</p>
    </div>
  );
}

export default function Testimonials() {
  const { t } = useTranslation();
  const scrollRef = useRef(null);

  const testimonials = [
    { quote: t("healthCheck.testimonials.t1.quote"), name: t("healthCheck.testimonials.t1.name") },
    { quote: t("healthCheck.testimonials.t2.quote"), name: t("healthCheck.testimonials.t2.name") },
    { quote: t("healthCheck.testimonials.t3.quote"), name: t("healthCheck.testimonials.t3.name") },
    { quote: t("healthCheck.testimonials.t4.quote"), name: t("healthCheck.testimonials.t4.name") },
    { quote: t("healthCheck.testimonials.t5.quote"), name: t("healthCheck.testimonials.t5.name") },
    { quote: t("healthCheck.testimonials.t6.quote"), name: t("healthCheck.testimonials.t6.name") },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -340 : 340,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="pt-20 sm:pt-28 pb-20 sm:pb-28">
      <div className="px-5 sm:px-8 md:px-10 mb-12">
        <div className="flex items-end justify-between">
          <h2 className="text-[#2A2B2F] font-black leading-[0.85] tracking-tighter text-left max-w-[50%]" style={{ fontSize: "clamp(2.2rem, 7vw, 6rem)" }}>
            {t("healthCheck.testimonialsSection.title")}
          </h2>
          <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1.5 shadow-sm border border-gray-100">
            <span className="text-sm font-bold text-[#2A2B2F]">4.9</span>
            <StarIcon />
            <span className="text-xs text-gray-400 ml-1">180+</span>
          </div>
        </div>
      </div>
      <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 px-5 sm:px-8 pb-4" style={{ paddingLeft: "max(1.25rem, calc((100vw - 56rem) / 2 + 1.25rem))" }}>
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} {...testimonial} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 mt-6">
        <button onClick={() => scroll("left")} className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
          <svg className="w-4 h-4 text-[#2A2B2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={() => scroll("right")} className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
          <svg className="w-4 h-4 text-[#2A2B2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
