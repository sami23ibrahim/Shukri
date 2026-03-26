import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import MeinBuch from "./Pages/MeinBuch";
import SpezielleTherapien from "./Pages/SpezielleTherapien";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/mein-buch" element={<MeinBuch />} />
        <Route path="/spezielle-therapien" element={<SpezielleTherapien />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
