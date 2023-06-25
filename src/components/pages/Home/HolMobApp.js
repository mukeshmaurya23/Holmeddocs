import React from "react";
import mobileLogo from "../../../images/home/Mobile.png";

const HolMobApp = () => {
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="px-20 py-3">
          <h2 className="font-sansBold text-[#292F33] text-[2.5rem] tracking-[4px]">
            Download Holmeddoc
          </h2>
          <h2 className="font-sansBold text-[#292F33] text-2xl py-4 text-[2rem]  tracking-[4px]">
            Mobile App
          </h2>
          <ul className="font-sansRegular text-sm text-[#545871] p-7 mt-8 py-3">
            <li className="py-3 text-[#545871] font-sansRegular">
              Seamless way to find and book appointments for a holistic cure.
            </li>
            <li className="py-3 text-[#545871] font-sansRegular">
              Search based on specialty and select the doctor you wish to
              continue with.
            </li>
            <li className="py-3 text-[#545871] font-sansRegular">
              Select the date and time based on availability and book the
              appointment.
            </li>
            <li className="py-3 text-[#545871] font-sansRegular">
              Get online/in-person consultation from Doctors near you.
            </li>
            <div className="flex mt-5">
              <img
                className="mr-4 w-[120px] h-[40px]"
                alt="appstore"
                src="https://www.pngmart.com/files/10/Download-On-The-App-Store-PNG-Image.png"
              />
              <img
                className="mr-2 w-[120px] h-[40px]"
                alt="playstore"
                src="https://e7.pngegg.com/pngimages/918/845/png-clipart-google-play-logo-google-play-app-store-android-google-play-text-logo.png"
              />
            </div>
          </ul>
        </div>
        <div className="mr-4 mb-10 md:mr-24 ">
          <img
            src={mobileLogo}
            alt=""
            className="w-[100%] h-auto mt-16 md:w-[84%]"
          />
        </div>
      </div>
    </>
  );
};

export default HolMobApp;
