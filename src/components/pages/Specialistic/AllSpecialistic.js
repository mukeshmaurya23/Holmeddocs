import React, { useEffect } from "react";

import SpecialistCard from "./SpecialistCard";

import loadingGif from "../../../images/icons/Loader.gif";
import Footer from "../../../UI/Footer";
import { useDispatch, useSelector } from "react-redux";
//import { fetchSpecialties } from "../../../store/LocSpecSlice";

const AllSpecialistic = () => {
  // const dispatch = useDispatch();
  const { specialties, specialtiesStatus } = useSelector((state) => state.data);
  // useEffect(() => {

  //   if (specialties === null) {
  //     dispatch(fetchSpecialties("/patient/master/speciality"));
  //   }
  // }, [dispatch, specialties]);

  return specialtiesStatus === "loading" ? (
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
        <div class="mt-4 px-2 sm:px-5 lg:px-0 max-w-[1080px]">
          <p class="font-sansRegular text-[.8rem] font-semibold text-[#545871] md:text-base text-size-6 text-center  mb-4 tracking-[1.5px]">
            Every medical specialist shares one common goal to help patients get
            healthy or stay healthy. But each one has very specific skills and{" "}
            <br class="hidden specialityMd:block" /> competencies that make them
            an integral member of the medical field.{" "}
            <br class="hidden specialityMd:block" /> Browse through each
            specialist and select as per your need.
          </p>
        </div>
      </div>
      <div>
        <SpecialistCard specialistData={specialties} />
      </div>
      <Footer />
    </>
  );
};

export default AllSpecialistic;
