import React from "react";
import success from "../images/Login/Success.png";

import Button from "../util/Button";
import { Link } from "react-router-dom";
import cross from "../images/icons/Cross.png";
const Modal = ({
  closeModal,
  text,
  title,
  btnText,
  btnText2,
  image,
  link,
  logOutHandler,
  btnTextDelete,
  onConfirm,
}) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-gray-800 opacity-50 cursor-pointer"
          onClick={closeModal}
        ></div>
        <div className="relative bg-white rounded-lg shadow-lg sm:w-[400px]">
          <div className="flex flex-col justify-center items-center p-8">
            {image && <img src={image} alt="success" className="w-1/2 h-28" />}

            <p className="text-xl font-sansBold text-center mt-4  text-verifiCation tracking-[3px]">
              {title}
            </p>
            <p className="text-center mt-4 text-sm text-gray-500">{text}</p>
            <div className="flex justify-between mt-5">
              {btnText && (
                <Button
                  className="mt-4 px-12 py-1 bg-verifiCation text-white rounded-full"
                  onClick={
                 onConfirm ? onConfirm : logOutHandler
                  }
                >
                  <Link to="/login">{btnText}</Link>
                </Button>
              )}
              {btnTextDelete && (
                <Button
                  className="mt-4 px-12 py-1 bg-verifiCation text-white rounded-full"
                  onClick={onConfirm}
                >
                  {btnTextDelete}
                </Button>
              )}
              {btnText2 && (
                <Button
                  className="mt-4 px-12 py-1 ml-3 bg-verifiCation text-white rounded-full"
                  onClick={closeModal}
                >
                  <Link to={link}>{btnText2}</Link>
                </Button>
              )}
            </div>
            <img
              src={cross}
              alt="close"
              className="absolute top-4 right-4 w-3 h-3 cursor-pointer text-formLabel"
              onClick={closeModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
