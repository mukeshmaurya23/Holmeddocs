import React, { useEffect, useState } from "react";

const Specialistic = () => {
  const [specialistData, setSpecialistData] = useState([]);
  const basic_token = "Basic YWRtaW46bXlwY290";

  useEffect(() => {
    const getSpecialistData = async () => {
      const response = await fetch(
        "http://skyonliners.com/demo/holmeddoc/patient/master/speciality",
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
      <div className=" bg-[#ffffff]">
        <div className="text-center  mt-10">
          <p className="font-sansBold tracking-[5px] text-4xl text-[#292F33]">
            Holistic fields
          </p>
          <div className="flex mt-7">
            <p className="font-sansBold items-center flex-1 tracking-[3px] text-xl ml-[6rem] text-[#292F33]">
              15 + Specialities
            </p>
            <button className=" pr-10 text-yellowText tracking-[3px] text-md font-semibold font-sansRegular">
              See More
            </button>
          </div>
        </div>

        <div className="flex ml-24 py-2  flex-wrap  mt-[5rem]">
          {specialistData?.data?.result.slice(0, 5).map((item, index) => (
            <div className="flex flex-col w-1/5  " key={index}>
              <div className="">
                <img
                  src={item.image}
                  alt=""
                  className="sm:h-[120px] sm:w-[134px]"
                />
              </div>
              <div className>
                <h2 className="font-sansBold text-xl text-[#292F33] tracking-[3px] mt-5">
                  {item.medical_speciality_name}
                </h2>
              </div>
              <div className="mt-4"></div>{" "}
              <div className="">
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

export default Specialistic;
