import React, { useState } from "react";
import checkMark from "../../../images/profile/Checkmark.png";
import Button from "../../../util/Button";
import Footer from "../../../UI/Footer";
import { Link } from "react-router-dom";
const BookAppointmentStep2 = () => {
  const [expandData, setExpandData] = useState(false);

  const handleExpandData = () => {
    setExpandData(!expandData);
  };

  return (
    <>
      <div className=" mt-[1rem] sm:mt-[10rem]  flex flex-col justify-center items-center">
        <h2 className="text-[1.6rem] tracking-[3px] font-sansBold text-center text-verifiCation">
          Success!
        </h2>
        <div className="flex items-center justify-center mt-5">
          <img src={checkMark} alt="checkmark" className="w-5 h-auto" />
          <p className="text-[1rem] ml-[10px] text-center  text-gray-500">
            You have successfully booked an appointment with
          </p>
        </div>
        <h1 className="text-[1.1rem] tracking-[1px] font-sansRegular font-semibold text-center text-[#707070] py-4">
          Dr. Alexander O Babazadeh
        </h1>
      </div>
      <div className="sm:mx-auto m-[10px] sm:m-[10px] mt-10  bg-[#DFFEFE] px-10  py-10 border-2 border-verifiCation rounded-xl max-w-[600px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 ">
          <div>
            <p className="text-[#9FA1AF] py-1">Type of visit</p>
            <p className="text-[#292F33] font-sansRegular">InPerson</p>
          </div>
          <div className="">
            <p className="text-[#9FA1AF] py-2">Clinic Address</p>
            <p className="max-w-[190px] text-[#171b1d] font-sansRegular text-[14px]">
              14 Street Medical P.C. 110 W 14th St New York, NY 10011
            </p>
          </div>
          <div className="py-3">
            <p className="text-[#9FA1AF] py-1">Date</p>
            <p className="text-[#292F33] font-sansRegular">
              Monday, September 1
            </p>
          </div>
          <div className="py-3">
            <p className="text-[#9FA1AF] py-1">Time</p>
            <p className="text-[#292F33] font-sansRegular">8:00 AM</p>
          </div>
          {expandData && (
            <>
              <div className="py-3">
                <p className="text-[#9FA1AF] py-1">Medical Conditions</p>
                <p className="text-[#292F33] font-sansRegular">
                  Digestive disorders
                </p>
              </div>
              <div className="py-3">
                <p className="text-[#9FA1AF] py-1">Have visited before ?</p>
                <p className="text-[#292F33] font-sansRegular">No</p>
              </div>
              <div className="py-3">
                <p className="text-[#9FA1AF] py-1">Practice Areas</p>
                <p className="text-[#292F33] font-sansRegular">Dietician</p>
              </div>
              <div className="py-3">
                <p className="text-[#9FA1AF] py-1">Insurance</p>
                <p className="text-[#292F33] font-sansRegular">UHC</p>
              </div>
              <div className="py-3">
                <p className="text-[#9FA1AF] py-1">Reason</p>
                <p className="text-[#292F33] font-sansRegular text-[14px]">
                  14 Street Medical P.C. 110 W 14th St New York, NY 10011
                </p>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-center gap-10">
          <Link to="/">
            <Button className="px-5 py-[7px] bg-white text-verifiCation border border-verifiCation font-sansBold rounded-full mt-5 text-[12px]">
              Back to Home
            </Button>
          </Link>
          <Button
            className="px-5 py-[7px] ml-3 bg-verifiCation text-white rounded-full mt-5 font-sansBold text-[12px]"
            onClick={handleExpandData}
          >
            {expandData ? " View Less" : "View details"}
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default BookAppointmentStep2;
