import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/form/Login";
import Register from "./components/form/Register";
import Otp from "./components/form/Otp";
import ForgotPassword from "./components/form/ForgotPassword";
import ChangePassword from "./components/pages/forgotSteps/ChangePassword";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
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
