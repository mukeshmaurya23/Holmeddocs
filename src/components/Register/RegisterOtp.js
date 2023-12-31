import React, { useState } from "react";
import Input from "../../util/Input";
import otp from "../../images/home/otp.jpg";

import Button from "../../util/Button";
import Aside from "../../util/Aside";
import Otp from "../../util/Otp";
import { Link, useNavigate, useLocation } from "react-router-dom";
import customAxios from "../../axios/custom";
import OtpCountDown from "../../util/OtpCountDown";
import { useSnackbar } from "notistack";
import Spinner from "../../UI/Spinner";
const RegisterOtp = () => {
  const [otpValue, setOtpValue] = useState("");
  const [otpMessage, setOtpMessage] = useState("");

  const handleOtpChange = (otpValue) => {
    setOtpValue(parseInt(otpValue));
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const location = useLocation();
const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(otpValue, "From RegisterOtp");
    if (!otpValue) return alert("Please enter the OTP");
    if (otpValue !== 123456) return alert("Please enter the correct OTP");
    try {
      setLoading(true);
      const response = await customAxios.post("/patient/verify_otp", {
        token: otpValue,
        request_type: "register",
        phone: location?.state?.phone,
      });

      console.log(response.data, "im response from registerotp");
      enqueueSnackbar(response.data.message, {
        variant: response.data.success ? "success" : "error",
        autoHideDuration: 1000,
      });
      if (response.data.success) {
        setLoading(false);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }finally{
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-col lg:flex-row flex-1">
          <Aside image={otp} success={otpMessage} />
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
                  Enter the 4-digit verification code sent to your mobile number{" "}
                  {location?.state?.phone}
                </p>
                <div className="max-w-[500px]">
                  <div className="flex items-center justify-between mt-2 px-5">
                    <Otp onOtpChange={handleOtpChange} />
                  </div>
                  <div className="flex justify-end mr-7 ">
                    <p className="ml-1 text-verifiCation mt-2 flex">
                      0:
                      <OtpCountDown />
                    </p>
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
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="mx-4 sm:mx-10 px-7 sm:px-20 rounded-full bg-white py-2 text-black"
                >
                  {loading ? <Spinner /> : "Verify"}
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
