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
      <div className="flex flex-col md:flex-row justify-between bg-[#E2F6F3] mb-5 p-[20px] relative 2xl:h-[36rem]">
        <div className="absolute left-3 -top-8">
          <img
            src={practiseLogo}
            alt=""
            className="w-[100%]  lg:h-[28rem] xl:h-[28rem]  md:h-[27rem] sm:h-[25rem] xs:h-[20rem] xsm:h-[17rem] 2xl:h-[38rem] md:w-[100%]"
          />
        </div>
        <div className="mt-10 sm:mt-[28rem] xs:mt-[19rem] xsm:mt-[17rem] md:mt-20 lg:mt-20 xl:mt-20 md:ml-[35rem] 2xl:ml-[50rem]">
          <h2 className="text-[#030303] font-sansRegular tracking-[3px] font-semibold text-[1.3rem] sm:text-[1.8rem] 2xl:text-[2.5rem] lg:text-[1.8rem] xl:text-[2rem]">
            Let's connect your practice
          </h2>
          <ul className="py-3 xl:py-10 lg:py-9 md:py-8">
            <li className="text-[#545871] py-2 text-[.9rem] 2xl:text-[1.4rem]">
              Get onboarded and allow us to connect the patient with you.
            </li>
            <li className="text-[#545871] py-2 text-[.9rem] 2xl:text-[1.4rem]">
              Answer medical queries & showcase your expertise
            </li>
            <li className="text-[#545871] py-2 text-[.9rem] 2xl:text-[1.4rem]">
              Grow your reach and experience.
            </li>
            <button className="text-[.7rem] md:text-[.8rem] px-8 py-2 mt-5 text-sm font-sansBold text-white  bg-verifiCation  rounded-full">
              List your practice on Holmeddoc
            </button>
          </ul>
        </div>
      </div>

      {/* <div class="bg-[#E2F6F3] md:h-[29rem] lg:h-[32rem] xl:h-[38rem] grid md:grid-cols-2 items-center justify-center text-black px-10 font-sansRegular font-semibold">
        <img
          class="md:h-[30rem] lg:h-[34rem] xl:h-[40rem] mt-[-2rem] sm:-mt-[1rem] lg:mt-[-2rem]"
          alt="Practice"
          src={practiseLogo}
        />
        <div class="space-y-6 md:space-y-5 xl:space-y-12 pb-5  flex items-center flex-col md:items-start">
          <h1 class="mt-5 lg:mt-0 text-size-8 md:text-3xl lg:text-medium font-normal lg:leading-[3.5rem] tracking-widest text-left">
            Let's connect your practice
          </h1>
          <ul class="space-y-2 xl:space-y-8 md:pl-4 text-[grey] leading-[2rem] md:leading-[2.8rem] xl:leading-none text-size-4 md:text-xl font-light text-left">
            <li>Get onboarded and allow us to connect the patient with you.</li>
            <li>Answer medical queries & showcase your expertise.</li>
            <li>Grow your reach and experience.</li>
          </ul>
          <button className="text-[.7rem] md:text-[rem] px-8 py-2 mt-5 text-sm font-sansBold text-white  bg-verifiCation  rounded-full">
            List your practice on Holmeddoc
          </button>
        </div>
      </div> */}
    </>
  );
};

export default HolPractise;
