import React from "react";
import Input from "../../util/Input";
import otp from "../../images/home/otp.jpg";

import Button from "../../util/Button";
import Aside from "../../util/Aside";
import Otp from "../../util/Otp";
import { Link } from "react-router-dom";
const RegisterOtp = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-col lg:flex-row flex-1">
          <Aside image={otp} />
          <main className="flex flex-1 flex-col relative overflow-y-auto">
            <div className="flex justify-center sm:justify-end mt-8 sm:mr-[4rem]">
              <Link to="/">
                <img
                  src={require("../../images/icons/Logo.png")}
                  alt="logo"
                  className="w-24 h-24 mx-4 sm:mx-10"
                />
              </Link>
            </div>
            <div className="flex-grow">
              <div className="flex flex-col px-3 py-5 sm:p-10 mt-[8rem] sm:mt-9 sm:ml-5">
                <p className=" font-sansRegular font-semibold  text-2xl tracking-[3px] mt-4 mb-2 px-5">
                  OTP Verification
                </p>
                <p className="font-sansRegular text-sm text-otpText py-2 px-5">
                  Enter the 4-digit verification code sent to your mobile number
                  +1 XXXXX XXX25
                </p>
                <div className="max-w-[500px]">
                  <div className="flex items-center justify-between mt-2 px-5">
                    <Otp />
                  </div>
                  <div className="flex justify-end mr-7 ">
                    <p className="ml-1 text-verifiCation mt-2">00:59</p>
                  </div>
                </div>

                <p className="mt-4 px-5 text-formLabel">
                  Didn't receive the OTP?{" "}
                  <span className="text-verifiCation cursor-pointer underline">
                    Resend
                  </span>
                </p>
              </div>
            </div>
            <div className="sm:absolute bottom-0 left-0 right-0  flex justify-end bg-verifiCation p-5 ">
              <div className="">
                <Button className="mx-4 sm:mx-10 px-7 sm:px-20 rounded-full bg-white py-2 text-black">
                  Verify
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default RegisterOtp;
