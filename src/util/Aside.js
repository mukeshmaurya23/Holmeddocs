import React from "react";
import { toast } from "react-toastify";
const Aside = ({ image, error }) => {
  // Add more conditions for other steps if needed

  return (
    <aside
      className="bg-gray-900 bg-cover aspect-auto  lg:w-[43%]  md:h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        objectFit: "contain",
      }}
    >
      {error &&
        toast.error(error, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })}
    </aside>
  );
};

export default Aside;
