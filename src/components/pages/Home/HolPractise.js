// import React from "react";
// import practiseLogo from "../../../images/home/OBJECTS.png";
// const HolPractise = () => {
//   return (
//     <>
//       <div className="flex bg-[#E2F6F3] mb-5">
//         <div className="ml-6  ">
//           <img
//             src={practiseLogo}
//             alt=""
//             className="w-[100%] h-[30rem] md:w-[100%]"
//           />
//         </div>
//         <div className="mt-20 flex-1">
//           <h2 className="text-[#030303] font-sansRegular tracking-[3px] font-semibold text-[1.8rem]">
//             Let's connect your practice
//           </h2>
//           <ul className="py-10">
//             <li className="text-[#545871] py-[10px]">
//               Get onboarded and allow us to connect the patient with you.
//             </li>
//             <li className="text-[#545871] py-[10px]">
//               Answer medical queries & showcase your expertise
//             </li>
//             <li className="text-[#545871] py-[10px]">
//               Grow your reach and experience.
//             </li>
//             <button className="py-2 mt-8 text-sm font-sansBold text-white bg-verifiCation px-6 rounded-full">
//               List your practice on Holmeddoc
//             </button>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HolPractise;

import React from "react";
import practiseLogo from "../../../images/home/OBJECTS.png";

const HolPractise = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row bg-[#E2F6F3] mb-5 p-[20px]">
        <div className="">
          <img
            src={practiseLogo}
            alt=""
            className="w-full h-auto md:h-[30rem]"
          />
        </div>
        <div className="mt-10 sm:mt-20 md:mt-20 lg:mt-20 xl:mt-20 mr-5">
          <h2 className="text-[#030303] font-sansRegular tracking-[3px] font-semibold text-[1.3rem] sm:text-[1.8rem] lg:text-[1.8rem] xl:text-[2rem]">
            Let's connect your practice
          </h2>
          <ul className="py-3 xl:py-10 lg:py-9 md:py-8 ">
            <li className="text-[#545871] py-2 text-[.9rem]">
              Get onboarded and allow us to connect the patient with you.
            </li>
            <li className="text-[#545871] py-2 text-[.9rem] ">
              Answer medical queries & showcase your expertise
            </li>
            <li className="text-[#545871] py-2 text-[.9rem]">
              Grow your reach and experience.
            </li>
            <button className="text-[.7rem] md:text-[.8rem] px-8 py-2 mt-5 text-sm font-sansBold text-white  bg-verifiCation  rounded-full">
              List your practice on Holmeddoc
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HolPractise;
