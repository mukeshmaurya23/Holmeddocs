import React, { useState } from "react";
import Input from "../../util/Input";
import Label from "../../util/Label";
import eyeClose from "../../images/Login/Eye.png";
import eyeOpen from "../../images/Login/EyeVisible.png";
import Button from "../../util/Button";
// import { registerSchema } from "../../schema/formValidation";
// import { useFormik } from "formik";

const Step3Forgot = ({ formik }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
  // const formik = useFormik({
  //   initialValues: {
  //     password: "",
  //     confirmPassword: "",
  //   },

  //   validationSchema: registerSchema,
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });
  const { touched, errors, values } = formik;
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
                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium font-sansRegular  text-[#757993]">
                  OTP Verification
                </div>
              </div>
              <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-verifiCation"></div>
              <div className="flex items-center text-verifiCation relative">
                <div className="rounded-full transition duration-500 ease-in-out h-10 w-10 py-3 border-2 bg-verifiCation text-white border-verifiCation flex items-center justify-center">
                  3
                </div>
                <div className="absolute  top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium font-sansBold text-[#757993]">
                  Reset Password
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[500px] mt-12 mx-3 sm:mx-8">
          <div className="flex flex-col  w-full relative p-[10px]">
            <Label
              htmlFor="password"
              className="font-sansRegular text-formLabel text-sm"
            >
              Enter Password
            </Label>
            <Input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              id="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              className="border border-verifiCation text-formLabel rounded-md py-2 px-4"
            />
            <div className="text-red-600 text-xs ">
              {formik.touched.password && formik.errors.password ? (
                formik.errors.password
              ) : (
                <>&nbsp;</>
              )}
            </div>
            <Button
              type="button"
              className="absolute top-11 right-5"
              aria-label="Toggle Password Visibility"
            >
              <img
                src={isPasswordVisible ? eyeOpen : eyeClose}
                onClick={togglePasswordVisibility}
                alt="toggle password visibility"
                className="w-4 h-3"
              />
            </Button>
          </div>
          <div className="flex flex-col  w-full relative p-[10px]">
            <Label
              htmlFor="confirmPassword"
              className="font-sansRegular text-formLabel text-sm"
            >
              Confirm Password
            </Label>
            <Input
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              className="border border-verifiCation text-formLabel rounded-md py-2 px-4"
            />
            <div className="text-red-600 text-xs ">
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                formik.errors.confirmPassword
              ) : (
                <>&nbsp;</>
              )}
            </div>
            <Button
              type="button"
              className="absolute top-11 right-5"
              aria-label="Toggle Password Visibility"
            >
              <img
                src={isConfirmPasswordVisible ? eyeOpen : eyeClose}
                onClick={toggleConfirmPasswordVisibility}
                alt="toggle password visibility"
                className="w-4 h-3"
              />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step3Forgot;
