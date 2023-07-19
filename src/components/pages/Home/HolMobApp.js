import React from "react";
import mobileLogo from "../../../images/home/Mobile.png";

const HolMobApp = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="px-8 2xl:ml-[5rem] md:px-16 py-14">
          <h2 className="font-sansRegular font-semibold text-[#292F33] text-[1.1rem] text-center md:text-start md:text-[2.5rem] tracking-[1px] md:tracking-[4px] 2xl:text-[2.3rem]">
            Download Holmeddoc
          </h2>
          <h2 className="font-sansRegular font-semibold text-[#292F33] text-[1.1rem] py-4 text-center md:text-start md:text-[2.5rem] tracking-[1px] md:tracking-[4px] 2xl:text-[2.3rem]">
            Mobile App
          </h2>
          <ul className="font-sansRegular text-md font-semibold text-[#545871] p-2 mt-2   py-3">
            <li className="py-2 md:py-4">
              Seamless way to find and book appointments for a holistic cure.
            </li>
            <li className="py-2 md:py-4">
              Search based on specialty and select the doctor you wish to
              continue with.
            </li>
            <li className="py-2 md:py-4">
              Select the date and time based on availability and book the
              appointment.
            </li>
            <li className="py-2 md:py-4">
              Get online/in-person consultation from Doctors near you.
            </li>
          </ul>
          <div className="flex mt-5 ">
            <img
              className="mr-4 w-[100px] h-[2rem] 2xl:h-[3rem] 2xl:w-[150px] cursor-pointer"
              alt="appstore"
              src="https://www.pngmart.com/files/10/Download-On-The-App-Store-PNG-Image.png"
            />
            <img
              className="mr-2 w-[100px] h-[2rem] 2xl:h-[3rem] 2xl:w-[150px] cursor-pointer"
              alt="playstore"
              src="https://e7.pngegg.com/pngimages/918/845/png-clipart-google-play-logo-google-play-app-store-android-google-play-text-logo.png"
            />
          </div>
        </div>
        <div className="mr-auto mb-10 md:mr-24 mt-5 md:mt-0 p-[10px]">
          <img
            src={mobileLogo}
            alt=""
            className="w-[18rem] md:w-[80%] lg:w-[85%] xl:w-[85%] xsm:ml-5 xs:ml-5"
          />
        </div>
      </div>
    </>
  );
};

export default HolMobApp;
