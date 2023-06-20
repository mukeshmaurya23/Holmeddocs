import React, { useEffect, useState } from "react";
import Button from "../../util/Button";
import { Link } from "react-router-dom";

import Aside from "../../util/Aside";
import Step1Forgot from "../pages/forgotSteps/Step1Forgot";
import Step2Forgot from "../pages/forgotSteps/Step2Forgot";
import Step3Forgot from "../pages/forgotSteps/Step3Forgot";
import forgot from "../../images/Login/Forgot.jpg";
import Modal from "../../UI/Modal";
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const steps = {
    1: <Step1Forgot />,
    2: <Step2Forgot />,
    3: <Step3Forgot />,
  };
  const NextStep = () => {
    if (step === 3) {
      return;
    }
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col lg:flex-row flex-1">
        <Aside image={forgot} />
        <main className="flex flex-1 flex-col relative overflow-y-auto">
          <div className="flex justify-center sm:justify-end mt-8 sm:mr-[4rem]">
            <img
              src={require("../../images/icons/Logo.png")}
              alt="logo"
              className="w-24 h-24 mx-4 sm:mx-10"
            />
          </div>
          <div className="flex-grow">{steps[step]}</div>
          <div className="sm:absolute bottom-0 left-0 right-0  flex justify-end bg-verifiCation p-5 ">
            <div className="">
              {Object.keys(steps).length ? (
                <>
                  {step <= 2 && (
                    <Button
                      className="mx-4 sm:mx-10 px-7 sm:px-20 rounded-full bg-white py-2 text-black"
                      onClick={NextStep}
                    >
                      {step === 1 ? "Next" : step === 2 ? "Next" : false}
                    </Button>
                  )}
                  {step === 3 && (
                    <Button
                      className="mx-4 sm:mx-10 px-7 sm:px-20 rounded-full bg-white py-2 text-black"
                      onClick={openModal}
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
