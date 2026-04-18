function UnifiedBottomCta({
  title = "Lass uns zusammen das fehlende Puzzlestück finden.",
  subtitle = "Und daraus einen Plan erstellen, der wirklich für dich und dein Leben funktioniert.",
  buttonText = "Termin vereinbaren",
  href = "https://www.doctolib.de/arzt/berlin/shukri-jarmoukli/booking/new-patient?specialityId=1286&speciality_ids%5B%5D=1286&source=profile",
  className = "py-20 sm:py-28 px-5 sm:px-8",
}) {
  return (
    <section className={className}>
      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl border border-[#43a9ab]/20 bg-[#eef7f7] px-6 sm:px-10 py-12 sm:py-16 text-center shadow-sm">
          <h2
            className="text-[#43A9AB] font-black leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(1.35rem, 2.7vw, 2.35rem)" }}
          >
            {title}
          </h2>
          <p className="text-[#515757]/70 text-base sm:text-lg leading-relaxed mb-10 max-w-4xl mx-auto">
            {subtitle}
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#43a9ab] text-white px-9 sm:px-11 py-3.5 rounded-2xl text-lg sm:text-xl font-semibold hover:bg-[#389193] transition-colors duration-200 no-underline shadow-lg shadow-[#43a9ab]/20"
          >
            {buttonText}
            <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default UnifiedBottomCta;
