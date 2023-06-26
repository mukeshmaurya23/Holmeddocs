import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import underMaintenance from "./images/UnderMaintenance.png";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ChangePassword from "./components/ChangePassword/ChangePassword";

import Specialistic from "./components/pages/Specialistic/Specialistic";
import SideBar from "./util/Sidebar";
import Appointment from "./components/pages/Appointment/Appointment";
import AllSpecialistic from "./components/pages/Specialistic/AllSpecialistic";
import Navbar2 from "./UI/Navbar2";
import MainContainer from "./components/pages/Home/MainContainer";
import RegisterOtp from "./components/Register/RegisterOtp";
import useOnline from "./hooks/useOnline";
import Browse from "./components/Browse";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navbar2 />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "/specialist",
        element: <AllSpecialistic />,
      },
    ],
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/otp",
    element: <RegisterOtp />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/special",
    element: <Specialistic />,
  },

  {
    path: "/sidebar",
    element: <SideBar />,
    children: [
      {
        index: true,
        element: <Appointment />,
      },
    ],
  },
]);
function App() {
  const isOnline = useOnline();
  return (
    <>
      {!isOnline ? (
        <>
          <Navbar2 />
          <div className=" text-black flex justify-center items-center text-center p-2 mt-36 py-16">
            <div className="flex flex-col justify-center items-center ">
              <img
                src={underMaintenance}
                alt="under-maintenance "
                className="w-[200px] h-auto mb-4"
              />
              <h1 className="text-[1.2rem] mb-2 font-sansBold text-[#707070]">
                Something went wrong!
              </h1>
              <h1 className="text-md text-[#707070] font-sansLight">
                Slow or no internet connection
              </h1>
              <h1 className="text-md text-[#707070] font-sansLight">
                Please check your internet connection
              </h1>
              <button className="bg-verifiCation text-white px-8 py-2 mt-4 rounded-full">
                Try Again
              </button>
            </div>
          </div>
        </>
      ) : (
        <RouterProvider router={appRouter} />
      )}
    </>
  );
}

export default App;
