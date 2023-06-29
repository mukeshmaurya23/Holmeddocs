import React from "react";
import { useLocation } from "react-router-dom";
const MakeAppointment = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <div class="flex justify-center ">
        <div class="w-[600px] h-[300px] bg-[#0082822B] rounded-b-full"></div>
      </div>
    </>
  );
};

export default MakeAppointment;
