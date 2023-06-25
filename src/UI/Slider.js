import React, { useState, useEffect, useRef } from "react";
import "./Slider.css";
const Slider = () => {
  const slides = [
    {
      image: require("../images/home/Doctor.jpg"),
      title: "Lindsay M.",
      subtitle: "Vancouver, BC",
      text: "Lindsay was raised in Atlanta Georgia. She graduated from the University of Texas where she earned her degree in human biology...",
    },
    {
      image: require("../images/home/Doctor.jpg"),
      title: "Lindsay M.",
      subtitle: "Vancouver, BC",
      text: "Lindsay was raised in Atlanta Georgia. She graduated from the University of Texas where she earned her degree in human biology...",
    },
    {
      image: require("../images/home/Doctor.jpg"),
      title: "Lindsay M.",
      subtitle: "Vancouver, BC",
      text: "Lindsay was raised in Atlanta Georgia. She graduated from the University of Texas where she earned her degree in human biology...",
    },
  ];
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
    <div className="overflow-hidden ml-8">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {slides.map((item, index) => (
          <>
            <div
              className="inline-block h-[200px] w-[100%] rounded-md"
              key={index}
            >
              <div className="flex">
                <img src={item.image} alt="" className="w-[200px] h-auto" />

                <div className="flex flex-col mt-5 px-4">
                  <h1 className="text-[#0C0B0B] font-sansBold text-[1.3rem]">
                    {item.title}
                  </h1>
                  <h1 className="text-[#0C0B0B] mt-2 font-sansBold text-[.8rem]">
                    {item.subtitle}
                  </h1>
                  <p
                    className="text-[#545871] mt-4  text-[.8rem] font-sansRegular "
                    style={{
                      whiteSpace: "break-spaces",
                      overflow: "hidden",

                      width: "300px",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="slideshowDots">
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
