import React, { useState } from "react";

const AccordianFooter = () => {
  

  const [isVisible, setIsVisible] = useState(false);

  const handleItemClick = (id) => {
    setIsVisible((prevIsVisible) => (prevIsVisible === id ? null : id));
  };
  return (
    <>
      <div>+</div>
    </>
  );
};

export default AccordianFooter;
