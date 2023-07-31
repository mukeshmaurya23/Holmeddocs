import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpecialistCard from "./SpecialistCard";
import loadingGif from "../../../images/icons/Loader.gif";

import { useSelector, useDispatch } from "react-redux";

//import { fetchSpecialties } from "../../../store/LocSpecSlice";

const Specialistic = () => {
  // const dispatch = useDispatch();
 


  const { specialties, specialtiesStatus, error } = useSelector(
    (state) => state.data
  );

  // const fetchSpecialtiesHandler = useCallback(() => {
  //   dispatch(fetchSpecialties("/patient/master/speciality"));
  // },[])
   
  // console.log("specialitiesxvfxft4rg4tg ", !!specialties.length)

  // useEffect(() => {
  // // if(!!specialties.length ){
  // //  console.log("null")
  // // }else {
  // //   fetchSpecialtiesHandler()
  // // }
 
  // dispatch(fetchSpecialties("/patient/master/speciality"));
  // }, []);

  return (
    <>
      <div className=" bg-[#ffffff] mb-16">
        <div className="text-center  mt-10">
          <p className="font-sansBold  tracking-[2px] md:text-[40px] sm:text-[28px] xs:text-[28px] xsm:text-[24px] 2xl:text-[2.6rem] 2xl:tracking-[6px] text-[#292F33]">
            Holistic fields
          </p>
          <div className="flex mt-7">
            <p className="font-sansBold items-center text-center flex-1 tracking-[3px] text-xl md:ml-[10rem] py-2 2xl:text-[1.6rem] text-[#292F33]">
              15 + Specialities
            </p>
            <Link to="/specialist" className="hidden md:block">
              <button className=" pr-10 text-[#CF8B15] tracking-[3px] text-md 2xl:text-[1.3rem] py-2 font-semibold font-sansRegular">
                See More
              </button>
            </Link>
          </div>
        </div>
        {specialtiesStatus === "loading" ? (
          <>
            <div className="flex justify-center  ">
              <img src={loadingGif} alt="" />
            </div>
          </>
        ) : specialtiesStatus == "failed" ? (
          <div className="flex justify-center  ">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <SpecialistCard specialistData={specialties?.slice(0, 4)} />
        )}
      </div>
    </>
  );
};

export default Specialistic;
