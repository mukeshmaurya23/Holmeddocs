import React from "react";
import practiseLogo from "../../../images/home/OBJECTS.png";
import { Link } from "react-router-dom";

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
          <ul className="py-3 xl:py-10 lg:py-9 md:py-8 font-sansRegular font-semibold space-y-3 ">
            <li className="text-[#545871] py-2 text-[.9rem] 2xl:text-[1.2rem]">
              Get onboarded and allow us to connect the patient with you.
            </li>
            <li className="text-[#545871] py-2 text-[.9rem] 2xl:text-[1.2rem]">
              Answer medical queries & showcase your expertise
            </li>
            <li className="text-[#545871] py-2 text-[.9rem] 2xl:text-[1.2rem]">
              Grow your reach and experience.
            </li>
            <button className="text-[.7rem] cursor-pointer md:text-[.9rem] px-8 py-2 2xl:py-3 mt-5 text-sm font-sansBold text-white  bg-verifiCation  rounded-full">
              <Link to="/under-maintenance " className="cursor-pointer">
                {" "}
                List your practice on Holmeddoc
              </Link>
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HolPractise;
