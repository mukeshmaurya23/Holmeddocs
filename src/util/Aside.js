import React from "react";

const Aside = ({ image }) => {
  // Add more conditions for other steps if needed
  return (
    <aside
      className="bg-gray-900 bg-cover aspect-auto  lg:w-[43%]  md:h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        objectFit: "contain",
      }}
    ></aside>
  );
};

export default Aside;
