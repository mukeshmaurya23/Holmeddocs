import React, { useState, useEffect } from "react";
import Navbar from "../../../../UI/Navbar";
import SpecialistCard from "./SpecialistCard";
import Navbar2 from "../../../../UI/Navbar2";
import loadingGif from "../../../../images/icons/Loader.gif";
import Footer from "../../../../UI/Footer";
const AllSpecialistic = () => {
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

      setSpecialistData(data?.data?.result);
    };

    fetchData();
  }, []);

  return specialistData.length === 0 ? (
    <>
      <div className="flex justify-center items-center ">
        <img src={loadingGif} alt="" />
      </div>
    </>
  ) : (
    <>
      <div className="flex flex-col justify-center items-center mt-[8rem] ">
        <h2 className="font-sansBold text-2xl ml-6 text-[#292F33] font-semibold tracking-[3px]">
          Speciality
        </h2>
        <p className="text-center text-[#545871] text-sm px-[10rem] py-7">
          Every medical specialist shares one common goal: to help patients get
          healthy or stay healthy. But each one has very specific skills and{" "}
          competencies that make them an integral member of the medical field.
          Browse through each specialty and select as per your need.
        </p>
      </div>
      <div>
        <SpecialistCard specialistData={specialistData} />
      </div>
      <Footer />
    </>
  );
};

export default AllSpecialistic;
