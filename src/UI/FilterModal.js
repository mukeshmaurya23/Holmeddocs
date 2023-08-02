import React from 'react'

const FilterModal = ({isMenuForFilter,toggleFilterMenuHandler}) => {
  return (
    <>
      <div
        className={`fixed overflow-hidden top-0 right-0 w-screen h-screen bg-white z-10 transform transition-transform duration-300 ease-in-out ${
          isMenuForFilter ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative">
          <button
            onClick={toggleFilterMenuHandler}
            className="absolute top-5 right-5 h-10 w-10 bg-gray-200 flex justify-center items-center rounded-full rounded-full"
          >
            <img src={cross} className=" h-4" />
          </button>
          <div className="absolute top-20 left-10 w-full"></div>
        </div>
      </div>
    </>
  );
}

export default FilterModal