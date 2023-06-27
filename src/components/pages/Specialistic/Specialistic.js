import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpecialistCard from "./SpecialistCard";
import loadingGif from "../../../images/icons/Loader.gif";
const Specialistic = () => {
  const [specialistData, setSpecialistData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://skyonliners.com/demo/holmeddoc/patient/master/speciality",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic YWRtaW46bXlwY290",
            platform: "web",
          },
        }
      );
      const data = await response.json();
      setSpecialistData(data?.data?.result.slice(0, 4));
    };

    fetchData();
  }, []);
  console.log(specialistData);

  return (
    <>
      <div className=" bg-[#ffffff]">
        <div className="text-center  mt-10">
          <p className="font-sansBold tracking-[5px] md:text-[30px] sm:text-[28px] xs:text-[28px] xsm:text-[24px] text-[#292F33]">
            Holistic fields
          </p>
          <div className="flex mt-7">
            <p className="font-sansBold items-center flex-1 tracking-[3px] text-xl md:ml-[6rem] text-[#292F33]">
              15 + Specialities
            </p>
            <Link to="/specialist" className="hidden md:block">
              <button className=" pr-10 text-[#CF8B15] tracking-[3px] text-md font-semibold font-sansRegular">
                See More
              </button>
            </Link>
          </div>
        </div>
        {specialistData.length === 0 ? (
          <>
            <div className="flex justify-center  ">
              <img src={loadingGif} alt="" />
            </div>
          </>
        ) : null}
        <SpecialistCard specialistData={specialistData} />
      </div>
    </>
  );
};

export default Specialistic;
