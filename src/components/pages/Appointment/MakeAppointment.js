import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../../../util/Input";
import greenArrowDown from "../../../images/GreenArrowDown.png";
import greenArrowUp from "../../../images/home/WhiteDropdown.png";
import calendar from "../../../images/home/Calendar.svg";
import Button from "../../../util/Button";
import DatePickerComponent from "../../../UI/DatePicker";
import Footer from "../../../UI/Footer";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Spinner from "../../../UI/Spinner";
import { searchLocation } from "../../../store/searchSlice";
const MakeAppointment = () => {
  const [searchParams] = useSearchParams();

  // const [isActive, setIsActive] = useState(false);
  // const toggleButtonHandler = () => {
  //   setIsActive(!isActive);
  // };
  const [active, setActive] = useState("InPerson");

  const toggleButtonHandler = () => {
    setActive((prevActive) =>
      prevActive === "InPerson" ? "Virtual" : "InPerson"
    );
  };
  const [zip_code_id, setZipCodeId] = useState("");
  const [speciality_id, setSpecialityId] = useState("");
  const [condition_id, setConditionId] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const { locationAreas, status } = useSelector((state) => state.data);

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

  const [filterSpecilityData, setFilterSpecialityData] =
    useState(filterSpecialties);
  const [filterConditionData, setFilterConditionData] =
    useState(filterConditions);

  const [searchValue, setSearchValue] = useState("");
  const [SpecCondSearchValue, setCondSpecSearchValue] = useState("");

  const { locationSearchResults } = useSelector((state) => state.search);

  console.log(locationSearchResults, "im location search results");
  // const [filterSpeciality, setFilterSpeciality] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedItemList, setSelectedItemList] = useState({
    location: "",
    speciality: "",
    conditions: "",
  });
  const [error, setError] = useState({
    locationError: false,
    specialityError: false,
  });

  const [brosweData, setBrowseData] = useState();
  const locationSearchDispatch = useDispatch();

  const zipCodeId = searchParams.get("city");

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
  const city = locationSearchResults?.[0]?.city
  useEffect(() => {
    if (zipCodeId) {
      locationSearchDispatch(searchLocation({ zip_code_id: zipCodeId }));
      setBrowseData(locationSearchResults?.[0]?.city);
    }
  }, [zipCodeId, city]);

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
  }, [ref]);

  useEffect(() => {
    if (searchValue === "") {
      setSelectedItem(null);
    } else {
      setSelectedItem("location");
    }
  }, [searchValue]);

  const navigate = useNavigate();

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

      let updatedError = { ...error };

      if (type === "location") {
        updatedError.locationError = false;
      } else if (type === "speciality") {
        updatedError.specialityError = false;
      }

      setError(updatedError);

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
    const selectedSpeciality = filterSpecilityData?.find(
      (item) => item.medical_speciality_name === selectedItemList.speciality
    );

    if (selectedSpeciality) {
      setSpecialityId(selectedSpeciality.id);
    } else {
      setSpecialityId("");
    }
  }, [selectedItemList.speciality, specialistData]);

  useEffect(() => {
    const selectedCondition = filterConditionData?.find(
      (item) => item.medical_condition_name === selectedItemList.conditions
    );
    if (selectedCondition) {
      setConditionId(selectedCondition.id);
    } else {
      setConditionId("");
    }
  }, [selectedItemList.conditions, conditionData]);
  console.log(error);
  const handleSearch = () => {
    if (
      selectedItemList.location === "" &&
      selectedItemList.speciality === ""
    ) {
      setError({
        locationError: selectedItemList.location === "",
        specialityError: selectedItemList.speciality === "",
      });

      return;
    }

    let url = "/doctor-listing?";
    if (zipCodeId) {
      url += `location=${brosweData}_${zipCodeId}&`;
    }
    if (selectedItemList.location) {
      url += `location=${selectedItemList.location}_${zip_code_id}&`;
    }
    if (selectedItemList.speciality) {
      url += `selectedSpeciality=${selectedItemList.speciality}_${speciality_id}&`;
    }
    if (selectedItemList.conditions) {
      url += `selectedConditions=${selectedItemList.conditions}_${condition_id}&`;
    }

    if (active === "InPerson") {
      url += `appointment_type=InPerson&`;
    } else if (active === "Virtual") {
      url += `appointment_type=Virtual&`;
    }

    //date=${startDate.toDateString()}

    url += `date=${moment(startDate).format("YYYY-MM-DD")}`;

    navigate(url);
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
        {filterSpecilityData?.map((item) => {
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
                className="cursor-pointer text-[12px] hover:underline mt-1 font-sansRegular  text-[#292F33] font-semibold tracking-[1px]"
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

  const handleLocationSelection = () => {
    setSelectedItem("location");
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
    if (id === "location") {
      handleLocationSelection();
    } else if (id === "speciality") {
      handleSpecialtySelection();
    }
  };

  return (
    <>
      <div className="  mb-10">
        <div className="hidden md:block w-[35rem] absolute z-[-10] h-[17rem] lg:w-[50rem] lg:h-[25rem] rounded-br-full rounded-bl-full  bg-verifiCation/[17%]  left-1/2 transform -translate-x-1/2 mb-20"></div>
        <div className="pt-[5rem]" />
        <div className=" bg-white shadow-none  sm:shadow-2xl   md:w-[34rem] rounded-xl     left-0 mx-auto right-0 ">
          <div className="px-7 py-4 sm:px-8 sm:py-14 ">
            <h2 className=" text-[#292F33] text-[1.5rem]  font-sansBold tracking-[2px] pt-4">
              Book Top Doctors Appointment
            </h2>
            <p className=" text-gray-500 text-[0.9rem]  font-sansSemibold tracking-tight py-3">
              Thinking to consult a doctor this week? Use Holmeddoc to find the
              best doctors near you ..
            </p>
            <div
              ref={ref}
              className={`border relative ${error.locationError ? "border-red-500" : "border-verifiCation"
                } w-full py-4 rounded mt-7 flex justify-between items-center px-2`}
            >
              <input
                type="text"
                placeholder={"City,Zip Code"}
                // value={
                //   selectedItemList.location || locationAreas?.length === 1
                //     ? locationAreas?.[0]?.city
                //     : ""
                // }
                onFocus={() => setBrowseData("")}
                value={selectedItemList.location || searchValue || brosweData}
                onChange={handleLocationSearch}
                onClick={() =>
                  setSelectedItemList({
                    ...selectedItemList,
                    location: "",
                  }) || setSearchValue("")
                }
                // value={selectedItemList.location}
                className={`outline-none relative px-3 text-[.7rem] sm:text-[.9rem] text-[#292f33] w-full  font-sansBold placeHolderText `}
              // className="outline-none relative px-3 text-[.7rem] sm:text-[.9rem] text-[#292f33] w-full  font-sansBold placeHolderText"
              />
              <img
                src={greenArrowDown}
                alt=""
                className={`w-3 h-3 mr-2 cursor-pointer  absolute right-0 top-[1.4rem] ${selectedItem === "location" ? "rotate-180" : ""
                  }`}
              />

              <ul
                className={`${selectedItem === "location"
                    ? "absolute mt-1 top-[3rem] p-5 max-h-60 z-10 w-[103%] right-0 -left-1 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    : ""
                  }`}
              >
                {/* {isLocationDropdown && */}
                {selectedItem === "location" && locationItems()}
              </ul>
            </div>
            {error.locationError && (
              <p className="text-red-500 text-xs mt-1 font-semibold">
                Location is required
              </p>
            )}
            <div
              ref={ref}
              className={`relative border ${error.specialityError ? "border-red-500" : "border-verifiCation"
                } w-full py-4 mt-8 flex justify-between items-center rounded px-2`}
            >
              <input
                placeholder="Specialty/Condition"
                onChange={handleSpecialitySearch}
                value={
                  selectedItemList.speciality ||
                  selectedItemList.conditions ||
                  SpecCondSearchValue
                }
                onClick={() => handleItemClick("speciality")}
                className="relative outline-none px-3 text-[.7rem] sm:text-[.9rem] font-sansBold text-[#292f33] w-full placeHolderText"
              />
              <img
                src={greenArrowDown}
                alt=""
                className={`w-3 h-3 mr-2 cursor-pointer absolute right-0 top-[1.4rem] ${selectedItem === "speciality" ? "rotate-180" : ""
                  }`}
              />
              <ul
                className={`${selectedItem === "speciality"
                    ? "absolute mt-1 top-[3rem] p-5 max-h-60 z-10 w-[103%] right-0 -left-1 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    : ""
                  }`}
              >
                {selectedItem === "speciality" && SpecialityAndCondition()}
              </ul>
            </div>
            {error.specialityError && (
              <p className="text-red-500 text-xs mt-1 font-semibold">
                Speciality/Condition is required
              </p>
            )}
            <div
              ref={calendarRef}
              className="border relative border-verifiCation w-full py-4 mt-8 flex justify-between items-center rounded px-2 cursor-pointer"
            >
              {/* <Input
                  type="Today"
                  placeholder="Today"
                  className="outline-none px-3 text-[.7rem] sm:text-[.9rem] text-[#636677] tracking-[2px] font-sansRegular"
                /> */}
              <span
                onClick={handleClick}
                className="outline-none px-3 text-[.7rem] mt-1 sm:text-[.9rem]  text-[#292f33] mr-20 font-sansBold"
              >
                {startDate &&
                  startDate.toDateString() === new Date().toDateString()
                  ? "Today"
                  : moment(startDate).format("DD MMM,YYYY")}
              </span>
              <img
                src={calendar}
                onClick={handleClick}
                alt=""
                className="w-5 h-5 mr-2 cursor-pointer"
              />
              {isOpen && (
                <div className="absolute top-[3.5rem] -right-1 z-[100] h-full">
                  <DatePickerComponent
                    handleChange={handleChange}
                    startDate={startDate}
                  />
                </div>
              )}
            </div>
            <div className="border border-verifiCation w-full py-3 rounded mt-8 flex justify-between items-center px-2">
              {/* <Button
                onClick={toggleButtonHandler}
                className={`${!isActive ? "bg-[#008282] " : ""
                  } py-2 px-3  sm:px-16 ${isActive ? "text-black" : "text-white"
                  } text-[1rem] tracking-[2px] font-sansRegular rounded`}
              >
                InPerson
              </Button>
              <Button
                onClick={toggleButtonHandler}
                className={`${isActive ? "bg-[#008282] " : ""
                  } py-2 px-3 sm:px-16 ${isActive ? "text-white" : "text-black"
                  } text-[1rem] tracking-[2px] font-sansRegular rounded`}
              >
                Virtual
              </Button> */}
              <Button
                onClick={toggleButtonHandler}
                className={`py-2 px-[1.75rem] sm:px-16 ${active === "InPerson"
                    ? "bg-[#008282] text-white"
                    : "text-black"
                  } text-[1rem] tracking-[2px] font-sansRegular rounded`}
              >
                InPerson
              </Button>
              <Button
                onClick={toggleButtonHandler}
                className={`py-2 px-[1.75rem] sm:px-16 ${active === "Virtual"
                    ? "bg-[#008282] text-white"
                    : "text-black"
                  } text-[1rem] tracking-[2px] font-sansRegular rounded`}
              >
                Virtual
              </Button>
            </div>
            <div className="flex justify-center items-center ">
              <Button
                className="bg-[#008282] py-3 px-16 mt-10 rounded-full text-white text-[1rem] tracking-[2px] font-sansRegular"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MakeAppointment;
