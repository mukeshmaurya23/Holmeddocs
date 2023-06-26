import React, { useState } from "react";
import blackDropDown from "../../../images/home/BlackDropdown.png";
import { healthConcern } from "../../../constant";

const HealthConcern = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (id) => {
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === id ? null : id
    );
  };

  return (
    <div className="bg-healthConcern py-12 px-16 p-3 h-[250px]">
      <h2 className="text-[1.9rem] tracking-[4px] font-sansBold ">
        Most common health concerns
      </h2>
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-7 cursor-pointer">
        {healthConcern.map((item, index) => (
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
                } cursor-pointer`}
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
        ))}
      </div>
    </div>
  );
};

export default HealthConcern;
