import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import cross from "../images/icons/Cross.png";
import hamburger from "../images/icons/Hamburger.png";
import { Link, useNavigate } from "react-router-dom";
import { toggleMenu } from "../store/mobileAppSlice";
import Modal from "../UI/Modal";
import { logout } from "../store/loginSlice";
import customAxios from "../axios/custom";
import { enqueueSnackbar } from "notistack";
const MobileResposiveToogle = () => {
  const isMenuOpen = useSelector((state) => state.mobileApp.isMenuOpen);
  const isLoggedIn = useSelector((state) => state.login.remember_token);
  const dispatch = useDispatch();
  const [logOutmodal, setlogOutModal] = useState(false);
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const logOutDisPatch = useDispatch();
  const logOutHandler = () => {
    logOutDisPatch(logout());
  };
  const handleDeleteAccount = async () => {
    try {
      const response = await customAxios.post("/patient/delete_account");
      console.log(response.data, "im response from delete account");

      enqueueSnackbar("Account deleted successfully!", {
        variant: "success",
        autoHideDuration: 1500,
      });
      dispatch(logout()) && navigate("/register");

      console.log("Account deleted successfully!");
    } catch (error) {
      console.error("Failed to delete account:", error.message);
      enqueueSnackbar("Failed to delete account!", {
        variant: "error",
        autoHideDuration: 1500,
      });
    }
  };
  return (
    <>
      <div
        className={`fixed overflow-hidden top-0 right-0 w-screen h-screen bg-white z-10 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="relative">
          <button
            onClick={toggleMenuHandler}
            className="absolute top-5 right-5 h-10 w-10 bg-gray-200 flex justify-center items-center rounded-full rounded-full"
          >
            <img src={cross} className=" h-4" />
          </button>
          <div className="absolute top-20 left-10 w-full">
            {/* Content of the popup */}
            <div className="flex flex-col space-y-4">
              {/*checkLogged in in mobile */}
              {isLoggedIn ? (
                <>
                  <Link to="/sidebar" onClick={toggleMenuHandler}>
                    <h2 className="font-sansBold text-[14px]">My Profile</h2>
                  </Link>
                  <div className=" border-b " />
                  <Link
                    to="/sidebar/appointment-list"
                    onClick={toggleMenuHandler}
                  >
                    <h2 className="font-sansBold text-[14px]">
                      My Appointment
                    </h2>
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex gap-7 items-center ">
                    <h2 className="font-sansBold text-[14px]">Patients</h2>
                    <Link
                      to="/login"
                      className="text-[11px] font-sansBold text-black border-b border-dotted border-gray-600"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      className=" text-[11px] text-black font-sansBold  border-b border-dotted border-gray-600"
                    >
                      Sign up
                    </Link>
                  </div>
                  <div className=" border-b " />
                  <div className="flex gap-7">
                    <h2 className="font-sansBold text-[14px]">Doctors</h2>
                    <Link
                      to="/login"
                      className="text-[11px] font-sansBold text-black border-b border-dotted border-gray-600"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      className=" text-[11px] text-black font-sansBold  border-b border-dotted border-gray-600"
                    >
                      Sign up
                    </Link>
                  </div>
                </>
              )}
              <div className=" border-b " />
              <Link to="/make-appointment" onClick={toggleMenuHandler}>
                <h2 className="font-sansBold text-[14px]">
                  Make an appointment
                </h2>
              </Link>
              <div className=" border-b " />
              <div>
                <h2 className="font-sansBold text-[14px]">Browse</h2>
              </div>
              <div className=" border-b " />
              <Link to="/about-us" onClick={toggleMenuHandler}>
                <h2 className="font-sansBold text-[14px]">About Us</h2>
              </Link>
              <div className=" border-b " />
              <Link to="/" onClick={toggleMenuHandler}>
                <h2 className="font-sansBold text-[14px]">Home</h2>
              </Link>
              <div className=" border-b " />
              <Link
                to="/change-password"
                className={`font-sansBold text-[14px] `}
              >
                Change Password
              </Link>
              <div className=" border-b " />
              <span
                onClick={() => {
                  setDeleteModal(true);
                }}
                className="font-sansBold text-[14px]"
              >
                Delete Account
              </span>

              {isLoggedIn && (
                <>
                  {" "}
                  <div className=" border-b " />
                  <h2
                    className="font-sansBold text-[14px]"
                    onClick={() => {
                      setlogOutModal(true);
                    }}
                  >
                    Logout
                  </h2>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {logOutmodal && (
        <Modal
          title="Log out"
          text="Are you sure you want to Logout?"
          btnText="Yes"
          btnText2="No"
          logOutHandler={logOutHandler}
          closeModal={() => {
            setlogOutModal(false);
          }}
        />
      )}
      {deleteModal && (
        <Modal
          title="Are you sure you want to delete your account?"
          text="Your account and all of its data will be permanently deleted."
          btnTextDelete="Yes"
          btnText2="No"
          onConfirm={handleDeleteAccount}
          closeModal={() => {
            setDeleteModal(false);
          }}
        />
      )}
    </>
  );
};

export default MobileResposiveToogle;
