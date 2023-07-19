import React, { useState, useRef, useEffect } from "react";
import {} from "react-router-dom";
import Input from "../../../util/Input";
import greenArrowDown from "../../../images/GreenArrowDown.png";
import greenArrowUp from "../../../images/home/WhiteDropdown.png";
import calendar from "../../../images/home/Calendar.svg";
import Button from "../../../util/Button";
import DatePickerComponent from "../../../UI/DatePicker";
import Footer from "../../../UI/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConditions,
  fetchLocationAreas,
  fetchSpecialties,
} from "../../../store/LocSpecSlice";
import Spinner from "../../../UI/Spinner";
const MakeAppointment = () => {
  console.log("pathname", window.location.pathname);
  const [isActive, setIsActive] = useState(false);
  const toggleButtonHandler = () => {
    setIsActive(!isActive);
  };

  const [isLocationDropdown, setIsLocationDropdown] = useState(false);
  const [isSpecialityDropdown, setIsSpecialityDropdown] = useState(false);

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

  const locAreasRef = useRef();
  const specialityRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!locAreasRef?.current?.contains(event.target)) {
        setIsLocationDropdown(false);
      }
      if (!specialityRef?.current?.contains(event.target)) {
        setIsSpecialityDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [locAreasRef, specialityRef]);

  const locationAreasDispatch = useDispatch();
  const conditionsDispatch = useDispatch();
  const { locationAreas, status } = useSelector((state) => state.data);

  const specialityDispatch = useDispatch();
  const { specialties, status: specStatus } = useSelector(
    (state) => state.data
  );
  const { conditions, status: conditionStatus } = useSelector(
    (state) => state.data
  );
  const [selectedItemList, setSelectedItemList] = useState({
    location: "",
    specialitycondition: "",
  });

  const handleSelectedItem = (name, type) => {
    // setSelectedItemList(name);

    setSelectedItemList((prevSelectedItemList) => {
      return { ...prevSelectedItemList, [type]: name };
    });
  };

  useEffect(() => {
    locationAreasDispatch(fetchLocationAreas("/patient/master/areas"));
    specialityDispatch(fetchSpecialties("/patient/master/speciality"));
    conditionsDispatch(fetchConditions("/patient/master/condition"));
  }, [locationAreasDispatch, specialityDispatch, conditionsDispatch]);
  const SpecialityAndCondition = () => {
    if (conditionStatus === "loading" || specStatus === "loading") {
      return <Spinner />;
    }

    return (
      <div>
        <h2 className="font-sansBold text-gray-400 text-[13px] mb-2">
          Specialties
        </h2>
        {specialties?.map((item) => (
          <h1
            key={item.id}
            onClick={() =>
              handleSelectedItem(
                item?.medical_speciality_name,
                "specialitycondition"
              )
            }
            className="cursor-pointer text-[12px] hover:underline mt-1 font-sansRegular font-semibold text-gray-700 tracking-[0.1rem]"
          >
            {item?.medical_speciality_name}
          </h1>
        ))}

        <h2 className="font-sansBold text-gray-400 text-[13px] py-2">
          Conditions
        </h2>
        {conditions?.map((item) => (
          <h1
            key={item.id}
            onClick={() =>
              handleSelectedItem(
                item.medical_condition_name,
                "specialitycondition"
              )
            }
            className="cursor-pointer text-[12px] hover:underline mt-1 font-sansRegular font-semibold text-gray-700 tracking-[0.1rem]"
          >
            {item?.medical_condition_name}
          </h1>
        ))}
      </div>
    );
  };
  return (
    <>
      <div class="flex justify-center  mb-10 ">
        <div class="hidden md:block w-[35rem] h-[17rem] lg:w-[45rem] lg:h-[20rem] rounded-br-full rounded-bl-full z-10 bg-verifiCation/[17%] absolute left-1/2 transform -translate-x-1/2 mb-20">
          <div className=" bg-white shadow-2xl  absolute md:w-[34rem] rounded-xl    top-10  left-0 mx-auto right-0 ">
            <div className="px-7 py-4 sm:px-8 sm:py-14 ">
              <h2 className=" text-[#292F33] text-[1.5rem]  font-sansBold tracking-[2px] pt-4">
                Book Top Doctors Appointment
              </h2>
              <p className=" text-gray-500 text-[0.9rem]  font-sansSemibold tracking-tight py-3">
                Thinking to consult a doctor this week? Use Holmeddoc to find
                the best doctors near you ..
              </p>
              <div className="border relative border-verifiCation w-full py-4 rounded mt-7 flex justify-between items-center px-2">
                <Input
                  type="text"
                  placeholder="City,Zip Code"
                  value={selectedItemList.location}
                  className="outline-none relative px-3 text-[.7rem] sm:text-[.9rem] text-[#636677]   font-sansBold"
                />
                <img
                  src={greenArrowDown}
                  alt=""
                  ref={locAreasRef}
                  className={`w-3 h-3 mr-2 cursor-pointer  absolute right-0 top-[1.4rem] ${
                    isLocationDropdown ? "transform rotate-180" : ""
                  }`}
                  onClick={() => {
                    setIsLocationDropdown(!isLocationDropdown);
                  }}
                />
                <ul
                  className={`${
                    isLocationDropdown
                      ? "absolute mt-1 px-6 top-10 max-h-60 z-10 w-full  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      : ""
                  }`}
                >
                  {isLocationDropdown &&
                    locationAreas?.map((item) => (
                      <div class="mb-2">
                        <li
                          onClick={() =>
                            handleSelectedItem(item?.city, "location")
                          }
                          className="cursor-pointer text-[12px] hover:underline mt-1 font-sansRegular font-semibold text-gray-700 tracking-[0.1rem]"
                        >
                          {item?.city}
                        </li>
                      </div>
                    ))}
                </ul>
              </div>
              <div className="relative border border-verifiCation w-full py-4 mt-8 flex justify-between items-center rounded px-2">
                <Input
                  type="text"
                  placeholder="Specialty/Condition"
                  value={selectedItemList.specialitycondition}
                  className="relative outline-none px-3 text-[.7rem] sm:text-[.9rem] font-sansBold text-[#5a5c66]"
                />
                <img
                  src={greenArrowDown}
                  ref={specialityRef}
                  onClick={() => {
                    setIsSpecialityDropdown(!isSpecialityDropdown);
                  }}
                  alt=""
                  className={`w-3 h-3 mr-2 cursor-pointer absolute right-0 top-[1.4rem] ${
                    isSpecialityDropdown ? "transform rotate-180" : ""
                  }`}
                />
                <ul
                  className={`${
                    isSpecialityDropdown
                      ? "absolute mt-1 px-6 top-10 max-h-60 z-10 w-full  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      : ""
                  }`}
                >
                  {isSpecialityDropdown && SpecialityAndCondition()}
                </ul>
              </div>

              <div className="border relative border-verifiCation w-full py-4 mt-8 flex justify-between items-center rounded px-2">
                {/* <Input
                  type="Today"
                  placeholder="Today"
                  className="outline-none px-3 text-[.7rem] sm:text-[.9rem] text-[#636677] tracking-[2px] font-sansRegular"
                /> */}
                <span className="outline-none px-3 text-[.7rem] mt-1 sm:text-[.9rem] 2xl:text-[1.2rem] text-[#636677] mr-20 font-sansBold">
                  {startDate &&
                  startDate.toDateString() === new Date().toDateString()
                    ? "Today"
                    : startDate?.toLocaleDateString()}
                </span>
                <img
                  src={calendar}
                  alt=""
                  onClick={handleClick}
                  className="w-4 h-4 mr-2 cursor-pointer"
                />
                {isOpen && (
                  <div className="absolute top-[2rem] right-0 z-[100] h-full">
                    <DatePickerComponent
                      handleChange={handleChange}
                      startDate={startDate}
                    />
                  </div>
                )}
              </div>
              <div className="border border-verifiCation w-full py-3 rounded mt-8 flex justify-between items-center px-2">
                <Button
                  onClick={toggleButtonHandler}
                  className={`${
                    !isActive ? "bg-[#008282] " : ""
                  } py-2 px-3  sm:px-16 ${
                    isActive ? "text-black" : "text-white"
                  } text-[1rem] tracking-[2px] font-sansRegular rounded`}
                >
                  InPerson
                </Button>
                <Button
                  onClick={toggleButtonHandler}
                  className={`${
                    isActive ? "bg-[#008282] " : ""
                  } py-2 px-3 sm:px-16 ${
                    isActive ? "text-white" : "text-black"
                  } text-[1rem] tracking-[2px] font-sansRegular rounded`}
                >
                  Virtual
                </Button>
              </div>
              <div className="flex justify-center items-center ">
                <Button className="bg-[#008282] py-3 px-16 mt-10 rounded-full text-white text-[1rem] tracking-[2px] font-sansRegular">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MakeAppointment;
