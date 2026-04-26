import Seo from "../Components/Seo";

function MeinBuch() {
  return (
    <div className="min-h-screen pt-24 px-4">
      <Seo
        path="/mein-buch"
        title="Mein Buch – Dr. Shukri Jarmoukli"
        description="Das Buch von Dr. Shukri Jarmoukli zu funktioneller Medizin, Prävention und Longevity – ein Wegweiser für nachhaltige Gesundheit."
      />
      <h1 className="text-2xl font-bold">Mein Buch</h1>
    </div>
  );
}

export default MeinBuch;
