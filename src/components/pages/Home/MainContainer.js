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
      <Holistic />
      <Specialistic />
      <HealthConcern />
      <HolisticFeatured />
      <HolisticProcess />
      <HolPractise />
      <HolMobApp />
      <Footer />
    </>
  );
};

export default MainContainer;
