import React from "react";
import underMaintenance from "../images/UnderMaintenance.png";
const UnderMaintenance = () => {
  return (
    <div className="flex flex-col space-y-3 justify-center items-center h-screen overflow-hidden">
      <img
        src={underMaintenance}
        alt="under maintenance "
        className="w-[300px] h-auto object-contain mb-3"
      />
      <div className="flex flex-col space-y-3 font-sansRegular font-semibold text-gray-600">
        <p className="text-center text-[.9rem]">WE ARE COMING SOON</p>
        <p className="text-center">The page is under maintenance!</p>
      </div>
    </div>
  );
};

export default UnderMaintenance;
