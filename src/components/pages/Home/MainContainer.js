import React from "react";
import Holistic from "./Holistic";
import Specialistic from "../Specialistic/Specialistic";
import Footer from "../../../UI/Footer";
import HolMobApp from "./HolMobApp";
import HolPractise from "./HolPractise";
import Slider from "../../../UI/Slider";
import HealthConcern from "./HealthConcern";
import HolisticFeatured from "./HolisticFeatured";
import HolisticProcess from "./HolisticProcess";

const MainContainer = () => {
  return (
    <>
      <div className="overflow-hidden">
        <Holistic />
        <div className="max-w-[1560px] mx-auto">
          <Specialistic />
          <HealthConcern />
          <HolisticFeatured />
          <HolisticProcess />
          <HolPractise />
          <HolMobApp />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainContainer;
