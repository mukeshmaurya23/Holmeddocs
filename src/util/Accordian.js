import React, { useState, useEffect, useRef } from "react";
import { getAllMedicalConditionList } from "../services/services";
const Accordion = ({ items, items2, items3, showBorder, image, className }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [medicalConditionListData, setMedicalConditionListData] =
    useState(null);
  console.log(items3, "im items from Accordion");
  console.log(items2, "im items2 from Accordion");
  const handleItemClick = (id) => {
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === id ? null : id
    );
  };
  console.log(selectedItem, "im handleItemClick");
  useEffect(() => {
    try {
      const getAllMedicalConditionListData = async () => {
        const res = await getAllMedicalConditionList(selectedItem);

        console.log(res, "im res from Accordion");
        setMedicalConditionListData(res);
      };
      getAllMedicalConditionListData();
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  }, [selectedItem]);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setSelectedItem(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
  return (
    <div
      ref={ref}
      className="flex flex-col  md:flex-row md:items-center  justify-between md:gap-10 sm:gap-4 xs:gap-2 xsm:gap-1"
    >
      {items && items.length === 0 ? (
        <h2>Loading</h2>
      ) : (
        items.map((item) => (
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
              {item.medical_condition_name || item.title}
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
                className="absolute top-10 bg-white w-full p-5 rounded-lg max-h-[30vh] overflow-y-auto"
                style={{
                  zIndex: 1,
                }}
              >
                {medicalConditionListData &&
                  medicalConditionListData?.map((data) => (
                    <h1
                      key={data.id}
                      className="cursor-pointer text-[14px] hover:underline mt-1 font-sansRegular text-gray-700 tracking-[0.1rem]"
                    >
                      {/* {data?.state_name} */}
                      {data?.speciality_name}
                    </h1>
                  ))}
                {item.id === "location" && (
                  <>
                    {items2.length === 0 ? (
                      <h1>Loading</h1>
                    ) : (
                      items2?.map((item) => (
                        <h1
                          key={item.id}
                          className="cursor-pointer text-[14px] hover:underline mt-1 font-sansRegular text-gray-700 tracking-[0.1rem]"
                        >
                          {item.state_name}
                        </h1>
                      ))
                    )}
                  </>
                )}

                {item.id === "speciality" && (
                  <>
                    {items3?.length === 0 ? (
                      <h1>Loading</h1>
                    ) : (
                      items3?.map((item) => (
                        <h1
                          key={item.id}
                          className="cursor-pointer text-[14px] hover:underline mt-1 font-sansRegular text-gray-700 tracking-[0.1rem]"
                        >
                          {item.medical_speciality_name}
                        </h1>
                      ))
                    )}
                  </>
                )}
                {/* {items3 && (
                  <>
                    {items3.map((item) => (
                      <h1
                        key={item.id}
                        className="cursor-pointer text-[14px] hover:underline mt-1 font-sansRegular text-gray-700 tracking-[0.1rem]"
                      >
                        {item.medical_speciality_name}
                      </h1>
                    ))}
                  </>
                )} */}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Accordion;
