import React, { useState, useRef, useEffect } from "react";
import grayDropDown from "../../../images/Login/GrayDropdown.png";

const dummyData = [
  {
    id: 1,
    text: "Fatigue",
    data: [
      {
        p1: "Cure by Treatment",
        p2: "Cure by Treatment",
        p3: "Cure by Treatment",
        p4: "Cure by Treatment",
      },
    ],
  },
  {
    id: 2,
    text: "High Blood Pressure",
    data: [
      {
        p1: "Cure by Prevention",
        p2: "Cure by Treatment",
        p3: "Cure by Treatment",
        p4: "Cure by Treatment",
      },
    ],
  },
  {
    id: 3,
    text: "Diabetes",
    data: [
      {
        p1: "Cure by Treatment",
        p2: "Cure by Treatment",
        p3: "Cure by Treatment",
        p4: "Cure by Treatment",
      },
    ],
  },
  {
    id: 4,
    text: "Obesity",
    data: [
      {
        p1: "Cure by Treatment",
        p2: "Cure by Treatment",
        p3: "Cure by Treatment",
        p4: "Cure by Treatment",
      },
    ],
  },
];

const HealthConcern = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [show, setShow] = useState(false);
  const dropdownContentRef = useRef(null);

  const handleItemClick = (itemId) => {
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === itemId ? null : itemId
    );
    setShow(true);
  };

  const handleBlur = () => {
    setShow(false);
  };

  useEffect(() => {
    console.log("concern");
    const setDropdownContentWidth = () => {
      if (dropdownContentRef.current) {
        const parentWidth = dropdownContentRef.current.parentNode.offsetWidth;
        dropdownContentRef.current.style.width = `${parentWidth}px`;
      }
    };

    setDropdownContentWidth();
    window.addEventListener("resize", setDropdownContentWidth);

    return () => {
      window.removeEventListener("resize", setDropdownContentWidth);
    };
  });
  return (
    <>
      <div className="bg-healthConcern py-12 h-[250px]">
        <h2 className="text-[1.9rem] tracking-[4px] font-sansBold px-24">
          Most common health concerns
        </h2>
        <div className="flex justify-evenly gap-4 mt-7 cursor-pointer">
          {dummyData.map((item) => (
            <div
              className={`border-b-2 flex border-gray-400 pb-7 ${
                selectedItem === item.id ? "bg-gray" : ""
              }`}
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              onBlur={handleBlur}
            >
              <h2 className="font-sansBold text-[#292F33] text-[1rem] tracking-[2px]">
                {item.text}
              </h2>
              <div className="pl-28">
                <img src={grayDropDown} alt="" className="pr-2 w-6 h-5" />
              </div>
              {show && selectedItem === item.id && (
                <div
                  ref={dropdownContentRef}
                  className="absolute mt-12 px-10 bg-white"
                >
                  {item.data.map((data, index) => (
                    <div key={index}>
                      <p>{data.p1}</p>
                      <p>{data.p2}</p>
                      <p>{data.p3}</p>
                      <p>{data.p4}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      ;
    </>
  );
};
export default HealthConcern;
