import React, { useState, useRef, useEffect } from "react";
const Otp = () => {
  const inputRef = useRef({});
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  console.log(otp);

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);
  const handleChnage = (e, index) => {
    const { name, value } = e.target;

    if (/[a-zA-Z]/gi.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);
    setOtp(updatedOtp);

    const updatedValues = {
      otp: updatedOtp.join(""), // Combine the otp array into a string
    };

    // const currentIndex = Object.keys(otp).indexOf(name);
    // const nextIndex = currentIndex + 1;
    // const nextInput = inputRef.current[nextIndex];
    // if (nextInput) {
    //   nextInput.focus();
    // }
    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  // const handleBackspace = (e, index) => {
  //   const { name, value } = e.target;
  //   if (e.keyCode === 8 && !value) {
  //     const prevIndex = index - 1;
  //     const prevInput = inputRef.current[prevIndex];
  //     if (prevInput) {
  //       prevInput.focus();
  //     }
  //   }
  // };

  const handleBackspace = (event, index) => {
    if (event.key === "Backspace") {
      if (index > 0) {
        inputRef.current[index - 1].focus();
      }
    }
  };

  const renderInput = () => {
    return Object.keys(otp).map((key, index) => (
      <input
        key={index}
        ref={(element) => (inputRef.current[index] = element)}
        maxlength="1"
        onChange={(e) => handleChnage(e, index)}
        className={`border outline-verifiCation border-verifiCation rounded-md py-2 px-3 focus:border-verifiCation text-formLabel w-10 sm:w-10 md:w-10 mr-2 `}
        type="text"
        name={key}
        value={otp[index]}
        onKeyUp={(event) => handleBackspace(event, index)}
      />
    ));
  };
  return <>{renderInput()}</>;
};

export default Otp;
