import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ChangePassword from "./components/ChangePassword/ChangePassword";
// import Specialistic from "./components/pages/Specialistic/Specialistic";
import SideBar from "./util/Sidebar";
import MakeAppointment from "./components/pages/Appointment/MakeAppointment";
import AllSpecialistic from "./components/pages/Specialistic/AllSpecialistic";
import Navbar2 from "./UI/Navbar2";
import MainContainer from "./components/pages/Home/MainContainer";
import RegisterOtp from "./components/Register/RegisterOtp";
import useOnline from "./hooks/useOnline";
import ProfileDetails from "./components/pages/MyProfile/ProfileDetails";
import UpdateProfile from "./components/pages/MyProfile/UpdateProfile";
import AboutUs from "./components/pages/AboutUs/AboutUs";
import DoctorListing from "./components/pages/DoctorListing/DoctorListing";
import Appointment from "./components/pages/Appointment/Appointment";
import NetworkError from "./util/NetworkError";
import ContactUs from "./components/ContactUs";
import DoctorDetails from "./components/pages/DoctorListing/DoctorDetails";

function App() {
  const isOnline = useOnline();
  const isLoggedIn = useSelector((state) => state.login.remember_token);

  const commonRoutes = [
    {
      path: "/",
      element: <Navbar2 />,
      children: [
        { path: "/", element: <MainContainer /> },
        { path: "/specialist", element: <AllSpecialistic /> },
        { path: "/about-us", element: <AboutUs /> },
        { path: "/make-appointment", element: <MakeAppointment /> },
        { path: "/doctor-listing", element: <DoctorListing /> },
        { path: "/doctor-listing/:id", element: <DoctorDetails /> },
        { path: "/contact-us", element: <ContactUs /> },
      ],
    },

    // { path: "/special", element: <Specialistic /> },
  ];

  const authenticatedRoutes = [
    {
      path: "/sidebar",
      element: <SideBar />,
      children: [
        { path: "/sidebar", element: <ProfileDetails /> },
        { path: "update-profile", element: <UpdateProfile /> },
        { path: "appointment-list", element: <Appointment /> },
      ],
    },
    { path: "/change-password", element: <ChangePassword /> },
  ];

  const routes = isLoggedIn
    ? [...commonRoutes, ...authenticatedRoutes]
    : [
        ...commonRoutes,
        { path: "/register", element: <Register /> },
        { path: "/otp", element: <RegisterOtp /> },
        { path: "/login", element: <Login /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
      ];

  return (
    <>
      {!isOnline ? (
        <>
          <Navbar2 />
          <NetworkError />
        </>
      ) : (
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.children &&
                route.children.map((child, index) => (
                  <Route
                    key={index}
                    path={child.path}
                    element={child.element}
                  />
                ))}
            </Route>
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;
