import React from "react";
import imageDefault from "../../../images/specialities/Ayurveda.png";
const SpecialistCard = ({ specialistData }) => {
  return (
    <>
      <div className="w-full flex justify-center px-5 md:px-0">
        <div className="mt-10 md:mt-20 sm:px-24 pb-6 w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-2 justify-between justify-items-center">
          {specialistData?.map((item, index) => (
            <div
              className="flex flex-col items-center md:items-start justify-between
              rounded-3xl pt-6 md:pl-6 pr-0 hover:border-[#b4dbd5] hover:shadow-xl border-2 border-white hover:cursor-pointer  md:max-w-[18rem] "
              key={index}
            >
              <div className="basis-[50%]">
                <img
                  src={imageDefault}
                  alt=""
                  className="h-[100px] w-[100px] sm:h-[120px] sm:w-[134px] "
                />
              </div>
              <div className="h-[120px]">
                <h2 className="font-sansBold text-[12px] md:text-[18px] lg:text-[18px] text-[#292F33] tracking-[3px] mt-5">
                  {item.medical_speciality_name}
                </h2>
              </div>

              <div className="hidden md:block basis-[50%]">
                <p className="text-[#545871] font-sans text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SpecialistCard;
