import React, { useState, useEffect } from "react";

const OtpCountDown = () => {
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  return <div>{counter}</div>;
};

export default OtpCountDown;
