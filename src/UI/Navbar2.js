import React, { useState } from "react";
import userLogo from "../images/home/User.png";
import { Link, Outlet } from "react-router-dom";
import logo from "../images/home/Logo.png";
import PortalModal from "./PortalModal";
import hamBurger from "../images/icons/Hamburger.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../store/mobileAppSlice";
import cross from "../images/icons/Cross.png";
const Navbar2 = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const handleDropdownClick = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const handleOptionClick = (option) => {
    console.log(option);
  };
  const [showModal, setShowModal] = useState(false);

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

  const isMenuOpen = useSelector((state) => state.mobileApp.isMenuOpen);

  return (
    <>
      <div class="px-6 md:px-2 lg:px-2 xl:px-4 text-slate-700  lg:py-5 grid grid-col-12 py-1 md:py-3 bg-white z-10  h-[7rem] relative drop-shadow-lg">
        <div class="md:flex flex-row justify-between items-center  hidden mx-10  text-gray-900 ">
          <div class="flex items-center justify-between ">
            <div
              onClick={openModal}
              class="font-sansBold  font-semibold text-sm lg:text-navText uppercase  tracking-[.15rem] cursor-pointer "
            >
              Make an Appointment
            </div>
            {showModal && <PortalModal closeModal={closeModal} />}
            <div class="xl:mx-6 mx-2 text-gray-400">|</div>
            <Link to="/browse">
              <div class="font-sansBold  font-semibold text-sm lg:text-navbarLg tracking-[.15rem] uppercase  cursor-pointer">
                Browse
              </div>
            </Link>
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
            <div class=" font-sansBold  font-semibold text-sm lg:text-navbarLg uppercase  tracking-[.15rem] cursor-pointer">
              About Us
            </div>
            <div class="xl:mx-6 mx-2 text-gray-400">|</div>
            <div class="font-sansBold  font-semibold text-sm lg:text-navbarLg">
              <div class="w-full z-40">
                <div class="mx-auto w-full max-w-md">
                  <div>
                    <div class="relative z-20">
                      <button
                        class="flex w-full justify-between items-center  px-0 pt-0  text-left text-sm text-black focus:outline-none font-semibold z-50"
                        onClick={handleDropdownClick}
                      >
                        <span class="font-sansBold  font-semibold text-sm lg:text-navbarLg  mr-2 tracking-[.15rem] cursor-pointer">
                          LOGIN/SIGNUP
                        </span>

                        <div>
                          <img class="h-7" alt="user" src={userLogo} />
                        </div>
                      </button>
                      {dropdownVisible && (
                        <div className="absolute bg-white rounded-md shadow-lg mt-2 py-2 w-48">
                          <div className="flex">
                            <Link
                              to="/login"
                              className="block pl-[10px] py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left "
                            >
                              <button
                                onClick={() => handleOptionClick("User Login")}
                              >
                                User Login
                              </button>
                            </Link>
                            <div class="mt-1 text-gray-400">|</div>
                            <Link
                              to="/register"
                              className="block pl-[10px] ml py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <button
                                onClick={() => handleOptionClick("User Signup")}
                              >
                                User Signup
                              </button>
                            </Link>
                          </div>
                          <div className="flex ">
                            <button
                              className="block pl-[10px] py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => handleOptionClick("Doctor Login")}
                            >
                              Doctor Login
                            </button>
                            <div class="mt-1 text-gray-400">|</div>
                            <button
                              className="block pl-[2px] py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => handleOptionClick("Doctor Signup")}
                            >
                              Doctor Signup
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                    <div className="flex gap-7 items-center ">
                      <h2 className="font-sansBold text-[14px]">Patients</h2>
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
                    <Link to="/about">
                      <h2 className="font-sansBold text-[14px]">About Us</h2>
                    </Link>
                    <div className=" border-b " />
                    <Link to="/" onClick={toggleMenuHandler}>
                      <h2 className="font-sansBold text-[14px]">Home</h2>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {!isMenuOpen && <Outlet />}
    </>
  );
};

export default Navbar2;
