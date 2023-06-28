import React, { useState } from "react";
import Label from "../../util/Label";
import Input from "../../util/Input";
import eyeClose from "../../images/Login/Eye.png";
import eyeOpen from "../../images/Login/EyeVisible.png";
import Button from "../../util/Button";
import image from "../../images/Login/Login.jpg";
import { Link } from "react-router-dom";
import Aside from "../../util/Aside";
import { loginSchema } from "../../schema/formValidation";
import { useFormik } from "formik";
const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
      Password: "",
      checkbox: false,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleContinue = () => {
    formik.setTouched({
      mobileNumber: true,
      Password: true,
      checkbox: true,
    });
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-col lg:flex-row flex-1">
          <Aside image={image} />

          <main className="flex flex-1 flex-col relative ">
            <div className="flex justify-center sm:justify-end mt-8 sm:mr-[4rem]">
              <Link to="/">
                <img
                  src={require("../../images/icons/Logo.png")}
                  alt="logo"
                  className="w-24 h-24 mx-4 sm:mx-10"
                />
              </Link>
            </div>
            <div className="flex-grow p-5">
              <div className="max-w-[620px]">
                <h2 className="text-3xl font-sansRegular tracking-[3px] pt-[2rem] sm:pt-0  py-2 sm:px-24">
                  Login
                </h2>

                <p className="py-2 sm:px-24 font-sansRegular text-sm  text-otpText">
                  We care for your body. It’s the only place you have to live
                  in.
                </p>
                <form className="mb-6" onSubmit={formik.handleSubmit}>
                  <div className="flex flex-wrap  sm:px-24  py-4 ">
                    <div className="flex flex-col w-full py-[0px] relative">
                      <Label
                        htmlFor="mobileNumber"
                        className="font-sansRegular text-formLabel text-sm"
                      >
                        Mobile Number
                      </Label>
                      <div className="absolute left-0 top-[1.8rem] w-3 pl-2  h-full text-md text-formLabel">
                        +1
                      </div>
                      <Input
                        type="number"
                        name="mobileNumber"
                        id="mobileNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mobileNumber}
                        placeholder="XXXX XXXX XXXX"
                        className="border border-verifiCation text-formLabel rounded-md py-2 px-9 outline-verifiCation"
                      />

                      <div className="text-red-600 text-xs ml-1">
                        {formik.touched.mobileNumber &&
                        formik.errors.mobileNumber ? (
                          formik.errors.mobileNumber
                        ) : (
                          <>&nbsp;</>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col  w-full relative py-[16px]">
                      <Label
                        htmlFor="Password"
                        className="font-sansRegular text-formLabel text-sm"
                      >
                        Password
                      </Label>
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        name="Password"
                        id="Password"
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Password}
                        className="border border-verifiCation text-formLabel rounded-md py-2 px-4 outline-verifiCation"
                      />
                      <div className="text-red-600 text-xs ml-1">
                        {formik.touched.Password && formik.errors.Password ? (
                          formik.errors.Password
                        ) : (
                          <>&nbsp;</>
                        )}
                      </div>

                      <Button
                        type="button"
                        className="absolute top-[3.2rem] right-4"
                        aria-label="Toggle Password Visibility"
                      >
                        <img
                          src={isPasswordVisible ? eyeOpen : eyeClose}
                          onClick={togglePasswordVisibility}
                          alt="toggle password visibility"
                          className="w-4 h-3"
                        />
                      </Button>
                      <div className="flex justify-end  ">
                        <Link
                          to="/forgot-password"
                          className="ml-1 font-sansRegular text-xs text-forgotPassword mt-2 underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </div>
                    <div className="flex ">
                      <Input
                        type="checkbox"
                        name="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.checkbox}
                        className="rounded border-none outline-verifiCation  accent-verifiCation transition-all delay-200"
                      />

                      <Label
                        htmlFor="terms"
                        className="font-sansRegular  ml-2 text-[0.8rem] text-[#757993]"
                      >
                        I have read the Privacy Policy and agree to the Terms of
                        Service.
                      </Label>
                    </div>
                    {formik.touched.checkbox && formik.errors.checkbox ? (
                      <div className="text-red-600 text-xs mt-3 ml-0">
                        {formik.errors.checkbox}
                      </div>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
            <div className="sm:absolute bottom-0 left-0 right-0  flex justify-between bg-verifiCation p-5 ">
              <Link
                to="/register"
                className="text-white font-sansLight md:ml-[4rem] text-sm mt-3 xsm:text-[13px]"
              >
                Don’t have an account ?{" "}
                <span className="underline">Sign Up</span>
              </Link>
              <Button
                className={`mx-4 sm:mx-10 px-7 sm:px-20 rounded-full py-2 bg-white text-black `}
                type="submit"
                onClick={handleContinue}
                // disabled={!(formik.isValid && formik.dirty)}
                /**${
                  !(formik.isValid && formik.dirty)
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-white"
                } */
              >
                Login
              </Button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Login;
