import React from "react";
import userLogo from "../images/home/User.png";
import { Outlet } from "react-router-dom";
const Navbar2 = () => {
  return (
    <>
      <div class="px-6 md:px-2 lg:px-2 xl:px-4 text-slate-700  lg:py-5 grid grid-col-12 py-1 md:py-3 bg-white z-10  h-[7rem] relative drop-shadow-lg">
        <div class="md:flex flex-row justify-between items-center  hidden mx-10  text-gray-900 ">
          <div class="flex items-center justify-between ">
            <div class="font-sansBold  font-semibold text-sm lg:text-navText uppercase  tracking-[.15rem] cursor-pointer ">
              Make an Appointment
            </div>
            <div class="xl:mx-6 mx-2 text-gray-400">|</div>
            <div class="font-sansBold  font-semibold text-sm lg:text-navbarLg tracking-[.15rem]  cursor-pointer">
              Browse
            </div>
          </div>
          <div class="bg-white flex items-center justify-center rounded-full absolute top-[100%] tall:top-[108%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[10rem] w-[10rem] md:h-[10rem] md:w-[10rem]   tall:h-[13rem] tall:w-[13rem] lg:h-[15rem] lg:w-[15rem]">
            <img
              class="h-[8rem] md:h-[10rem] tall:h-[13rem] lg:h-[15rem] cursor-pointer"
              alt="Logo"
              src="https://holmeddoc-static.s3.ap-south-1.amazonaws.com/home/Logo.png"
            />
          </div>
          <div class="flex items-center justify-between">
            <div class=" font-sansBold  font-semibold text-sm lg:text-navbarLg  tracking-[.15rem] cursor-pointer">
              About Us
            </div>
            <div class="xl:mx-6 mx-2 text-gray-400">|</div>
            <div class="font-sansBold  font-semibold text-sm lg:text-navbarLg">
              <div class="w-full z-40">
                <div class="mx-auto w-full max-w-md">
                  <div>
                    <div class="relative z-20">
                      <button class="flex w-full justify-between items-center  px-0 pt-0  text-left text-sm text-black focus:outline-none font-semibold z-50">
                        <span class="font-sansBold  font-semibold text-sm lg:text-navbarLg  mr-2 tracking-[.15rem] cursor-pointer">
                          LOGIN/SIGNUP
                        </span>
                        <div>
                          <img class="h-7" alt="user" src={userLogo} />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar2;
