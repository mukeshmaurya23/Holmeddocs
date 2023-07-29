import React, { useEffect, useRef, useState } from "react";
import userLogo from "../images/home/User.png";
import {
  Link,
  Outlet,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import logo from "../images/home/Logo.png";
import PortalModal from "./PortalModal";
import hamBurger from "../images/icons/Hamburger.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../store/mobileAppSlice";
import cross from "../images/icons/Cross.png";

import searchIcon from "../images/home/SearchBarIcon.svg";
import { logout } from "../store/loginSlice";
import Modal from "./Modal";
import moment from "moment";
import calendarSvg from "../images/home/Calendar.svg";

import DatePickerComponent from "./DatePicker";
import { searchLocation } from "../store/searchSlice";
import Spinner from "./Spinner";

const Navbar2 = () => {
  const [isLoggedInDropdown, setIsLoggedInDropdown] = useState(false);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [zip_code_id, setZipCodeId] = useState("");
  const [speciality_id, setSpecialityId] = useState("");
  const [condition_id, setConditionId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();
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

  const [SpecCondSearchValue, setCondSpecSearchValue] = useState("");

  const {locationSearchResults} = useSelector(
    (state) => state.search
  );
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const [selectedItemList, setSelectedItemList] = useState({
    location: "",
    speciality: "",
    conditions: "",
  });
  // const { data: conditionData, loading: conditionLoading } = useFetch(
  //   "/patient/master/condition"
  // );
  // const { specialties, status: specStatus } = useSelector(
  //   (state) => state.data
  // );

  const [searchValue, setSearchValue] = useState("");

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


  // useEffect(() => {
  //   return () => {
  //     setSelectedItemList({
  //       location: "",
  //       speciality: "",
  //       conditions: "",
  //     });
  //   }; 
  // }, [selectedItemList.location, selectedItemList.speciality, selectedItemList.conditions]);
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
          conditions: "", // Clear the selected condition when selecting a specialty
        };
        setSelectedItem(null);
      } else if (type === "conditions") {
        updatedItemList = {
          ...updatedItemList,
          speciality: "", // Clear the selected specialty when selecting a condition
          conditions: name,
          condition_id: id,
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

  },[]);
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
      url += `speciality=${selectedItemList.speciality}_${speciality_id}&`;
    }
    if (selectedItemList.conditions) {
      url += `conditions=${selectedItemList.conditions}_${condition_id}&`;
    }

    url += `date=${startDate.toDateString()}`;

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
          Conditions
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

    if (id === "location") {
      handleLocationSelection();
    } else if (id === "speciality") {
      handleSpecialtySelection();
    }
  };



  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [logOutmodal, setlogOutModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  const loggedInToggleDropdown = () => {
    setIsLoggedInDropdown(!isLoggedInDropdown);
  };

  const isMenuOpen = useSelector((state) => state.mobileApp.isMenuOpen);
  //const isLoggedIn = localStorage.getItem("token");
  const isLoggedIn = useSelector((state) => state.login.remember_token);
  const logOutHandler = () => {
    dispatch(logout());
  };

  const ref = useRef();
  const loginRef = useRef();

  const locSpecConditionRef = useRef();

  let locationSearchParams = searchParams.get("location");
  let specialitySearchParams = searchParams.get("speciality");

  let conditionSearchParams = searchParams.get("conditions");

  const dateSearchParams = searchParams.get("date");
  console.log(dateSearchParams, "dateSearchParams");

  const [formattedDate,setFormattedDate]=useState(dateSearchParams)
  useEffect(() => {
    const dateObject = moment(dateSearchParams);
    const today = moment();

    
    const newFormattedDate = dateObject.isSame(today, 'day')
      ? 'Today'
      : dateObject.format('MMMM D, YYYY');

    setFormattedDate(newFormattedDate);
  }, [dateSearchParams]);


  const [clearingPlaceholder, setClearingPlaceholder] = useState(null);
  const [clearSpecialityPlaceholder, setClearSpecialityPlaceholder] =
    useState(null);
  const [clearConditionPlaceholder, setClearConditionPlaceholder] =
    useState(null);

  useEffect(() => {
    if (locationSearchParams) {
      setClearingPlaceholder(locationSearchParams.split("_")[0]);
    }
    if (specialitySearchParams) {
      setClearSpecialityPlaceholder(specialitySearchParams.split("_")[0]);
    }
    if (conditionSearchParams) {
      setClearConditionPlaceholder(conditionSearchParams.split("_")[0]);
    }
    return () => {
      setClearingPlaceholder(null);
      setClearSpecialityPlaceholder(null);
      setClearConditionPlaceholder(null);
    }
  }, [locationSearchParams, specialitySearchParams, conditionSearchParams]);
const calendarRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setDropdownVisible(false);
      }
      if (!locSpecConditionRef?.current?.contains(event.target)) {
        setSelectedItem(null);
      }
      if (!calendarRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
      if (!loginRef?.current?.contains(event.target)) {
        setIsLoggedInDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      //aslo clear the value in location and speciality

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

    //check if routes chnage clear the selected item list
    useEffect(() => {
      return () => {
        setSelectedItemList({
          location: "",
          speciality: "",
          conditions: "",
        });
        setSearchValue("");
     
        setClearSpecialityPlaceholder("") 
        setClearConditionPlaceholder("")
      };
    }, [location.pathname]);

  const handleDateChange = (e) => {
    setSearchParams({ ...searchParams, date: e.target.value });
  };



  const showShadow = location.pathname !== "/";
  const LoginSignup = (
    <div
      className="font-sansBold font-semibold text-sm lg:text-navbarLg"
      ref={ref}
    >
      <div className="relative">
        <button
          className="flex items-center px-0 text-sm text-black focus:outline-none font-semibold"
          onClick={() => {
            setDropdownVisible(!dropdownVisible);
          }}
        >
          {!isLoggedIn ? (
            <span className="font-sansBold font-semibold text-sm lg:text-navbarLg mr-2 tracking-[.15rem] cursor-pointer">
              LOGIN/SIGNUP
            </span>
          ) : null}
          {isLoggedIn ? (
            <img
              className="h-7"
              alt="user"
              src={userLogo}
              onClick={loggedInToggleDropdown}
              ref={loginRef}
            />
          ) : (
            <img className="h-7" alt="user" src={userLogo} />
          )}
        </button>
        {!isLoggedIn && dropdownVisible && (
          <div className="absolute bg-white rounded-md shadow-lg mt-2 py-2 w-48 p-3">
            <div className="flex gap-2">
              <p className=" text-gray-800">Patients</p>
              <Link
                to="/login"
                className="block text-sm text-gray-900 hover:bg-gray-100 border-b border-dotted border-gray-900 "
              >
                Log in
              </Link>
              {/* <div className="mt-1 text-gray-400">|</div> */}
              <Link
                to="/register"
                className="block   text-sm text-gray-700 hover:bg-gray-100 border-b border-dotted border-gray-900 "
              >
                Sign up
              </Link>
            </div>
            <div className="flex gap-2 py-2">
              <p className=" text-gray-800 text-sm">Doctors</p>
              <button className="block  text-sm text-gray-700 hover:bg-gray-100  border-b border-dotted border-gray-900">
                Log in
              </button>
            </div>
          </div>
        )}
        {isLoggedIn && isLoggedInDropdown && (
          <div className="absolute -left-[11rem] w-[200px] px-3 bg-white rounded-md shadow-lg mt-2 py-2">
            <div className="flex flex-col">
              <Link
                to="/sidebar"
                className="block pl-[10px] py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                My Profile
              </Link>
              <Link
                to="/sidebar/appointment-list"
                className="block pl-[10px] py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                My Appointments
              </Link>
              <button
                className="block pl-[10px] py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  setlogOutModal(true);
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  return (
    <>
      <div
        class={`px-6 md:px-2 lg:px-2 xl:px-4 text-slate-700  ${
          location.pathname === "/make-appointment" ||
          location.pathname === "/doctor-listing"
            ? "drop-shadow-lg"
            : "lg:py-5"
        } grid grid-col-12 py-1  ${
          location.pathname === "/make-appointment" ||
          location.pathname === "/doctor-listing"
            ? ""
            : "md:py-3"
        } ${
          showShadow ? "drop-shadow-md" : ""
        } bg-white z-10  h-[7rem] relative cursor-pointer`}
      >
        <div class="md:flex flex-row justify-between items-center  hidden mx-10  text-gray-900 ">
          {location.pathname === "/make-appointment" ? (
            <>
              <Link to="/">
                <img
                  className="w-[112px] pb-3 h-auto cursor-pointer mr-auto absolute top-[0px]"
                  alt="Logo"
                  src={logo}
                />
              </Link>
              <div className="flex items-center justify-between ml-auto">
                <div className="flex items-center">
                  <Link to="/make-appointment">
                    <div className="font-sansBold font-semibold text-sm lg:text-navText uppercase tracking-[.15rem] cursor-pointer ml-4">
                      Make an Appointment
                    </div>
                  </Link>
                </div>
                <div class="mx-2 text-gray-400">|</div>

                <div className="flex items-center">
                  {showModal && <PortalModal closeModal={closeModal} />}
                  <div
                    onClick={openModal}
                    className="font-sansBold font-semibold text-sm lg:text-navbarLg tracking-[.15rem] uppercase cursor-pointer mx-4"
                  >
                    Browse
                  </div>
                  <div class=" text-gray-400">|</div>

                  <Link to="/about-us">
                    <div className="font-sansBold font-semibold text-sm lg:text-navbarLg uppercase tracking-[.15rem] cursor-pointer mx-4">
                      About Us
                    </div>
                  </Link>
                  <div class="mx-2 text-gray-400">|</div>

                  {LoginSignup}
                </div>
              </div>
            </>
          ) : location.pathname === "/doctor-listing" ? (
            <>
              <Link to="/">
                <img
                  className="w-[112px] pb-3 h-auto cursor-pointer mr-auto absolute top-[0px]"
                  alt="Logo"
                  src={logo}
                />
              </Link>

          

              <div
                ref={locSpecConditionRef}
                className="border-[2px] flex items-center rounded-lg border-gray-300  "
              >
                <div className="flex items-center relative">
                  <input
                    ref={locSpecConditionRef}
                    className={`relative py-1 w-[250px] h-[40px] mr-1 2xl:w-[350px]   outline-none border-r placeHolderText  border-[#b5b1b1] pl-2 ${
                      selectedItemList.location || locationSearchParams
                        ? "text-[1rem] font-semibold"
                        : "text-[1rem]"
                    }`}
                    placeholder={clearingPlaceholder || "Location"}
                    value={selectedItemList.location || searchValue}
                    onChange={handleLocationSearch}
                    onClick={() =>
                      setSelectedItemList({
                        ...selectedItemList,
                        location: "",
                      }) ||
                      setSearchValue("") ||
                      setClearingPlaceholder("")
                    }
                  />
                  <ul
                    className={`${
                      selectedItem === "location"
                        ? "absolute top-[2.5rem] mt-1 px-6 max-h-60 min-w-[20rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        : ""
                    }`}
                  >
                    {selectedItem === "location" && locationItems()}
                  </ul>
                  <input
                    ref={locSpecConditionRef}
                    className={`relative outline-none border-r placeHolderText  border-[#b5b1b1] py-1 w-[250px] h-[40px] 2xl:w-[350px] pl-2 text-[#292F33] ${
                      selectedItemList.speciality ||
                      specialitySearchParams ||
                      selectedItemList.conditions ||
                      conditionSearchParams
                        ? "text-[1rem] font-semibold"
                        : "text-[1rem]"
                    }`}
                    placeholder={
                      clearSpecialityPlaceholder ||
                      clearConditionPlaceholder ||
                      "Speciality/Condition"
                    }
                    onChange={handleSpecialitySearch}
                    value={
                      selectedItemList.speciality ||
                      selectedItemList.conditions ||
                      SpecCondSearchValue 
                    }
                    onClick={() =>
                      handleItemClick("speciality") ||
                      setCondSpecSearchValue("") ||
                      setClearSpecialityPlaceholder("") ||
                      setClearConditionPlaceholder("")
                    }
                  />
                  <ul
                    className={`${
                      selectedItem === "speciality"
                        ? "absolute top-[2.5rem] left-[15rem] mt-1 px-6 max-h-60 min-w-[20rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        : ""
                    }`}
                  >
                    {selectedItem === "speciality" && SpecialityAndCondition()}
                  </ul>

                  <div
                className="flex ml-0 md:ml-5 cursor-pointer items-center"
                onClick={handleClick}
                ref={calendarRef}
              >
                <img
                  onChange={handleDateChange}
                  src={calendarSvg}
                  alt=""
                  className="w-6 2xl:w-9 h-auto object-contain cursor-pointer "
                />
               <span className="outline-none px-10 text-[.7rem] mt-1 sm:text-[.9rem] 2xl:text-[.9rem] text-black  font-sansRegular font-semibold">
                    {startDate &&
                    startDate.toDateString() === new Date().toDateString()
                      ? formattedDate
                      : startDate?.toLocaleDateString()}
                  </span>

                {isOpen && (
                  <div className="absolute top-[3rem]  right-0 z-[100] h-full">
                    <DatePickerComponent
                      handleChange={handleChange}
                      startDate={startDate}
                    />
                  </div>
                )}
                </div>
                </div>
                <img
                  onClick={() => handleSearch()}
                  src={searchIcon}
                  alt="search"
                  className="h-auto w-[50px] bg-verifiCation cursor-pointer rounded-r-md"
                />
              </div>

              {LoginSignup}
            </>
          ) : (
            <>
              <div class="flex items-center justify-between ">
                <Link to="/make-appointment">
                  <div class="font-sansBold  font-semibold text-sm lg:text-navText uppercase  tracking-[.15rem] cursor-pointer ">
                    Make an Appointment
                  </div>
                </Link>
                {showModal && <PortalModal closeModal={closeModal} />}
                <div class="xl:mx-6 mx-2 text-gray-400">|</div>

                <div
                  onClick={openModal}
                  class="font-sansBold  font-semibold text-sm lg:text-navbarLg tracking-[.15rem] uppercase  cursor-pointer"
                >
                  Browse
                </div>
              </div>
              <div
                class="bg-white flex items-center justify-center rounded-full  h-[10rem] w-[10rem] md:h-[10rem] md:w-[10rem]  lg:h-[15rem] lg:w-[15rem]"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Link to="/">
                  <img
                    class="h-[8rem] md:h-[10rem]  lg:h-[15rem] cursor-pointer"
                    alt="Logo"
                    src={logo}
                  />
                </Link>
              </div>
              <div class="flex items-center justify-between">
                <Link to="/about-us">
                  <div class=" font-sansBold  font-semibold text-sm lg:text-navbarLg uppercase  tracking-[.15rem] cursor-pointer">
                    About Us
                  </div>
                </Link>
                <div class="xl:mx-6 mx-2 text-gray-400">|</div>
                {LoginSignup}
              </div>
            </>
          )}
        </div>
        {/* Mobile View */}
        <div class="md:hidden flex  items-center text-gray-900 relative">
          <Link to="/">
            <img
              class=" w-[105px] h-auto cursor-pointer mr-auto"
              alt="Logo"
              src={logo}
            />
          </Link>

          <img
            src={hamBurger}
            alt="hamburger"
            className="h-6 w-7 ml-auto cursor-pointer"
            onClick={toggleMenuHandler}
          />

          {isMenuOpen && (
            <div
              className={`fixed overflow-hidden top-0 right-0 w-screen h-screen bg-white z-10 transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="relative">
                <button
                  onClick={toggleMenuHandler}
                  className="absolute top-5 right-5 h-10 w-10 bg-gray-200 flex justify-center items-center rounded-full rounded-full"
                >
                  <img src={cross} className=" h-4" />
                </button>
                <div className="absolute top-20 left-10 w-full">
                  {/* Content of the popup */}
                  <div className="flex flex-col space-y-4">
                    {/*checkLogged in in mobile */}
                    {isLoggedIn ? (
                      <>
                        <Link to="/sidebar">
                          <h2 className="font-sansBold text-[14px]">
                            My Profile
                          </h2>
                        </Link>
                        <div className=" border-b " />
                        <Link to="/sidebar/appointment-list">
                          <h2 className="font-sansBold text-[14px]">
                            My Appointment
                          </h2>
                        </Link>
                      </>
                    ) : (
                      <>
                        <div className="flex gap-7 items-center ">
                          <h2 className="font-sansBold text-[14px]">
                            Patients
                          </h2>
                          <Link
                            to="/login"
                            className="text-[11px] font-sansBold text-black border-b border-dotted border-gray-600"
                          >
                            Log In
                          </Link>
                          <Link
                            to="/register"
                            className=" text-[11px] text-black font-sansBold  border-b border-dotted border-gray-600"
                          >
                            Sign up
                          </Link>
                        </div>
                        <div className=" border-b " />
                        <div className="flex gap-7">
                          <h2 className="font-sansBold text-[14px]">Doctors</h2>
                          <Link
                            to="/login"
                            className="text-[11px] font-sansBold text-black border-b border-dotted border-gray-600"
                          >
                            Log In
                          </Link>
                          <Link
                            to="/register"
                            className=" text-[11px] text-black font-sansBold  border-b border-dotted border-gray-600"
                          >
                            Sign up
                          </Link>
                        </div>
                      </>
                    )}
                    <div className=" border-b " />
                    <Link to="/make-appointment" onClick={toggleMenuHandler}>
                      <h2 className="font-sansBold text-[14px]">
                        Make an appointment
                      </h2>
                    </Link>
                    <div className=" border-b " />
                    <div>
                      <h2
                        className="font-sansBold text-[14px]"
                        onClick={openModal}
                      >
                        Browse
                      </h2>
                    </div>
                    <div className=" border-b " />
                    <Link to="/about-us" onClick={toggleMenuHandler}>
                      <h2 className="font-sansBold text-[14px]">About Us</h2>
                    </Link>
                    <div className=" border-b " />
                    <Link to="/" onClick={toggleMenuHandler}>
                      <h2 className="font-sansBold text-[14px]">Home</h2>
                    </Link>
                    {isLoggedIn && (
                      <>
                        {" "}
                        <div className=" border-b " />
                        <h2
                          className="font-sansBold text-[14px]"
                          onClick={() => {
                            setlogOutModal(true);
                          }}
                        >
                          Logout
                        </h2>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {!isMenuOpen && <Outlet />}

      {logOutmodal && (
        <Modal
          title="Log out"
          text="Are you sure you want to Logout?"
          btnText="Yes"
          btnText2="No"
          logOutHandler={logOutHandler}
          closeModal={() => {
            setlogOutModal(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar2;