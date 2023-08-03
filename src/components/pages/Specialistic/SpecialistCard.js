import React, { useState, useEffect } from "react";
import imageDefault from "../../../images/specialities/Ayurveda.png";
import { Link, useNavigate } from "react-router-dom";
import { ImageArray } from "../../../constant";
import moment from "moment";

const SpecialistCard = ({ specialistData }) => {
  const imageJuggad = (speciality_url) => {
    const image = ImageArray.find((item) => item.name === speciality_url);
    return image?.image;
  };
  const [startDate] = useState(new Date());
  console.log(startDate, "im start date");
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedSpeciality) {
      navigate(
        `/doctor-listing?selectedSpeciality=${selectedSpeciality.name}_${selectedSpeciality.id}&date=${selectedSpeciality.date}`
      );
    }
  }, [selectedSpeciality, navigate]);

  const handleCardClick = (speciality) => {
    setSelectedSpeciality(speciality);
  };

  return (
    <>
      <div className="flex justify-center items-center px-5 md:px-0">
        <div className="mt-10 md:mt-20 sm:px-24 pb-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-flow-row xl:gap-5 md:gap-5 xsm:gap-2 lg:gap-5 2xl:gap-10 justify-between justify-items-center">
          {specialistData?.map((item, index) => (
            <div
              className="flex flex-col items-center md:items-start justify-center sm:items-center rounded-3xl pt-6 md:pl-6 2xl:pl-0 hover:border-[#b4dbd5] hover:shadow-xl border-2 border-white hover:cursor-pointer md:max-w-[20rem]"
              key={index}
              onClick={() =>
                handleCardClick({
                  name: item?.medical_speciality_name,
                  id: item?.id,
                  date: moment(startDate).format("YYYY-MM-DD"),
                })
              }
            >
              <div className="p-5">
                <div className="basis-[50%]">
                  <img
                    src={imageJuggad(item?.speciality_url) || imageDefault}
                    alt=""
                    className="xs:h-[100px] xs:w-[100px] sm:h-[120px] sm:w-[134px] xsm:h-[80px] xsm:w-[80px] 2xl:w-[200px] 2xl:h-[170px] object-contain"
                  />
                </div>
                <div className="md:h-[80px] sm:h-[80px] xs:h-[40px] xsm:h-[30px]">
                  <h2 className="font-sansBold text-[12px] sm:text-center xs:text-center xsm:text-center md:text-left md:text-[20px] lg:text-[21px] sm:text-[16px] text-[#292F33] tracking-[1px] mt-5">
                    {item?.medical_speciality_name}
                  </h2>
                </div>
                <div className="hidden md:block">
                  <p className="font-sansRegular text-[15px] font-semibold text-[#545871]">
                    {item?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link to="/specialist" className="flex justify-end md:hidden">
        <button className="p-5 text-[#CF8B15] tracking-[3px] text-md font-semibold font-sansRegular">
          See More
        </button>
      </Link>
    </>
  );
};

export default SpecialistCard;
