function MentoringSection() {
  return (
    <section className="min-h-[80vh] flex flex-col lg:flex-row bg-white">
      {/* Left: Text content */}
      <div className="flex-1 flex flex-col justify-center px-8 py-16 lg:py-24 lg:px-16 lg:max-w-[50%]">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          ÄRZTLICHES MENTORING
        </h2>
        <p className="text-xl md:text-2xl text-gray-800 mb-2">
          WENIGER RATGEBER, MEHR
        </p>
        <p className="text-xl md:text-2xl text-gray-800 mb-6">
          <span className="border-b-4 border-teal-500 pb-1">RÜCKENWIND</span>
        </p>
        <p className="text-gray-700 mb-6">deinem Tempo, ohne Dogma.</p>
        <p className="text-gray-700 mb-4">
          Das Mentoring baut auf deiner medizinischen Beratung auf und hilft dir,
          den Plan - von{" "}
          <span className="border-b-2 border-teal-500">Ernährungsumstellung.</span>
        </p>
        <p className="text-gray-700 mb-2">
          <span className="border-b-2 border-teal-500">Schlafoptimierung,</span>{" "}
          <span className="border-b-2 border-teal-500">Stressmanagement,</span>{" "}
          <span className="border-b-2 border-teal-500">Sportmuster,</span> bis zum{" "}
          <span className="border-b-2 border-teal-500">
            Supplement-Plan/Infusionen
          </span>
        </p>
        <p className="text-gray-700 mb-8">im Alltag stabil umzusetzen.</p>
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-lg w-fit transition-colors">
          Info-Gespräch buchen
        </button>
      </div>

      {/* Right: Shukr image as background */}
      <div
        className="flex-1 min-h-[50vh] lg:min-h-[80vh] bg-cover bg-center bg-no-repeat rounded-l-2xl shadow-lg"
        style={{
          backgroundImage: "url(/Assets/Shukr.jpg)",
          backgroundPosition: "center right",
        }}
      >
        <div className="h-full flex flex-col justify-end items-end p-6 gap-3">
          <a
            href="https://www.doctolib.de"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <span className="block font-bold">Doctolib</span>
            <span className="block text-xs">Termin buchen</span>
          </a>
          <button className="bg-teal-400 hover:bg-teal-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            Nachricht senden
          </button>
        </div>
      </div>
    </section>
  );
}

export default MentoringSection;
