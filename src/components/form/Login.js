import React, { useState } from "react";
import Label from "../../util/Label";
import Input from "../../util/Input";
import eyeClose from "../../images/Login/Eye.png";
import eyeOpen from "../../images/Login/EyeVisible.png";
import Button from "../../util/Button";
import image from "../../images/Login/Login.jpg";
import { Link } from "react-router-dom";
import Aside from "../../util/Aside";
const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-col lg:flex-row flex-1">
          <Aside image={image} />

          <main className="flex flex-1 flex-col relative overflow-y-auto">
            <div className="flex justify-center sm:justify-end mt-8 sm:mr-[4rem]">
              <img
                src={require("../../images/icons/Logo.png")}
                alt="logo"
                className="w-24 h-24 mx-4 sm:mx-10"
              />
            </div>
            <div className="flex-grow">
              <div className="ml-5 max-w-[620px]">
                <h2 className="text-3xl font-sansRegular tracking-[3px] pt-[2rem] sm:pt-0 px-4 py-2 sm:px-24">
                  Login
                </h2>

                <p className="px-4 py-2 sm:px-24 font-sansRegular text-sm  text-otpText">
                  We care for your body. It’s the only place you have to live
                  in.
                </p>
                <form className="mb-6">
                  <div className="flex flex-wrap  sm:px-24 py-4 ">
                    <div className="flex flex-col space-y-2 w-full py-[0px]">
                      <Label
                        htmlFor="mobileNumber"
                        className="font-sansRegular text-formLabel text-sm"
                      >
                        Mobile Number
                      </Label>
                      <Input
                        type="number"
                        name="mobileNumber"
                        id="mobileNumber"
                        placeholder="+1 xxx xxx xxxx"
                        className="border border-verifiCation text-formLabel rounded-md py-2 px-4"
                      />
                    </div>
                    <div className="flex flex-col space-y-2 w-full relative py-[16px]">
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
                        placeholder="●●●●●●●●"
                        className="border border-verifiCation text-formLabel rounded-md py-2 px-4"
                      />
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
                        className="rounded border-none outline-verifiCation w-4 h-4 accent-verifiCation transition-all delay-200"
                      />
                      <Label
                        htmlFor="terms"
                        className="font-sansRegular  ml-2 text-[0.8rem] text-[#757993]"
                      >
                        I have read the Privacy Policy and agree to the Terms of
                        Service.
                      </Label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="sm:absolute bottom-0 left-0 right-0  flex justify-between bg-verifiCation p-5 ">
              <Link
                to="/"
                className="text-white font-sansLight ml-[4rem] text-sm mt-3"
              >
                Don’t have an account? Signup
              </Link>
              <Button
                className="mx-4 sm:mx-10 px-7 sm:px-20 rounded-full bg-white py-2 text-black"
                type="submit"
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
