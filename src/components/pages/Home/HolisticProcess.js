import React from "react";
import ourProcess from "../../../images/home/OurProcess.png";
import Book from "../../../images/home/BookNew.svg";
import officeNew from "../../../images/home/OfficeNew.svg";
import processSearch from "../../../images/home/ProcessSearch.svg";
const HolisticProcess = () => {
  return (
    <>
      <div className="flex mb-10">
        <div>
          <h2 className="px-24 text-[#292F33] tracking-[4px] mb-4 font-sansBold text-[2.4rem]">
            Our Process
          </h2>
          <img
            src={ourProcess}
            alt=""
            className="w-[400px] hidden md:block lg:block xl:block ml-10 h-auto"
          />
        </div>
        <div className="py-16  flex-1">
          <h2 className=" font-sansRegular text-[1.8rem]  text-gray-800   xl:leading-[3rem] pb-3 text-center md:text-left ">
            Instant appointment with Holistic Practitioners
          </h2>
          <p className="text-[#545871] text-[.8rem] md:text-[1.1rem]  text-center md:text-left">
            Get onboarded and allow us to connect you a with a holistic
            practitioner near you!
          </p>
          <div className="flex justify-evenly  mt-10">
            <div className="flex flex-col">
              <div className="md:self-start relative">
                <h1 className="font-bold text-[45px] md:text-[35px] lg:text-[45px] px-2 tracking-[8px] font-basic-sans-regular">
                  01
                </h1>
                <div className="h-5 md:h-4 lg:h-5 w-[70px] md:w-[60px] lg:w-[70px] bg-[#E2f6f3] -mt-[36px] md:-mt-[28px] lg:-mt-[36px]"></div>
              </div>
              <img
                src={processSearch}
                alt=""
                className="w-[70px] mt-2 h-[100px]"
              />
              <p className="text-[#292F33] text-[1rem] font-semibold font-sansRegular">
                Find Holistic
              </p>
              <p className="text-[#292F33] text-[1rem] font-semibold font-sansRegular">
                Practitioners
              </p>
            </div>
            <div className="h-auto text-gray-300 border-l-2"></div>
            {/* <div className="h-[900px]">|</div> */}
            <div className="flex flex-col">
              <div className="md:self-start relative">
                <h1 className="font-bold text-[45px] md:text-[35px] lg:text-[45px] px-2 tracking-[8px] font-basic-sans-regular">
                  02
                </h1>
                <div className="h-5 md:h-4 lg:h-5 w-[70px] md:w-[60px] lg:w-[70px] bg-[#E2f6f3] -mt-[36px] md:-mt-[28px] lg:-mt-[36px]"></div>
              </div>
              <img src={Book} alt="" className="w-[70px] mt-2 h-[100px]" />
              <p className="text-[#292F33] text-[1rem] font-semibold font-sansRegular">
                Book appointment
              </p>
            </div>
            <div className="h-auto text-gray-300 border-l-2"></div>
            <div className="flex flex-col">
              <div className="md:self-start relative">
                <h1 className="font-bold text-[45px] md:text-[35px] lg:text-[45px] px-2 tracking-[8px] font-basic-sans-regular">
                  03
                </h1>
                <div className="h-5 md:h-4 lg:h-5 w-[70px] md:w-[60px] lg:w-[70px] bg-[#E2f6f3] -mt-[36px] md:-mt-[28px] lg:-mt-[36px]"></div>
              </div>
              <img src={officeNew} alt="" className="w-[70px] mt-2 h-[100px]" />
              <p className="text-[#292F33] text-[1rem] font-semibold font-sansRegular">
                Office / Telehealth
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HolisticProcess;
