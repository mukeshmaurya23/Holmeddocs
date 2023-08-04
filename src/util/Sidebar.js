import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import profileLogo from "../images/profile/Logo.png";
import Modal from "../UI/Modal";
import { enqueueSnackbar } from "notistack";
import customAxios from "../axios/custom";
import { useDispatch } from "react-redux";
import hamburegr from "../images/icons/Hamburger.png";
import cross from "../images/icons/Cross.png";
import { logout } from "../store/loginSlice";
const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const location = useLocation();
  console.log(location.pathname, "im location from sidebar");
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="flex flex-col h-screen">
      <div className="flex flex-col md:flex-row h-screen">
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block bg-verifiCation sm:w-[13rem] 2xl:w-[17rem] overflow-y-auto flex flex-col relative h-screen md:h-auto`}
        >
          <div className="flex justify-center items-center mx-auto mt-[2rem] w-full">
            <Link to="/">
              <img
                src={profileLogo}
                alt="Logo"
                className="h-28 w-28 rounded-full"
              />
            </Link>
          </div>
          <div className="flex flex-col absolute bottom-0 w-full mb-10 ">
            {/* <Link
              to="/sidebar"
              className="w-full block px-12 py-2 text-white hover:text-verifiCation hover:bg-white cursor-pointer font-sansRegular text-xs 2xl:text-[17px] 2xl:py-[1.3rem]"
            >
              My Profile
            </Link> */}
            <Link
              to="/sidebar"
              onClick={toggleSidebar}
              className={`w-full block px-12 py-2 text-white cursor-pointer font-sansRegular text-xs 2xl:text-[17px] 2xl:py-[1.3rem] 
             
              `}
              style={
                location.pathname === "/sidebar" ||
                location.pathname === "/sidebar/update-profile"
                  ? { backgroundColor: "#fff", color: "#008282" }
                  : null
              }
            >
              My Profile
            </Link>
            <Link
              onClick={toggleSidebar}
              to="appointment-list"
              className={`w-full block px-12 py-2 text-white cursor-pointer font-sansRegular text-xs 2xl:text-[17px] 2xl:py-[1.3rem] `}
              style={
                location.pathname === "/sidebar/appointment-list"
                  ? { backgroundColor: "#fff", color: "#008282" }
                  : null
              }
            >
              My Appointments
            </Link>
            <Link
              to="/change-password"
              className={`w-full block px-12 py-2 text-white cursor-pointer font-sansRegular text-xs 2xl:text-[17px] 2xl:py-[1.3rem] `}
            >
              Change Password
            </Link>
            <span
              onClick={() => {
                setDeleteModal(true);
              }}
              className="w-full block px-12 py-2 text-white  cursor-pointer font-sansRegular text-xs 2xl:text-[17px] 2xl:py-[1.3rem]"
            >
              Delete Account
            </span>
            <span
              className="w-full block px-12 py-2 text-white  cursor-pointer font-sansRegular text-xs 2xl:text-[17px] 2xl:py-[1.3rem]"
              onClick={() => {
                setModal(true);
              }}
            >
              Sign out
            </span>
          </div>
        </div>

        <main className="hidden md:block flex-1 overflow-y-auto">
          <Outlet />
        </main>
        {!isSidebarOpen ? (
          <main className="block md:hidden flex-1 overflow-y-auto ">
            <Outlet />
          </main>
        ) : null}
      </div>
      {modal && (
        <Modal
          title="Log out"
          text="Are you sure you want to Logout?"
          btnText="Yes"
          btnText2="No"
          onConfirm={() => {
            dispatch(logout()) && navigate("/register");
          }}
          closeModal={() => {
            setModal(false);
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
    </div>
  );
};

export default SideBar;
