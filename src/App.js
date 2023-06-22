import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/form/Login";
import Register from "./components/form/Register";
import Otp from "./components/form/Otp";
import ForgotPassword from "./components/form/ForgotPassword";
import ChangePassword from "./components/pages/forgotSteps/ChangePassword";
import Navbar from "./UI/Navbar";
import Specialistic from "./components/pages/Home/Specialistic/Specialistic";
import SideBar from "./components/pages/Home/pages/Sidebar";
import Appointment from "./components/pages/Home/Appointment/Appointment";
import AllSpecialistic from "./components/pages/Home/Specialistic/AllSpecialistic";
import Navbar2 from "./UI/Navbar2";
import MainContainer from "./UI/MainContainer";
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
    element: <Otp />,
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
