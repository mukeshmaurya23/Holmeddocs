import React from "react";

const Holistic = () => {
  return (
    <div class="h-[70vh] bg-[#E2F6F3]">
      <div className="bg-[#E2F6F3]">
        <div className="pt-44 pb-36 space-y-5">
          <h1 class="flex font-poppinRegular justify-center space-x-6 font-medium tracking-widest text-gray-900  sm:text-[2.5rem] ">
            <p>HOLISTIC</p>
            <div class="flex items-center justify-center">
              <div class="relative">
                <p>M</p>
                <img
                  class="absolute top-2 h-[40px]  "
                  alt=""
                  src="https://holmeddoc-static.s3.ap-south-1.amazonaws.com/home/Leaf.png"
                />
              </div>
              <p>EDICINE</p>
            </div>
            <p>CONNECTING</p>
          </h1>

          <h1 class="flex font-poppinRegular justify-center space-x-6 font-medium tracking-widest text-gray-900  sm:text-[2.5rem] ">
            Mind. Body. Soul
          </h1>
         
        </div>
        <div className= "py-5 bg-white px-5 rounded-full mx-[100px]">
            <div className="flex flex-row items-center justify-between">
                <h1>Locatiom</h1>
                <h1>Locatiom</h1>
                <div className="flex flex-row items-center gap-5">
               <p>calendar</p>
                    <p>search</p>
                </div>
                <div>
                    <p>search</p>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Holistic;
