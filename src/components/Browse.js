import React from "react";

const Browse = () => {
  return (
    <>
      <div className="max-w-[80%] mx-auto">
        <div className="bg-[#0082821C] px-8 py-4 mr-5 ml-5 rounded-lg mt-5 font-sansBold text-[1.2rem] text-[#292F33]">
          Browse Doctors near you
        </div>
        <div className="grid grid-cols-4 mr-10">
          {
            //array fill
            <div className="flex ml-10 mt-4 pl-3 rounded-md bg-[#00828212] px-6 py-2">
              <img
                src="https://images.template.net/83354/free-green-location-vector-ffwo7.jpg"
                className="h-8 w-8"
                alt=""
              />
              <p className="ml-4 text-verifiCation">San Franisco, CA</p>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Browse;
