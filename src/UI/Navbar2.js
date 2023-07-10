import React, { useEffect, useRef, useState } from "react";
import userLogo from "../images/home/User.png";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../images/home/Logo.png";
import PortalModal from "./PortalModal";
import hamBurger from "../images/icons/Hamburger.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../store/mobileAppSlice";
import cross from "../images/icons/Cross.png";
import { useLocation } from "react-router-dom";
import searchIcon from "../images/home/SearchBarIcon.svg";
import { logout } from "../store/loginSlice";
import Modal from "./Modal";
import { fetchData } from "../store/apiSlice";
const Navbar2 = () => {
  const [isLoggedInDropdown, setIsLoggedInDropdown] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({
    location: "",
    speciality: "",
    date: "",
  });
  // const openHandleDropdown = () => {
  //   setDropdownVisible(true);
  // };
  // const closeHandleDropdown = () => {
  //   setDropdownVisible(false);
  // };
  // const handleDropdownClick = () => {
  //   if (dropdownVisible) {
  //     closeHandleDropdown();
  //   } else {
  //     openHandleDropdown();
  //   }
  // };

  // const onFocusOut = () => {
  //   setDropdownVisible(false);
  // };

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
  const navigate = useNavigate();
  const isMenuOpen = useSelector((state) => state.mobileApp.isMenuOpen);
  //const isLoggedIn = localStorage.getItem("token");
  const isLoggedIn = useSelector((state) => state.login.remember_token);
  const logOutHandler = () => {
    dispatch(logout());
  };
  const ref = useRef();
  const loginRef = useRef();

  //search params getting data from url
  const locationSearchParams = searchParams.get("location");
  const specialitySearchParams = searchParams.get("speciality");
  const dateSearchParams = searchParams.get("date");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setDropdownVisible(false);
      }
      if (!loginRef?.current?.contains(event.target)) {
        setIsLoggedInDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  // useEffect(() => {
  //   if (dropdownVisible) {
  //     document.addEventListener("click", () => {
  //       setDropdownVisible(true);
  //     });
  //     return () => {
  //       document.removeEventListener("click", () => {
  //         setDropdownVisible(false);
  //       });
  //     };
  //   }
  // }, [dropdownVisible]);
  //for location and speciality data
  const locDataDispatch = useDispatch();
  const { data: locationData } = useSelector((state) => state.api);
  useEffect(() => {
    locDataDispatch(fetchData("/patient/master/state"));
  }, [locDataDispatch]);

  const { data: specialityData } = useSelector((state) => state.api);
  const specialityDispatch = useDispatch();
  useEffect(() => {
    specialityDispatch(fetchData("/patient/master/speciality"));
  }, [specialityDispatch]);

  const handleLocationChange = (e) => {
    setSearchParams({ ...searchParams, location: e.target.value });
  };

  const handleSpecialityChange = (e) => {
    setSearchParams({ ...searchParams, speciality: e.target.value });
  };

  const handleDateChange = (e) => {
    setSearchParams({ ...searchParams, date: e.target.value });
  };

  const location = useLocation();
  console.log(location.pathname);
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
            ? ""
            : "lg:py-5"
        } grid grid-col-12 py-1  ${
          location.pathname === "/make-appointment" ||
          location.pathname === "/doctor-listing"
            ? ""
            : "md:py-3"
        } bg-white z-10  h-[7rem] relative drop-shadow-lg cursor-pointer`}
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

              {/* <div className="flex">
                <input className="border border-gray-300 rounded-md py-2 px-4 w-[500px] h-[40px] mr-4" />
                <img
                  src={searchIcon}
                  alt="search"
                  className="h-auto w-[50px]"
                />
              </div> */}

              <div className="border-[1px] flex items-center rounded-lg border-[#b5b1b1] ">
                <div className="flex items-center relative">
                  <input
                    className=" py-1 w-[200px] h-[40px] mr-1 outline-none border-r border-[#b5b1b1] pl-2"
                    placeholder={locationSearchParams}
                  />

                  <input
                    className="outline-none border-r border-[#b5b1b1] py-1 w-[200px] h-[40px] pl-2 text-[#b5b1b1]"
                    placeholder={specialitySearchParams}
                  />

                  <input
                    className="outline-none  py-1 w-[200px] h-[40px] pl-2 text-[#b5b1b1]"
                    placeholder={dateSearchParams}
                    onChange={handleDateChange}
                  />
                </div>
                <img
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
                    <Link to="/">
                      <h2 className="font-sansBold text-[14px]">
                        Make an appointment
                      </h2>
                    </Link>
                    <div className=" border-b " />
                    <div>
                      <h2 className="font-sansBold text-[14px]">Browse</h2>
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
