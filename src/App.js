import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import BlogPost from "./Pages/BlogPost";
import Admin from "./Pages/Admin";
import BlogEditor from "./Pages/BlogEditor";
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
import Beratung from "./Pages/Beratung";
import Mentoring from "./Pages/Mentoring";
import TherapieDetail from "./Pages/TherapieDetail";
import LegalNotice from "./Pages/LegalNotice";
import Footer from "./Components/Footer";
import LanguageSwitcher from "./Components/LanguageSwitcher";
import HtmlLang from "./Components/HtmlLang";
import useLanguage from "./hooks/useLanguage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LanguageActivator() {
  useLanguage();
  return null;
}

function ConditionalSwitcher() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return null;
  return <LanguageSwitcher />;
}

function App() {
  return (
    <BrowserRouter>
      <HtmlLang />
      <LanguageActivator />
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* DE (default, no prefix) */}
        <Route path="/" element={<Home />} />
        <Route path="/infusions" element={<Infusions />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/edit/:id" element={<BlogEditor />} />
        <Route path="/mein-buch" element={<MeinBuch />} />
        <Route path="/spezielle-therapien" element={<SpezielleTherapien />} />
        <Route path="/therapien/:slug" element={<TherapieDetail />} />
        <Route path="/rechtliches" element={<LegalNotice />} />
        <Route path="/diagnostik" element={<HealthCheck />} />
        <Route path="/ueber-mich" element={<UeberMich />} />
        <Route path="/ketamin" element={<Extras />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/koerperliche-symptome" element={<KoerperlicheSymptome />} />
        <Route path="/praevention-longevity" element={<PraeventionLongevity />} />
        <Route path="/psychotherapie" element={<Psychotherapie />} />
        <Route path="/beratung" element={<Beratung />} />
        <Route path="/mentoring" element={<Mentoring />} />

        {/* EN (mirrored, /en prefix) */}
        <Route path="/en" element={<Home />} />
        <Route path="/en/infusions" element={<Infusions />} />
        <Route path="/en/blog" element={<Blog />} />
        <Route path="/en/blog/:slug" element={<BlogPost />} />
        <Route path="/en/my-book" element={<MeinBuch />} />
        <Route path="/en/special-therapies" element={<SpezielleTherapien />} />
        <Route path="/en/legal-notice" element={<LegalNotice />} />
        <Route path="/en/diagnostics" element={<HealthCheck />} />
        <Route path="/en/about" element={<UeberMich />} />
        <Route path="/en/ketamine" element={<Extras />} />
        <Route path="/en/experience" element={<Experience />} />
        <Route path="/en/physical-symptoms" element={<KoerperlicheSymptome />} />
        <Route path="/en/prevention-longevity" element={<PraeventionLongevity />} />
        <Route path="/en/psychotherapy" element={<Psychotherapie />} />
        <Route path="/en/consultations" element={<Beratung />} />
        <Route path="/en/mentoring" element={<Mentoring />} />
      </Routes>
      <Footer />
      <ConditionalSwitcher />
    </BrowserRouter>
  );
}

export default App;
