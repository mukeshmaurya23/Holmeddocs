import React from "react";

const Aside = ({ image }) => {

  return (
    <aside
      className="bg-gray-900 bg-cover aspect-auto  lg:w-[45vw]  lg:h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        objectFit: "contain",
      }}
    ></aside>
  );
};

export default Aside;
