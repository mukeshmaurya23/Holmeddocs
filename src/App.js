import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import { Suspense, lazy, useEffect, useRef } from "react";
import loadingGif from "./images/icons/Loader.gif";
import useOnline from "./hooks/useOnline";
import { useSelector, useDispatch } from "react-redux";
import UnderMaintenance from "./components/UnderMaintenance";

import { fetchConditions, fetchSpecialties } from "./store/LocSpecSlice";
import {
  fetchAllDoctorsData,
  fetchData,
  fetchDoctorsData,
  fetchInsuranceData,
  fetchStateData,
} from "./store/apiSlice";
import {
  fetchAllMedicalCondition,
  fetchAllMedicalConditionList,
} from "./store/healthConcernSlice";

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
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedItem = useSelector((state) => state.healthConcern.selectedItem);
  const conditionsDispatch = useDispatch();
  const specialityDispatch = useDispatch();
  const insuranceDispatch = useDispatch();
  const doctorDispatch = useDispatch();
  const medicalDispatch = useDispatch();
  const stateDispatch = useDispatch();
  const medicalListdispatch = useDispatch();
  const appointmentDispatch = useDispatch();
  const doctorDispatch2 = useDispatch();

  useEffect(() => {
    dispatch(fetchSpecialties("/patient/master/speciality"));
  }, []);
  useEffect(() => {
    specialityDispatch(fetchSpecialties("/patient/master/speciality"));
  }, []);

  useEffect(() => {
    conditionsDispatch(fetchConditions("/patient/master/condition"));
  }, []);
  useEffect(() => {
    insuranceDispatch(fetchInsuranceData("/patient/master/insurance"));
  }, [insuranceDispatch]);

  useEffect(() => {
    appointmentDispatch(fetchData("/patient/appointments"));
  }, [appointmentDispatch]);

  useEffect(() => {
    doctorDispatch(
      fetchDoctorsData({
        url: "/patient/doctors",
        featured: "1",
      })
    );
  }, [doctorDispatch]);
  useEffect(() => {
    stateDispatch(fetchStateData("/patient/master/state"));
  }, [stateDispatch]);

  useEffect(() => {
    medicalDispatch(fetchAllMedicalCondition());
  }, []);

  useEffect(() => {
    medicalListdispatch(fetchAllMedicalConditionList(selectedItem));
  }, [selectedItem]);

  useEffect(() => {
    doctorDispatch2(fetchAllDoctorsData("/patient/doctors"));
  }, []);
  useEffect(() => {
    //scroll to top on every route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
        {
          path: "/under-maintenance",
          element: <UnderMaintenance />,
        },
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
          <div className="loader flex justify-center items-center h-screen">
            <img src={loadingGif} alt="loading" className="w-full h-auto" />
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
            {routes?.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
                {route.children &&
                  route.children?.map((child, index) => (
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
