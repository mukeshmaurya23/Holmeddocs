import React, { useState } from "react";

const Accordion = ({ items, showBorder, image, className }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (id) => {
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === id ? null : id
    );
  };

  return (
    <div className="flex flex-col  md:flex-row md:items-center  justify-between md:gap-10 sm:gap-4 xs:gap-2 xsm:gap-1">
      {items.map((item) => (
        <div
          className={`${
            showBorder ? "border-b-2 border-gray-400 pb-7" : ""
          } flex relative items-center  `}
          key={item.id}
        >
          <h2
            className={`font-sansBold  text-[.8rem] md:text-[.9rem] tracking-[2px] ${
              showBorder ? "mt-3" : ""
            } ${className} `}
          >
            {item.title}
          </h2>
          {/**ml-auto */}
          <div
            className="ml-auto md:ml-5 xl:pl-28"
            onClick={() => handleItemClick(item.id)}
          >
            <img
              src={image}
              alt=""
              className={`${
                selectedItem === item.id ? "rotate-180" : ""
              } cursor-pointer h-3 w-3`}
            />
          </div>
          <div
            className={`${
              !showBorder &&
              "border-l  border-none md:border-l lg:border-l border-gray-400 h-[50px] ml-10 mr-5"
            }`}
          ></div>
          {selectedItem === item.id && (
            <div
              className="absolute top-10 bg-white w-full p-5 rounded-lg"
              style={{
                zIndex: 1,
              }}
            >
              {item.dropDown.map((data) => (
                <h1
                  key={data.id}
                  className="hover:underline mt-1 font-sansRegular text-gray-700 tracking-[0.1rem]"
                >
                  {data.title}
                </h1>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
