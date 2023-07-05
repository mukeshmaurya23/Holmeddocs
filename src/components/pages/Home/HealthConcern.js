import React, { useState, useEffect } from "react";
import blackDropDown from "../../../images/home/BlackDropdown.png";
import { healthConcern } from "../../../constant";
import Accordion from "../../../util/Accordian";
import { getAllMedicalCondition } from "../../../services/services";
const HealthConcern = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [medicalConditionData, setMedicalConditionData] = useState([]);
  const handleItemClick = (id) => {
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === id ? null : id
    );
  };

  useEffect(() => {
    try {
      const getAllMedicalConditionData = async () => {
        const res = await getAllMedicalCondition();
        setMedicalConditionData(res);
      };
      getAllMedicalConditionData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  console.log(medicalConditionData, "im medicalConditionData");

  return (
    <div className="bg-healthConcern py-12 px-4 sm:px-16 md:px-16 lg:px-16 p-3 ">
      <h2 className="text-[1rem]  tracking-[1px] sm:text-[1.4rem] md:text-[1.7rem] xsm:text-[1rem] xs:text-[1.1rem] md:tracking-[4px] font-sansBold ">
        Most common health concerns
      </h2>
      <div className="mt-10">
        {/* {healthConcern.map((item, index) => (
          <div
            className="border-b-2 flex border-gray-400 pb-7 relative"
            key={item.id}
          >
            <h2 className="font-sansBold text-[#292F33] text-[1rem] tracking-[2px]">
              {item.title}
            </h2>
            <div className="pl-28" onClick={() => handleItemClick(item.id)}>
              <img
                src={blackDropDown}
                alt=""
                className={`${
                  selectedItem === item.id ? "rotate-180" : ""
                } cursor-pointer h-3 w-3`}
              />
            </div>
            {selectedItem === item.id && (
              <div className="absolute top-10 z-5 bg-white w-full p-5 rounded-lg">
                {item.dropDown.map((data) => (
                  <h1
                    key={data.id}
                    className="hover:underline mt-1 font-sansRegular  text-gray-700 tracking-[0.1rem]"
                  >
                    {data.title}
                  </h1>
                ))}
              </div>
            )}
          </div>
        ))} */}
        <Accordion
          items={medicalConditionData}
          showBorder={true}
          image={blackDropDown}
        />
      </div>
    </div>
  );
};

export default HealthConcern;
