import React, { useState } from "react";
import BookAppointmentStep1 from "./BookAppointmentStep1";
import BookAppointmentStep2 from "./BookAppointmentStep2";

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [responseData, setResponseData] = useState([]);
  const handleNextStep = (response) => {
    setResponseData(response?.data?.data?.result);
    console.log(response);
    if (step === 3) {
      return;
    }
    setStep((prev) => prev + 1);
  };
  const steps = {
    1: <BookAppointmentStep1 handleNextStep={handleNextStep} />,
    2: <BookAppointmentStep2 responseData={responseData} />,
  };

  return <>{steps[step]}</>;
};

export default BookAppointment;
