import React, { useState } from "react";
import ChangePasswordimg from "../../images/Login/ChangePassword.jpg";
import Label from "../../util/Label";
import Input from "../../util/Input";
import Button from "../../util/Button";
import eyeClose from "../../images/Login/Eye.png";
import eyeOpen from "../../images/Login/EyeVisible.png";
import Aside from "../../util/Aside";
import Modal from "../../UI/Modal";
import { useFormik } from "formik";
import { resetSchema } from "../../schema/formValidation";
import Success from "../../images/Login/Success.png";
import { Link } from "react-router-dom";
import customAxios from "../../axios/custom";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { logout } from "../../store/loginSlice";
import Spinner from "../../UI/Spinner";
const ChangePassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isoldPasswordVisible, setIsoldPasswordVisible] = useState(false);
  const [isnewPasswordVisible, setIsnewPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      console.log(values);

      const data = {
        current_password: values.oldPassword,
        new_password: values.newPassword,
        confirm_password: values.confirmPassword,
      };
      console.log(data);
      try {
        setLoading(true);
        const response = await customAxios.post(
          "/patient/change_password",
          data
        );
        console.log(response.data);
        enqueueSnackbar(response?.data?.message, {
          variant: response.data.success ? "success" : "error",
          autoHideDuration: 1500,
        });
        if (response.data.success === 1) {
          setLoading(false);
          formik.resetForm();
          openModal();
          setTimeout(() => {
            dispatch(logout());
          }, 3000);
        }
      } catch (err) {
        console.log(err);
      }finally{
        setLoading(false);
      }
    },
    validationSchema: resetSchema,
  });
  const handleContinue = () => {
    formik.setTouched({
      oldPassword: true,
      newPassword: true,
      confirmPassword: true,
    });
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-col lg:flex-row flex-1">
          <Aside image={ChangePasswordimg} />
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
            <div className="flex-grow">
              <div className="ml-5 max-w-[620px]">
                <h2 className="text-3xl font-sansRegular tracking-[3px] pt-[2rem] sm:pt-0 px-4 py-2 sm:px-24">
                  Change password?
                </h2>

                <form className="mb-6" onSubmit={formik.handleSubmit}>
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
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        onChange={formik.handleChange}
                        value={formik.values.oldPassword}
                        onBlur={formik.handleBlur}
                        className="border border-verifiCation text-formLabel rounded-md py-2 px-4"
                      />
                      {formik.errors.oldPassword &&
                      formik.touched.oldPassword ? (
                        <div className="text-red-600 text-xs">
                          {formik.errors.oldPassword}
                        </div>
                      ) : null}
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
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        onChange={formik.handleChange}
                        value={formik.values.newPassword}
                        onBlur={formik.handleBlur}
                        className="border border-verifiCation text-formLabel rounded-md py-2 px-4"
                      />
                      {formik.errors.newPassword &&
                      formik.touched.newPassword ? (
                        <div className="text-red-600 text-xs">
                          {formik.errors.newPassword}
                        </div>
                      ) : null}
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
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        onBlur={formik.handleBlur}
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        className="border border-verifiCation text-formLabel rounded-md py-2 px-4"
                      />
                      {formik.errors.confirmPassword &&
                      formik.touched.confirmPassword ? (
                        <div className="text-red-600 text-xs">
                          {formik.errors.confirmPassword}
                        </div>
                      ) : null}
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
                  <div className="absolute bottom-0 left-0 right-0  flex justify-end bg-verifiCation p-5 ">
                    <div className="">
                      <Button
                        className={`mx-4 sm:mx-10 px-7 sm:px-20 rounded-full bg-white py-2 text-black ${
                          !(formik.isValid && formik.dirty) &&
                          "opacity-50 cursor-not-allowed"
                        }
                 `}
                        onClick={handleContinue}
                        disabled={!(formik.isValid && formik.dirty)}
                      >
                        {
                          loading ? <Spinner /> : "Continue"
                        }
                      </Button>
                    </div>
                  </div>
                </form>
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
          image={Success}
          btnText={"Login"}
          link={"/login"}
        />
      )}
    </>
  );
};

export default ChangePassword;
