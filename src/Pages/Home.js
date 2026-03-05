import { useEffect, useState } from "react";
import HomeVideo from "../Components/HomeVideo";
import useIsMobile from "../hooks/useIsMobile";
import ServicesCardssmaller2 from "../Components/ServicesCardssmaller2";
import NewServicesCardsMobile from "../Components/NewServicesCardsMobile";
import NewServicesCardsMobile2 from "../Components/NewServicesCardsMobile2";

import HeroLine from "../Components/text";
import OurPhilosophy from '../Components/OurPhilosophy.js';
import NewGridHoverEffect from '../Components/NewGridHoverEffect.js';
import ScrolledLines from "../Components/ScrolledLines";
import ScrollCards from "../Components/ScrollCards";
import ScrollCardsMobile from "../Components/ScrollCardsMobile";
import Carousel3D from "../Components/Carousel3D";
import FanCards from "../Components/FanCards";
import FanCardsMobile from "../Components/FanCardsMobile";
import FlipGrid from "../Components/FlipGrid";
import MobileImageSlider from "../Components/MobileImageSlider";
function Home() {
  const isMobile = useIsMobile();
  console.log("isMobile:", isMobile, "innerWidth:", window.innerWidth, "innerHeight:", window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (

    <div className="bg-black min-h-screen">
     
     {isMobile && <MobileImageSlider />}
     <HeroLine />
    
     
   

    <div id="services">
        {isMobile ? <NewServicesCardsMobile2 /> : <ServicesCardssmaller2 />}
      </div>
      

      <ScrolledLines />


      <div id="services">
        <NewGridHoverEffect />
      </div> 

    

      
        <div id="services">
        <OurPhilosophy/>
      </div>


     {/* Scroll Cards */}
     {isMobile ? <ScrollCardsMobile /> : <ScrollCards />}

     {/* 3D Carousel */}
     <Carousel3D />

     {/* Fan Cards */}
     {isMobile ? <FanCardsMobile /> : <FanCards />}

     {/* Flip Grid */}
     <FlipGrid />





      

      <div id="landing-page">
        <HomeVideo
          videoSrc="/docs4.mp4"
          mobileVideoSrc="/docsmobile.mp4"
          posterImage="/Assets/c.webp"
          windowWidth={windowWidth}
        />
      </div>


    </div>
  );
}

export default Home;
