import React, { useState, useEffect } from "react";

import SpecialistCard from "./SpecialistCard";

import loadingGif from "../../../images/icons/Loader.gif";
import Footer from "../../../UI/Footer";
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
      <div class="flex flex-col items-center justify-center tracking-[0.25rem] md:mt-12 ">
        <div class="mt-5 pt-10 md:pt-16">
          <h1
            class="font-basic-sans-bold leading-[70px] font-bold
 text-3xl md:text-[32px] text-gray-900 tracking-[7.8px] text-center "
          >
            Speciality
          </h1>
        </div>
        <div class="mt-4 px-2 sm:px-5 lg:px-0 max-w-[1000px]">
          <p class="text-gray-500	font-basic-sans-regular md:text-base text-size-6 text-center md:mb-10 mb-8 tracking-[1.5px]">
            Every medical specialist shares one common goal: to help patients
            get healthy or stay healthy. But each one has very specific skills
            and <br class="hidden specialityMd:block" /> competencies that make
            them an integral member of the medical field.{" "}
            <br class="hidden specialityMd:block" /> Browse through each
            specialist and select as per your need.
          </p>
        </div>
      </div>
      <div>
        <SpecialistCard specialistData={specialistData} />
      </div>
      <Footer />
    </>
  );
};

export default AllSpecialistic;
