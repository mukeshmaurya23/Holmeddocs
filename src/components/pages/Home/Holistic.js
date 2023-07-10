import React, { useState, useEffect, useRef } from "react";
import leaf from "../../../images/home/Leaf.png";
import svgSearch from "../../../images/home/SearchBarIcon.svg";
import calendarSvg from "../../../images/home/Calendar.svg";
import grayDropDown from "../../../images/Login/GrayDropdown.png";

import { LocSpec } from "../../../constant";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const Holistic = () => {
  const { data: LocSpecd, loading: locLoading } = useFetch(
    "/patient/master/state"
  );

  const { data: specialistData, loading: specialityLoading } = useFetch(
    "/patient/master/speciality"
  );

  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(true);

  const [startDate, setStartDate] = useState(new Date());

  const ref = useRef();
  const calendarRef = useRef();
  const navigate = useNavigate();
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
  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemClick = (id) => {
    console.log(id, "id");
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === id ? null : id
    );
  };

  const [selectedItemList, setSelectedItemList] = useState({
    location: "",
    speciality: "",
  });

  const handleSelectedItem = (name, type) => {
    // setSelectedItemList(name);
    setSelectedItemList((prevSelectedItemList) => {
      return { ...prevSelectedItemList, [type]: name };
    });
  };
  const handleSearch = () => {
    //
    navigate(
      `/doctor-listing?location=${selectedItemList.location}&speciality=${
        selectedItemList.speciality
      }&date=${startDate.toDateString()}`
    );
  };
  console.log(selectedDate?.toDateString(), "selectedDate");
  const locationItems = () => {
    if (locLoading) {
      return <p>Loading...</p>;
    }

    return LocSpecd?.data?.result.map((item) => (
      <h1
        key={item.id}
        onClick={() => handleSelectedItem(item.state_name, "location")}
        className="cursor-pointer text-[14px] hover:underline mt-1 font-sansRegular text-gray-700 tracking-[0.1rem]"
      >
        {item.state_name}
      </h1>
    ));
  };
  const specialityItems = () => {
    if (specialityLoading) {
      return <p>Loading...</p>;
    }
    return specialistData?.data?.result?.map((item) => (
      <h1
        key={item.id}
        onClick={() =>
          handleSelectedItem(item.medical_speciality_name, "speciality")
        }
        className="cursor-pointer text-[14px] hover:underline mt-1 font-sansRegular text-gray-700 tracking-[0.1rem]"
      >
        {item.medical_speciality_name}
      </h1>
    ));
  };
  return (
    <div className="p-5 bg-[#E2F6F3] sm:h-[calc(100vh_-_7rem)] ">
      <div className="bg-[#E2F6F3] ">
        <div className="md:mt-[5rem] sm:pt-28 xs:pt-28 xsm:pt-16 mt-0 2xl:mt-[8rem] space-y-2">
          <h1 className="flex font-poppinsMedium 2xl:tracking-[8px] justify-center sm:space-x-6 xs:space-x-4 xsm:space-x-3 md:text-[2rem] 2xl:text-[2.5rem]  font-medium sm:tracking-[5px] text-[#0C0B0B] sm:text-[2rem] xs:text-[1.8rem] xsm:text-[1.1rem] ">
            <span>HOLISTIC</span>
            <div className="flex items-center justify-center">
              <div className="relative">
                <p>M</p>
                <img
                  className="absolute md:top-2 md:h-[40px] sm:top-[.30rem] sm:h-[35px] xs:top-[.20rem] xs:h-[25px] xsm:h-[18px] xsm:top-[.12rem] xsm:font-sansBold"
                  alt=""
                  src={leaf}
                />
              </div>
              <p>EDICINE</p>
            </div>
            <p>CONNECTING</p>
          </h1>

          <h1 className="flex sm:text-[1.6rem] font-poppinItalic justify-center space-x-6 tracking-widest font-[300] text-[#0C0B0B] md:text-[2.2rem] xsm:text-[0.8rem]">
            Mind. Body. Soul
          </h1>
        </div>
        <div className="mt-5 md:mt-[calc(100vh_-_72vh)] 2xl:mt-[calc(100vh_-_65vh)] mb-10 bg-white pl-3 md:px-5 rounded md:rounded-full mx-auto lg:w-[calc(100%_-_15%)] md:lg:w-[calc(100%_-_3%)] sm:w-[calc(100%_-_0%)] xsm:w-[calc(100%_-_2%)]">
          <div
            className="flex flex-col md:flex-row  justify-between px-4"
            ref={ref}
          >
            {/* <Accordion
              items={LocSpec}
              items2={LocSpecd?.data?.result}
              items3={specialistData?.data?.result}
              locLoading={locLoading}
              specialityLoading={specialityLoading}
              //items2={LocSpecd?.data?.result}
              // value={value}
              showBorder={false}
              image={grayDropDown}
              className="text-gray-600"
            /> */}
            {LocSpec.map((item) => {
              return (
                <>
                  <div
                    className="flex relative justify-between items-center "
                    key={item.id}
                  >
                    <h2
                      className={`font-sansBold text-[.8rem] md:text-[1rem] 2xl:text-[1.4rem] text-gray-500 tracking-[2px] pr-8 pl-0 md:pl-[2rem]`}
                    >
                      {selectedItemList[item.id] || item.title}
                    </h2>
                    <div
                      className="ml-auto md:ml-5 cursor-pointer"
                      onClick={() => handleItemClick(item.id)}
                    >
                      <img
                        src={grayDropDown}
                        alt=""
                        className={`${
                          selectedItem === item.id ? "rotate-180" : ""
                        } cursor-pointer h-3 w-3`}
                      />
                    </div>

                    <div
                      className={`${"border-l  border-none md:border-l lg:border-l border-gray-400 h-[50px] ml-10 mr-5"}`}
                    ></div>
                    {selectedItem === item.id && (
                      <div
                        className="absolute top-20 bg-white w-full p-5 rounded-lg max-h-[30vh] overflow-y-auto"
                        style={{
                          zIndex: 1,
                        }}
                      >
                        {item.id === "location" && locationItems()}

                        {item.id === "speciality" && specialityItems()}
                      </div>
                    )}
                  </div>
                </>
              );
            })}
            {/* <div className="flex flex-row justify-between items-center flex-1 gap-[20px]">
              <h1 className="ml-5">Speciality</h1>
              <img src={grayDropDown} alt="dropdown" className="h-3 w-3" />
            </div> */}
            <div className="flex items-center mt-1 justify-between py-4 md:py-0 ">
              <div className="flex ml-0 md:ml-5" ref={calendarRef}>
                <img
                  onChange={handleDateChange}
                  src={calendarSvg}
                  alt=""
                  className="w-6 2xl:w-9 h-auto object-contain cursor-pointer mr-5 "
                />
                {selectedDate &&
                  selectedDate?.toDateString() !==
                    new Date()?.toDateString() && (
                    <p className="text-[1rem]">{selectedDate.toDateString()}</p>
                  )}
                {showDatePicker && (
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    customInput={
                      <input
                        style={{
                          outline: "none",
                          border: "none",
                          color: "gray",
                        }}
                        value={startDate?.toDateString()}
                        readOnly
                        contentEditable={false}
                        className="w-40 h-10 border-2 text-[.9rem] md:text-[1rem] 2xl:text-[1.4rem] border-gray-300 rounded-md"
                      />
                    }
                  />
                )}
              </div>

              <img
                src={grayDropDown}
                alt="dropdown"
                className="h-3 w-3 ml-auto mr-[60px]"
              />

              <div className="hidden md:block" onClick={handleSearch}>
                <img
                  src={svgSearch}
                  alt=""
                  className=" w-16 2xl:w-24 h-auto cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="md:hidden pb-6 pt-3 pr-6">
            <button
              className="bg-gray-600 text-white w-full py-2 rounded"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holistic;
