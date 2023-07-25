import React, { useEffect, useState } from "react";
import Button from "../../util/Button";
import { Link } from "react-router-dom";

import Aside from "../../util/Aside";
import Step1Forgot from "./Step1Forgot";
import Step2Forgot from "./Step2Forgot";
import Step3Forgot from "./Step3Forgot";
import forgot from "../../images/Login/Forgot.jpg";
import Modal from "../../UI/Modal";
import Success from "../../images/Login/Success.png";
import { forgotSchema } from "../../schema/formValidation";
import { useFormik } from "formik";
import customAxios from "../../axios/custom";
import { enqueueSnackbar } from "notistack";
import Spinner from "../../UI/Spinner";
// const validate = (values) => {
//   const errors = {};
//   if (Object.values(values.otp).some((data) => data === "")) {
//     errors.otp = "OTP is required";
//   }
//   return errors;
// };

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpValue, setOtpValue] = useState(""); // New state variable to hold otpValue
  const [loading, setLoading] = useState(false);

  // Function to update otpValue
  const handleOtpChange = (otpValue) => {
    setOtpValue(parseInt(otpValue));
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      phone: "",
      // otp: Array.from({ length: 6 }).fill(""),
    },
    // validate,
    validationSchema: forgotSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const steps = {
    1: <Step1Forgot formik={formik} />,
    2: (
      <Step2Forgot
        formik={formik}
        otpValue={otpValue}
        handleOtpChange={handleOtpChange}
      />
    ),
    3: <Step3Forgot formik={formik} />,
  };

  const handleNextStep = () => {
    if (step === 3) {
      return;
    }
    if (step === 1) {
      if (!formik.dirty) {
        formik.setTouched({ phone: true });
        return;
      }

      if (!formik.errors.phone) {
        setStep((prev) => prev + 1);
      }
    } else {
      setStep((prev) => prev + 1);
    }
    // if (step === 2) {
    //   if (!formik.dirty) {
    //     formik.setTouched({ otp: true });
    //     return;
    //   }

    // if (!formik.errors.otp) {
    //   setStep((prev) => prev + 1);
    // }
    // }
  };
  const handleSubmit = async (e) => {
    console.log("clicked");
    e.preventDefault();
    //check if form is not dirty and touched or valid then return
    if (!formik.values.phone || formik.errors.phone) {
      formik.setTouched({ phone: true });
      return;
    }
    // if (!formik.values.password || formik.errors.password) {
    //   formik.setTouched({ password: true });
    //   return;
    // }
    // if (
    //   !formik.values.password_confirmation ||
    //   formik.errors.password_confirmation
    // ) {
    //   formik.setTouched({ password_confirmation: true });
    //   return;
    // }

    if (step === 1) {
      try {
        setLoading(true);
        const response = await customAxios.post("/patient/forgot_password", {
          phone: formik.values.phone,
        });
        enqueueSnackbar(response.data.message, {
          variant: response.data.success ? "success" : "error",
          autoHideDuration: 1000,
        });
        console.log(response.data, "im response from forgot password");
        if (response.data.success) {
          setLoading(false);
          //setOtpValue(response.data.token);
          handleNextStep();
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    }
    if (step === 2) {
      try {
        const response = await customAxios.post("/patient/verify_otp", {
          token: otpValue,
          request_type: "forget_password",
          phone: formik.values.phone,
        });

        enqueueSnackbar(response.data.message, {
          variant: response.data.success ? "success" : "error",
          autoHideDuration: 1000,
        });
        if (response.data.success) {
          handleNextStep();
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (step === 3) {
      try {
        const response = await customAxios.post("/patient/update_password", {
          phone: formik.values.phone,
          token: otpValue,
          password: formik.values.password,
          password_confirmation: formik.values.password_confirmation,
        });
        enqueueSnackbar(response.data.message, {
          variant: response.data.success ? "success" : "error",
          autoHideDuration: 1000,
        });
        if (response.data.success) {
          openModal();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col lg:flex-row flex-1">
        <Aside image={forgot} />
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
          <div className="flex-grow">{steps[step]}</div>
          <div className="absolute xsm:relative xs:relative  sm:relative bottom-0 left-0 right-0  flex justify-end bg-verifiCation p-5 ">
            <form className="">
              {Object.keys(steps).length ? (
                <>
                  {step <= 2 && (
                    <button
                      className={`mx-4 sm:mx-10 px-7 sm:px-20 rounded-full bg-white py-2 text-black ${
                        (step === 1 && formik.errors.phone) ||
                        // (step === 2 && formik.errors.otp) ||
                        step === 3
                          ? "bg-gray-200 cursor-not-allowed"
                          : "bg-white"
                      }`}
                      onClick={handleSubmit}
                    >
                      {step === 1 ? loading ? <Spinner/> : "Next" : step === 2 ? "Next" : false}
                    </button>
                  )}
                  {step === 3 && (
                    <Button
                      className="mx-4 sm:mx-10 px-7 sm:px-20 rounded-full bg-white py-2 text-black"
                      onClick={handleSubmit}
                      // disabled={!formik.isValid && formik.dirty}
                    >
                      {step === 3 && "Reset"}
                    </Button>
                  )}
                </>
              ) : null}
            </form>
          </div>
        </main>
      </div>
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          text={"Your password has been changed successfully."}
          title={"Success!"}
          image={Success}
          btnText={"Login"}
          link={"/login"}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
