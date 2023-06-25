import React from "react";
import tree from "../../../images/home/Tree.png";
import Slider from "../../../UI/Slider";

const HolisticFeatured = () => {
  return (
    <>
      <div className="flex mb-3 py-12 p-2">
        <div className="max-w-[55%]  px-24">
          <h2 className="text-[#030303] font-sansBold tracking-[3px] font-semibold text-[2.1rem]">
            Featured Holistic
          </h2>
          <h2 className="m text-[#030303] font-sansBold tracking-[3px] mt-1 mb-12 font-semibold text-[2.1rem]">
            Practitioners
          </h2>
          <span className="px-[2rem]">
            <Slider />
          </span>
        </div>
        <div className="mr-3">
          <img src={tree} alt="" className="w-[100%] h-auto" />
        </div>
      </div>
    </>
  );
};

export default HolisticFeatured;
