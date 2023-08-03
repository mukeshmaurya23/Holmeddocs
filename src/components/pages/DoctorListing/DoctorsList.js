import React, { useEffect } from "react";
import moment from "moment";
import loadingGif from "../../../images/icons/Loader.gif";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getRandomDoctorImage } from "../../../constant";

const DoctorsList = ({ doctorsList, status }) => {
  const { id, doctorName } = useParams();

  console.log(doctorsList, "doctorsList from listing------");
  const DateComp = ({ timeSlotDate }) => {
    const day = moment(timeSlotDate).format("DD");
    const month = moment(timeSlotDate).format("MMM");

    return (
      <>
        <div className="flex flex-col  ">
          <h3 className="text-[14px] font-sansSemibold">{day}</h3>
          <h3 className="text-[14px]">{month}</h3>
        </div>
      </>
    );
  };
  const naviagte = useNavigate();
  return doctorsList.length === 0 ? (
    <div className="flex justify-center items-center">
      <img src={loadingGif} alt="loading" />
    </div>
  ) : (
    <>
      {doctorsList?.map((doctor) => (
        <div
          className="flex flex-wrap sm:gap-5 mt-10 2xl:gap-[3rem] 2xl:px-[1.3rem] px-4 mb-6"
          key={doctor?.id}
        >
          <Link
            to={`/doctor-listing/${doctor?.doctor_name
              .replace(/ /g, "_")
              .toLowerCase()}/${doctor?.id}`}
            className="flex space-x-4"
          >
            {" "}
            <div className="rounded-md mb-3">
              <img
                src={getRandomDoctorImage()}
                alt="doctor"
                className="rounded-md  object-cover h-[160px] w-[160px]"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <h2 className="text-[#000000] font-sansBold  text-[1.2rem] ">
                {doctor?.doctor_name}
              </h2>
              <div className="flex gap-4 flex-row py-1 font-sansRegular font-bold text-[#000000]">
                <h3 className=" text-sm">{doctor?.medical_speciality?.[0]}</h3>
                <h3 className="text-sm">{doctor?.country?.[0]}</h3>
              </div>
              <h3 class="max-w-[200px] break-words text-sm font-sansRegular font-bold text-[#000000]">
                {doctor?.education?.[0]}
              </h3>

              <div className="gap-2 flex py-1 font-sansRegular font-bold text-[#000000] text-[13px] ">
                <div className="bg-[#b9eeeb] px-2 rounded-full">
                  <i class="fa fa-language py-2 "></i>
                </div>
                <div className="block md:hidden">
                  {doctor?.languages_spoken?.map((language, index) => (
                    <span className="px-1" key={language}>
                      {language}
                    </span>
                  ))}
                </div>
                <div className="hidden md:block">
                  {doctor?.languages_spoken?.map((language, index) => (
                    <span key={language}>
                      {language}
                      {index !== doctor?.languages_spoken?.length - 1 && " ,"}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 py-1 px-2">
                <i className="fa fa-user h-2 w-5" aria-hidden="true"></i>
                <p className="text-sm font-sansRegular font-bold text-[#000000]">
                  {doctor?.available_in?.map((available, index) => (
                    <span key={available}>
                      {available}
                      {index !== doctor?.available_in?.length - 1 && " , "}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </Link>
          <div className=" px-0 md:px-6 flex-1  ">
            <h2 className="px-0 md:px-16 font-sansBold text-[1.2rem] cursor-pointer ">
              Availability
            </h2>
            <div
              className="md:px-16 flex  gap-3 mt-5 cursor-pointer ml-0  md:ml-6 w-[330px] md:w-full overflow-x-scroll overflow-y-hidden md:overflow-hidden "
              id="hideMyScrollbar"
            >
              {doctor?.time_slots?.InPerson?.map((timeSlot, index) => (
                <div
                  onClick={() =>
                    timeSlot.value.length > 0 &&
                    naviagte(
                      `/doctor-listing/${doctor?.doctor_name
                        .replace(/ /g, "_")
                        .toLowerCase()}/${doctor?.id}`
                    )
                  }
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
            <div className="flex gap-10 py-5  justify-between items-center md:px-16">
              <Link
                to={`/doctor-listing/${doctor?.doctor_name
                  .replace(/ /g, "_")
                  .toLowerCase()}/${doctor?.id}`}
              >
                <button className="bg-verifiCation rounded-full font-sansSemibold xsm:text-[.8rem] text-[.9rem] mt-3 2xl:text-[1rem]  text-white px-5 py-2 2xl:py-3 2xl:px-8 2xl:mt-5">
                  Schedule an Appointment
                </button>
              </Link>

              <Link
                to={`/doctor-listing/${doctor?.doctor_name
                  .replace(/ /g, "_")
                  .toLowerCase()}/${doctor?.id}`}
              >
                <p className="text-[#CF8B15] cursor-pointer mt-3 underline 2xl:py-3 font-sansSemibold 2xl:mt-5">
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
