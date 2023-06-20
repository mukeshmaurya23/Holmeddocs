import React, { useState } from "react";
import ChangePasswordimg from "../../../images/Login/ChangePassword.jpg";
import Label from "../../../util/Label";
import Input from "../../../util/Input";
import Button from "../../../util/Button";
import eyeClose from "../../../images/Login/Eye.png";
import eyeOpen from "../../../images/Login/EyeVisible.png";
import Aside from "../../../util/Aside";
import Modal from "../../../UI/Modal";
const ChangePassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isoldPasswordVisible, setIsoldPasswordVisible] = useState(false);
  const [isnewPasswordVisible, setIsnewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const toggleOldPasswordVisibility = () => {
    setIsoldPasswordVisible(!isoldPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setIsnewPasswordVisible(!isnewPasswordVisible);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-col lg:flex-row flex-1">
          <Aside image={ChangePasswordimg} />
          <main className="flex flex-1 flex-col relative overflow-y-auto">
            <div className="flex justify-center sm:justify-end mt-8 sm:mr-[4rem]">
              <img
                src={require("../../../images/icons/Logo.png")}
                alt="logo"
                className="w-24 h-24 mx-4 sm:mx-10"
              />
            </div>
            <div className="flex-grow">
              <div className="ml-5 max-w-[620px]">
                <h2 className="text-3xl font-sansRegular tracking-[3px] pt-[2rem] sm:pt-0 px-4 py-2 sm:px-24">
                  Change password?
                </h2>

                <form className="mb-6">
                  <div className="flex flex-wrap  sm:px-24 py-4 ">
                    <div className="flex flex-col space-y-2 w-full relative py-[16px]">
                      <Label
                        htmlFor="oldPassword"
                        className="font-sansRegular text-formLabel text-sm"
                      >
                        Old Password
                      </Label>
                      <Input
                        type={isoldPasswordVisible ? "text" : "password"}
                        name="oldPassword"
                        id="oldPassword"
                        placeholder="●●●●●●●●"
                        className="border border-verifiCation text-formLabel rounded-md py-2 px-4"
                      />
                      <Button
                        type="button"
                        className="absolute top-[3.2rem] right-4"
                        aria-label="Toggle Password Visibility"
                      >
                        <img
                          src={isoldPasswordVisible ? eyeOpen : eyeClose}
                          onClick={toggleOldPasswordVisibility}
                          alt="toggle password visibility"
                          className="w-4 h-3"
                        />
                      </Button>
                    </div>
                    <div className="flex flex-col space-y-2 w-full relative py-[16px]">
                      <Label
                        htmlFor="newPassword"
                        className="font-sansRegular text-formLabel text-sm"
                      >
                        New Password
                      </Label>
                      <Input
                        type={isnewPasswordVisible ? "text" : "password"}
                        name="newPassword"
                        id="newPassword"
                        placeholder="●●●●●●●●"
                        className="border border-verifiCation text-formLabel rounded-md py-2 px-4"
                      />
                      <Button
                        type="button"
                        className="absolute top-[3.2rem] right-4"
                        aria-label="Toggle Password Visibility"
                      >
                        <img
                          src={isnewPasswordVisible ? eyeOpen : eyeClose}
                          onClick={toggleNewPasswordVisibility}
                          alt="toggle password visibility"
                          className="w-4 h-3"
                        />
                      </Button>
                    </div>
                    <div className="flex flex-col space-y-2 w-full relative py-[16px]">
                      <Label
                        htmlFor="confirmPassword"
                        className="font-sansRegular text-formLabel text-sm"
                      >
                        Confirm Password
                      </Label>
                      <Input
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="●●●●●●●●"
                        className="border border-verifiCation text-formLabel rounded-md py-2 px-4"
                      />
                      <Button
                        type="button"
                        className="absolute top-[3.2rem] right-4"
                        aria-label="Toggle Password Visibility"
                      >
                        <img
                          src={isConfirmPasswordVisible ? eyeOpen : eyeClose}
                          onClick={toggleConfirmPasswordVisibility}
                          alt="toggle password visibility"
                          className="w-4 h-3"
                        />
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="sm:absolute bottom-0 left-0 right-0  flex justify-end bg-verifiCation p-5 ">
              <div className="">
                <Button
                  className="mx-4 sm:mx-10 px-7 sm:px-20 rounded-full bg-white py-2 text-black"
                  onClick={openModal}
                >
                  Continue
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          text={"Your password has been changed successfully."}
          title={"Password Changed!"}
        />
      )}
    </>
  );
};

export default ChangePassword;
