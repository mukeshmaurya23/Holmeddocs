import React, { useState, useRef, useEffect } from "react";
import Label from "../../util/Label";
import Input from "../../util/Input";
import Otp from "../../util/Otp";

const Step2Forgot = ({ formik }) => {
  const { handleChange, handleBlur, values, errors, touched } = formik;

  // const inputRef = useRef({});
  // const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  // console.log(otp);

  // console.log(formik.values);

  // useEffect(() => {
  //   inputRef.current[0].focus();
  // }, []);
  // const handleChnage = (e, index) => {
  //   const { name, value } = e.target;

  //   if (/[a-zA-Z]/gi.test(value)) return;
  //   const updatedOtp = [...otp];
  //   updatedOtp[index] = value.slice(-1);
  //   setOtp(updatedOtp);

  //   const updatedValues = {
  //     ...values,
  //     otp: updatedOtp.join(""), // Combine the otp array into a string
  //   };
  //   formik.setValues(updatedValues);

  //   // const currentIndex = Object.keys(otp).indexOf(name);
  //   // const nextIndex = currentIndex + 1;
  //   // const nextInput = inputRef.current[nextIndex];
  //   // if (nextInput) {
  //   //   nextInput.focus();
  //   // }
  //   if (value && index < 5) {
  //     inputRef.current[index + 1].focus();
  //   }
  // };

  // // const handleBackspace = (e, index) => {
  // //   const { name, value } = e.target;
  // //   if (e.keyCode === 8 && !value) {
  // //     const prevIndex = index - 1;
  // //     const prevInput = inputRef.current[prevIndex];
  // //     if (prevInput) {
  // //       prevInput.focus();
  // //     }
  // //   }
  // // };

  // const handleBackspace = (event, index) => {
  //   if (event.key === "Backspace") {
  //     if (index > 0) {
  //       inputRef.current[index - 1].focus();
  //     }
  //   }
  // };

  // const renderInput = () => {
  //   return Object.keys(otp).map((key, index) => (
  //     <input
  //       key={index}
  //       ref={(element) => (inputRef.current[index] = element)}
  //       maxlength="1"
  //       onChange={(e) => handleChnage(e, index)}
  //       className={`border outline-verifiCation border-verifiCation rounded-md py-2 px-3 focus:border-verifiCation text-formLabel w-10 sm:w-10 md:w-10 mr-2 `}
  //       type="text"
  //       name={key}
  //       value={formik.values.otp[index]}
  //       onKeyUp={(event) => handleBackspace(event, index)}
  //     />
  //   ));
  // };
  return (
    <>
      <div className="flex flex-col  py-2 px-2 sm:px-14">
        <p className="font-sansRegular text-[#292F33] font-semibold text-2xl tracking-[3px] mt-4 mb-2 px-2 sm:px-4 text-[16px] sm:text-2xl">
          Forgot your password?
        </p>
        <p className="font-sansRegular text-sm text-[#545871] py-2 px-2 sm:px-4 mt-3">
          Don’t worry, we will help you to reset.
        </p>

        <div className="px-1 sm:px-5 py-2">
          <div className="mx-4 p-4 max-w-[500px]">
            <div className="flex items-center justify-center">
              <div className="flex items-center text-white relative">
                <div className="rounded-full transition duration-500 ease-in-out h-10 w-10 py-3 border-2 bg-verifiCation border-verifiCation flex items-center justify-center">
                  <p className="text-center">1</p>
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-sansRegular  text-[#757993]">
                  Mobile Number
                </div>
              </div>
              <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-verifiCation"></div>
              <div className="flex items-center text-verifiCation relative">
                <div className="rounded-full transition duration-500 ease-in-out h-10 w-10 py-3 border-2 text-white bg-verifiCation border-verifiCation flex items-center justify-center">
                  2
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium font-sansBold  text-[#757993]">
                  OTP Verification
                </div>
              </div>
              <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-verifiCation"></div>
              <div className="flex items-center text-verifiCation relative">
                <div className="rounded-full transition duration-500 ease-in-out h-10 w-10 py-3 border-2 border-verifiCation flex items-center justify-center">
                  3
                </div>
                <div className="absolute font-sansRegular top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium  text-[#757993]">
                  Reset Password
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[500px] mt-12 mx-3 sm:mx-8">
          <div className="flex flex-col space-y-2 w-10/12 py-0 relative">
            <Label
              htmlFor="mobileNumber"
              className="font-sansRegular text-[#757993] text-xs"
            >
              Mobile Number
            </Label>
            <div className="absolute left-0 top-[1.5rem] w-3 pl-2  h-full text-md text-formLabel">
              +1
            </div>
            <Input
              type="number"
              name="mobileNumber"
              id="mobileNumber"
              value={values.mobileNumber}
              placeholder="+1 xxx xxx xxxx"
              className="border border-verifiCation text-formLabel rounded-md py-2 px-8 outline-none focus:border-verifiCation sm:w-[400px] xsm:w-[310px]"
            />
          </div>

          <div className="flex flex-col mt-[1rem]">
            <Label
              htmlFor="otp"
              className="font-sansRegular text-[#757993] text-xs"
            >
              Enter OTP
            </Label>

            <div className="max-w-[430px]">
              <div className="flex justify-between mt-4">
                <Otp />
              </div>
              {/* {errors.otp && touched.otp && (
                <div className="text-red-600 text-sm">{formik.errors.otp}</div>
              )} */}
              <div className="flex">
                {/* {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="text-red-600 text-xs mt-1">
                    {touched[`otp${index}`] && errors[`otp${index}`]}
                  </div>
                ))} */}
              </div>
            </div>

            <p className="mt-6 text-formLabel">
              Didn't receive the OTP?{" "}
              <span className="text-verifiCation cursor-pointer underline">
                Resend
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2Forgot;
