import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/form/Login";
import Register from "./components/form/Register";
import Otp from "./components/form/Otp";
import ForgotPassword from "./components/form/ForgotPassword";
import ChangePassword from "./components/pages/forgotSteps/ChangePassword";
import Navbar from "./UI/Navbar";
import Specialistic from "./components/pages/Home/Specialistic/Specialistic";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
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
]);
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
