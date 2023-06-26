// import React, { useEffect, useState } from "react";
// import Button from "../../util/Button";
// import { Link } from "react-router-dom";

// import Aside from "../../util/Aside";
// import Step1Forgot from "../pages/forgotSteps/Step1Forgot";
// import Step2Forgot from "../pages/forgotSteps/Step2Forgot";
// import Step3Forgot from "../pages/forgotSteps/Step3Forgot";
// import forgot from "../../images/Login/Forgot.jpg";
// import Modal from "../../UI/Modal";
// import { loginSchema } from "../schema/formValidation";
// import { useFormik } from "formik";
// const ForgotPassword = () => {
//   const [step, setStep] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
//   const openModal = () => {
//     setIsModalOpen(true);
//   };
//   const formik = useFormik({
//     initialValues: {
//       mobileNumber: "",
//     },
//     validationSchema: loginSchema,
//     onSubmit: (values) => {
//       console.log(values);
//     },
//   });
//   const steps = {
//     1: <Step1Forgot formik={formik} />,
//     2: <Step2Forgot formik={formik} />,
//     3: <Step3Forgot formik={formik} />,
//   };
//   const NextStep = () => {
//     if (step === 3) {
//       return;
//     }
//     setStep((prev) => prev + 1);
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="flex flex-col lg:flex-row flex-1">
//         <Aside image={forgot} />
//         <main className="flex flex-1 flex-col relative overflow-y-auto">
//           <div className="flex justify-center sm:justify-end mt-8 sm:mr-[4rem]">
//             <img
//               src={require("../../images/icons/Logo.png")}
//               alt="logo"
//               className="w-24 h-24 mx-4 sm:mx-10"
//             />
//           </div>
//           <div className="flex-grow">{steps[step]}</div>
//           <div className="sm:absolute bottom-0 left-0 right-0  flex justify-end bg-verifiCation p-5 ">
//             <div className="">
//               {Object.keys(steps).length ? (
//                 <>
//                   {step <= 2 && (
//                     <Button
//                       className={`mx-4 sm:mx-10 px-7 sm:px-20 rounded-full bg-white py-2 text-black ${
//                         !(formik.isValid && formik.dirty)
//                           ? "bg-gray-200 cursor-not-allowed"
//                           : "bg-white"
//                       }`}
//                       onClick={NextStep}
//                       disabled={!(formik.isValid && formik.dirty)}
//                     >
//                       {step === 1 ? "Next" : step === 2 ? "Next" : false}
//                     </Button>
//                   )}
//                   {step === 3 && (
//                     <Button
//                       className="mx-4 sm:mx-10 px-7 sm:px-20 rounded-full bg-white py-2 text-black"
//                       onClick={openModal}
//                     >
//                       {step === 3 && "Reset"}
//                     </Button>
//                   )}
//                 </>
//               ) : null}
//             </div>
//           </div>
//         </main>
//       </div>
//       {isModalOpen && (
//         <Modal
//           closeModal={closeModal}
//           text={"Your password has been changed successfully."}
//           title={"Success!"}
//         />
//       )}
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useEffect, useState } from "react";
import Button from "../../util/Button";
import { Link } from "react-router-dom";

import Aside from "../../util/Aside";
import Step1Forgot from "./Step1Forgot";
import Step2Forgot from "./Step2Forgot";
import Step3Forgot from "./Step3Forgot";
import forgot from "../../images/Login/Forgot.jpg";
import Modal from "../../UI/Modal";
import { forgotSchema } from "../../schema/formValidation";
import { useFormik } from "formik";
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
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
    2: <Step2Forgot formik={formik} />,
    3: <Step3Forgot formik={formik} />,
  };

  const handleNextStep = () => {
    if (step === 3) {
      return;
    }
    if (step === 1) {
      if (!formik.dirty) {
        formik.setTouched({ mobileNumber: true });
        return;
      }

      if (!formik.errors.mobileNumber) {
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
          <div className="sm:absolute bottom-0 left-0 right-0  flex justify-end bg-verifiCation p-5 ">
            <div className="">
              {Object.keys(steps).length ? (
                <>
                  {step <= 2 && (
                    <Button
                      className={`mx-4 sm:mx-10 px-7 sm:px-20 rounded-full bg-white py-2 text-black ${
                        (step === 1 && formik.errors.mobileNumber) ||
                        // (step === 2 && formik.errors.otp) ||
                        step === 3
                          ? "bg-gray-200 cursor-not-allowed"
                          : "bg-white"
                      }`}
                      onClick={handleNextStep}
                    >
                      {step === 1 ? "Next" : step === 2 ? "Next" : false}
                    </Button>
                  )}
                  {step === 3 && (
                    <Button
                      className="mx-4 sm:mx-10 px-7 sm:px-20 rounded-full bg-white py-2 text-black"
                      onClick={openModal}
                      // disabled={!formik.isValid && formik.dirty}
                    >
                      {step === 3 && "Reset"}
                    </Button>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </main>
      </div>
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          text={"Your password has been changed successfully."}
          title={"Success!"}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
