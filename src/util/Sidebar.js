import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import profileLogo from "../images/profile/Logo.png";
import Modal from "../UI/Modal";
const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col md:flex-row h-screen">
        <div
          className={`md:hidden ${
            isSidebarOpen ? "bg-verifiCation" : "bg-verifiCation "
          }`}
        >
          <div className="flex justify-between p-2">
            <button
              className={`   ${isSidebarOpen ? "text-white" : "text-black "}`}
              onClick={toggleSidebar}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isSidebarOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block bg-verifiCation sm:w-[13rem] overflow-y-auto flex flex-col relative h-screen md:h-auto`}
        >
          <div className="p-10">
            <Link to="/">
              <img
                src={profileLogo}
                alt="Logo"
                className="h-28 w-28 rounded-full"
              />
            </Link>
          </div>
          <div className="flex flex-col absolute bottom-0 w-full mb-10">
            <Link
              to="/sidebar"
              className="w-full block px-12 py-2 text-white hover:text-verifiCation hover:bg-white cursor-pointer font-sansRegular text-xs"
            >
              My Profile
            </Link>
            <Link
              to="appointment-list"
              className="w-full block px-12 py-2 text-white hover:text-verifiCation hover:bg-white cursor-pointer font-sansRegular text-xs"
            >
              My Appointments
            </Link>
            <Link
              to="/change-password"
              className="w-full block px-12 py-2 text-white hover:text-verifiCation hover:bg-white cursor-pointer font-sansRegular text-xs"
            >
              Change Password
            </Link>
            <span
              onClick={() => {
                setDeleteModal(true);
              }}
              className="w-full block px-12 py-2 text-white hover:text-verifiCation hover:bg-white cursor-pointer font-sansRegular text-xs"
            >
              Delete Account
            </span>
            <span
              className="w-full block px-12 py-2 text-white hover:text-verifiCation hover:bg-white cursor-pointer font-sansRegular text-xs"
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
          <main className="block md:hidden flex-1 overflow-y-auto">
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
          closeModal={() => {
            setModal(false);
          }}
        />
      )}
      {deleteModal && (
        <Modal
          title="Are you sure you want to delete your account?"
          text="Your account and all of its data will be permanently deleted."
          btnText="Yes"
          btnText2="No"
          closeModal={() => {
            setDeleteModal(false);
          }}
        />
      )}
    </div>
  );
};

export default SideBar;
