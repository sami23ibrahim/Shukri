import { useEffect, useState } from "react";
import HomeVideo from "../Components/HomeVideo";
import useIsMobile from "../hooks/useIsMobile";
import NewServicesCardsMobile from "../Components/NewServicesCardsMobile";
import NewServicesCardsMobile2 from "../Components/NewServicesCardsMobile2";

import HeroLine from "../Components/text";
import NewGridHoverEffect from '../Components/NewGridHoverEffect.js';
import NewGridHoverEffectMobile from '../Components/NewGridHoverEffectMobile.js';
import ScrolledLines from "../Components/ScrolledLines";
import ScrolledLinesV2 from "../Components/ScrolledLinesV2";
import ScrolledLinesV3 from "../Components/ScrolledLinesV3";

import ScrollCards from "../Components/ScrollCards";
import ScrollCardsMobile from "../Components/ScrollCardsMobile";
import Carousel3D from "../Components/Carousel3D";
import FanCards from "../Components/FanCards";
import FanCardsMobile from "../Components/FanCardsMobile";
import FlipGrid from "../Components/FlipGrid";
import MobileImageSlider from "../Components/MobileImageSlider";
import Testimonials from "../Components/Testimonials";
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

    <div className="bg-[#FAF9F6] min-h-screen">
     
    
     {isMobile && <MobileImageSlider />}

     <ScrolledLinesV3 />
     <ScrolledLines />

  
   
      

    <div id="services">
        {isMobile ? <NewGridHoverEffectMobile /> : <NewGridHoverEffect />}
      </div>
  
    {/* Fan Cards */}
    {isMobile ? <FanCardsMobile /> : <FanCards />}

    

    {/* 3D Carousel */}
    {/* <Carousel3D /> */}



{/* Flip Grid */}
     <FlipGrid />

     {/* Scroll Cards */}
     {/* {isMobile ? <ScrollCardsMobile /> : <ScrollCards />} */}

     <Testimonials />

     {/* <HeroLine /> */}


     {isMobile && <MobileImageSlider />}



 

{/*      
     <ScrolledLinesV2 /> */}
  




      

      {/* <div id="landing-page">
        <HomeVideo
          videoSrc="/docs4.mp4"
          mobileVideoSrc="/docsmobile.mp4"
          posterImage="/Assets/c.webp"
          windowWidth={windowWidth}
        />
      </div> */}


    </div>
  );
}

export default Home;
