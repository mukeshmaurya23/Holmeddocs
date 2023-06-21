import React, { useEffect, useState } from "react";

const Specialistic = () => {
  const [specialistData, setSpecialistData] = useState([]);
  const basic_token = "Basic YWRtaW46bXlwY290";

  useEffect(() => {
    const getSpecialistData = async () => {
      const response = await fetch(
        "http://192.168.1.35/holmeddoc/patient/master/speciality",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: basic_token,
            platform: "web",
          },
          
          
        }
      );
      const data = await response.json();
      console.log(data);
      setSpecialistData(data);
    };
    getSpecialistData();
  }, []);

  console.log(specialistData, "specialistData");

  return (
    <>
      <div className="container bg-[#ffffff]">
        <div className="text-center">
          <p className="font-sansBold tracking-[3px] font-semibold text-[#292F33]">
            Holistic fields
          </p>
          <div>
            <p className="font-sansBold text-sm tracking-[3px] text-[#292F33]">
              15 + Specialities
            </p>
            <button className="text-yellowText tracking-[3px] font-sansRegular">
              See More
            </button>
          </div>
        </div>
        <div className="flex flex-row  flex-wrap px-10 py-10 mt-10">
          {specialistData?.data?.result.map((item, index) => (
            <div className="flex flex-col w-1/5 items-center mb-6" key={index}>
              <img src={item.image} alt="" className="h-16 w-16" />
              <h2>{item.medical_speciality_name}</h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Specialistic;
