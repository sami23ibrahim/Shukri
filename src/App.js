import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import MeinBuch from "./Pages/MeinBuch";
import SpezielleTherapien from "./Pages/SpezielleTherapien";
import HealthCheck from "./Pages/HealthCheck";
import Experience from "./Pages/Experience";
import Infusions from "./Pages/Infusions";
import UeberMich from "./Pages/UeberMich";
import Extras from "./Pages/Extras";
import KoerperlicheSymptome from "./Pages/KoerperlicheSymptome";
import PraeventionLongevity from "./Pages/PraeventionLongevity";
import Psychotherapie from "./Pages/Psychotherapie";
import Footer from "./Components/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/infusions" element={<Infusions />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/mein-buch" element={<MeinBuch />} />
        <Route path="/spezielle-therapien" element={<SpezielleTherapien />} />
        <Route path="/health-check" element={<HealthCheck />} />
        <Route path="/ueber-mich" element={<UeberMich />} />
        <Route path="/extras" element={<Extras />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/koerperliche-symptome" element={<KoerperlicheSymptome />} />
        <Route path="/praevention-longevity" element={<PraeventionLongevity />} />
        <Route path="/psychotherapie" element={<Psychotherapie />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
