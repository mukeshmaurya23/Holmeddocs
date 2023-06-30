import React from "react";
import ReactDOM from "react-dom";
import Button from "../util/Button";
import { Link } from "react-router-dom";
import cross from "../images/icons/Cross.png";
import cityLocation from "../images/CityLocation.png";

const PortalModal = ({ closeModal }) => {
  const id = document.getElementById("portal-modal");
  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center mb-10 pb-10">
        <div
          className="fixed inset-0 bg-gray-900 opacity-50 cursor-pointer"
          onClick={closeModal}
        ></div>
        <div className="relative bg-white rounded-lg shadow-lg w-3/4 h-auto">
          <div className="bg-[#0082821C] px-8 py-4 mr-5 ml-5 rounded-lg mt-5 font-sansBold text-[1.2rem] text-[#292F33]">
            Browse Doctors near you
            <img
              src={cross}
              alt="close"
              onClick={closeModal}
              className="absolute right-10 top-10 cursor-pointer h-4 w-4"
            />
          </div>
          <div className="flex flex-wrap mb-10 ml-7">
            {Array(20)
              .fill("")
              .map((index) => (
                <div
                  className="flex ml-10 mt-4 pl-3 rounded-md bg-[#00828212] px-6 py-2"
                  key={index}
                >
                  <img src={cityLocation} className="h-8 w-8" alt="" />
                  <p className="ml-4 text-verifiCation">San Franisco, CA</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>,
    id
  );
};

export default PortalModal;
