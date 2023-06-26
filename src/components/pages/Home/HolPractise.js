import React from "react";
import practiseLogo from "../../../images/home/OBJECTS.png";
const HolPractise = () => {
  return (
    <>
      <div className="flex bg-[#E2F6F3] mb-5">
        <div className="ml-6  ">
          <img
            src={practiseLogo}
            alt=""
            className="w-[100%] h-[30rem] md:w-[100%]"
          />
        </div>
        <div className="mt-20 flex-1">
          <h2 className="text-[#030303] font-sansRegular tracking-[3px] font-semibold text-[1.8rem]">
            Let's connect your practice
          </h2>
          <ul className="py-10">
            <li className="text-[#545871] py-[10px]">
              Get onboarded and allow us to connect the patient with you.
            </li>
            <li className="text-[#545871] py-[10px]">
              Answer medical queries & showcase your expertise
            </li>
            <li className="text-[#545871] py-[10px]">
              Grow your reach and experience.
            </li>
            <button className="py-2 mt-8 text-sm font-sansBold text-white bg-verifiCation px-6 rounded-full">
              List your practice on Holmeddoc
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HolPractise;
