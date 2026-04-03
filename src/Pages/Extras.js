import HeroLine from "../Components/text";
import ScrolledLines from "../Components/ScrolledLines";
import FlipGrid from "../Components/FlipGrid";
import MeinAnsatzSimple from "../Components/MeinAnsatzSimple";
import MobileImageSlider from "../Components/MobileImageSlider";
import useIsMobile from "../hooks/useIsMobile";

function Extras() {
  const isMobile = useIsMobile();
  return (
    <div className="bg-white min-h-screen pt-20">
      <HeroLine />
      <ScrolledLines />
      <MeinAnsatzSimple />
      <FlipGrid />
      {isMobile && <MobileImageSlider />}
    </div>
  );
}

export default Extras;
