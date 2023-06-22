import React from "react";

const SpecialistCard = ({ specialistData }) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between py-2 px-24 flex-wrap ">
        {specialistData?.map((item, index) => (
          <div
            className="flex w-full sm:flex-col md:w-1/5 pt-5 mr-3 cursor-pointer  rounded p-4 hover:border-2 hover:border-blue-500 hover:shadow-lg"
            key={index}
          >
            <div className="basis-[50%]">
              <img
                src={item.image}
                alt=""
                className="sm:h-[120px] sm:w-[134px]"
              />
            </div>
            <div className="h-[120px]">
              <h2 className="font-sansBold text-[18px] text-[#292F33] tracking-[3px] mt-5">
                {item.medical_speciality_name}
              </h2>
            </div>

            <div className="basis-[50%]">
              <p className="text-[#545871] font-sans text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SpecialistCard;
