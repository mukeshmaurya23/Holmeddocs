import React, { useState, useEffect, useRef } from "react";
import "./Slider.css";
import { Link } from "react-router-dom";
import customAxios from "../axios/custom";
import { useSelector } from "react-redux";
import Spinner from "../UI/Spinner";
const Slider = () => {
  const delay = 3000;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  const {
    getDoctorsData: doctorData,
    getDoctorsDataStatus,
    getDoctorsDataError,
  } = useSelector((state) => state.api);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === doctorData?.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  if (getDoctorsDataStatus === "failed") {
    return <div>{getDoctorsDataError}</div>;
  }

  return getDoctorsDataStatus === "loading" ? (
    <Spinner />
  ) : (
    <div className="overflow-hidden ml-4 md:ml-8">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {doctorData &&
          doctorData.map((item) => (
            <Link
              to={`/doctor-listing/${item?.doctor_name
                .replace(/ /g, "_")
                .toLowerCase()}/${item?.id}`}
              key={item?.id}
            >
              <div className="inline-block  w-[100%] rounded-md">
                <div className="flex flex-col md:flex-row">
                  <img
                    src="https://thumbs.dreamstime.com/b/indian-doctor-mature-male-medical-standing-isolated-white-background-handsome-model-portrait-31871541.jpg"
                    alt=""
                    className="object-contain h-[120px] md:w-[170px] md:h-[150px] 2xl:h-[200px] 2xl:w-full w-[100px] xsm:w-full xsm:h-[200px] sm:w-[200px] sm:h-[200px] xs:w-[200px] xs:h-[200px] rounded-md"
                  />

                  <div className="flex flex-col mt-5 px-4 justify-center items-center md:justify-normal md:items-start">
                    <h1 className="text-[#0C0B0B] font-sansBold text-[1.3rem] 2xl:text-[1.5rem]">
                      {item?.doctor_name}
                    </h1>
                    <h1 className="text-[#0C0B0B] mt-2 font-sansBold text-[.8rem] 2xl:text-[.95rem]">
                      {item?.medical_speciality} ,{item?.country}
                    </h1>
                    <p
                      style={{
                        whiteSpace: "break-spaces",
                        display: "-webkit-box",
                        WebkitLineClamp: 3, // Show 4 lines
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      className="text-[#545871] mt-4 text-[.8rem]  2xl:text-[.95rem] font-sansRegular font-semibold"
                    >
                      {item?.doctor_bio}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>

      <div className="slideshowDots flex justify-center items-center">
        {doctorData?.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
