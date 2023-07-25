import React from "react";
import ourProcess from "../../../images/home/OurProcess.png";
import Book from "../../../images/home/BookNew.svg";
import officeNew from "../../../images/home/OfficeNew.svg";
import processSearch from "../../../images/home/ProcessSearch.svg";
const HolisticProcess = () => {
  return (
    <>
      <div className="flex mb-10 flex-col lg:flex-row  xl:flex-row md:justify-center md:items-center max-w-full">
        <div>
          <h2 className="md:px-16 sm:px-16 font-sansRegular font-semibold text-[#292F33] tracking-[4px] mb-4  text-[1.4rem] md:text-[2.5rem] sm:text-[2.2] sm:text-center xs:text-center xsm:text-center ">
            Our Process
          </h2>
          <img
            src={ourProcess}
            alt=""
            className="w-[400px] hidden lg:block  xl:block ml-10 h-auto 2xl:w-[500px] object-contain"
          />
        </div>
        <div className="py-7 md:py-16 sm:py-16 lg:py-16 xl:py-16 2xl:py-16  flex-1">
          <h2 className="px-16 font-sansRegular text-[1rem] md:text-[1.7rem] 2xl:px-[9rem] sm:text-[1.5rem] xl:text-[1.9rem] 2xl:text-[2rem] text-gray-800   xl:leading-[3rem] pb-3 text-center md:text-left ">
            Instant appointment with Holistic Practitioners
          </h2>
          <p className="text-[#545871] text-[.8rem] md:text-[1.1rem] px-16 2xl:px-[9rem] text-center md:text-left">
            Get onboarded and allow us to connect you a with a holistic
            practitioner near you!
          </p>
          <div className="flex justify-evenly cursor-pointer w-full px-[3rem] mt-10 sm:flex-col sm:items-center xs:flex-col xs:items-center xsm:flex-col xsm:items-center md:flex-row md:items-start lg:flex-row lg:items-start ">
            <div className="flex flex-col   sm:items-center xs:items-center xsm:items-center sm:space-y-3 sm:mb-2 xsm:space-y-2 xs:space-y-3">
              <div className=" relative">
                <h1 className="font-bold text-[45px] md:text-[35px] lg:text-[45px] px-2 tracking-[8px] font-basic-sans-regular">
                  01
                </h1>
                <div className="h-5 md:h-4 lg:h-5 w-[70px] md:w-[60px] lg:w-[70px] bg-[#E2f6f3] -mt-[36px] md:-mt-[28px] lg:-mt-[36px]"></div>
              </div>
              <img
                src={processSearch}
                alt=""
                className="w-[50px] mt-2 h-[100px] md:w-[70px] sm:w-[70px] lg:w-[70px] xl:w-[70px] 2xl:w-[70px]"
              />
              <p className="text-[#292F33] text-[1rem] font-semibold font-sansRegular sm:hidden lg:block md:block xl:block">
                Find Holistic
              </p>
              <p className="text-[#292F33] text-[1rem] text-center font-semibold font-sansRegular sm:hidden lg:block md:block xl:block">
                Practitioners
              </p>
              <p className="text-[#292F33] text-[1rem] text-center font-sansBold md:hidden lg:hidden xl:hidden sm:block">
                Find Holistic Practitioners
              </p>
            </div>
            <div className="sm:hidden xs:hidden xsm:hidden lg:block md:block xl:block 2xl:block border-l h-[240px] border-gray-300"></div>
            <div className="sm:block xs:block xsm:block border-b w-full mt-3 border-gray-300 md:hidden"></div>
            {/* <div className="h-[900px]">|</div> */}
            <div className="flex flex-col sm:items-center xs:items-center xsm:items-center sm:space-y-3 xsm:space-y-2 xs:space-y-3 sm:mb-2 ">
              <div className=" relative">
                <h1 className="font-bold text-[45px] md:text-[35px] lg:text-[45px] px-2 tracking-[8px] font-basic-sans-regular">
                  02
                </h1>
                <div className="h-5 md:h-4 lg:h-5 w-[70px] md:w-[60px] lg:w-[70px] bg-[#E2f6f3] -mt-[36px] md:-mt-[28px] lg:-mt-[36px]"></div>
              </div>
              <img
                src={Book}
                alt=""
                className="w-[50px] mt-2 h-[100px] md:w-[70px] sm:w-[70px] lg:w-[70px] xl:w-[70px] 2xl:w-[70px]"
              />
              <p className="text-[#292F33] text-[1rem] font-semibold font-sansRegular">
                Book appointment
              </p>
            </div>
            <div className="sm:hidden xs:hidden xsm:hidden lg:block md:block xl:block 2xl:block border-l h-[240px] border-gray-300"></div>
            <div className="sm:block xs:block xsm:block border-b w-full mt-4 border-gray-300 md:hidden"></div>
            <div className="flex flex-col sm:items-center xs:items-center xsm:items-center xsm:space-y-2 xs:space-y-3 sm:space-y-3 sm:mb-2">
              <div className=" relative">
                <h1 className="font-bold text-[45px] md:text-[35px] lg:text-[45px] px-2 tracking-[8px] font-basic-sans-regular">
                  03
                </h1>
                <div className="h-5 md:h-4 lg:h-5 w-[70px] md:w-[60px] lg:w-[70px] bg-[#E2f6f3] -mt-[36px] md:-mt-[28px] lg:-mt-[36px]"></div>
              </div>
              <img
                src={officeNew}
                alt=""
                className="w-[50px] mt-2 h-[100px] md:w-[70px] sm:w-[70px] lg:w-[70px] xl:w-[70px] 2xl:w-[70px]"
              />
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
