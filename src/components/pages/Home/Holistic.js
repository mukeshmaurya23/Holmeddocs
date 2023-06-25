import React from "react";
import leaf from "../../../images/home/Leaf.png";
import svgSearch from "../../../images/home/SearchBarIcon.svg";
import calendarSvg from "../../../images/home/Calendar.svg";
const Holistic = () => {
  return (
    <div class="h-[85vh] bg-[#E2F6F3]">
      <div className="bg-[#E2F6F3]">
        <div className="pt-44 pb-36 space-y-5">
          <h1 class="flex font-poppinRegular justify-center space-x-6 font-medium tracking-widest text-[#0C0B0B] sm:text-[2.5rem] ">
            <p>HOLISTIC</p>
            <div class="flex items-center justify-center">
              <div class="relative">
                <p>M</p>
                <img class="absolute top-2 h-[40px]  " alt="" src={leaf} />
              </div>
              <p>EDICINE</p>
            </div>
            <p>CONNECTING</p>
          </h1>

          <h1 class="flex font-poppinItalic justify-center space-x-6  tracking-widest font-[300] text-[#0C0B0B]  sm:text-[2.2rem] ">
            Mind. Body. Soul
          </h1>
        </div>
        <div className="py-2 bg-white px-5 rounded-full mx-[100px]">
          <div className="flex flex-row items-center justify-between">
            <h1 className="ml-5">Location</h1>
            <h1>Specialty</h1>
            <div className="flex flex-row items-center gap-5">
              <img src={calendarSvg} alt="" className="w-6 h-6" />
              <p>Today</p>
            </div>
            <div>
              <img src={svgSearch} alt="" className="w-20 h-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holistic;
