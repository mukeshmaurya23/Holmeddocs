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
import customAxios from "../../axios/custom";
import { useNavigate } from "react-router-dom";
import calendarSvg from "../../images/home/Calendar.svg";
import { useSnackbar } from "notistack";
import DatePickerComponent from "../../UI/DatePicker";
import Spinner from "../../UI/Spinner";
const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [loading,setLoading]=useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const handleDateChange = (date) => {
    setStartDate(date);
  };
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      dob: "",
      gender: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      console.log(values);
      console.log("Form Submitted");
      const {
        first_name,
        last_name,
        phone,
        email,
        password,

        dob,
        gender,
      } = values;
      const data = {
        first_name,
        last_name,
        phone,
        email,
        password,

        dob,
        gender,
      };
      try {
        setLoading(true)
        const response = await customAxios.post("/patient/register", data);
        console.log(response);
        enqueueSnackbar(response?.data?.message, {
          variant: response?.data?.success ? "success" : "error",
          autoHideDuration: 1000,
        });
        if (response.status === 200) {
          if (response.data.success === 1) {
            setLoading(false)
            //console.log(response.data.message, "im 200 response success");
            // if (response.success === 1) {
            //   navigate("/otp");
            // } else {
            //   alert(response.message);
            // }
            // navigate("/otp");
            navigate("/otp", {
              state: { phone: phone },
            });
          }
        }
      } catch (err) {
        console.log(err);
      }finally{
        setLoading(false)
      }
    },
  });
  console.log(formik.values);

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
              <div className=" ml-0 sm:ml-5">
                <h2 className="text-3xl font-sansRegular tracking-[3px] pt-[1rem] sm:pt-0 px-4 sm:px-24">
                  Register
                </h2>

                <p className="px-4 pt-4 pb-2 sm:px-24 font-sansLight max-w-[620px]">
                  Let's get you set up so that you can manage your profile and
                  start booking appointments.
                </p>
                <div class="flex-grow">
                  <form className="" onSubmit={formik.handleSubmit}>
                    <div className="flex flex-wrap px-4 sm:px-24 py-2">
                      <div className="flex flex-col  w-1/2 sm:w-1/2 p-[10px]">
                        <Label
                          htmlFor="first_name"
                          className="font-sansRegular text-formLabel text-sm"
                        >
                          First Name
                        </Label>
                        <Input
                          type="text"
                          name="first_name"
                          id="first_name"
                          onChange={formik.handleChange}
                          value={formik.values.first_name}
                          onBlur={formik.handleBlur}
                          placeholder="Enter your first name"
                          className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4 text-[12px] sm:text-[16px]"
                        />
                        <div className="text-red-600 text-xs ">
                          {formik.touched.first_name &&
                          formik.errors.first_name ? (
                            formik.errors.first_name
                          ) : (
                            <>&nbsp;</>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col w-1/2 sm:w-1/2 p-[10px]">
                        <Label
                          htmlFor="last_name"
                          className="font-sansRegular text-formLabel text-sm"
                        >
                          Last Name
                        </Label>
                        <Input
                          type="text"
                          name="last_name"
                          id="last_name"
                          onChange={formik.handleChange}
                          value={formik.values.last_name}
                          onBlur={formik.handleBlur}
                          placeholder="Enter your last name"
                          className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4 text-[12px] sm:text-[16px]"
                        />
                        <div className="text-red-600 text-xs ">
                          {formik.touched.last_name &&
                          formik.errors.last_name ? (
                            formik.errors.last_name
                          ) : (
                            <>&nbsp;</>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col  w-1/2 sm:w-1/2 p-[10px]">
                        <Label
                          htmlFor="gender"
                          className="font-sansRegular text-formLabel text-sm"
                        >
                          Gender
                        </Label>
                        <select
                          className="border border-verifiCation  rounded-md py-2 px-4 text-formLabel text-[12px] sm:text-[16px]"
                          id="gender"
                          name="gender"
                          value={formik.values.gender}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="" className="text-formLabel">
                            Select
                          </option>
                          <option value="Male">Male</option>
                          <option value="F">Female</option>
                          <option value="other">Other</option>
                        </select>
                        <div className="text-red-600 text-xs ">
                          {formik.touched.gender && formik.errors.gender ? (
                            formik.errors.gender
                          ) : (
                            <>&nbsp;</>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col w-1/2 p-[10px] relative">
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
                          className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4 text-[12px] sm:text-[16px]"
                        />
                        <div className="text-red-600 text-xs ">
                          {formik.touched.dob && formik.errors.dob ? (
                            formik.errors.dob
                          ) : (
                            <>&nbsp;</>
                          )}
                        </div>
                        <div className="absolute flex flex-row-reverse top-10 justify-evenly ">
                          <img
                            onChange={handleDateChange}
                            src={calendarSvg}
                            alt=""
                            onClick={handleClick}
                            className="w-5 2xl:w-9 h-auto object-contain cursor-pointer   "
                          />
                          <span className="outline-none px-3 text-[.7rem]  sm:text-[1rem] 2xl:text-[1.2rem] text-formLabel">
                            {startDate &&
                            startDate.toDateString() ===
                              new Date().toDateString()
                              ? "Today"
                              : startDate?.toLocaleDateString()}
                          </span>
                        </div>

                        {isOpen && (
                          <div className="absolute top-[4.4rem] right-10 z-[100] h-full">
                            <DatePickerComponent
                              handleChange={handleChange}
                              startDate={startDate}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col  w-1/2 p-[10px] relative">
                        <Label
                          htmlFor="phone"
                          className="font-sansRegular text-formLabel text-sm"
                        >
                          Mobile Number
                        </Label>
                        <div className="absolute left-2 top-[2.3rem] sm:top-[2.46rem] w-3 pl-2  h-full text-md text-formLabel">
                          +1
                        </div>
                        <Input
                          type="text"
                          name="phone"
                          id="phone"
                          onChange={formik.handleChange}
                          value={formik.values.phone}
                          onBlur={formik.handleBlur}
                          placeholder="XXX XXX XXXX"
                          className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-7 sm:px-8 text-[12px] sm:text-[16px]"
                        />
                        <div className="text-red-600 text-xs ">
                          {formik.touched.phone && formik.errors.phone ? (
                            formik.errors.phone
                          ) : (
                            <>&nbsp;</>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col  w-1/2 p-[10px]">
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
                          className="border border-verifiCation text-formLabel outline-verifiCation rounded-md py-2 px-4 text-[12px] sm:text-[16px]"
                        />
                        <div className="text-red-600 text-xs ">
                          {formik.touched.email && formik.errors.email ? (
                            formik.errors.email
                          ) : (
                            <>&nbsp;</>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col  w-1/2 relative p-[10px]">
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
                          className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4 text-[12px] sm:text-[16px]"
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
                      <div className="flex flex-col  w-1/2 relative p-[10px]">
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
                          className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4 text-[12px] sm:text-[16px]"
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
                    <div className="absolute bottom-0 left-0 right-0 mt-5  flex justify-end bg-verifiCation p-5 ">
                      <div className="">
                        <Button
                          className={`mx-4 sm:mx-10 px-7 sm:px-20 rounded-full bg-white py-2 text-black  ${
                            !(formik.isValid && formik.dirty)
                              ? "bg-gray-200 cursor-not-allowed"
                              : "bg-white"
                          }`}
                          //    disabled={!(formik.isValid && formik.dirty)}
                          type="submit"
                        >
                          {
                            loading ? <Spinner/> : "Next"
                          }
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Register;
