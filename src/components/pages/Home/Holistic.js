import React, { useState, useEffect, useRef } from "react";
import leaf from "../../../images/home/Leaf.png";
import svgSearch from "../../../images/home/SearchBarIcon.svg";
import calendarSvg from "../../../images/home/Calendar.svg";
import grayDropDown from "../../../images/Login/GrayDropdown.png";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Spinner from "../../../UI/Spinner";
//import { fetchConditions, fetchSpecialties } from "../../../store/LocSpecSlice";
import DatePickerComponent from "../../../UI/DatePicker";
import { searchLocation } from "../../../store/searchSlice";
import moment from "moment";

const Holistic = () => {
  const [zip_code_id, setZipCodeId] = useState("");
  const [speciality_id, setSpecialityId] = useState("");

  const [condition_id, setConditionId] = useState("");

  const {
    specialties: specialistData,
    status: specStatus,
    filterSpecialties,
  } = useSelector((state) => state.data);
  const {
    conditions: conditionData,
    status: conditionStatus,
    filterConditions,
  } = useSelector((state) => state.data);
  const { locationSearchResults, status: loactioSearchStatus } = useSelector(
    (state) => state.search
  );

  console.log(locationSearchResults, "locationSearchResults");
  const [filterSpecilityData, setFilterSpecialityData] =
    useState(filterSpecialties);
  const [filterConditionData, setFilterConditionData] =
    useState(filterConditions);

  const [searchValue, setSearchValue] = useState("");
  const [SpecCondSearchValue, setCondSpecSearchValue] = useState("");

  // const [filterSpeciality, setFilterSpeciality] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedItemList, setSelectedItemList] = useState({
    location: "",
    speciality: "",
    conditions: "",
  });

  const locationSearchDispatch = useDispatch();

  const handleLocationSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    selectedItemList.location = value;
  };

  const filterSpeciality = (searchTerm, specialityData) => {
    const data = specialityData?.filter((item) => {
      return item.medical_speciality_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    return data;
  };

  const filterCondition = (searchTerm, conditionData) => {
    const data = conditionData?.filter((item) => {
      return item.medical_condition_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    return data;
  };

  const handleSpecialitySearch = (e) => {
    setCondSpecSearchValue(e.target.value);
    setFilterSpecialityData(
      filterSpeciality(SpecCondSearchValue, filterSpecialties)
    );
    setFilterConditionData(
      filterCondition(SpecCondSearchValue, filterConditions)
    );
  };

  useEffect(() => {
    //console.log(searchValue, "searchValue");
    const timer = setTimeout(() => {
      if (searchValue) {
        locationSearchDispatch(searchLocation({ searchValue }));
      }
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const ref = useRef();
  const calendarRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setSelectedItem(null);
      }
      if (!calendarRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, calendarRef]);

  useEffect(() => {
    //in this  if search value is empty then dont show the location list and if search value is not empty then show the location list
    if (searchValue === "") {
      setSelectedItem(null);
    } else {
      setSelectedItem("location");
    }
  }, [searchValue]);

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleSelectedItem = (name, type, id) => {
    setSelectedItemList((prevSelectedItemList) => {
      let updatedItemList = { ...prevSelectedItemList };

      if (type === "location") {
        updatedItemList = {
          ...updatedItemList,
          location: name,
          speciality: "",
          conditions: "",
        };
        setSelectedItem(null);
      } else if (type === "speciality") {
        updatedItemList = {
          ...updatedItemList,
          speciality: name,
          speciality_id: id,
          conditions: "", // Clear the selected conditions when selecting a specialty
        };
        setSelectedItem(null);
      } else if (type === "conditions") {
        updatedItemList = {
          ...updatedItemList,

          conditions: name,
          condition_id: id,
          speciality: "",
        };
        setSelectedItem(null);
      }

      return updatedItemList;
    });
    if (type === "location") {
      const selectedItem = locationSearchResults.find(
        (item) => item.city === name
      );
      if (selectedItem) {
        setZipCodeId(selectedItem.zip_code_id);
      }
    }
  };
  useEffect(() => {
    const selectedSpeciality = specialistData?.find(
      (item) => item.medical_speciality_name === selectedItemList.speciality
    );

    if (selectedSpeciality) {
      setSpecialityId(selectedSpeciality.id);
    } else {
      setSpecialityId("");
    }
  }, [selectedItemList.speciality, specialistData]);

  useEffect(() => {
    const selectedCondition = conditionData?.find(
      (item) => item.medical_condition_name === selectedItemList.conditions
    );
    if (selectedCondition) {
      setConditionId(selectedCondition.id);
    } else {
      setConditionId("");
    }
  }, [selectedItemList.conditions, conditionData]);

  const handleSearch = () => {
    let url = "/doctor-listing?";

    if (selectedItemList.location) {
      url += `location=${selectedItemList.location}_${zip_code_id}&`;
    }
    if (selectedItemList.speciality) {
      url += `selectedSpeciality=${selectedItemList.speciality}_${speciality_id}&`;
    }
    if (selectedItemList.conditions) {
      url += `conditions=${selectedItemList.conditions}_${condition_id}&`;
    }

    url += `date=${moment(startDate).format("YYYY-MM-DD")}`;

    navigate(url);
  };

  const locationItems = () => {
    return (
      locationSearchResults &&
      locationSearchResults?.map((item) => {
        return (
          <h1
            key={item.id}
            onClick={() =>
              handleSelectedItem(item.city, "location", item.zip_code_id)
            }
            className="cursor-pointer text-[12px] hover:underline mt-1 font-sansRegular px-4 md:px-1 text-[#292F33] font-semibold "
          >
            {item.city}
          </h1>
        );
      })
    );
  };

  const SpecialityAndCondition = () => {
    if (specStatus === "loading" || conditionStatus === "loading") {
      return <Spinner />;
    }
    return (
      <div>
        <h2 className="font-sansBold text-gray-400 text-[13px] mb-2">
          {filterSpecilityData?.length > 0 && "Speciality"}
        </h2>
        {filterSpecilityData?.length > 0 &&
          filterSpecilityData?.map((item) => {
            return (
              <>
                <h1
                  key={item.id}
                  onClick={() =>
                    handleSelectedItem(
                      item.medical_speciality_name,
                      "speciality",
                      item.id
                    )
                  }
                  className="cursor-pointer text-[12px] hover:underline mt-1 font-sansRegular  text-[#292f33] font-semibold tracking-[1px]"
                >
                  {item.medical_speciality_name}
                </h1>
              </>
            );
          })}

        <h2 className="font-sansBold text-gray-400 text-[13px] py-2">
          {filterConditionData?.length > 0 && "Conditions"}
        </h2>
        {filterConditionData?.map((item) => (
          <h1
            key={item.id}
            onClick={() =>
              handleSelectedItem(
                item.medical_condition_name,
                "conditions",
                item.id
              )
            }
            className="cursor-pointer text-[12px] hover:underline mt-1 font-sansRegular font-semibold text-[#292F33]  "
          >
            {item.medical_condition_name}
          </h1>
        ))}
      </div>
    );
  };

  const handleLocationSelection = () => {
    setSelectedItem("location");
    setSelectedItemList((prevSelectedItemList) => {
      let updatedItemList = { ...prevSelectedItemList };
      updatedItemList = {
        ...updatedItemList,
        location: "",
      };
      return updatedItemList;
    });

    setSearchValue("");
  };
  const handleSpecialtySelection = () => {
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === "speciality" ? null : "speciality"
    );
    setSelectedItemList((prevSelectedItemList) => {
      let updatedItemList = { ...prevSelectedItemList };
      updatedItemList = {
        ...updatedItemList,
        speciality: "",
        conditions: "",
      };
      return updatedItemList;
    });
  };

  const handleItemClick = (id) => {
    console.log(id);
    // setSelectedItem((prevSelectedItem) =>
    //   prevSelectedItem === id ? null : id
    // );

    //setSearchValue("");

    if (id === "location") {
      handleLocationSelection();
    } else if (id === "speciality") {
      handleSpecialtySelection();
    }
  };

  return (
    <div className="p-5 bg-[#E2F6F3] sm:h-[calc(100vh_-_7rem)] relative">
      <div className="bg-[#E2F6F3] flex items-center flex-col md:flex-row  ">
        <div className="mx-auto mt-[3rem] md:mt-[20vh] 2xl:mt-[30vh]">
          <h1 className="flex font-sansRegular justify-center font-medium  items-center sm:space-x-6 xs:space-x-4 xsm:space-x-3 md:text-[2.5rem] lg:text-[2.7rem] xl:text-[3rem]  sm:tracking-[4px] text-[#0C0B0B] sm:text-[2rem] xs:text-[1.8rem] xsm:text-[1.2rem] 2xl:text-[3.4rem] ">
            {/* <div className=" sm:pt-28 xs:pt-28 xsm:pt-16 mt-0  space-y-2">
          <h1 className="flex font-poppinsMedium 2xl:tracking-[8px] justify-center items-center sm:space-x-6 xs:space-x-4 xsm:space-x-3 md:text-[2.5rem] lg:text-[2.7rem] xl:text-[3rem] font-medium sm:tracking-[5px] text-[#0C0B0B] sm:text-[2rem] xs:text-[1.8rem] xsm:text-[1.1rem] 2xl:text-[3.4rem] "> */}
            <span>HOLISTIC</span>
            <div className="flex items-center justify-center">
              <div className="relative">
                <p>M</p>
                <img
                  className="absolute md:top-2 md:h-[3rem] md:left-[1.2px] 2xl:h-[3.4rem] sm:top-[.30rem] sm:h-[35px] xs:top-[.20rem] xs:h-[25px] xsm:h-[20px] xsm:top-[.12rem] xsm:font-sansBold"
                  alt=""
                  src={leaf}
                />
              </div>
              <p>EDICINE</p>
            </div>
            <p>CONNECTING</p>
          </h1>

          <h1 className="flex sm:text-[1.6rem] font-poppinItalic justify-center space-x-6 mt-5 tracking-widest font-[300] text-[#0C0B0B] md:text-[2.2rem] xsm:text-[1.2rem]">
            Mind. Body. Soul
          </h1>
        </div>
        <div className="mt-5 p-[1rem] xsm:rounded-xl  sm:rounded-md md:p-0 md:absolute 2xl:bottom-[2rem] md:bottom-10 right-0 left-0 mb-10 bg-white pl-3  rounded md:rounded-full mx-auto lg:w-[calc(100%_-_15%)] md:lg:w-[calc(100%_-_3%)] sm:w-[calc(100%_-_2%)] xsm:w-[calc(100%_-_2%)]">
          <div
            className="flex flex-col md:flex-row  justify-between "
            ref={ref}
          >
            <div className="flex relative justify-between items-center py-4 md:py-0">
              <input
                placeholder="Location"
                value={selectedItemList.location || searchValue}
                onChange={handleLocationSearch}
                onClick={() =>
                  setSelectedItemList({
                    ...selectedItemList,
                    location: "",
                  }) ||
                  setSearchValue("") ||
                  setSelectedItem(null)
                }
                className="font-sansRegular font-semibold text-[.8rem] md:text-[1rem] outline-none 2xl:text-[1.2rem]  w-full text-[#292f33]  pr-8 pl-0 md:pl-[2rem] placeHolderText2"
              />
              <div className=" cursor-pointer">
                <img
                  src={grayDropDown}
                  alt=""
                  className={`${
                    selectedItem === "location" ? "rotate-180" : ""
                  } cursor-pointer h-3 w-3 `}
                />
              </div>
            </div>
            {selectedItem === "location" && (
              <div
                className="absolute top-[14rem] md:top-[12.5rem] lg:top-[4rem] bg-white w-[85%] left-[1.5rem] md:left-2 md:w-[400px] p-0 md:p-5 rounded-lg max-h-[30vh] overflow-y-auto"
                style={{
                  zIndex: 1,
                }}
              >
                {locationItems()}
              </div>
            )}
            <div
              ref={ref}
              className="flex relative justify-between items-center py-4 md:py-0"
            >
              <input
                placeholder="Speciality / Condition"
                onChange={handleSpecialitySearch}
                value={
                  selectedItemList.speciality ||
                  selectedItemList.conditions ||
                  SpecCondSearchValue
                }
                onClick={() => handleItemClick("speciality")}
                className="font-sansRegular text-[.8rem] md:text-[1rem] w-[250px]  font-semibold outline-none 2xl:text-[1.2rem]  text-[#292f33]   pl-0 md:pl-[0rem] placeHolderText2"
              />
              <div
                className=" cursor-pointer"
                onClick={() => handleItemClick("speciality")}
              >
                <img
                  src={grayDropDown}
                  alt=""
                  className={`${
                    selectedItem === "speciality" ? "rotate-180" : ""
                  } cursor-pointer h-3 w-3 mr-0 ml-16 2xl:ml-[9rem]`}
                />
              </div>
              {selectedItem === "speciality" && (
                <div
                  className="absolute top-[2.5rem] md:top-[5rem] lg:top-[4rem] bg-white w-[100%] left-0 md:-left-[1.5rem] md:w-[400px] p-5 rounded-lg max-h-[30vh] overflow-y-auto"
                  style={{
                    zIndex: 1,
                  }}
                >
                  {SpecialityAndCondition()}
                </div>
              )}
            </div>
            {/* <div className="flex flex-row justify-between items-center flex-1 gap-[20px]">
              <h1 className="ml-5">Speciality</h1>
              <img src={grayDropDown} alt="dropdown" className="h-3 w-3" />
            </div> */}
            <div className="flex items-center mt-1 justify-between py-4 md:py-0 relative ">
              <div
                className="flex ml-0 md:ml-5 cursor-pointer items-center"
                ref={calendarRef}
              >
                <img
                  onClick={handleClick}
                  onChange={handleDateChange}
                  src={calendarSvg}
                  alt=""
                  className="w-6 2xl:w-9 h-auto object-contain cursor-pointer mr-5 "
                />
                <span
                  onClick={handleClick}
                  className="outline-none px-3 text-[.7rem] mt-1 sm:text-[1rem] 2xl:text-[1.2rem] text-[#292f33] mr-20 font-sansRegular font-semibold"
                >
                  {startDate &&
                  startDate.toDateString() === new Date().toDateString()
                    ? "Today"
                    : moment(startDate).format("DD MMM,YYYY")}
                </span>

                {isOpen && (
                  <div className="absolute top-[4rem] md:top-[5rem] 2xl:top-[6.4rem] lg:top-[5rem] right-10 z-[100] h-full">
                    <DatePickerComponent
                      handleChange={handleChange}
                      startDate={startDate}
                    />
                  </div>
                )}
                <img
                  src={grayDropDown}
                  alt="dropdown"
                  onClick={handleClick}
                  className={`${
                    isOpen ? "rotate-180" : ""
                  } h-3 w-3 mr-0 md:mr-8 absolute right-0 md:relative`}
                />
              </div>

              <div className="hidden md:block" onClick={handleSearch}>
                <img
                  src={svgSearch}
                  alt=""
                  className=" w-16 lg:w-20 2xl:w-24 h-auto cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="md:hidden pb-6 pt-3 flex items-center justify-center">
            <button
              className="bg-verifiCation text-white w-1/2 py-2 rounded-full font-sansRegular text-[1rem] font-semibold tracking-[1px]"
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
