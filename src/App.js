import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";
import loadingGif from "./images/icons/Loader.gif";
import useOnline from "./hooks/useOnline";
const Login = lazy(() => import("./components/Login/Login"));
const Register = lazy(() => import("./components/Register/Register"));

// import Login from "./components/Login/Login";
// import Register from "./components/Register/Register";

// import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
// import ChangePassword from "./components/ChangePassword/ChangePassword";
const ForgotPassword = lazy(() =>
  import("./components/ForgotPassword/ForgotPassword")
);
const ChangePassword = lazy(() =>
  import("./components/ChangePassword/ChangePassword")
);

// import Specialistic from "./components/pages/Specialistic/Specialistic";
//import SideBar from "./util/Sidebar";
const SideBar = lazy(() => import("./util/Sidebar"));

// import MakeAppointment from "./components/pages/Appointment/MakeAppointment";
// import AllSpecialistic from "./components/pages/Specialistic/AllSpecialistic";
// import Navbar2 from "./UI/Navbar2";

const MakeAppointment = lazy(() =>
  import("./components/pages/Appointment/MakeAppointment")
);
const AllSpecialistic = lazy(() =>
  import("./components/pages/Specialistic/AllSpecialistic")
);
const Navbar2 = lazy(() => import("./UI/Navbar2"));

// import MainContainer from "./components/pages/Home/MainContainer";
// import RegisterOtp from "./components/Register/RegisterOtp";

const MainContainer = lazy(() =>
  import("./components/pages/Home/MainContainer")
);
const RegisterOtp = lazy(() => import("./components/Register/RegisterOtp"));
//const useOnline = lazy(() => import("./hooks/useOnline"));

// import ProfileDetails from "./components/pages/MyProfile/ProfileDetails";
// import UpdateProfile from "./components/pages/MyProfile/UpdateProfile";
// import AboutUs from "./components/pages/AboutUs/AboutUs";

const ProfileDetails = lazy(() =>
  import("./components/pages/MyProfile/ProfileDetails")
);
const UpdateProfile = lazy(() =>
  import("./components/pages/MyProfile/UpdateProfile")
);
const AboutUs = lazy(() => import("./components/pages/AboutUs/AboutUs"));

// import DoctorListing from "./components/pages/DoctorListing/DoctorListing";
// import Appointment from "./components/pages/Appointment/Appointment";
// import NetworkError from "./util/NetworkError";
// import ContactUs from "./components/ContactUs";
// import DoctorDetails from "./components/pages/DoctorListing/DoctorDetails";
// import BookAppointment from "./components/pages/Appointment/BookAppointment";

const DoctorListing = lazy(() =>
  import("./components/pages/DoctorListing/DoctorListing")
);
const Appointment = lazy(() =>
  import("./components/pages/Appointment/Appointment")
);
const NetworkError = lazy(() => import("./util/NetworkError"));
const ContactUs = lazy(() => import("./components/ContactUs"));
const DoctorDetails = lazy(() =>
  import("./components/pages/DoctorListing/DoctorDetails")
);
const BookAppointment = lazy(() =>
  import("./components/pages/Appointment/BookAppointment")
);

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
        {
          path: "/doctor-listing/:doctorName/:id",
          element: <DoctorDetails />,
        },
        { path: "/contact-us", element: <ContactUs /> },
        { path: "/book-appointment", element: <BookAppointment /> },
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
      <Suspense
        fallback={
          <div className="loader">
            <img src={loadingGif} alt="loading" />
          </div>
        }
      >
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
      </Suspense>
    </>
  );
}

export default App;
