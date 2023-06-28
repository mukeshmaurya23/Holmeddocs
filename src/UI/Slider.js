import React, { useState, useEffect, useRef } from "react";
import "./Slider.css";
import { slides } from "../constant";
const Slider = () => {
  const delay = 2500;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="overflow-hidden ml-4 md:ml-8">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {slides.map((item, index) => (
          <div className="inline-block  w-[100%] rounded-md" key={index}>
            <div className="flex flex-col md:flex-row">
              <img
                src={item.image}
                alt=""
                className=" h-[120px] md:w-[170px] md:h-[150px] w-[100px] xsm:w-full xsm:h-auto sm:w-[200px] xs:w-[200px] rounded-md"
              />

              <div className="flex flex-col mt-5 px-4">
                <h1 className="text-[#0C0B0B] font-sansBold text-[1.3rem]">
                  {item.title}
                </h1>
                <h1 className="text-[#0C0B0B] mt-2 font-sansBold text-[.8rem]">
                  {item.subtitle}
                </h1>
                <p
                  style={{
                    whiteSpace: "break-spaces",
                    overflow: "hidden",
                  }}
                  className="text-[#545871] mt-4 text-[.8rem] font-sansRegular"
                >
                  {item.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="slideshowDots flex justify-center items-center">
        {slides.map((_, idx) => (
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
