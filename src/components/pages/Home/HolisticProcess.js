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
          <img src={ourProcess} alt="" className="w-[400px] ml-10 h-auto" />
        </div>
        <div>
          <h2 className=" font-sansRegular text-[2.2rem] mt-24 text-[#292F33]">
            Instant appointment with Holistic Practitioners
          </h2>
          <p className="text-[#545871] py-[10px]">
            Get onboarded and allow us to connect you a with a holistic
            practitioner near you!
          </p>
          <div className="flex justify-between ml-9 mt-10">
            <div className="flex flex-col">
              <h2 className="text-[2rem] text-[#292F33] font-sansBold">01</h2>
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
              <h2 className="text-[2rem] text-[#292F33] font-sansBold">02</h2>
              <img src={Book} alt="" className="w-[70px] mt-2 h-[100px]" />
              <p className="text-[#292F33] text-[1rem] font-semibold font-sansRegular">
                Book appointment
              </p>
            </div>
            <div className="h-auto text-gray-300 border-l-2"></div>
            <div className="flex flex-col">
              <h2 className="text-[2rem] text-[#292F33] font-sansBold">03</h2>
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
