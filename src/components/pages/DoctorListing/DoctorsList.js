import React, { useEffect } from "react";

import loadingGif from "../../../images/icons/Loader.gif";
import { Link, useParams } from "react-router-dom";
const DoctorsList = ({ doctorsList, status }) => {
  const { id, doctorName } = useParams();
  console.log(id, doctorName, "doctorName a and id .........");

  console.log(doctorsList, "doctorsList from listing");
  const DateComp = ({ timeSlotDate }) => {
    const date = new Date(timeSlotDate);
    const day = date?.getDate();
    const month = date?.toLocaleString("en-US", { month: "short" });
    //const formattedDate = `${day} ${month}`;
    return (
      <>
        <div className="flex flex-col  ">
          <h3 className="text-[14px] font-sansSemibold">{day}</h3>
          <h3 className="text-[14px]">{month}</h3>
        </div>
      </>
    );
  };

  return doctorsList.length === 0 ? (
    <div className="flex justify-center items-center">
      <img src={loadingGif} alt="loading" />
    </div>
  ) : (
    <>
      {doctorsList?.map((doctor) => (
        <div
          className="flex flex-wrap sm:gap-5 2xl:gap-[3rem] 2xl:px-[2rem] px-4 mb-6"
          key={doctor?.id}
        >
          <div className="h-auto w-[160px] mb-3">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9jdG9yfGVufDB8fDB8fHww&w=1000&q=80"
              alt="doctor"
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[#292F33] font-Henriette font-semibold text-[1rem] ">
              {doctor?.doctor_name}
            </h2>
            <div className="flex gap-4 flex-row py-1 text-[#292F33]">
              <h3 className="font-sansRegular text-sm">
                {doctor?.medical_speciality?.[0]}
              </h3>
              <h3 className="font-sansRegular text-sm">
                {doctor?.country?.[0]}
              </h3>
            </div>
            <h3 class="max-w-[200px] break-words text-sm text-[#292F33]">
              Doctor of Medicine ({doctor?.education?.[0]})
            </h3>

            <p className="gap-2 flex py-1 font-sansSemibold text-[13px]">
              <div className="bg-[#b9eeeb] px-2 rounded-full">
                <i class="fa fa-language  "></i>
              </div>

              {doctor?.languages_spoken?.map((language, index) => (
                <span key={language}>
                  {language}
                  {index !== doctor?.languages_spoken?.length - 1 && " ,"}
                </span>
              ))}
            </p>
            <div className="flex gap-3 py-1 px-2">
              <i className="fa fa-user h-2 w-5" aria-hidden="true"></i>
              <p className="text-sm text-[#292F33]">
                {doctor?.available_in?.map((available, index) => (
                  <span key={available}>
                    {available}
                    {index !== doctor?.available_in?.length - 1 && " , "}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="px-6 2xl:px-[4rem]">
            <h2 className="px-3 font-Henriette text-[1.2rem] cursor-pointer">
              Availability
            </h2>
            <div className="flex flex-row flex-wrap gap-3 mt-5 cursor-pointer ml-6">
              {doctor?.time_slots?.InPerson?.map((timeSlot, index) => (
                <div
                  key={index}
                  className={` ${
                    timeSlot.value.length > 0
                      ? "bg-[#dcf9ff] hover:bg-verifiCation cursor-pointer hover:text-white"
                      : "bg-[#ecf0f1] cursor-not-allowed"
                  }    rounded p-1`}
                >
                  <p className="px-3 text-[12px] ">
                    {timeSlot?.day?.slice(0, 3)}
                  </p>
                  <p className="px-3">
                    <DateComp timeSlotDate={timeSlot?.date} />
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-10 py-5 px-5 justify-between items-center">
              <Link to={`/doctor-listing/${doctor?.doctor_name}/${doctor?.id}`}>
                <button className="bg-verifiCation rounded-full font-sansBold text-xs text-white px-5 py-2">
                  SCHEDULE AN APPOINTMENT
                </button>
              </Link>

              <Link to={`/doctor-listing/${doctor?.doctor_name}/${doctor?.id}`}>
                <p className="text-[#CF8B15] cursor-pointer underline">
                  View More
                </p>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DoctorsList;
