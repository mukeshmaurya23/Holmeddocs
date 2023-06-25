import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Otp from "./components/util/Otp";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ChangePassword from "./components/ChangePassword/ChangePassword";

import Specialistic from "./components/pages/Specialistic/Specialistic";
import SideBar from "./components/util/Sidebar";
import Appointment from "./components/pages/Appointment/Appointment";
import AllSpecialistic from "./components/pages/Specialistic/AllSpecialistic";
import Navbar2 from "./UI/Navbar2";
import MainContainer from "./components/pages/Home/MainContainer";
import RegisterOtp from "./components/Register/RegisterOtp";
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
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
