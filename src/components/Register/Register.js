import React, { useState } from "react";
import Label from "../../util/Label";
import Input from "../../util/Input";
import Button from "../../util/Button";
import { Link } from "react-router-dom";
import eyeClose from "../../images/Login/Eye.png";
import eyeOpen from "../../images/Login/EyeVisible.png";
import Aside from "../../util/Aside";
import register from "../../images/Login/ChangePassword.jpg";
import { useFormik } from "formik";
import { registerSchema } from "../../schema/formValidation";
const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
      dob: "",
      gender: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-col lg:flex-row flex-1">
          <Aside image={register} />
          {/* <Aside image={step === 1 ? register : otp} /> */}
          <main className="flex flex-1 flex-col relative overflow-y-auto">
            <div className="flex justify-center sm:justify-end mt-5 sm:mr-[4rem]">
              <Link to="/">
                <img
                  src={require("../../images/icons/Logo.png")}
                  alt="logo"
                  className="w-24 h-24 mx-4 sm:mx-10"
                />
              </Link>
            </div>
            <div className="flex-grow overflow-y-auto">
              <div className="ml-5">
                <h2 className="text-3xl font-sansRegular tracking-[3px] pt-[1rem] sm:pt-0 px-4 sm:px-24">
                  Register
                </h2>

                <p className="px-4 pt-4 pb-2 sm:px-24 font-sansLight max-w-[620px]">
                  Let's get you set up so that you can manage your profile and
                  start booking appointments.
                </p>
                <div class="flex-grow">
                  <form className="">
                    <div className="flex flex-wrap px-4 sm:px-24 py-2">
                      <div className="flex flex-col space-y-2 w-1/2 sm:w-1/2 p-[10px]">
                        <Label
                          htmlFor="firstName"
                          className="font-sansRegular text-formLabel text-sm"
                        >
                          First Name
                        </Label>
                        <Input
                          type="text"
                          name="firstName"
                          id="firstName"
                          onChange={formik.handleChange}
                          value={formik.values.firstName}
                          onBlur={formik.handleBlur}
                          placeholder="Enter your first name"
                          className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4"
                        />
                        <div className="text-red-600 text-xs ">
                          {formik.touched.firstName &&
                          formik.errors.firstName ? (
                            formik.errors.firstName
                          ) : (
                            <>&nbsp;</>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 w-1/2 sm:w-1/2 p-[10px]">
                        <Label
                          htmlFor="lastName"
                          className="font-sansRegular text-formLabel text-sm"
                        >
                          Last Name
                        </Label>
                        <Input
                          type="text"
                          name="lastName"
                          id="lastName"
                          onChange={formik.handleChange}
                          value={formik.values.lastName}
                          onBlur={formik.handleBlur}
                          placeholder="Enter your last name"
                          className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4"
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                          <div className="text-red-600 text-xs mt-1">
                            {formik.errors.lastName}
                          </div>
                        ) : null}
                      </div>

                      <div className="flex flex-col space-y-2 w-1/2 sm:w-1/2 p-[10px]">
                        <Label
                          htmlFor="gender"
                          className="font-sansRegular text-formLabel text-sm"
                        >
                          Gender
                        </Label>
                        <select
                          className="border border-verifiCation  rounded-md py-2 px-4 text-formLabel"
                          id="gender"
                          name="gender"
                          value={formik.values.gender}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="" className="text-formLabel">
                            Select
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        {formik.errors.gender && formik.touched.gender && (
                          <div className="text-red-600 text-xs mt-1">
                            {formik.errors.gender}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2 w-1/2 p-[10px]">
                        <Label
                          htmlFor="dob"
                          className="font-sansRegular text-formLabel text-sm"
                        >
                          DOB
                        </Label>
                        <Input
                          type="text"
                          name="dob"
                          id="dob"
                          onChange={formik.handleChange}
                          value={formik.values.dob}
                          onBlur={formik.handleBlur}
                          placeholder="MM/DD/YYYY"
                          className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4"
                        />
                        {formik.touched.dob && formik.errors.dob ? (
                          <div className="text-red-600 text-xs mt-1">
                            {formik.errors.dob}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex flex-col space-y-2 w-1/2 p-[10px]">
                        <Label
                          htmlFor="mobile"
                          className="font-sansRegular text-formLabel text-sm"
                        >
                          Mobile Number
                        </Label>
                        <Input
                          type="text"
                          name="mobile"
                          id="mobile"
                          onChange={formik.handleChange}
                          value={formik.values.mobile}
                          onBlur={formik.handleBlur}
                          placeholder="+1 xxx xxx xxxx"
                          className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4"
                        />
                        {formik.touched.mobile && formik.errors.mobile ? (
                          <div className="text-red-600 text-xs mt-1">
                            {formik.errors.mobile}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex flex-col space-y-2 w-1/2 p-[10px]">
                        <Label
                          htmlFor="email"
                          className="font-sansRegular text-formLabel text-sm"
                        >
                          Email ID
                        </Label>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          onBlur={formik.handleBlur}
                          placeholder="email@domain.com"
                          className="border border-verifiCation text-formLabel outline-verifiCation rounded-md py-2 px-4"
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <div className="text-red-600 text-xs mt-1">
                            {formik.errors.email}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex flex-col space-y-2 w-1/2 relative p-[10px]">
                        <Label
                          htmlFor="password"
                          className="font-sansRegular text-formLabel text-sm"
                        >
                          Enter Password
                        </Label>
                        <Input
                          type={isPasswordVisible ? "text" : "password"}
                          name="password"
                          id="password"
                          placeholder="●●●●●●●●"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          onBlur={formik.handleBlur}
                          className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4"
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <div className="text-red-600 text-xs mt-1">
                            {formik.errors.password}
                          </div>
                        ) : null}

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
                      <div className="flex flex-col space-y-2 w-1/2 relative p-[10px]">
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
                          placeholder="●●●●●●●●"
                          onChange={formik.handleChange}
                          value={formik.values.confirmPassword}
                          onBlur={formik.handleBlur}
                          className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4"
                        />
                        {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword ? (
                          <div className="text-red-600 text-xs mt-1">
                            {formik.errors.confirmPassword}
                          </div>
                        ) : null}
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
                  </form>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 mt-5  flex justify-end bg-verifiCation p-5 ">
              <div className="">
                <Link to="/otp">
                  <Button
                    className={`mx-4 sm:mx-10 px-7 sm:px-20 rounded-full bg-white py-2 text-black  ${
                      !(formik.isValid && formik.dirty)
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-white"
                    }`}
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                    Next
                  </Button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Register;
