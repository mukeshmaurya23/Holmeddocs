import React from "react";
import mobileLogo from "../../../images/home/Mobile.png";

const HolMobApp = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="px-8 md:px-20 py-3">
          <h2 className="font-sansBold text-[#292F33] text-[1.1rem] text-center md:text-start md:text-[2rem] tracking-[1px] md:tracking-[4px]">
            Download Holmeddoc
          </h2>
          <h2 className="font-sansBold text-[#292F33] text-[1.1rem] text-center md:text-start md:text-[2rem] tracking-[1px] md:tracking-[4px]">
            Mobile App
          </h2>
          <ul className="font-sansRegular text-sm text-[#545871] p-4 mt-2 md:mt-6 md:mt-8 py-3">
            <li className="py-2 md:py-3">
              Seamless way to find and book appointments for a holistic cure.
            </li>
            <li className="py-2 md:py-3">
              Search based on specialty and select the doctor you wish to
              continue with.
            </li>
            <li className="py-2 md:py-3">
              Select the date and time based on availability and book the
              appointment.
            </li>
            <li className="py-2 md:py-3">
              Get online/in-person consultation from Doctors near you.
            </li>
          </ul>
          <div className="flex mt-5 ml-5">
            <img
              className="mr-4 w-[100px] h-[2rem]"
              alt="appstore"
              src="https://www.pngmart.com/files/10/Download-On-The-App-Store-PNG-Image.png"
            />
            <img
              className="mr-2 w-[100px] h-[2rem]"
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
